<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">

<head>

<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />

<title><?php echo ($page_seo["title"]); ?></title>

<meta name="keywords" content="<?php echo ($page_seo["keywords"]); ?>" />

<meta name="description" content="<?php echo ($page_seo["description"]); ?>" />

<link href="/css/bc_css.css?v=20171219" type="text/css" rel="stylesheet"/>

<link rel="apple-touch-icon" sizes="57x57" href="/apple-touch-icon-57x57.png">
<link rel="apple-touch-icon" sizes="60x60" href="/apple-touch-icon-60x60.png">
<link rel="apple-touch-icon" sizes="72x72" href="/apple-touch-icon-72x72.png">
<link rel="apple-touch-icon" sizes="76x76" href="/apple-touch-icon-76x76.png">
<link rel="apple-touch-icon" sizes="114x114" href="/apple-touch-icon-114x114.png">
<link rel="apple-touch-icon" sizes="120x120" href="/apple-touch-icon-120x120.png">
<link rel="apple-touch-icon" sizes="144x144" href="/apple-touch-icon-144x144.png">
<link rel="apple-touch-icon" sizes="152x152" href="/apple-touch-icon-152x152.png">
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon-180x180.png">

<link rel="stylesheet" href="/css/icon.css" type="text/css">

<script type="text/javascript" src="/js/jquery-1.11.0.min.js"></script>

<script src="/js/index.js" type="text/javascript"></script>

<link href="__STATIC__/css/card.min.css" rel="stylesheet"/>

