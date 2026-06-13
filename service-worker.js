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

clients.claim()

)

}

)

/* 不缓存，但允许安装 */

self.addEventListener(

"fetch",

(event)=>{

return

}
)
