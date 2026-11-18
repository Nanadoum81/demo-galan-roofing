(()=>{'use strict';
const menu=document.querySelector('#menu-button'),nav=document.querySelector('#mobile-navigation');
if(menu&&nav){menu.addEventListener('click',()=>{const on=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(on));menu.setAttribute('aria-label',on?'Close navigation':'Open navigation')});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menu.setAttribute('aria-expanded','false')}));document.addEventListener('keydown',e=>{if(e.key==='Escape'){nav.classList.remove('open');menu.setAttribute('aria-expanded','false')}})}
for(const form of document.querySelectorAll('.lead-form')){const tabs=form.querySelectorAll('[data-type]'),type=form.querySelector('.property-type');tabs.forEach(tab=>tab.addEventListener('click',()=>{tabs.forEach(t=>{t.classList.toggle('active',t===tab);t.setAttribute('aria-pressed',String(t===tab))});if(type)type.value=tab.dataset.type;const select=form.querySelector('select[name="service"]');if(select){const key=tab.dataset.type;select.value=key==='Repair'?'Roof repair':key==='Commercial'?'Commercial roofing':'Residential roofing'}}));tabs.forEach(t=>t.setAttribute('aria-pressed',String(t.classList.contains('active'))));}
for(const c of document.querySelectorAll('[data-calculator]')){const material=c.querySelector('[data-calc-material]'),project=c.querySelector('[data-calc-project]'),area=c.querySelector('[data-calc-size]'),complexity=c.querySelector('[data-calc-complexity]'),result=c.querySelector('[data-calc-result]'),out=c.querySelector('[data-size-output]');if(!material||!project||!area||!complexity||!result||!out)continue;const update=()=>{const sf=Number(area.value);result.textContent=material.options[material.selectedIndex].text+' \u00B7 '+project.options[project.selectedIndex].text+' \u00B7 '+sf.toLocaleString('en-US')+' sq ft \u00B7 '+complexity.options[complexity.selectedIndex].text;out.textContent=sf.toLocaleString('en-US')+' sq ft';const cta=c.querySelector('.calc-action');if(cta)cta.href='contact.html?service='+encodeURIComponent(project.value==='repair'?'Roof repair':'Roof replacement')};[material,project,area,complexity].forEach(el=>el.addEventListener('input',update));update()}
const params=new URLSearchParams(location.search),s=params.get('service');if(s){document.querySelectorAll('.lead-form select[name="service"]').forEach(sel=>{const opt=[...sel.options].find(o=>o.textContent.toLowerCase()===s.toLowerCase());if(opt)sel.value=opt.value})}
const y=document.querySelector('#year');if(y)y.textContent=new Date().getFullYear();
if('IntersectionObserver'in window){const ob=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');ob.unobserve(e.target)}})},{threshold:.08,rootMargin:'0px 0px 20px 0px'});document.querySelectorAll('.reveal').forEach(el=>ob.observe(el))}else{document.querySelectorAll('.reveal').forEach(el=>el.classList.add('visible'))}
})();

