const VERSION="yanie-v1.0.0"

self.addEventListener(
"install",
(event)=>{

self.skipWaiting()

}
)

self.addEventListener(
"activate",
(event)=>{

event.waitUntil(

(async()=>{

let keys=

await caches.keys()

for(
let k
of
keys
){

if(
k!==VERSION
){

await caches.delete(
k
)

}

}

await clients.claim()

})()

)

}
)


self.addEventListener(
"fetch",

(event)=>{

event.respondWith(

fetch(
event.request
)

.catch(

()=>

caches.match(
event.request
)

)

)

}
)
