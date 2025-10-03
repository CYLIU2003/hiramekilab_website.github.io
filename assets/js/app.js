
const NAV_TOGGLE=document.querySelector('.toggle');const NAV_LINKS=document.querySelector('.nav-links');
if(NAV_TOGGLE){NAV_TOGGLE.addEventListener('click',()=>NAV_LINKS.classList.toggle('show'))}
document.querySelectorAll('.nav-links a').forEach(a=>a.addEventListener('click',()=>NAV_LINKS.classList.remove('show')));
const THEME_KEY='hirameki_theme';const themeSelect=document.getElementById('themeSelect');
function applyTheme(t){document.documentElement.setAttribute('data-theme',t);try{localStorage.setItem(THEME_KEY,t)}catch(e){}if(themeSelect) themeSelect.value=t;}
let saved=null;try{saved=localStorage.getItem(THEME_KEY)}catch(e){}applyTheme(saved||'light');
if(themeSelect){themeSelect.addEventListener('change',e=>applyTheme(e.target.value));}