<style id="table">.selectTdClass{background-color:#edf5fa !important}table.noBorderTable td,table.noBorderTable th,table.noBorderTable caption{border:1px dashed #ddd !important}table{
word-break: break-all;  margin-bottom:10px;border-collapse:collapse;display:table;}td,th{padding: 5px 10px;border: 1px solid #DDD;}caption{border:1px dashed #DDD;border-bottom:0;padding:3px;text-align:center;}th{border-top:1px solid #BBB;background-color:#F7F7F7;}table tr.firstRow th{border-top-width:2px;}.ue-table-interlace-color-single{ background-color: #fcfcfc; } .ue-table-interlace-color-double{ background-color: #f7faff; }td p{margin:0;padding:0;}
table a{ color:#3dc399; text-decoration:none;outline:none;}
</style>

<script type="text/javascript" src="/js/jquery.flexslider-min.js"></script>



<style type="text/css">
	.w_gn_jbj{
		width: 1157px;
	}
</style>
</head>




<body style="background:#f5f5f5">

<div class="w_head_bd">
   <div class="w_head">
     <div class="w_hea_le">
       <div class="w_logo w1"><a href="/" title="白菜网首页"><img src="/images/w_logo.png" title="白菜网首页" alt="白菜网首页"/></a></div>
       <div class="w_h_l1 w1"><a href="/" title="首页" <?php if(isset($bcid) && $bcid == '0'): ?>style="color: #3dc399;"<?php endif; ?>>首页</a></div>
       <div class="w_h_l2 w1">
        <a href="<?php echo U('book/index');?>" title="分类" class="w_h_12_a" >分类</a>
        <div class="w_l2_z" >
          <i class="w_xsj1"></i>
          
          <!--<ul>
		  <?php $item_cate = M("item_cate")->where('pid=0 and is_index=1')->select();?>
		  <?php if(is_array($item_cate)): $i = 0; $__LIST__ = $item_cate;if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$val): $mod = ($i % 2 );++$i;?><li>
                <?php if($val['cate_html'] != '' ): ?><img  src="http://img.baicaio.com//data/upload/item_cate/<?php echo ($val['img']); ?>"  style="position: absolute;margin: 15px;"/>
                    <a href="<?php echo str_replace('/c', '/', U('book/cate', array('cid'=>$val['cate_html']))) ?>" title="<?php echo ($val['name']); ?>" class="w_nav<?php echo ($i); ?>"><?php echo ($val['name']); ?></a>
                <?php else: ?>
                    <a href="<?php echo U('book/cate', array('cid'=>$val['id']));?>" title="<?php echo ($val['name']); ?>" class="w_nav<?php echo ($i); ?>"><?php echo ($val['name']); ?></a><?php endif; ?>
            </li><?php endforeach; endif; else: echo "" ;endif; ?>
          </ul>
          -->
            <ul>

      <?php $item_cate = M("item_cate")->where('pid=0 and status=1')->select();?>

      <?php if(is_array($item_cate)): $i = 0; $__LIST__ = $item_cate;if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$val): $mod = ($i % 2 );++$i;?><li>
            <?php if($val['cate_html'] != '' ): ?><a href="<?php echo str_replace('/c', '/', U('book/cate', array('cid'=>$val['cate_html']))) ?>" title="<?php echo ($val['name']); ?>" class="w_nav<?php echo ($i); ?>"><?php echo ($val['name']); ?></a>
                <?php else: ?>
                    <a href="<?php echo U('book/cate', array('cid'=>$val['id']));?>" title="<?php echo ($val['name']); ?>" class="w_nav<?php echo ($i); ?>"><?php echo ($val['name']); ?></a><?php endif; ?>

            </li><?php endforeach; endif; else: echo "" ;endif; ?>

          </ul>
        </div>
       </div>
       <div class="w_h_l3 w1"><a href="<?php echo U('book/gny',array('tp'=>'0'));?>" <?php if($tp == '0'): ?>style="color: #3dc399;"<?php endif; ?>  title="国内">国内</a></div>
       <div class="w_h_l4 w1"><a href="<?php echo U('book/gny',array('tp'=>'1'));?>" <?php if($tp == '1'): ?>style="color: #3dc399;"<?php endif; ?>  title="海淘">海淘</a></div>
       <div class="w_h_l5 w1"><a href="<?php echo U('book/index',array('tag'=>'9.9包邮'));?>" title="9.9包邮" <?php if($bcid==='best'): ?>style="color: #3dc399;"<?php endif; ?>>9.9包邮</a></div>
       <div class="w_h_l6 w1"><a href="<?php echo U('book/baicai');?>" style="color: #d62222;"  <?php if($tp == '2'): ?>style="color: #d62222;"<?php endif; ?> title="白菜">白菜</a></div>
       <div class="w_h_l7 w1"><a href="<?php echo U('article/index',array('id'=>10));?>" <?php if($bcid == 10): ?>style="color: #3dc399;"<?php endif; ?> title="晒单">晒单</a></div>
       
       <div class="w_h_l8 w1">
          <a href="javascript:;" title="其他" class="w_h_18_a">其他</a>
          <div class="w_xs2">
          <i class="w_xsj"></i>
          <ul>
        <!--    <li><a href="<?php echo U('zr/index');?>" title="闲置转让">闲置转让</a></li>-->
            <li><a href="<?php echo U('article/index',array('id'=>9));?>"  title="攻略">攻略</a></li>
            <li><a href="<?php echo U('tick/index');?>" title="优惠劵">优惠劵</a></li>
            <li><a href="<?php echo U('exchange/lucky');?>" title="抽奖专区">抽奖专区</a></li>
            <li><a href="<?php echo U('exchange/index');?>" title="礼品兑换">礼品兑换</a></li>
            <li><a href="<?php echo U('orig/index');?>" title="商城导航">商城导航</a></li>
          </ul>
          </div>
      </div>

            <form class="form_search" action="<?php echo U('search/index');?>"  method="get">
                 <button type="submit" class="btn_search icon-search"><!--[if lt IE 8]>Go<![endif]--></button>
                <input id="s" name="q" type="search" class="text_search" value="<?php if($strpos1): echo ($strpos1); else: ?>回血计划<?php endif; ?>" onblur="if(this.value==&#39;&#39;) {this.value=&#39;回血计划&#39;;this.style.color=&#39;#999&#39;;}" onfocus="if(this.value==&#39;回血计划&#39;) {this.value=&#39;&#39;;this.style.color=&#39;#333&#39;;}" style="color: rgb(153, 153, 153);" _hover-ignore="1">
            </form>
     </div>

     <div class="w_hea_rig lb_dw">

     <div class="lb_aa">
         <!--<a href="" title=""><img src="/images/xiaobiao2.png" alt="" /></a>-->
     </div>

           <div class="w_h_l8 w1">
               <a href="javascript:;" title="爆料" class="w_h_18_a bl_tx"><img style="width:20px; height:20px;"  src="/images/bl_t.png" alt="" /></a>
               <div class="w_xs2">
                   <i class="w_xsj"></i>
                   <ul>
                       <li><a href="<?php echo U('item/share_item');?>" title="我要爆料">我要爆料</a></li>
                       <li><a href="<?php echo U('article/publish',array('t'=>'gl'));?>" title="发表攻略">发表攻略</a></li>
                       <li><a href="<?php echo U('article/publish',array('t'=>'sd'));?>" title="我要晒单">我要晒单</a></li>
                       <li><a href="<?php echo U('zr/publish');?>" title="发布转让">发布转让</a></li>
                   </ul>
               </div>
           </div>

	 <?php if(!empty($visitor)): ?><div class="w_h_l8  w1">
             <a href="<?php echo U('user/index', array('uid'=>$visitor['id']));?>" title="用户名" class="w_h_18_a grtx_a"><img src="<?php echo avatar($visitor['id'],'32');?>" alt="个人头像" /></a>
             <span><?php echo ($visitor['username']); ?></span>

			 <div class="w_xs2">
                 <i class="w_xsj"></i>
                 <ul class="xiaoxs_a">
                     <li><a href="<?php echo U('message/system');?>" title="我的消息">我的消息</a><?php if((isset($visitor['message'])) AND ($visitor['message'] != 0)): ?><span><?php echo ($visitor['message']); ?></span><?php endif; ?></li>
                     <li><a href="<?php echo U('user/index', array('uid'=>$visitor['id']));?>" title="个人中心">个人中心</a></li>
                     <li><a href="<?php echo U('user/keysfollow');?>" title="我的关注">我的关注</a></li>
                     <li><a href="<?php echo U('user/publish');?>" title="我的文章">我的文章</a></li>
                     <li><a href="<?php echo U('user/logout');?>" title="安全退出">安全退出</a></li>
                 </ul>
             </div>
         </div>
         <div class="sxs" style="display: none;">
             <i class="gb"></i>
             <a href="<?php echo U('message/system');?>"><em></em>条新消息</a>
         </div>
     <!--<a href="<?php echo U('user/index', array('uid'=>$visitor['id']));?>" class="mb_name"><?php echo ($visitor["username"]); ?></a>
	 <a href="<?php echo U('user/logout');?>">退出</a>-->
	 <?php else: ?>
	 <a href="<?php echo U('user/index');?>" title="登录" class="w_dl">登录</a>|<a href="<?php echo U('user/register');?>" title="注册">注册</a><?php endif; ?>
	 </div>
   </div>
