export async function getJSON(url:string,init?:RequestInit){const res=await fetch(url,{...init,next:{revalidate:300}});if(!res.ok)throw new Error('Fetch failed '+res.status);return res.json();}