;(()=>{'use strict';const open=document.getElementById('receptionist-open'),panel=document.getElementById('receptionist-panel'),close=document.getElementById('receptionist-close'),log=document.getElementById('receptionist-log'),form=document.getElementById('receptionist-input'),input=document.getElementById('receptionist-text'),voice=document.getElementById('receptionist-voice');if(!open||!panel)return;
let lastFocus=null;const toggle=(on)=>{panel.classList.toggle('is-open',on);panel.setAttribute('aria-hidden',String(!on));open.setAttribute('aria-expanded',String(on));if(on){lastFocus=document.activeElement;input.focus()}else if(lastFocus&&typeof lastFocus.focus==='function'){lastFocus.focus()}};open.addEventListener('click',()=>toggle(!panel.classList.contains('is-open')));document.querySelectorAll('[data-open-receptionist]').forEach(b=>b.addEventListener('click',()=>toggle(true)));close.addEventListener('click',()=>toggle(false));document.addEventListener('keydown',e=>{if(e.key==='Escape'&&panel.classList.contains('is-open'))toggle(false)});
const say=(text,who)=>{const div=document.createElement('div');div.className='receptionist-msg'+(who==='user'?' from-user':'');div.textContent=text;log.appendChild(div);log.scrollTop=log.scrollHeight;return div};
function answer(q){const s=q.toLowerCase();if(/after hours|after-hours|missed|text back|weekend|closed|at night/.test(s))return 'That is exactly what this front desk is for. If a call comes in after hours and the crew cannot pick up, the call is answered here instead: your name, number and what the roof is doing are captured on the spot, a text-back goes out so you know you are in line, and the inspection gets booked \u2014 not lost to voicemail. Tell me what your roof is doing and watch it happen.';if(/emergency|urgent|storm|leak|water/.test(s))return 'For urgent leaks or storm damage, call Galan Roofing at (602) 802-9393. I can also help you open the roof repair information page: '+location.origin+'/roof-repair.html';
if(/price|cost|calculator|budget|how much/.test(s))return 'I never quote prices here \u2014 every roof is different, and a number without an inspection would be a guess. What I can do is get you a free on-roof inspection and a written estimate from Galan. Use the form at the top of this page or call (602) 802-9393.';
if(/estimate|quote|schedule|inspection|appointment|book/.test(s))return 'You can request a free estimate from the form at the top of this website or at the Roof Estimate page. You can also call (602) 802-9393.';
if(/commercial|business|flat/.test(s))return 'Galan Roofing provides commercial inspections, maintenance and repairs. Open the Commercial Roofing page for details and request a site-specific assessment.';
if(/tile|shingle|residential|replace/.test(s))return 'Galan Roofing handles residential inspections, roof repair and replacement including tile and shingle roofing. An inspection helps determine the best next step.';
if(/where|area|location|city|serve|phoenix/.test(s))return 'Galan Roofing is based in Phoenix, Arizona. Ask the team to confirm service availability for your property address by calling (602) 802-9393.';
if(/financ|payment/.test(s))return 'Galan Roofing’s current financing options are not verified. Ask directly about available payment arrangements; the Financing page explains how to inquire.';
if(/review|rating|bbb|license/.test(s))return 'Galan Roofing is BBB Accredited with an A+ rating. A published customer review appears on HomeAdvisor and Angi. You can verify the latest contractor license information with Arizona ROC.';
if(/call|phone|contact|human|talk/.test(s))return 'Call the Galan Roofing team at (602) 802-9393 or email contact@galanroofingaz.com. You may also submit the contact form.';
return 'I can help with roof repair, replacements, inspections, project planning or requesting an estimate. For an answer specific to your roof, call Galan Roofing at (602) 802-9393.'}
function submit(q){const clean=String(q||'').trim();if(!clean)return;say(clean,'user');input.value='';setTimeout(()=>say(answer(clean),'assistant'),250)}
form.addEventListener('submit',e=>{e.preventDefault();submit(input.value)});panel.querySelectorAll('[data-quick]').forEach(b=>b.addEventListener('click',()=>submit(b.dataset.quick)));
voice.addEventListener('click',()=>{const SR=window.SpeechRecognition||window.webkitSpeechRecognition;if(!SR){say('Voice recognition is not available in this browser. You can type a question or call (602) 802-9393.','assistant');return}const recognition=new SR();recognition.lang='en-US';recognition.interimResults=false;recognition.maxAlternatives=1;voice.textContent='Listening…';voice.disabled=true;recognition.onresult=e=>{const q=e.results[0][0].transcript;submit(q);if('speechSynthesis'in window){const u=new SpeechSynthesisUtterance(answer(q));u.lang='en-US';u.rate=.95;window.speechSynthesis.speak(u)}};recognition.onerror=()=>say('I could not hear that. Please type your question or use the phone link.','assistant');recognition.onend=()=>{voice.textContent='🎙 Voice demo';voice.disabled=false};try{recognition.start()}catch(e){voice.textContent='🎙 Voice demo';voice.disabled=false}})
})();

