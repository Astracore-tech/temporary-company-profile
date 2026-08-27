import { remark } from "remark";
import html from "remark-html";

/**
 * Article bodies start at `# Heading`, but the page already renders the post
 * title as its <h1>. Shift every heading down one level so the document has a
 * single h1 and no skipped levels.
 */
function demoteHeadings() {
  return (tree: any) => {
    const walk = (node: any) => {
      if (node.type === "heading") {
        node.depth = Math.min(6, node.depth + 1);
      }
      if (Array.isArray(node.children)) node.children.forEach(walk);
    };
    walk(tree);
  };
}

export default async function markdownToHtml(markdown: string) {
  const result = await remark().use(demoteHeadings).use(html).process(markdown);
  return result.toString();
}
