/* Светлана — общий скрипт всех страниц */
(function(){
  /* ---- прелоадер ---- */
  var pre=document.getElementById('pre');
  function preDone(){
    if(!pre) return;
    pre.classList.add('done');
    document.body.classList.remove('locked');
    setTimeout(function(){pre.classList.add('off')},1100);
  }
  if(pre){
    document.body.classList.add('locked');
    pre.classList.add('go');
    var t0=Date.now();
    window.addEventListener('load',function(){
      var wait=Math.max(0,1500-(Date.now()-t0));
      setTimeout(preDone,wait);
    });
    setTimeout(preDone,3500); /* страховка */
  }
  /* ---- sticky-шапка + параллакс ---- */
  var hdr=document.getElementById('hdr'), hbg=document.querySelector('.hero-bg'), lastY=0;
  function onScroll(){
    var y=window.scrollY||0;
    if(hdr){ if(y>30) hdr.classList.add('scrolled'); else hdr.classList.remove('scrolled'); }
    if(hbg){ var lim=Math.min(y,window.innerHeight||800); hbg.style.transform='translateY('+(lim*.22)+'px)'; }
    lastY=y;
  }
  window.addEventListener('scroll',onScroll,{passive:true}); onScroll();
  /* ---- reveal (polling, без IO) ---- */
  function scanReveal(){
    var els=document.querySelectorAll('.fx:not(.in)'), vh=window.innerHeight||800;
    for(var i=0;i<els.length;i++){
      var r=els[i].getBoundingClientRect();
      if(r.top<vh-36&&r.bottom>0) els[i].classList.add('in');
    }
  }
  setInterval(scanReveal,300); scanReveal();
  /* ---- мобильное меню ---- */
  var mnav=document.getElementById('mnav');
  var burger=document.getElementById('burger');
  if(burger&&mnav){
    burger.addEventListener('click',function(){mnav.classList.add('on')});
    var mx=document.getElementById('mclose');
    if(mx) mx.addEventListener('click',function(){mnav.classList.remove('on')});
    var ma=mnav.querySelectorAll('a');
    for(var i=0;i<ma.length;i++){(function(a){a.addEventListener('click',function(){mnav.classList.remove('on')})})(ma[i]);}
  }
  /* ---- кастомный курсор ---- */
  (function(){
    if(!window.matchMedia('(pointer:fine)').matches) return;
    var c=document.getElementById('cdot'), r=document.getElementById('cring');
    if(!c||!r) return;
    var x=-100,y=-100,rx=-100,ry=-100;
    document.addEventListener('mousemove',function(e){x=e.clientX;y=e.clientY;c.style.left=x+'px';c.style.top=y+'px';});
    (function loop(){rx+=(x-rx)*.16;ry+=(y-ry)*.16;r.style.left=rx+'px';r.style.top=ry+'px';requestAnimationFrame(loop);})();
    var hov=document.querySelectorAll('a,button,.obj,.ph,.fact');
    for(var i=0;i<hov.length;i++){(function(el){
      el.addEventListener('mouseenter',function(){r.classList.add('big')});
      el.addEventListener('mouseleave',function(){r.classList.remove('big')});
    })(hov[i]);}
  })();
  /* ---- формы ---- */
  function bindForm(formId,fields,okId){
    var f=document.getElementById(formId); if(!f) return;
    f.addEventListener('submit',function(e){
      e.preventDefault();
      var ok=true;
      fields.forEach(function(id){
        var el=document.getElementById(id);
        if(!el.value.trim()){ok=false;el.classList.add('err')}else{el.classList.remove('err')}
      });
      if(!ok) return;
      var om=document.getElementById(okId);
      if(om) om.style.display='block';
      f.reset();
      setTimeout(function(){if(om) om.style.display='none'},6000);
    });
  }
  bindForm('callForm',['cf-name','cf-tel'],'callOk');
  bindForm('revForm',['rv-name','rv-txt'],'revOk');
})();
