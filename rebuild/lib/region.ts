export function chooseRegion(continent?:string,cookie?:string|null){const selected=cookie?.match(/(?:^|;\s*)astra_region=(ke|us)(?:;|$)/)?.[1];return selected||(continent==='AF'?'ke':'us');}
