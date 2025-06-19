async function m(o,c={}){try{const n=await fetch(o,{...c});if(!n.ok)throw new Error(`API Error: ${n.status} - ${n.statusText}`);return await n.json()}catch(n){return console.error("❌ API Fetch Error:",n.message),{error:n.message}}}const u="c5d1d5faae1fac11ff73d7be16a7e98c",w="f605d700fa724d87b1a1691bbb551e58";function h(){return`
  <a href="#main-content" class="skip-link">Skip to content</a>  
  <header role="navigation">
    <div>
        <a href="index.html">
        <img src="../../public/assets/icons/logo/complete_logo1.png" alt="LifeSync Logo">
        </a>
        <nav class="main-nav" arial label="Main Navigation">
            <ul>
                <li><a href="../../pages/dashboard.html">Dashboard</a></li>
            </ul>
        </nav>
     </div>
    </header>
    `}function f(){return`
    <footer role="contentinfo">
        <p>Desisgned & Developed by Modewani Group</p>
        <p>© 2025 LifeSync. All rights reserved.</p>
    </footer>
    `}function y(){const o=document.getElementById("header-container");o&&(o.innerHTML=h())}function p(){const o=document.getElementById("footer-container");o&&(o.innerHTML=f())}function g(){const o=document.querySelector(".animated-circles"),c=12,n=["#FFC0CB","#64B5F6","#FFEE58","#81C784","#9575CD"],d=[];for(let t=0;t<c;t++){const i=document.createElement("span");i.classList.add("circle"),i.style.backgroundColor=n[t%n.length];let a=[{x:window.innerWidth/2,y:window.innerHeight/2},{x:20,y:20},{x:20,y:window.innerHeight-100},{x:window.innerWidth-100,y:20},{x:window.innerWidth-100,y:window.innerHeight-100}],e=a[t%a.length];i.style.transform=`translate(${e.x}px, ${e.y}px)`,o.appendChild(i);let r=(Math.random()-.5)*4,s=(Math.random()-.5)*4;d.push({element:i,x:e.x,y:e.y,vx:r,vy:s})}function l(){d.forEach(t=>{let{element:i,x:a,y:e,vx:r,vy:s}=t;a+=r,e+=s,(a<=0||a>=window.innerWidth-100)&&(r*=-1,a=Math.max(0,Math.min(a,window.innerWidth-100))),(e<=0||e>=window.innerHeight-100)&&(s*=-1,e=Math.max(0,Math.min(e,window.innerHeight-100))),i.style.transform=`translate(${a}px, ${e}px)`,t.x=a,t.y=e,t.vx=r,t.vy=s}),requestAnimationFrame(l)}l()}export{u as C,w as T,p as a,g as b,m as f,y as i};
