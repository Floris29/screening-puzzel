/* Start: interactieve puzzel die de poster onthult. */
(() => {
  const svg = document.getElementById('puzzle');
  const ns = 'http://www.w3.org/2000/svg';
  const cols = 4, rows = 6, w = 1055 / cols, h = 1491 / rows;
  let count = cols * rows;
  const v = (r,c) => (r * 7 + c * 11) % 3 === 0 ? -1 : 1;
  const hor = (r,c) => (r * 5 + c * 13) % 3 === 0 ? -1 : 1;
  function edge(x1,y1,x2,y2,dir) {
    if (!dir) return `L ${x2} ${y2}`;
    const dx=x2-x1,dy=y2-y1,len=Math.hypot(dx,dy),nx=-dy/len*dir,ny=dx/len*dir;
    const bump=Math.min(w,h)*.18;
    const p=(t,o=0)=>`${(x1+dx*t+nx*o).toFixed(2)} ${(y1+dy*t+ny*o).toFixed(2)}`;
    return `L ${p(.35)} C ${p(.39)} ${p(.405,bump*.35)} ${p(.425,bump*.42)} C ${p(.385,bump*.88)} ${p(.425,bump*1.25)} ${p(.5,bump*1.25)} C ${p(.575,bump*1.25)} ${p(.615,bump*.88)} ${p(.575,bump*.42)} C ${p(.595,bump*.35)} ${p(.61)} ${p(.65)} L ${p(1)}`;
  }
  function makePiece(r,c) {
    const x=c*w,y=r*h,R=x+w,B=y+h;
    const top=r===0?0:-hor(r,c);
    const right=c===cols-1?0:v(r,c+1);
    const bottom=r===rows-1?0:hor(r+1,c);
    const left=c===0?0:-v(r,c);
    const d=`M ${x} ${y} ${edge(x,y,R,y,top)} ${edge(R,y,R,B,right)} ${edge(R,B,x,B,bottom)} ${edge(x,B,x,y,left)} Z`;
    const path=document.createElementNS(ns,'path');
    path.setAttribute('d',d);
    path.setAttribute('class','piece');
    path.setAttribute('tabindex','0');
    path.setAttribute('role','button');
    path.setAttribute('aria-label',`Puzzelstuk ${r*cols+c+1} onthullen`);
    function reveal() {
      if(path.classList.contains('gone')) return;
      path.classList.add('gone');
      path.setAttribute('tabindex','-1');
      path.setAttribute('aria-hidden','true');
      if(--count===0) {svg.style.pointerEvents='none';svg.setAttribute('aria-hidden','true');}
    }
    path.addEventListener('click',reveal);
    path.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();reveal();}});
    svg.appendChild(path);
  }
  for(let r=0;r<rows;r++) for(let c=0;c<cols;c++) makePiece(r,c);
})();
/* Einde: interactieve puzzel die de poster onthult. */