</div>
<div class="clear"></div>


<div class="w_bl_bd">

    <div class="w_zh_dq1">

	  <a href="/" title="首页">首页</a> > <?php echo ($strpos); ?>

	  <a style="float:right">共<font color="#FF0000"><?php echo ($count); ?></font>条记录</a>

	</div>

	<div class="w_gn_jbj">

	  <div class="w_gn_jbj_t">

<!--	   <span>共<i><?php echo ($count); ?></i>件相关商品</span> -->

	   <b>通过筛选您可以获得更准确的结果</b>

	   <ul>

	   <?php if($origid!=0): ?><li><a href="<?php echo ($orig_url); ?>" title="<?php echo ($orig); ?>"><?php echo ($orig); ?></a><a href="<?php echo ($orig_url); ?>" title="<?php echo ($orig); ?>" class="w_gnsc_x">x</a></li><?php endif; ?>

	   <?php if($cateid!=0): ?><li><a href="<?php echo ($cate_url); ?>" title="<?php echo ($cate); ?>"><?php echo ($cate); ?></a><a href="<?php echo ($cate_url); ?>" title="<?php echo ($cate); ?>" class="w_gnsc_x">x</a></li><?php endif; ?>

	   </ul>

	  </div>

	 

	  <div class="w_gn_jbj_n">

	    <b>分类筛选：</b>

		<?php
 $cate_id = M("item_cate")->where("pid=0")->order("ordid asc")->select(); ?>

		<ul id="cateid" style="height:27px; overflow:hidden" >

		<?php if(is_array($cate_id)): $i = 0; $__LIST__ = $cate_id;if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$r): $mod = ($i % 2 );++$i;?><li><a href="<?php echo U('book/cate',array('cid'=>$r['id']));?>" title="<?php echo ($r["name"]); ?>"><?php echo ($r["name"]); ?></a></li><?php endforeach; endif; else: echo "" ;endif; ?>

		</ul>

		<span class="w_zq_more" onclick="show($('#cateid'));" data="0">更多</span>

	  </div>

	 </div>



    <div class="w_dhxx" >

      <ul id="J_waterfall" data-uri="__ROOT__/?m=book&a=cate_ajax&cid=<?php echo ($cate_info["id"]); ?>&sort=<?php echo ($sort); ?>&min_price=<?php echo ($min_price); ?>&max_price=<?php echo ($max_price); ?>&p=<?php echo ($p); ?>">

	  <?php if(is_array($item_list)): $i = 0; $__LIST__ = $item_list;if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$item): $mod = ($i % 2 );++$i;?><li class="J_item wall_item" style="position:relative">

		 <a href="<?php echo U('item/index', array('id'=>$item['id']));?>" title="<?php echo ($item["title"]); ?>" target="_blank"><img src="<?php if($item['img']==''): ?>/images/nopic.jpg<?php else: ?> <?php if(preg_match('/img.baicaio.com/',$item['img'])): echo attach($item['img'],'item');?>!thumb270<?php else: echo attach($item['img'],'item'); endif; endif; ?>" title="<?php echo ($item["title"]); ?>" alt="<?php echo ($item["title"]); ?>" class="J_img J_decode_img"/></a>

		 <h2 style="word-wrap: break-word;"><a href="<?php echo U('item/index', array('id'=>$item['id']));?>" title="<?php echo ($item["title"]); ?>" target="_blank"><div class="title" style="overflow: hidden;height: 44px;line-height: 22px;font-size: 14px"><?php echo ($item["title"]); ?></div>
		 </a>
		 <div style="color:#d62222;overflow:hidden; height: 20px"><?php echo ($item["price"]); ?> </div>

		 

			<span style="height: 25px; position: absolute;top: 245px;right: 0;padding: 0 20px;background: rgba(255,255,255,0.7);"><a href="<?php echo U('orig/show',array('id'=>$item['orig_id']));?>" title="<?php echo getly($item['orig_id']);?>"><?php echo getly($item['orig_id']);?></a></span> 



		 </h2>

		 <div class="clear"></div>

		 

		<!-- 

		 <p class="w_p1" style="height:24px;"><span><a href="<?php echo U('space/index', array('uid'=>$item['uid']));?>"  target="_blank" data-uid="<?php echo ($item['uid']); ?>" class="J_card"><img src="<?php echo avatar($r['id'],24);?>" title="<?php echo ($item["username"]); ?>" alt="<?php echo ($item["username"]); ?>" class="ava"/> <?php echo ($item["uname"]); ?></a></span><a href="<?php echo U('orig/show',array('id'=>$item['orig_id']));?>" title="<?php echo getly($item['orig_id']);?>"><?php echo getly($item['orig_id']);?></a></p>-->

		 

			

		 

		 <p style="height:24px"><?php echo (mdate($item['add_time'])); ?></p>

		 <div class="w_nr3_div">

		  <div class="w_zzj_1">

				<?php $llink = unserialize($item['go_link']);$lc = count($llink);?>

				<?php if(is_array($llink)): $j = 0; $__LIST__ = $llink;if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$rm): $mod = ($j % 2 );++$j; if($j == 1): ?><a href="__ROOT__/?m=item&a=tgo&to=<?php echo shortUrl($rm['link']);?>" title="<?php echo ($rm["title"]); ?>" class="w_zdlj_a" target="_blank" rel="nofollow" ><i class="<?php if($lc > 1): ?>w_down<?php else: ?>w_right<?php endif; ?>"></i><?php echo ($rm["name"]); ?></a><?php endif; endforeach; endif; else: echo "" ;endif; ?>

				<?php if($lc > 1): ?><ul>

				<?php if(is_array($llink)): $m = 0; $__LIST__ = $llink;if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$rm): $mod = ($m % 2 );++$m;?><li><a href="__ROOT__/?m=item&a=tgo&to=<?php echo shortUrl($rm['link']);?>" target="_blank" rel="nofollow"  title="<?php echo ($rm["title"]); ?>" ><?php echo ($rm["name"]); ?></a></li><?php endforeach; endif; else: echo "" ;endif; ?>

              </ul><?php endif; ?>

			</div>

		  <div class="w_f2nr1_le"><a href="javascript:void(0)" onclick="jz_submit_click(this)" title="赞" class="w_z_1 Jz_submit" data="<?php echo ($item["id"]); ?>"  data-t="item"><?php echo ($item["zan"]); ?></a><a href="javascript:;" title="<?php echo ($item["title"]); ?>"  class="w_z_2 Jl_likes" data-id="<?php echo ($item["id"]); ?>" data-xid="1"><?php echo ($item["likes"]); ?></a><a href="<?php echo U('item/index', array('id'=>$item['id']));?>" title="<?php echo ($item["title"]); ?>"  class="w_z_3" target="_blank"><?php echo ($item["comments"]); ?></a></div>

		 </div>

	   </li><?php endforeach; endif; else: echo "" ;endif; ?>

