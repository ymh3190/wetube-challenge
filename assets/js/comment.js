(()=>{function e(e,t,n,r,a,o,c){try{var u=e[o](c),i=u.value}catch(e){return void n(e)}u.done?t(i):Promise.resolve(i).then(r,a)}function t(t){return function(){var n=this,r=arguments;return new Promise((function(a,o){var c=t.apply(n,r);function u(t){e(c,a,o,u,i,"next",t)}function i(t){e(c,a,o,u,i,"throw",t)}u(void 0)}))}}var n=document.querySelector("#videoContainer"),r=document.querySelector("#commentForm"),a=document.querySelectorAll("#deleteBtn"),o=document.querySelector("#comments"),c=function(e,t){var n=document.querySelector("#comments ul"),r=document.createElement("li");r.dataset.id=t,r.className="video__comment";var a=document.createElement("i");a.className="fas fa-comment";var o=document.createElement("span");o.innerText=" ".concat(e);var c=document.createElement("span");c.innerText="❌",r.appendChild(a),r.appendChild(o),r.appendChild(c),n.prepend(r)},u=function(){var e=t(regeneratorRuntime.mark((function e(t){var a,o,u,i,m,s;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),a=r.querySelector("textarea"),o=n.dataset.id,u=a.value,e.next=6,fetch("/api/videos/".concat(o,"/comment"),{method:"post",headers:{"Content-Type":"application/json"},body:JSON.stringify({text:u})});case 6:if(201!==(i=e.sent).status){e.next=14;break}return a.value="",e.next=11,i.json();case 11:m=e.sent,s=m.newComment,c(u,s);case 14:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),i=function(){var e=t(regeneratorRuntime.mark((function e(t){var n,r;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.target.parentElement.parentElement,r=n.dataset.id,e.next=4,fetch("/api/comments/".concat(r,"/delete"),{method:"delete"});case 4:o.querySelector("ul").removeChild(n);case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();r&&(r.addEventListener("submit",u),a.forEach((function(e){return e.addEventListener("click",i)})))})();