import {notFound} from 'next/navigation';
import {db} from '@/lib/server';
import {Report} from '@/components/forms';
export const metadata={title:'Website Health Report | AstraCore',robots:{index:false,follow:false}};
export default async function Page({params}:{params:Promise<{id:string}>}){const {id}=await params;if(!/^[0-9a-f-]{36}$/.test(id))notFound();const row=await db().prepare('SELECT data FROM reports WHERE id=? AND expires>?').bind(id,Date.now()).first<{data:string}>();if(!row)notFound();const report=JSON.parse(row.data);return <main className="container narrow section"><a className="brand" href="/">AstraCore.</a><Report region={report.region==='us'?'us':'ke'} report={report}/></main>}
