function u(){return`
  <a href="#main-content" class="skip-link">Skip to content</a>  
  <header role="navigation">
    <div>
        <a href="index.html">
        <img src="public/assets/icons/logo/complete_logo1.png" alt="LifeSync Logo">
        </a>
        <!-- Menu Toggle Button -->
        <button
          class="menu-toggle"
          aria-label="Toggle Navigation"
          aria-expanded="false"
          aria-controls="main-nav">
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
        </button>

        <nav class="main-nav" arial label="Main Navigation">
            <ul>
                <li><a href="src/pages/authentication.html">Mental Health</a></li>
                <li><a href="src/pages/authentication.html">Finance</a></li>
                <li><a href="src/pages/authentication.html">Career</a></li>
                <li><a href="src/pages/authentication.html">Entertainment</a></li>
                <li><a href="src/pages/authentication.html">Community</a></li>
            </ul>
        </nav>
     </div>
    </header>
    `}function g(){return`
    <footer role="contentinfo">
        <nav>
            <ul>
                <li><a href="src/pages/privacy.html">Privacy Policy</a></li>
                <li><a href="src/pages/terms.html">Terms & Conditions</a></li>
                <li><a href="src/pagescontact.html">Contact Us</a></li>
                <li><a href="src/pages/attribution.html">Attribution</a></li>
            </ul>
        </nav>
        <p>Desisgned & Developed by Modewani Group</p>
        <p>© 2025 LifeSync. All rights reserved.</p>
    </footer>
    `}function p(){const e=document.getElementById("header-container");e&&(e.innerHTML=u())}function f(){const e=document.getElementById("footer-container");e&&(e.innerHTML=g())}function y(){const e=document.querySelector(".menu-toggle"),i=document.querySelector(".main-nav");e&&i&&e.addEventListener("click",()=>{const o=e.getAttribute("aria-expanded")==="true";e.setAttribute("aria-expanded",!o),e.classList.toggle("open"),i.classList.toggle("active")})}function x(){const e=document.querySelector(".animated-circles"),i=12,o=["#FFC0CB","#64B5F6","#FFEE58","#81C784","#9575CD"],s=[];for(let n=0;n<i;n++){const r=document.createElement("span");r.classList.add("circle"),r.style.backgroundColor=o[n%o.length];let a=[{x:window.innerWidth/2,y:window.innerHeight/2},{x:20,y:20},{x:20,y:window.innerHeight-100},{x:window.innerWidth-100,y:20},{x:window.innerWidth-100,y:window.innerHeight-100}],t=a[n%a.length];r.style.transform=`translate(${t.x}px, ${t.y}px)`,e.appendChild(r);let c=(Math.random()-.5)*4,d=(Math.random()-.5)*4;s.push({element:r,x:t.x,y:t.y,vx:c,vy:d})}function l(){s.forEach(n=>{let{element:r,x:a,y:t,vx:c,vy:d}=n;a+=c,t+=d,(a<=0||a>=window.innerWidth-100)&&(c*=-1,a=Math.max(0,Math.min(a,window.innerWidth-100))),(t<=0||t>=window.innerHeight-100)&&(d*=-1,t=Math.max(0,Math.min(t,window.innerHeight-100))),r.style.transform=`translate(${a}px, ${t}px)`,n.x=a,n.y=t,n.vx=c,n.vy=d}),requestAnimationFrame(l)}l()}function v(){const e=document.querySelector(".hero-text"),i=document.querySelector(".hero-image img");document.addEventListener("mousemove",o=>{const s=(o.clientX/window.innerWidth-.5)*30,l=(o.clientY/window.innerHeight-.5)*30;e.style.transform=`translate(${s*.3}px, ${l*.3}px)`,i.style.transform=`translate(${s*-.4}px, ${l*-.4}px) scale(1.03)`})}function m(){const e=new Date().getHours();return e<12?"Good morning":e<18?"Good afternoon":"Good evening"}function h(){const e=sessionStorage.getItem("loggedInUser");if(!e)return"Guest";const i=JSON.parse(e);return i.name?i.name:"Guest"}function w(){return`${m()}, ${h()}!`}function b(){const e=document.getElementById("logoutBtn");e&&e.addEventListener("click",()=>{sessionStorage.removeItem("loggedInUser"),window.location.href="./../../index.html"})}export{f as a,x as b,v as c,b as d,w as g,p as i,y as s};
