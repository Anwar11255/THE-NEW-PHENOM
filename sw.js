const V='fenomeno-v1';
self.addEventListener('install',e=>{self.skipWaiting()});
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim())));
self.addEventListener('message',e=>{if(e.data&&e.data.cache)e.waitUntil(caches.open(V).then(c=>c.add(new Request(e.data.cache,{cache:'reload'}))).catch(()=>{}))});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;const u=new URL(r.url);
 if(u.origin!==location.origin&&!/fonts\.(googleapis|gstatic)\.com$/.test(u.host))return;
 e.respondWith(caches.open(V).then(c=>c.match(r,{ignoreSearch:true}).then(m=>{
  const n=fetch(r).then(x=>{if(x&&(x.ok||x.type==='opaque'))c.put(r,x.clone());return x}).catch(()=>m);return m||n})))});
