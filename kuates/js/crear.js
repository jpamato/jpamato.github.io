var proyecto = {};
var archivos = [];
var projectIndex = -1;
$(function(){
	$('#step1').css('color','#f19800');
	$('#step1').find('.w3-circle').css('background-color','#f19800');
	$('#step1').find('.w3-circle').css('color','white');
	$('.holaNombre').html(changeSpecialCase(userReg["nombre"].split(" ")[0].toUpperCase(),true));
	$('#navLeft').hide();
});

function getDateSelector(minYear,maxYear){
	var html = '<select id="day" style="width: auto;"><option value="">D&Iacute;A</option>';
	for(var i=1;i<32;i++)
		html+='<option value="'+i+'">'+i+'</option>';
	
	html+='</select>&nbsp;<select id="month" style="width: auto;"><option value="">MES</option><option value="0">Ene</option><option value="1">Feb</option><option value="2">Mar</option><option value="3">Abr</option><option value="4">May</option><option value="5">Jun</option><option value="6">Jul</option><option value="7">Ago</option><option value="8">Sep</option><option value="9">Oct</option><option value="10">Nov</option><option value="11">Dic</option></select>&nbsp;<select id="year" style="width: auto;"><option value="">A&Ntilde;O</option>';
		
	for(var i=maxYear;i>minYear-1;i--)
		html+='<option value="'+i+'">'+i+'</option>';
	
	html+='</select>';
	return html;
}

$( "#proyectData" ).submit(function( event ) {	
  event.preventDefault();
});

$("#navLeft").click( function(){
	setStep(-1);     	     
});

$("#navRight").unbind('click').click( function(){
	setStep(1);	
});

$("#scrollRight").unbind('click').click( function(){
	var posx = Number(getTransforX('#thumbCont'));
	//console.log($('#thumbCont').width()+" : "+posx);
	if(posx<0)
		$('#thumbCont').css('transform',  'translateX(' + (posx+115) + 'px)');
});

$("#scrollLeft").unbind('click').click( function(){	
	var posx = Number(getTransforX('#thumbCont'));	
	//console.log(($('#thumbCont').width()+posx)+" : "+($('#thumbnail-slider').width()-100));
	if($('#thumbCont').width()+posx>$('#thumbnail-slider').width()-100)
		$('#thumbCont').css('transform',  'translateX(' + (posx-115) + 'px)');
});

$(".categoria").unbind('click').click( function(){	
	proyecto['categoria'] = $(this).attr('name');
	$('.categoria').css('background-color','#00c1ec');
	$(this).css('background-color','#f19800');
});

$(".thumbDelete").unbind('click').click( function(){
	$(this).parent().parent().remove();
});

function deleteThumb(e){
	var filename = e.parentNode.parentNode.title;
	delete archivos[filename];
	e.parentNode.parentNode.parentNode.removeChild(e.parentNode.parentNode);
}

function getTransforX(element){
	var currTrans = $(element).css("-webkit-transform").split(/[()]/)[1] ||
  			 $(element).css("-moz-transform").split(/[()]/)[1] ||
   			$(element).css("-ms-transform").split(/[()]/)[1] ||
   			$(element).css("-o-transform").split(/[()]/)[1]  ||
   			$(element).css("transform").split(/[()]/)[1];	
	return currTrans.split(',')[4];
}
$("#portadaInput").change(function() {
	$("#portadaFile").html(this.files[0].name);
});

$("#fileInput").change(function() {
	archivos[this.files[0].name]=this.files[0];
	console.log(archivos);
	renderImage(this.files[0])
});

$("#thumbnail-slider-prev").unbind('click').click( function(){
	var posX = Number($("#thumbnail-slider ul").css('-webkit-transform').split(",")[4]);
	console.log("aca "+posX);
	posX += 130;
	console.log("aca "+posX);
	$("#thumbnail-slider ul").css('-webkit-transform',  'translateX(' + posX + 'px)');
});

$("#thumbnail-slider-next").unbind('click').click( function(){
	var posX = $("#thumbnail-slider ul").css('-webkit-transform').split(",")[4];
	posX -= 130;
	$("#thumbnail-slider ul").css('-webkit-transform',  'translateX(' + posX + 'px)');
});

