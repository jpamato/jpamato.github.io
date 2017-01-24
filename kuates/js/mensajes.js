var archivos = [];
$(function(){


	var users = localStorage.getItem("users");	
	users = JSON.parse(users);
	var backers = $.grep(users, function(e){ return e.userType == "backer"; });
	//console.log(backers);

	$("#filter").keyup(function(){

		// Retrieve the input field text and reset the count to zero
		var filter = $(this).val(), count = 0;
		filter = filter.toLowerCase();

		var backersSel = $.grep(backers, function(e){
			return e.nombre.toLowerCase().startsWith(filter)&&filter!="";
		});

		var html = "";
		for(var i=0;i<backersSel.length;i++){
			html+= '<li class="destItem" name="'+backersSel[i]["userID"]+'"><img class="w3-circle" style="width:30px;height:30px;" src="'+backersSel[i]["avatar"]+'"/><span style="font-size:24px;">'+backersSel[i]["nombre"]+'</span></li>';
		}		
		$("#destSel").html(html);

		$(".destItem").unbind('click').click( function(){
			//console.log($(this).attr('name'));
			$( "#destinatario" ).show();
			var html = '<div id="destinatario"></div>';
			$( "#messageTo" ).append(html);
			$(this).children().appendTo( "#destinatario" );
			html = '<span onclick="delDest(this)" class="w3-closebtn">&times;</span>';
			$( "#destinatario" ).append(html);
			$(".lineInput").hide();
			$( "#destSel" ).html("");
		});
	});

		

	
	$(".ownAvatar").find("img").attr("src",localStorage.getItem("avatar"));

	$("#comentar").unbind('click').click( function(){
		var text = $("#toComment").find('textarea').val();
		console.log(text);

		$('#thumbCont').find( "li" ).each(function() {
  			if($( this ).hasClass("photo")){
				var src = 
				console.log("photo");
			}else if($( this ).hasClass("video")){
				console.log("video");
			}else if($( this ).hasClass("doc")){
				console.log("doc");
			}

		});

		//$('#thumbCont').find(".thumbDelete").html("&#8595;");
		//$('#thumbCont').find(".thumbDelete").attr("onclick","download(this)");
		var thumbs = $('#thumbCont').html();
		
		console.log(thumbs);

		var html="<div class='comment'><div class='w3-row w3-container'>"+
			"<div class='w3-col l10 m10 s10' style='text-align:left;padding: 10px 5px;'>"+
				"<div style='border:solid 1px #aaa;width:98%;background-color: #eee;padding: 0px 5px 0px 10px;'>"+
				"<p>"+text+"</p></div></div>"+
				"<div class='w3-col l1 m1 s1 avatar ownAvatar'><div class='w3-circle left' style='width:50px;height:50px;overflow: hidden;margin:auto;margin-top:6px;'><img width='50px' src="+localStorage.getItem("avatar")+"></div></div>"+
				"<br><div class='thumbs'>"+thumbs+"</div></div>";	
		
		$("#chatCont").append(html);
		$("#chatCont").scrollTop($("#chatCont").height());
		$('#thumbCont').html("");
		$("#toComment").find('textarea').val("");
	});

	$("#chatCont").scrollTop($("#chatCont").height());

	$(".odd").unbind('click').click( function(){
			$("#conv2").hide();		
			$("#conv1").show();
			$("#chatCont").scrollTop($("#chatCont").height());
	});

	$(".even").unbind('click').click( function(){
			$("#conv1").hide();		
			$("#conv2").show();
			$("#chatCont").scrollTop($("#chatCont").height());			
	});

	$("#inputPhoto").change(function() {
		archivos[this.files[0].name]=this.files[0];
		console.log(archivos);
		renderImage(this.files[0],"photo");
	});
	$("#inputVideo").change(function() {
		archivos[this.files[0].name]=this.files[0];
		console.log(archivos);
		renderImage(this.files[0],"video");
	});
	$("#inputDoc").change(function() {
		archivos[this.files[0].name]=this.files[0];
		console.log(archivos);
		renderImage(this.files[0],"doc");
	});
});

