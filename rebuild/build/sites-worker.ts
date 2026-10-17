import { chooseRegion } from '../lib/region';
import handler from "vinext/server/fetch-handler";
import { runWithConnectorBinding } from "../lib/connector-context";
import type { ConnectorBinding } from "../lib/connector-contract.mjs";

export default {
  async fetch(request: Request, env: Cloudflare.Env, ctx: ExecutionContext<{ CONNECTORS?: ConnectorBinding }>) {
    const url = new URL(request.url);
    if (url.pathname === '/') {
      const cf = (request as Request & {cf?:{continent?:string}}).cf;
      const region = chooseRegion(cf?.continent, request.headers.get('cookie'));
      return new Response(null,{status:302,headers:{Location:`/${region}/${url.search}`,'Cache-Control':'private, no-store','Vary':'Cookie'}});
    }
    let binding = ctx.props?.CONNECTORS;
    // Local preview emulates the same request-scoped capability. This branch and
    // the auxiliary service binding are absent from production builds.
    if (import.meta.env.DEV && !binding && env.CONNECTORS) {
      const preview = env.CONNECTORS;
      const expiresAt = Date.now() + 60_000;
      binding = {
        async getContext() {
          if (Date.now() >= expiresAt) return { status: "request_context_expired" };
          return preview.getContext?.() ?? { status: "binding_unavailable" };
        },
        async invoke(connectorId, actionName, args) {
          if (Date.now() >= expiresAt) {
            return { status: "request_context_expired", message: "This request has expired. Please try again." };
          }
          return preview.invoke(connectorId, actionName, args);
        },
      };
    }
    const result = await runWithConnectorBinding(binding, () => handler.fetch(request, env, ctx));
    const response = new Response(result.body, result);
    response.headers.set('X-Content-Type-Options','nosniff');
    response.headers.set('Referrer-Policy','strict-origin-when-cross-origin');
    response.headers.set('X-Frame-Options','DENY');
    response.headers.set('Strict-Transport-Security','max-age=31536000; includeSubDomains');
    response.headers.set('Permissions-Policy','camera=(), microphone=(), geolocation=()');
    if (url.hostname !== 'astracoretech.org' || /^\/(api|admin|reports)(\/|$)/.test(url.pathname)) response.headers.set('X-Robots-Tag','noindex, nofollow');
    if (/^\/(api|admin|reports)(\/|$)/.test(url.pathname)) response.headers.set('Cache-Control','private, no-store');
    return response;
  },
};
