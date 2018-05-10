<?php if (!defined('THINK_PATH')) exit();?><!--添加商品来源分类-->
<div class="dialog_content">
	<form id="info_form" name="info_form" action="<?php echo u('item_orig/add');?>" method="post">
	<table width="100%" cellpadding="2" cellspacing="1" class="table_form">
		<tr>
			<th width="100">来源名称 :</th>
			<td><input type="text" name="name" id="name" class="input-text" size="30"></td>
		</tr>
        <tr>
			<th width="100">链接地址 :</th>
			<td><input type="text" name="url" id="url" class="input-text" size="30"></td>
		</tr>
		<tr>
			<th>缩略图片 :</th>
			<td>
                <input type="text" name="img" id="J_img" class="input-text fl mr10" size="30">
            	<div id="J_upload_img" class="upload_btn"><span><?php echo L('upload');?></span></div>
			</td>
		</tr>
		<tr>
			<th width="100">国内（外） :</th>
			<td>
			<select name="ismy">
			<option value="0">国内</option>
			<option value="1">海淘</option>
			</select></td>
		</tr>
		<tr>
			<th>热门</th>
			<td>
               <label><input type="radio" name="is_hot" value="1" checked> 是</label> <label><input type="radio" name="is_hot" value="0"> 否</label>
			</td>
		</tr>
		<tr>
			<th>描述 :</th>
			<td>
               <textarea name="intro" cols="50" rows="4"></textarea>
			</td>
		</tr>
		<tr>
			<th>口碑指数 :</th>
			<td>
               <input type="text" name="kb" class="input-text fl mr10" size="30" placeholder="5.0">
			</td>
		</tr>
		<tr>
			<th>商品质量 :</th>
			<td>
               <input type="text" name="fwzl" class="input-text fl mr10" size="30" placeholder="5星">
			</td>
		</tr>
		<tr>
			<th>服务配送 :</th>
			<td>
               <input type="text" name="fwps" class="input-text fl mr10" size="30" placeholder="5星">
			</td>
		</tr>
		<tr>
			<th>客户服务 :</th>
			<td>
               <input type="text" name="khfw" class="input-text fl mr10" size="30" placeholder="5星">
			</td>
		</tr>
	</table>
	</form>
</div>
<script src="__STATIC__/js/fileuploader.js"></script>
<script>
var check_name_url = "<?php echo U('item_orig/ajax_check_name');?>";
$(function(){
	$.formValidator.initConfig({formid:"info_form",autotip:true});
	$("#name").formValidator({onshow:lang.please_input+'来源名称',onfocus:lang.please_input+'来源名称'}).inputValidator({min:1,onerror:lang.please_input+'来源名称'}).ajaxValidator({
	    type : "get",
		url : check_name_url,
		datatype : "json",
		async:'false',
		success : function(result){	
            if(result.status == 0){
                return false;
			}else{
                return true;
			}
		},
		onerror : lang.flink_cate_already_exists,
		onwait : lang.connecting_please_wait
	});
	
	$('#info_form').ajaxForm({success:complate,dataType:'json'});
	function complate(result){
		if(result.status == 1){
			$.dialog.get(result.dialog).close();
			$.pinphp.tip({content:result.msg});
			window.location.reload();
		} else {
			$.pinphp.tip({content:result.msg, icon:'alert'});
		}
	}
	
	//上传图片
    var uploader = new qq.FileUploaderBasic({
    	allowedExtensions: ['jpg','gif','jpeg','png','bmp','pdg'],
        button: document.getElementById('J_upload_img'),
        multiple: false,
        action: "<?php echo U('item_orig/ajax_upload_img');?>",
        inputName: 'img',
        forceMultipart: true, //用$_FILES
        messages: {
        	typeError: lang.upload_type_error,
        	sizeError: lang.upload_size_error,
        	minSizeError: lang.upload_minsize_error,
        	emptyError: lang.upload_empty_error,
        	noFilesError: lang.upload_nofile_error,
        	onLeave: lang.upload_onLeave
        },
        showMessage: function(message){
        	$.pinphp.tip({content:message, icon:'error'});
        },
        onSubmit: function(id, fileName){
        	$('#J_upload_img').addClass('btn_disabled').find('span').text(lang.uploading);
        },
        onComplete: function(id, fileName, result){
        	$('#J_upload_img').removeClass('btn_disabled').find('span').text(lang.upload);
            if(result.status == '1'){
        		$('#J_img').val(result.data);
        	} else {
        		$.pinphp.tip({content:result.msg, icon:'error'});
        	}
        }
    });
});
</script>