<script>

$(document).ready(function(e) {

 $(".w_zzj_1").hover(

	  function () {

		$(this).find("i").addClass("w_up").removeClass("w_down");

		$(this).children("ul").show();					

	  },

	  function () {

		$(this).find("i").addClass("w_down").removeClass("w_up");

		$(this).children("ul").hide("");

	  }

	); 

}) 

</script>



	  </ul>

	<div class="w_pag" id="J_wall_page"><?php echo ($page_bar); ?></div>

	</div>   

</div>

<script>
function show(obj){

	if($(this).attr('data')==0){

		obj.css('height','auto');

		$(this).attr('data','1');

	}else{

		obj.css('height','27px');

		$(this).attr('data','0');

	}

}

		</script>

<div class="clear"></div>
<!--bottom-->
<div class="w_bot_bd">
  <div class="w_bot">
   <!-- <div class="w_ewm"><img src="/images/w_erm.jpg" title="" alt=""/></div> -->
   
   
   <!--
   <div class="w_bot_1">
   
    <?php $tag_article_class = new articleTag;$about_nav = $tag_article_class->cate(array('type'=>'cate','cateid'=>'1','return'=>'about_nav','cache'=>'0',)); if(is_array($about_nav)): $i = 0; $__LIST__ = $about_nav;if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$val): $mod = ($i % 2 );++$i;?><a href="<?php echo U('aboutus/index', array('id'=>$val['id']));?>" title="<?php echo ($val["name"]); ?>"><?php echo ($val["name"]); ?></a><?php endforeach; endif; else: echo "" ;endif; ?>
    
   </div> 
     -->
      
   <!--<div class="w_bot_3" style="margin-top:0;padding-top: 33px;">
     <p>版权所有&copy;白菜哦-高性价比海淘购物推荐 所有资讯均受著作权保护，未经许可不得使用，不得转载、摘编。 湘ICP备13002285号 <a href="<?php echo U('sitemap/index');?>" title="网站地图">网站地图</a>&nbsp;<a href="<?php echo U('aboutus/index', array('id'=>$val['id']));?>" title="关于我们">关于我们</a> <em>
   <script src="http://s13.cnzz.com/stat.php?id=3738275&web_id=3738275" language="JavaScript"></script>
  <script type="text/javascript">
    var _bdhmProtocol = (("https:" == document.location.protocol) ? " https://" : " http://");
    document.write(unescape("%3Cscript src='" + _bdhmProtocol + "hm.baidu.com/h.js%3F49113e6b733eb50457f8170c967ff321' type='text/javascript'%3E%3C/script%3E"));
    </script>
    </em><img src="/images/gan.png" alt="公安备案">湘公网安备 43011102000623号
    </p>
   </div>   -->  
   <div class="w_bot_3" style="margin-top:0;padding-top: 33px;">
     <p><a href="<?php echo U('sitemap/index');?>" title="网站地图">网站地图</a>&nbsp;<a href="<?php echo U('aboutus/index', array('id'=>$val['id']));?>" title="关于我们">关于我们</a> <em>
   <script src="http://s13.cnzz.com/stat.php?id=3738275&web_id=3738275" language="JavaScript"></script>
      <script type="text/javascript">
    (function(win,doc){
        var s = doc.createElement("script"), h = doc.getElementsByTagName("head")[0];
        if (!win.alimamatk_show) {
            s.charset = "gbk";
            s.async = true;
            s.src = "https://alimama.alicdn.com/tkapi.js";
            h.insertBefore(s, h.firstChild);
        };
        var o = {
            pid: "mm_27883119_3410238_93410083",/*推广单元ID，用于区分不同的推广渠道*/
            appkey: "",/*通过TOP平台申请的appkey，设置后引导成交会关联appkey*/
            unid: "",/*自定义统计字段*/
            type: "click" /* click 组件的入口标志 （使用click组件必设）*/
        };
        win.alimamatk_onload = win.alimamatk_onload || [];
        win.alimamatk_onload.push(o);
    })(window,document);
