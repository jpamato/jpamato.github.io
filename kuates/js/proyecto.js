var proyecto = {};
var projectID;
var proyectos = [];
var archivos = [];
$(function(){
	projectID = GetUrlValue("projectID");

	proyectos = localStorage.getItem("projects");
	proyectos = JSON.parse(proyectos);
	proyecto = $.grep(proyectos, function(e){ return e.projectID == projectID; })[0];

	var userID = proyecto['userID'];
	var users = localStorage.getItem("users");
	users = JSON.parse(users);
	var user = $.grep(users, function(e){ return e.userID == userID; })[0];

	console.log(proyecto);
	$("#portada").attr('src',getFirstImage(proyecto["archivos"]));
	$("#categoria").html(getCategoria(proyecto["categoria"]));
	$("#pTitle").html(changeSpecialCase(proyecto["nombre"].toUpperCase(),true));

	if(app.log!=1){
		$("#votar").prop("disabled", true);
		$("#comentar").prop("disabled", true);	
	}

	function getMeta(url){   
    	
	}

	var photoCont="";
	$("#photoContainer").html(photoCont);
	for(var i=0;i<proyecto['archivos'].length;i++){
		var img = new Image();
    		img.onload = function(){
        		//alert( this.width+' '+ this.height );
			if(this.width>this.height){
				photoCont = $("#photoContainer").html();
				photoCont += '<div class="w3-display-container mySlides"><img src="'+this.src+'" style="width:100%"></div>';
				$("#photoContainer").html(photoCont);
			}else{
				photoCont = $("#photoContainer").html();
				photoCont += '<div class="w3-display-container mySlides"><img src="'+this.src+'" style="height:100%"></div>';
				$("#photoContainer").html(photoCont);
			}
			slideIndex = 1;
			showDivs(slideIndex);
		};
		img.src = proyecto['archivos'][i];		
	}

	$("#avatar").attr('src',user['avatar']);
	$("#ciudad").html(changeSpecialCase(user["ciudad"].toUpperCase(),true));
	$("#userName").html(changeSpecialCase(user["nombre"].toUpperCase(),true));
	$("#userName").attr("href","usuario.html?userID="+user["userID"]);

	$("#pDescrip").find('p').html(proyecto["descripcion"]);
	if(proyecto["logros"]==null){
		$("#cantLogros").html("0");
		console.log("aca");
	}else{
		$("#cantLogros").html(proyecto["logros"]);
	}

	if(userReg!=null){
		if(userReg["votados"]!=null){
			if(userReg["votados"].indexOf(projectID)!=-1){
				votado();
			}
		}
	}

	$("#toComment").find(".avatar").find("img").attr("src",localStorage.getItem("avatar"));

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

		$('#thumbCont').find(".thumbDelete").html("&#8595;");
		$('#thumbCont').find(".thumbDelete").attr("onclick","download(this)");
		var thumbs = $('#thumbCont').html();
		
		console.log(thumbs);

		var html="<div class='comment'><div class='w3-row w3-container'>"+
			"<div class='w3-col l1 m1 s1 avatar'><img class='left' width=50px src='img/avatar.png'></div>"+
				"<div class='w3-col l10 m10 s10' style='text-align:left'>"+
					"<a href='#'>JUANCITO GOMEZ</a>"+
					"<p>"+text+"</p></div>"+thumbs+"</div>"+
			"<hr style='width:95%;border:dashed 1px;'></div>";
		
		$("#toComment").after(html);
		$('#thumbCont').html("");
		$("#toComment").find('textarea').val("");
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

$("#votar").unbind('click').click( function(){
	pIndex = proyectos.indexOf(proyecto);
	if(proyecto["logros"]==null){
		proyecto["logros"]=1;		
	}else{
		proyecto["logros"]=Number(proyecto["logros"])+1;
	}

	proyectos[pIndex]=proyecto;
	localStorage.setItem("projects",JSON.stringify(proyectos));
	$("#cantLogros").html(proyecto["logros"]);

	if(userReg["votados"]==null){
		userReg["votados"] = [];
		userReg["votados"].push(projectID);
	}else{
		userReg["votados"].push(projectID);
	}

	var users = localStorage.getItem("users");
	users = JSON.parse(users);
	users[userIndex]=userReg;
	localStorage.setItem("users",JSON.stringify(users));
	votado();
});

function votado(){
	$("#votar").prop("disabled", true);
	$("#votar").html('<i class="fa fa-thumbs-up" aria-hidden="true"></i>&nbsp;&nbsp;&nbsp;&nbsp;PROYECTO VOTADO</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;');
}

$(".denunciar").unbind('click').click( function(){
	$('#dialog').css("top","-16px");
	$('#dialog').css("left","-16px");
	$('#dialog').css("width","100%");
	//$('#dialog').css("height","100%");
	$('#dialog').css("padding","0px 4%");		
	$('#dialog').css("color","#04167a");
	var html = "<div style='background-color:#00d59b;padding:20px;';><p>Si consideras inapropiado<br><span style='color:#eee;'>este comentario</span><br>"+
			"lo daremos de baja luego de una revisi&oacute;n</p>"+
			"<span><button onclick='denunciar(this)' style='padding:10px 20px;background-color:#eee;color:#00d59b;margin-right:20px;border:none;'>NO DENUNCIAR</button><button onclick='denunciar(this)' style='padding:10px 20px;background-color:#eee;color:#00d59b;margin-right:20px;border:none;'>DENUNCIAR</button></span></div>";
	$('#dialogContent').html(html);
	$('#dialog').show();
	fullMaskToggle();
	});

function denunciar(e){
	e.parentElement.parentElement.parentElement.parentElement.style.display='none';	
	fullMaskToggle();
}

function renderImage(file,type) {
    	var fileURL = URL.createObjectURL(file);
	var ext =file.name.split('.').pop().toLowerCase();
	var html =  $('#thumbCont').html();
	//console.log(file.type);

	if(type=="photo" && $.inArray(ext, ['gif','png','jpg','jpeg']) > -1) {
		html += '<li class="photo" title='+file.name+' style="display: inline-block; height: 75px; width: 100px; z-index: 0;">'+
		'<div class="w3-panel" style="background-image: url('+fileURL+');cursor:pointer;background-size:100%;height:100%;background-repeat:no-repeat;">'+
		'<span onclick="deleteThumb(this)" class="w3-closebtn w3-grey thumbDelete">�</span></div></li>';
		$('#thumbCont').html(html);

	}else if(type=="video" && $.inArray(ext, ['mp4']) > -1) {

		html += '<li class="video" title='+file.name+' style="display: inline-block; height: 75px; width: 100px; z-index: 0;">'+
		'<div class="w3-panel" style="padding:0px">'+		
		'<video width=100px height=75px src='+fileURL+' "video/mp4" controls style="margin-top:-9px;"></video>'+
		'<span onclick="deleteThumb(this)" class="w3-closebtn w3-grey thumbDelete" style="position:absolute;margin-left:-24px">�</span></li>';

	}else if(type=="doc") {
		html += '<li class="doc" title='+file.name+' style="display: inline-block; height: 75px; width: 100px; z-index: 0;">'+
		'<div class="w3-panel" style="background-image: url(img/doc.png); cursor: pointer; background-size: 100% 64px; height: 100%; background-repeat: no-repeat;">'+
		'<span onclick="deleteThumb(this)" class="w3-closebtn w3-grey thumbDelete">�</span></div>'+
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

function readNew(key){
	var reader = new FileReader();
	reader.onload = function () {  			
		files.push(reader.result);
	};
	reader.readAsDataURL(archivos[key]);
}

function saveFileData(){
	//console.log("fileData");
	keys = Object.keys(archivos);
	console.log(keys);
	if(keys.length>0)
		readNew(keyIndex);
}

function getFirstImage(archivos){
	for(var i=0;i<archivos.length;i++){
		if(archivos[i].includes("data:image"))
			return archivos[i];
	}
}

function getCategoria(cat){
	console.log("cat: "+cat);
	var text = "";
	if(cat=='invento'){
		//text = "<img src='img/invento.png'><h6>Un "+cat+"</h6>";
		text = "UN "+changeSpecialCase(cat.toUpperCase(),true);
	}else if(cat=='soluci&#243;n'){
		//text = "<img src='img/solucion.png'><h6>Una "+cat+"</h6>";
		text = "UNA "+changeSpecialCase(cat.toUpperCase(),true);
	}else if(cat=="fant&#225;stico"){
		//text = "<img src='img/fantastico.png'><h6>Algo "+cat+"</h6>";
		text = "ALGO "+changeSpecialCase(cat.toUpperCase(),true);
	}else if(cat=="divertido"){
		//text = "<img src='img/divertido.png'><h6>Algo "+cat+"</h6>";
		text = "ALGO "+changeSpecialCase(cat.toUpperCase(),true);
	}else if(cat=="ayude"){
		//text = "<img src='img/ayude.png'><h6>Algo que "+cat+"</h6>";
		text = "ALGO QUE "+changeSpecialCase(cat.toUpperCase(),true);
	}else if(cat=="inspirador"){
		//text = "<img src='img/inspirador.png'><h6>Algo "+cat+"</h6>";
		text = "ALGO "+changeSpecialCase(cat.toUpperCase(),true);
	}else if(cat=="m&#250;sica"){
		//text = "<img src='img/musica.png'><h6>Musical"+"</h6>";
		text = "MUSICAL";
	}else if(cat=="art&#237;stico"){
		//text = "<img src='img/artistico.png'><h6>Art&#237;stico"+"</h6>";
		text = "ART&#237;STICO";
	}
	return text;
}