;(()=>{'use strict';
// Lead forms: real delivery via Web3Forms to Blair Digital Studios (demo lead capture).
for (const form of document.querySelectorAll('form.lead-form')) {
 form.addEventListener('submit', async e => {
  e.preventDefault();
  if (!form.reportValidity()) return;
  let note=form.querySelector('.preview-form-success');
  if(!note){note=document.createElement('div');note.className='preview-form-success';note.setAttribute('role','status');form.append(note);}
  const btn=form.querySelector('.submit-btn');
  const label=btn?btn.innerHTML:'';
  if(btn){btn.disabled=true;btn.textContent='Sending\u2026';}
  try{
   const res=await fetch('https://api.web3forms.com/submit',{method:'POST',body:new FormData(form)});
   const data=await res.json().catch(()=>({}));
   if(res.ok&&data.success){window.location.href='thank-you.html';return;}
   throw new Error('send failed');
  }catch(err){
   note.textContent='Something went wrong sending this request. Please call Galan Roofing directly at (602) 802-9393.';
   note.scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'nearest'});
   if(btn){btn.disabled=false;btn.innerHTML=label;}
  }
 });
}
const grid=document.querySelector('#portfolio-grid'), modal=document.querySelector('#portfolio-lightbox');
if(!grid||!modal)return;
const cards=Array.from(grid.querySelectorAll('.portfolio-photo'));
const img=modal.querySelector('#portfolio-large-image'), title=modal.querySelector('#portfolio-photo-title');
let current=-1, returnFocus=null;
const visible=()=>cards.filter(c=>!c.hidden);
function openPhoto(card){returnFocus=document.activeElement; current=cards.indexOf(card); if(current<0)return;img.src=card.querySelector('img').src;img.alt=card.querySelector('img').alt;title.textContent=card.dataset.caption;modal.hidden=false;modal.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';modal.querySelector('.portfolio-close').focus();}
function closePhoto(){modal.hidden=true;modal.setAttribute('aria-hidden','true');document.body.style.overflow='';if(returnFocus&&typeof returnFocus.focus==='function')returnFocus.focus();}
function adjacent(dir){const list=visible();const cur=cards[current];let n=list.indexOf(cur);if(n<0)return;n=(n+dir+list.length)%list.length;current=cards.indexOf(list[n]);img.src=list[n].querySelector('img').src;img.alt=list[n].querySelector('img').alt;title.textContent=list[n].dataset.caption;}
grid.addEventListener('click',e=>{const card=e.target.closest('.portfolio-photo');if(card)openPhoto(card)});
modal.querySelectorAll('[data-photo-close]').forEach(b=>b.addEventListener('click',closePhoto));
modal.querySelector('#portfolio-previous').addEventListener('click',()=>adjacent(-1));
modal.querySelector('#portfolio-next').addEventListener('click',()=>adjacent(1));
document.addEventListener('keydown',e=>{if(modal.hidden)return;if(e.key==='Escape')closePhoto();else if(e.key==='ArrowLeft')adjacent(-1);else if(e.key==='ArrowRight')adjacent(1);else if(e.key==='Tab'){const focusable=[...modal.querySelectorAll('button,a[href]')].filter(el=>el.offsetParent!==null);const first=focusable[0],last=focusable.at(-1);if(e.shiftKey&&document.activeElement===first){last.focus();e.preventDefault()}else if(!e.shiftKey&&document.activeElement===last){first.focus();e.preventDefault()}}});
for(const button of document.querySelectorAll('[data-photo-filter]'))button.addEventListener('click',()=>{
 const filter=button.dataset.photoFilter;for(const b of document.querySelectorAll('[data-photo-filter]')){const chosen=b===button;b.classList.toggle('is-selected',chosen);b.setAttribute('aria-pressed',String(chosen));}
 let count=0;for(const card of cards){card.hidden=(filter!=='all'&&card.dataset.stage!==filter);if(!card.hidden)count++;}
 const num=document.querySelector('#portfolio-result-count');if(num)num.textContent=`Showing ${count} authentic roofing photographs`;
});
})();
