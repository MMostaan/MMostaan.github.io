export const $=(sel,root=document)=>root.querySelector(sel);
export const $$=(sel,root=document)=>Array.from(root.querySelectorAll(sel));
export const h=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export const storage={get:(k,def)=>{try{let v=localStorage.getItem('mlab:'+k);return v===null?def:JSON.parse(v)}catch{return def}},set:(k,v)=>{try{localStorage.setItem('mlab:'+k,JSON.stringify(v))}catch{toast('Local storage unavailable')}},remove:k=>localStorage.removeItem('mlab:'+k)};
export const random=(min,max)=>{const n=crypto.getRandomValues(new Uint32Array(1))[0];return min+(n%(max-min+1))};
export const shuffle=xs=>{const a=[...xs];for(let i=a.length-1;i>0;i--){let j=random(0,i);[a[i],a[j]]=[a[j],a[i]]}return a};
export function toast(msg){let t=$('#toast');if(!t)return;t.textContent=msg;t.classList.add('show');clearTimeout(window.__toast);window.__toast=setTimeout(()=>t.classList.remove('show'),3100)}
export function copy(text){navigator.clipboard?.writeText(String(text)).then(()=>toast('Copied to clipboard')).catch(()=>toast('Unable to copy. Select and copy manually.'))}
export function download(name,content,type='text/plain;charset=utf-8'){let url=URL.createObjectURL(content instanceof Blob?content:new Blob([content],{type})),a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000)}
export function routePage(title,subtitle,body){const root=$('#content');root.innerHTML=`<div class="eyebrow">MOSTAAN LAB / EXPERIMENTS</div><h1>${h(title)}</h1><p class="lead">${h(subtitle)}</p>${body}`}
export function bindClick(id,fn){$('#'+id)?.addEventListener('click',fn)}
export function fmtTime(s){return `${String(Math.floor(Math.max(0,s)/60)).padStart(2,'0')}:${String(Math.floor(Math.max(0,s)%60)).padStart(2,'0')}`}
export function loadTextFile(file,cb){if(!file)return;file.text().then(cb).catch(()=>toast('Unable to read file'))}
export function el(tag,attrs={},content=''){const x=document.createElement(tag);for(const [k,v] of Object.entries(attrs))if(k==='class')x.className=v;else x.setAttribute(k,v);x.textContent=content;return x}