function delDest(e){
	$(".lineInput").show();
	e.parentElement.parentElement.removeChild(e.parentElement);
	$("#filter").val("");
}

function GetUrlValue(varsearch){
	var searchstring = window.location.search.substring(1);
	var variablearray = searchstring.split('&');
	for(var i = 0; i < variablearray.length; i++){
		var keyvaluepair = variablearray[i].split('=');
		if(keyvaluepair[0] == varsearch){
			return keyvaluepair[1];
		}
	}
}

function getDate(day,month,year){
	var html = '<div id="day" style="width: auto;">'+day+'</div>/';	
	html+='<div id="month" style="width: auto;">'+month+'</div>/';
	html+='<div id="year" style="width: auto;">'+year+'</div>';		
	return html;
}

function renderImage(file,type) {
    	var fileURL = URL.createObjectURL(file);
	var ext =file.name.split('.').pop().toLowerCase();
	var html =  $('#thumbCont').html();
	//console.log(file.type);

	if(type=="photo" && $.inArray(ext, ['gif','png','jpg','jpeg']) > -1) {
		html += '<li class="photo" title='+file.name+' style="display: inline-block; height: 75px; width: 100px; z-index: 0;">'+
		'<div class="w3-panel" style="background-image: url('+fileURL+');cursor:pointer;background-size:100%;height:100%;background-repeat:no-repeat;">'+
		'<span onclick="deleteThumb(this)" class="w3-closebtn w3-grey thumbDelete">×</span></div></li>';
		$('#thumbCont').html(html);

	}else if(type=="video" && $.inArray(ext, ['mp4']) > -1) {

		html += '<li class="video" title='+file.name+' style="display: inline-block; height: 75px; width: 100px; z-index: 0;">'+
		'<div class="w3-panel" style="padding:0px">'+		
		'<video width=100px height=75px src='+fileURL+' "video/mp4" controls style="margin-top:-9px;"></video>'+
		'<span onclick="deleteThumb(this)" class="w3-closebtn w3-grey thumbDelete" style="position:absolute;margin-left:-24px">×</span></li>';

	}else if(type=="doc") {
		html += '<li class="doc" title='+file.name+' style="display: inline-block; height: 75px; width: 100px; z-index: 0;">'+
		'<div class="w3-panel" style="background-image: url(img/doc.png); cursor: pointer; background-size: 100% 64px; height: 100%; background-repeat: no-repeat;">'+
		'<span onclick="deleteThumb(this)" class="w3-closebtn w3-grey thumbDelete">×</span></div>'+
		'<span style="font-size: 10px;position: absolute;left: 0px;bottom: 0px;z-index: 1;width: 100px;color: white;background-color: rgba(0,0,0,0.5);">'+file.name+'</SPAN></li>';		
		$('#thumbCont').html(html);
	}

	$('#thumbCont').html(html);
}

function deleteThumb(e){
	var filename = e.parentNode.parentNode.title;
	delete archivos[filename];
	e.parentNode.parentNode.parentNode.removeChild(e.parentNode.parentNode);
}

function download(e){

	var url = e.parentNode.style.backgroundImage;
	/*console.log(url);
	var a = $("<a>").attr("href", url).attr("download", "download.png").appendTo("body");

	a[0].click();
	a.remove();*/
	publish(url,"download.jpg");
}

function publish(data, filename) {

    if (!window.BlobBuilder && window.WebKitBlobBuilder) {
        window.BlobBuilder = window.WebKitBlobBuilder;
    }

    fs.root.getFile(filename, {
        create: true
    }, function (fileEntry) {

        // Create a FileWriter object for our FileEntry (log.txt).
        fileEntry.createWriter(function (fileWriter) {

            fileWriter.onwriteend = function (e) {
                console.log('Write completed.');
            };

            fileWriter.onerror = function (e) {
                console.log('Write failed: ' + e.toString());
            };

            var builder = new BlobBuilder();
            builder.append(data);
            var blob = builder.getBlob();
            fileWriter.write(blob);

        }, errorHandler);

    }, errorHandler);
}
