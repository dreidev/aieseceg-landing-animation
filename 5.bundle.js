(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{11:function(e,t){(window.scenes||{}).leadership=function(e){var t=window.TweenMax,a=(window.Draggable,window.CubicBezier,window.Power1,window.Back),i=(window.Elastic,window.Linear,window.objects),s=window.tweens,n=e.s,o=e.timeline,d=e.startOffset,l=e.startLabel,r=e.scene,p=e.vbWidth,c=e.vbHeight;o.add("leadership",l+"+="+d);var w=r.sideman||i.make.sideman({color:"#fff"}),h=i.make.key(),f=i.make.hand(),x=r.stick=i.make.stick(),y=r.death,m=r.enviroment,u=r.poverty,k=r.illiteracy;r.add(x,h,w),t.set(f.node,{x:p/2-1200,y:c/2-800,scale:-.6,opacity:0}),t.set(h.node,{x:p+230,y:2*c,opacity:0,scale:.6}),o.fromTo(x.node,.2,{opacity:0},{opacity:1,scaleX:.58,x:p/2+540,y:c/2-210},"leadership");var v=r.lastText||n.g(),T=i.make.multilineText(["We believe Leadership","is the fundemental solution","for positive change"],70,i.textStyle3);T=r.lastText=n.g(T),t.set(T.node,{x:p-370,y:c/2-650}),o.add(s.slideInOut(v,T,250,a.easeInOut,.5),"leadership"),o.to(x.node,.4,{opacity:1,scaleX:.57,x:p/2+258,y:c/2-92},"leadership+=3.5"),v=r.lastText,T=i.make.multilineText(["And it can be","developed in anyone"],50,i.textStyle3),T=r.lastText=n.g(T),t.set(T.node,{x:p-350}),o.add(s.slideInOut(v,T,170,a.easeInOut,.5),"leadership+=4"),o.to(h.node,1,{opacity:1,y:c/2+100},"leadership").to(h.node,.5,{bezier:{curviness:1.25,values:[{x:"-=100",y:"+=150"},{x:"-=420",y:"+=110"}]},ease:a.easeIn},"leadership+=3.5").to(h.node,.3,{scale:0},"leadership+=3.8"),o.add(s.powerup(w),"leadership+=4.1");var g=[m.node,u.node,k.node];o.to(g,.4,{rotation:"-=0.27",transformOrigin:"50% 100%",ease:a.easeIn},"leadership+=4.1"),o.to(y.node,.4,{rotation:"-=0.6",transformOrigin:"50% 100%",ease:a.easeIn},"leadership+=4.1"),o.to(w.parts,.2,{fill:"#0079fa"},"leadership+=4.3"),o.to(x.node,.4,{scaleX:.74,x:p/2+540,y:c/2-92},"leadership+=6"),v=r.lastText,T=i.make.multilineText(["AIESEC seeks to develop these","Leadership characteristics","in youth"],50,{fill:"#fff",stroke:"none","text-anchor":"end","font-size":"50px","font-family":"'Lato', Arial, sans-serif","font-style":"normal","font-weight":"300"}),T=r.lastText=n.g(T);var b=r.stickText=n.g(T);return t.set(T.node,{x:p-30,y:c/2-230}),o.to(x.node,.1,{opacity:1},"leadership+=6"),o.add(s.slideInOut(v,b,300,a.easeInOut,.5),"leadership+=6"),r.lastText=T,e.startOffset=1,e}}}]);