stepCount=1;
function setStep(stepChange){
	$('#stepCont_'+stepCount).hide();
	var lastStep = stepCount;
	stepCount+=stepChange;
	stepCount=stepCount<1?1:stepCount;
	if(stepCount>4){
		submitProyect();
		stepCount = lastStep;
		$('#stepCont_'+stepCount).show();
	}else{
		$('#stepCont_'+stepCount).show();
		navDone(lastStep,stepCount);
	}
	if(stepCount==1){
		$("#navLeft").hide();
	}else if(stepCount==2){
		$("#navLeft").show();
	}	
}

function crearDone(){
	$("#navButtons").hide();
	$('#stepCont_4').hide();
	$('#stepCont_5').show();
	var html = '<h2 style="text-align:center;">MUCHAS GRACIAS '+app.userName.toUpperCase()+'</h2><h4 style="text-align:center;">Tu proyecto ser&aacute; publicado en breve</h4>';
	$('#stepCont_5').html(html);
}

function submitProyect(){
	console.log("submit proyect");

	proyecto["userID"] = app.userID;
	var form = $("#proyectData");

	// get all the inputs into an array.
		var complete = true;
		var $inputs = $('#proyectData :input');

		$inputs.each(function() {
			if(this.name!='archivos')
				proyecto[this.name] = $(this).val();
			else
				saveFileData();

			if($(this).hasClass("required")){
				if($(this).val()==""){
					incomplete("Debes completar '"+this.name+"' del proyecto para finalizar");
					complete=false;
				}
				if(Object.keys(archivos).length<1){
					incomplete("Debes agregar alguna imagen para tu proyecto");
					complete=false;
				}
			}			
			//console.log(this.name+" : "+$(this).val());
		});		
		
		console.log(proyecto);
		
		if(complete){
			proyecto["projectID"] = generateID();
			SaveProject();
		}

		event.preventDefault();
}

function SaveProject(){
	var projects = localStorage.getItem("projects");			
	if(projects==null){
		projects = [];
	}else{
		projects = JSON.parse(projects);	
	}
	
	if(projectIndex==-1){			
		projects.push(proyecto);
		localStorage.setItem("projects",JSON.stringify(projects));
		projectIndex = projects.length-1;				
		console.log(proyectos[i]["userID"]);
	}else{
		projects[projectIndex] = proyecto;
		localStorage.setItem("projects",JSON.stringify(projects));
		console.log(projects);
		crearDone();
	}
}

function navDone(last, actual){
	if(last<actual){		
		$('#step'+actual).css('color','#f19800');
		$('#step'+actual).find('.w3-circle').css('background-color','#f19800');
		$('#step'+actual).find('.w3-circle').css('color','white');

		$('#step'+last).css('color','rgba(0,0,0,0.4)');
		$('#step'+last).find('.w3-circle').css('background-color','rgba(0,0,0,0.25)');
		$('#step'+last).find('.w3-circle').css('border-color','rgba(0,0,0,0.0)');
		$('#step'+last).find('.w3-circle').css('color','white');
		/*$('#step'+last).css('color','#74db53');
		$('#step'+last).find('.w3-circle').css('background-color','#74db53');
		$('#step'+last).find('.w3-circle').css('border-color','#74db53');
		$('#step'+last).find('.w3-circle').css('color','white');*/

		if(actual>1)
			$('#line'+actual).css('border-color','rgba(0,0,0,0.2)');
		if(last>1)
			$('#line'+last).css('border-color','rgba(0,0,0,0.2)');
	}else{
		$('#step'+actual).css('color','#f19800');
		$('#step'+actual).find('.w3-circle').css('background-color','#f19800');
		$('#step'+actual).find('.w3-circle').css('color','white');

		$('#step'+last).css('color','rgba(0,0,0,0.1)');
		$('#step'+last).find('.w3-circle').css('background-color','rgba(0,0,0,0.1)');
		$('#step'+last).find('.w3-circle').css('border-color','rgba(0,0,0,0.0)');
		$('#step'+last).find('.w3-circle').css('color','white');

		if(actual>1)
			$('#line'+actual).css('border-color','rgba(0,0,0,0.2)');
		if(last>1)
			$('#line'+last).css('border-color','rgba(0,0,0,0.1)');
	}
}



