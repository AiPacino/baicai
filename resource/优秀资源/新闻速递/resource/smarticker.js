
(function(d){function m(){var b=d("script:first"),a=b.css("color"),c=false;if(/^rgba/.test(a))c=true;else try{c=a!=b.css("color","rgba(0, 0, 0, 0.5)").css("color");b.css("color",a)}catch(e){}return c}function j(b,a,c){var e="rgb"+(d.support.rgba?"a":"")+"("+parseInt(b[0]+c*(a[0]-b[0]),10)+","+parseInt(b[1]+c*(a[1]-b[1]),10)+","+parseInt(b[2]+c*(a[2]-b[2]),10);if(d.support.rgba)e+=","+(b&&a?parseFloat(b[3]+c*(a[3]-b[3])):1);e+=")";return e}function g(b){var a,c;if(a=/#([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})/.exec(b))c=
[parseInt(a[1],16),parseInt(a[2],16),parseInt(a[3],16),1];else if(a=/#([0-9a-fA-F])([0-9a-fA-F])([0-9a-fA-F])/.exec(b))c=[parseInt(a[1],16)*17,parseInt(a[2],16)*17,parseInt(a[3],16)*17,1];else if(a=/rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(b))c=[parseInt(a[1]),parseInt(a[2]),parseInt(a[3]),1];else if(a=/rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9\.]*)\s*\)/.exec(b))c=[parseInt(a[1],10),parseInt(a[2],10),parseInt(a[3],10),parseFloat(a[4])];return c}
d.extend(true,d,{support:{rgba:m()}});var k=["color","backgroundColor","borderBottomColor","borderLeftColor","borderRightColor","borderTopColor","outlineColor"];d.each(k,function(b,a){d.Tween.propHooks[a]={get:function(c){return d(c.elem).css(a)},set:function(c){var e=c.elem.style,i=g(d(c.elem).css(a)),h=g(c.end);c.run=function(f){e[a]=j(i,h,f)}}}});d.Tween.propHooks.borderColor={set:function(b){var a=b.elem.style,c=[],e=k.slice(2,6);d.each(e,function(h,f){c[f]=g(d(b.elem).css(f))});var i=g(b.end);
b.run=function(h){d.each(e,function(f,l){a[l]=j(c[l],i,h)})}}}})(jQuery);


(function(e){e.fn.smarticker=function(t){var n=e.extend({},e.fn.smarticker.defaults,t);return this.each(function(t){function h(t,n){var r=[];e.each(t,function(t,i){if(e.inArray(e(i).data(n),r)==-1&&e(i).data(n)!=undefined)r.push(e(i).data(n))});return p(r)}function p(e){for(var t,n,r=e.length;r;t=parseInt(Math.random()*r),n=e[--r],e[r]=e[t],e[t]=n);return e}function d(){if(n.category==false){v()}else{e(".active-ag",r).removeClass("active-ag");var t=e(".newsholder li",r).eq(u).data("category");t=e(".smarticker-category ul li",r).index(e('.smarticker-category ul li[data-category="'+t+'"]',r));e(".smarticker-category ul li",r).eq(t).addClass("active-ag");t=e(".active-ag",r);e(".smarticker-category",r).animate({scrollTop:t.offset().top-t.parent().offset().top+t.parent().scrollTop()},n.speed-n.speed/2.5,function(){if(n.subcategory!=false){v()}else{m()}var t=e(".newsholder",r).find("li").eq(u).data("color");if(t!=undefined&&n.catcolor!=false){e(".active-ag a",r).stop().animate({color:"#"+t},n.speed-n.speed/2.5)}else e(".active-ag a",r).stop().animate({color:"#999"},n.speed-n.speed/2.5)})}}function v(){if(n.subcategory==false){m();return false}e(".active-cat",r).removeClass("active-cat");var t=e(".newsholder li",r).eq(u).data("subcategory");t=e(".smarticker-cats li",r).index(e('.smarticker-cats li[data-subcategory="'+t+'"]',r));e(".smarticker-cats ul li",r).eq(t).addClass("active-cat");t=e(".active-cat",r);var i=t.parent();if(e(".catlist",r).length>0)i=e(".catlist",r);else i=e(".smarticker-cats",r);i.animate({scrollTop:Math.max(t.offset().top-i.offset().top+i.scrollTop(),0)},n.speed-n.speed/2.5,m);var s=e(".newsholder",r).find("li").eq(u).data("color");if(s!=undefined&&n.subcatcolor!=false){e(".smarticker-cats li",r).animate({backgroundColor:"#"+s},n.speed-n.speed/2.5)}else e(".smarticker-cats li",r).animate({backgroundColor:"#c3c3c3"},n.speed-n.speed/2.5)}function m(){e(".newsholder",r).css({display:"block",height:"100%"});f.css("width","100%").animate({width:0},n.pausetime);if(n.animation=="default"){if(e(".activeRollerItem",r).length>0){var t=e(".activeRollerItem",r);t.animate({top:-25,opacity:0},n.speed-n.speed/1.2,function(){t.css("display","none")}).removeClass("activeRollerItem")}var i=e(".newsholder",r).find("li").eq(u).addClass("activeRollerItem");i.css({top:"25px",display:"block"}).animate({opacity:1,top:0},n.speed-n.speed/2.5,function(){u++;if(u==e(".newsholder",r).find("li").length)u=0;nextInterval=setTimeout(d,n.pausetime)})}if(n.animation=="slide"){if(e(".activeRollerItem",r).length>0){t=e(".activeRollerItem",r);t.animate({left:250,opacity:0},n.speed-n.speed/1.5,function(){t.css("display","none")}).removeClass("activeRollerItem")}var i=e(".newsholder li",r).eq(u).addClass("activeRollerItem");i.css({left:"-150px",display:"block",opacity:"1"}).animate({opacity:1,left:10},n.speed-n.speed/3,function(){u++;if(u==e(".newsholder li",r).length)u=0;nextInterval=setTimeout(d,n.pausetime)})}if(n.animation=="fade"){if(e(".activeRollerItem",r).length>0){t=e(".activeRollerItem",r);t.fadeOut(n.speed/2,function(){t.removeClass("activeRollerItem")})}var i=e(".newsholder li",r).eq(u).addClass("activeRollerItem");i.css({top:"0",display:"none"}).fadeIn(n.speed/2,function(){u++;if(u==e(".newsholder li",r).length)u=0;nextInterval=setTimeout(d,n.pausetime)})}if(n.animation=="typing"){if(e(".activeRollerItem",r).length>0){t=e(".activeRollerItem",r);var s=e('<div class="hider"></div>');s.prependTo(e(".smarticker-news",r)).css({width:"0px",left:"0px",height:"100%",position:"absolute","background-color":r.css("background-color"),"z-index":"2"});s.animate({width:t.width()+30},n.speed,function(){t.fadeOut(100,function(){t.css("opacity","0").removeClass("activeRollerItem");s.fadeOut(100,function(){var t=e(".newsholder li",r).eq(u).addClass("activeRollerItem").css({display:"block",opacity:"1"});s.remove();var i=e('<div class="cover"><div class="flasher">_</div></div>');i.prependTo(e(".smarticker-news",r));i.css({"background-color":r.css("background-color")});i.animate({left:t.width()+30},t.width()*8,function(){i.remove();u++;if(u==e(".newsholder li",r).length)u=0;nextInterval=setTimeout(d,n.pausetime)})})})})}else{var i=e(".newsholder li",r).eq(u).addClass("activeRollerItem").css({display:"block",opacity:"1"});var o=e('<div class="cover"><div class="flasher">_</div></div>');o.prependTo(e(".smarticker-news",r));o.css({"background-color":r.css("background-color")});o.animate({left:i.width()+30},i.width()*8,function(){o.remove();if(c==0){u++;if(u==e(".newsholder li",r).length)u=0;nextInterval=setTimeout(d,n.pausetime)}})}}}var r=e(this);var i=e("li",r);var s=e('<div class="smarticker-cats"><ul></ul></div>');var o=e('<div class="smarticker-category"><ul></ul></div>');var u=n.startindex;var a=e('<div class="smart-controller"><span class="prev-news">Previous</span><span class="next-news">Next</span></div>');var f=e('<div class="progress-bar"></div>');var l=e('<div class="sec1-2 tickertitle"></div>');var c=0;r.addClass("smarticker").wrapInner('<div class="smarticker-news"></div>');if(h(i,"subcategory").length<1)n.subcategory=false;if(h(i,"category").length<1)n.category=false;if(n.subcategory==true){s.prependTo(r).addClass("sec1-2");e.each(h(i,"subcategory"),function(e,t){s.find("ul").append('<li data-subcategory="'+t+'"><a>'+t+"</a></li>")});if(n.theme==1||n.theme==2){s.find("ul").wrap('<div class="catlist"></div>');s.append('<span class="right"></span>').prepend('<span class="left"></span>')}}if(n.category==true&&h(i,"category").length>0){o.prependTo(r).addClass("sec1-2");e.each(h(i,"category"),function(e,t){o.find("ul").append('<li data-category="'+t+'"><a>'+t+"</a></li>")})}if(n.progressbar==true)f.appendTo(e(".smarticker-news",r));if(n.controller==true)a.appendTo(e(".smarticker-news",r));if(n.category==false)r.addClass("no-category");if(n.subcategory==false)r.addClass("no-subcategory");r.addClass("theme"+n.theme);r.addClass("box size1");r.addClass("c"+n.controllertype);e(".smarticker-news",r).addClass("sec7 newsholder hidden");e(".smarticker-news > ul",r).attr("id","newsholder").addClass("newsholder hidden");if(n.rounded==true)r.addClass("rounded");if(n.direction=="rtl")r.addClass("rtl");if(n.border==true)r.addClass("border");if(n.shadow==true)r.addClass("shadow");if(n.category==false||n.subcategory==false){e(".smarticker-news",r).removeClass("sec7").addClass("sec10")}if(n.category==false&&n.subcategory==false&&n.titlesection==true){e(".smarticker-news",r).removeClass("sec7").addClass("sec10");l.prependTo(r).text(n.title)}d()})};e.fn.smarticker.defaults={theme:1,animation:"default",speed:1e3,startindex:0,pausetime:3e3,rounded:false,shadow:true,border:false,category:true,subcategory:true,titlesection:true,title:"Headlines",progressbar:false,catcolor:true,subcatcolor:true}})(jQuery)


$(".smarticker1").smarticker({
	title:"头条1"
});

$(".smarticker2").smarticker({
	theme:2,
	title:"新闻1",
	speed:2e3,
	pausetime:4e3
});

$(".smarticker3").smarticker({
	theme:4,
	speed:1500,
	pausetime:3600,
	title:"最新动态",
	rounded:true,
	animation:"typing"
});

$(".smarticker4").smarticker({
	theme:2,
	rounded:true,
	animation:"fade",
	speed:2500
});

$(".smarticker5").smarticker();

$(".smarticker6").smarticker({
	theme:2,
	animation:"typing",
	speed:2e3,
	pausetime:5e3,
	rounded:true,
	catcolor:false
});

$(".smarticker7").smarticker({
	theme:3,
	animation:"slide",
	speed:1e3,
	progressbar:true
});

$(".smarticker8").smarticker({
	theme:4,
	animation:"slide",
	speed:2e3,
	rounded:true
})