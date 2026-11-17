import {$,$$,h,storage,toast,routePage} from './shared.js';
import {mountDev} from './modules/dev.js';
import {mountImage} from './modules/image.js';
import {mountMarkdown} from './modules/markdown.js';
import {mountDraw} from './modules/draw.js';
import {mountPrivacy} from './modules/privacy.js';
import {mount2048} from './modules/2048.js';
import {mountSnake} from './modules/snake.js';
import {mountMines} from './modules/mines.js';
import {mountType} from './modules/type.js';
import {mountAlgo} from './modules/algo.js';
import {mountFocus} from './modules/focus.js';
import {mountRandom} from './modules/random.js';
import {mountStart} from './modules/start.js';
import {mountHabits} from './modules/habits.js';
import {mountBrain} from './modules/brain.js';
const groups=[
 {title:'WORKSPACE',apps:[['dev','🧰','Developer Toolkit','JSON, regex, hash, JWT & more'],['image','🖼️','Image Workshop','Resize, convert & clean metadata'],['markdown','📝','Markdown Studio','Edit, preview & export notes'],['draw','✍️','Mini Whiteboard','Draw, undo & export PNG'],['privacy','🔐','Privacy Toolkit','Passwords & local file encryption']]},
 {title:'ARCADE',apps:[['2048','🔢','2048 Deluxe','Merge your way to 2048'],['snake','🐍','Retro Snake','Classic keyboard & touch game'],['mines','💣','Minesweeper','Find mines, flag cells'],['type','⌨️','Typing Arena','Measure speed & accuracy'],['brain','🧠','Brain Challenge','Memory match & reaction test']]},
 {title:'UTILITY',apps:[['algo','🧮','Algorithm Visualizer','Sort and explore paths'],['focus','⏱️','Focus Station','Pomodoro + task list'],['random','🎲','Decision Roulette','Spin, roll, flip, choose'],['start','🚀','Personal Start Page','Bookmarks & quick search'],['habits','📅','Habit Tracker','Local heatmap of your habits']]}
];
const all=groups.flatMap(g=>g.apps);
const route=(location.pathname.replace(/\/+$/,'').split('/').filter(Boolean)[1]||'home');
const routeMap=Object.fromEntries(all.map(([id,,,])=>[id,`/lab/${id}/`]));
const mount={dev:mountDev,image:mountImage,markdown:mountMarkdown,draw:mountDraw,privacy:mountPrivacy,'2048':mount2048,snake:mountSnake,mines:mountMines,type:mountType,brain:mountBrain,algo:mountAlgo,focus:mountFocus,random:mountRandom,start:mountStart,habits:mountHabits};
function card([id,emoji,name,description]){return `<a class="tool-card" href="/lab/${id}/"><span class="tile-icon">${emoji}</span><strong>${h(name)}</strong><p>${h(description)}</p><span class="go">↗</span></a>`}
function dashboard(){let opens=storage.get('visits',0);routePage('Your personal sandbox.','A private-feeling playground for useful utilities, experiments and little escapes. All tools run in your browser, with no account needed.',`<section class="hero"><div class="eyebrow">WELCOME TO THE HIDDEN SIDE</div><h1>MAKE. PLAY.<br><span>EXPLORE.</span></h1><p>A pocket-sized collection of tools and games. Fast, free, and built for your everyday workflow.</p><span class="pill">⌘ K  ·  Quick launch</span></section><div class="stats"><div class="stat"><strong>15</strong><small>Interactive apps</small></div><div class="stat"><strong>0</strong><small>Backend required</small></div><div class="stat"><strong>100%</strong><small>Browser powered</small></div><div class="stat"><strong>${opens}</strong><small>Local page visits</small></div></div>${groups.map(g=>`<div class="section-head"><h2>${g.title}</h2><small>${g.apps.length} tools</small></div><div class="cards">${g.apps.map(card).join('')}</div>`).join('')}<p class="notice warn" style="margin-top:26px">Unlisted ≠ private: anyone with the URL can access this page. Do not put sensitive data or secret API keys in public site files. Tools and games store their own state on this browser only.</p>`)}
function setupNav(){let nav=$('#nav');nav.innerHTML=`<a class="nav-link ${route==='home'?'active':''}" href="/lab/"><span class="nav-emoji">⌂</span> Dashboard</a>`+groups.map(g=>`<div class="nav-title">${g.title}</div>`+g.apps.map(([id,emoji,title])=>`<a class="nav-link ${route===id?'active':''}" href="${routeMap[id]}"><span class="nav-emoji">${emoji}</span> ${h(title)}</a>`).join('')).join('');$('#nav-mobile').onclick=()=>$('.sidebar').classList.toggle('open');$('#crumb-current').textContent=all.find(a=>a[0]===route)?.[2]??'Dashboard';$('#back-link').href='/';$('#open-palette').onclick=openPalette;window.addEventListener('keydown',e=>{if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k'||e.key==='/'&&!['INPUT','TEXTAREA'].includes(document.activeElement.tagName)){e.preventDefault();openPalette()}if(e.key==='Escape')$('#palette')?.remove()})}
function openPalette(){if($('#palette'))return;let p=document.createElement('div');p.id='palette';p.className='palette';p.innerHTML=`<div class="palette-inner"><input aria-label="Search tools" id="palette-search" class="input" placeholder="Search 15 tools..." autofocus><div class="palette-list" id="palette-list"></div><p class="hint">Esc to close · Enter to open first match</p></div>`;document.body.append(p);const input=$('#palette-search'),list=$('#palette-list');function update(){const q=input.value.toLowerCase();list.innerHTML=all.filter(([id,,name,desc])=>[id,name,desc].join(' ').toLowerCase().includes(q)).map(([id,emoji,name,desc])=>`<a href="/lab/${id}/">${emoji} &nbsp; ${h(name)} <span class="hint">— ${h(desc)}</span></a>`).join('')||'<p class="hint">No tools found</p>'}input.addEventListener('input',update);input.addEventListener('keydown',e=>{if(e.key==='Enter'){$('#palette-list a')?.click()}});p.addEventListener('click',e=>{if(e.target===p)p.remove()});update();input.focus()}
storage.set('visits',storage.get('visits',0)+1);setupNav();if(route==='home')dashboard();else if(mount[route])mount[route]();else routePage('Not found','This tool does not exist.',`<a class="btn primary" href="/lab/">Back to dashboard</a>`);