</script>
   <!--
   <script type="text/javascript">
    var _bdhmProtocol = (("https:" == document.location.protocol) ? " https://" : " http://");
    document.write(unescape("%3Cscript src='" + _bdhmProtocol + "hm.baidu.com/h.js%3F49113e6b733eb50457f8170c967ff321' type='text/javascript'%3E%3C/script%3E"));
    </script>
    -->
    <script src=" http://hm.baidu.com/h.js?49113e6b733eb50457f8170c967ff321" type="text/javascript"></script>
    </em></p>
     <p>版权所有&copy;白菜哦-高性价比海淘购物推荐 所有资讯均受著作权保护，未经许可不得使用，不得转载、摘编。 <a href="http://www.miibeian.gov.cn" rel=nofollow>湘ICP备13002285号</a><img src="/images/gan.png" alt="公安备案">湘公网安备 43011102000623号</p>
   </div>                                                      
  </div>
</div>

<div class="l_ewm">
  <span>二维码</span>
  <div class="l_ewm_img"><img src="/images/w_erm.jpg" title="" alt=""/></div>
</div>

<div class="wtfk">
<a class="wtfk_a" href="/aboutus-index-id-15" title="问题反馈">问题反馈</a>
</div>

<div class="actGotop">
    <a href="javascript:;" title="返回顶部"></a>