// render the image in our view
function renderImage(file) {

    	var fileURL = URL.createObjectURL(file);
	var ext =file.name.split('.').pop().toLowerCase();
	var html =  $('#thumbCont').html();

	//console.log(file.type);

	if($.inArray(ext, ['gif','png','jpg','jpeg']) > -1) {  		

			var img = new Image();
    			img.onload = function(){
			var w,h;
			if(this.width>this.height){

				var h = 100;
				var w = this.width*h/this.height;

				html += '<li class="" title='+file.name+' style="display: inline-block; height: 100px; width: 100px; z-index: 0;">'+
				'<div class="w3-panel" style="width:'+w+'px;height:'+h+'px; background-image: url('+fileURL+'); cursor: pointer;">'+
				'<span onclick="deleteThumb(this)" style="margin-right:'+(w-85)+'px;" class="w3-closebtn w3-circle thumbDelete">�</span></div></li>';
				$('#thumbCont').html(html);				
			}else{
				var w = 100;
				var h = this.height*w/this.width;

				html += '<li class="" title='+file.name+' style="display: inline-block; height: 100px; width: 100px; z-index: 0;">'+
				'<div class="w3-panel" style="width:'+w+'px;height:'+h+'px; background-image: url('+fileURL+'); cursor: pointer;">'+
				'<span onclick="deleteThumb(this)" style="margin-right:'+(w-84)+'px;" class="w3-closebtn w3-circle thumbDelete">�</span></div></li>';
				$('#thumbCont').html(html);				
			}		
		};
		img.src = fileURL;	

	}else if($.inArray(ext, ['mp4']) > -1) {

		html += '<li class="" title='+file.name+' style="display: inline-block; height: 100px; width: 100px; z-index: 0;">'+
		'<div class="w3-panel" style="padding:0px">'+		
		'<video width=100px height=100px src='+fileURL+' "video/mp4" controls></video>'+
		//'<span onclick="deleteThumb(this)" class="w3-closebtn w3-grey thumbDelete" style="position:absolute;right:15px">�</span></li>';
		'<span onclick="deleteThumb(this)" style="position:absolute;right:0px;" class="w3-closebtn w3-circle thumbDelete">�</span></li>';
		$('#thumbCont').html(html);

	}else{
		html += '<li class="" title='+file.name+' style="display: inline-block; height: 100px; width: 100px; z-index: 0;background-color:white;">'+
		'<div class="w3-panel" style="background-image: url(img/doc.png); cursor: pointer;">'+
		//'<span onclick="deleteThumb(this)" class="w3-closebtn w3-grey thumbDelete">�</span></div>'+
		'<span onclick="deleteThumb(this)" style="margin-right:-16px;" class="w3-closebtn w3-circle thumbDelete">�</span></div>'+
		'<span style="font-size: 10px;position: absolute;left: 0px;bottom: 4px;z-index: 1;width: 100px;color:#00c1ec;/*background-color: rgba(0,0,0,0.5);*/">'+file.name+'</SPAN></li>';		
		$('#thumbCont').html(html);
	}

	

/*
  // generate a new FileReader object
  var reader = new FileReader();

  // inject an image with the src url
  reader.onload = function(event) {

    	var fileURL = URL.createObjectURL(file);

  	var html =  $('#thumbCont').html();	
	html += '<li class="" style="display: inline-block; height: 90px; width: 120px; z-index: 0;">'+
		'<div class="w3-panel" style="background-image: url('+the_url+'); cursor: pointer;">'+
		'<span onclick="closeDialog(this)" id="thumbDelete" class="w3-closebtn w3-grey">�</span></div></li>';
	$('#thumbCont').html(html);
  }
 
  // when the file is read it triggers the onload event above.
  reader.readAsDataURL(file);*/
}

var keyIndex = 0;
var files = [];
var keys;
function readNew(i){
	var reader = new FileReader();
	reader.onload = function () {  			
		files.push(reader.result);
		if(i<keys.length-1){
			keyIndex++;
			readNew(keyIndex);
			console.log("files: "+files.length);			
		}else{
			proyecto['archivos'] = files;
			SaveProject();
		}
	};
	reader.readAsDataURL(archivos[keys[keyIndex]]);
}

function saveFileData(){
	//console.log("fileData");
	keys = Object.keys(archivos);
	console.log(keys);
	if(keys.length>0)
		readNew(keyIndex);
}

function incomplete(mess){
	$('#dialog').css("left","35%");
	$('#dialog').css("width","30%");
	$('#dialog').css("height","150px");
	var html = "<H4>ERROR DE REGISTRO</H4>"+
		"<p style='text-align:left'>"+mess+"</p>";
	$('#dialogContent').html(html);
	$('#dialog').show();
	fullMaskToggle();
}