</div>
<div class="tipbox " style="z-index: 3001; left: 40%; top: 323.126px; "><div class="tip-l"></div><div class="tip-c"></div><div class="tip-r"></div></div>
<!--返回顶部begin-->
<script type="text/javascript">
$(function () {
	$(window).scroll(function () {
		if ($(window).scrollTop() >= 100) {
			$('.actGotop').fadeIn(300);
		} else {
			$('.actGotop').fadeOut(300);
		}
		//顶部滚动
		if($(document).scrollTop()>0){
			$(".w_head_bd").css({"position":"fixed", "top":"0", "z-index":"1200"});
		}else{
			$(".w_head_bd").css({"position":"", "top":"", "z-index":""});
		}
	});
	$('.actGotop').click(function () {
		$('html,body').animate({ scrollTop: '0px' }, 800);
	});
});

var PINER = {
    root: "__ROOT__",
    uid: "<?php echo $visitor['id'];?>", 
    async_sendmail: "<?php echo $async_sendmail;?>",
    config: {
        wall_distance: "<?php echo C('pin_wall_distance');?>",
        wall_spage_max: "<?php echo C('pin_wall_spage_max');?>"
    },
    //URL
    url: {}
};

var t = null;

t = setInterval(function(){
    if(PINER.uid==""){
        return false;
    }
    $.get(PINER.root+'/?m=user&a=messg',function(result){
        if(result.msg>0){
        $('.sxs em').html(result.msg);
            $('.sxs').show();
        }
    },'json');

},10000);

$('.sxs .gb').click(function(){
    $('.sxs').hide();
})
</script>


<script src="/js/function.js"></script>

<script src="/static/js/lhg/lhgdialog.min.js?self=true&skin=idialog" type="text/javascript"></script>

</body>

</html>