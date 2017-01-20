var proyectos = [];
var users = [];
$(function(){
	proyectos = localStorage.getItem("projects");
	users = localStorage.getItem("users");
	users = JSON.parse(users);
	if(proyectos!=null){
		//console.log(proyectos);
		proyectos = JSON.parse(proyectos);
	}else{
		proyectos=[];
	}
	console.log(proyectos);
	/*proyectos.pop();
	localStorage.setItem("projects",JSON.stringify(proyectos));*/
	var html = "";
	for(var i=0;i<3;i++){	
		
		var result = $.grep(users, function(e){ return e.userID == proyectos[i]["userID"]; });
		var user = result[0];

		var logros=0;
		if(proyectos[i]["logros"]!=null)
			logros = proyectos[i]["logros"];

		//getFirstImage(proyectos[i]['archivos']);
		//console.log(user);
		html+="<div class='w3-col l4 m6 w3-container w3-padding-12'>"+
			"<div class='proyecto'>"+
				  "<div>"+
				  "<div style='width:100%;height:1px;padding-bottom:50%;overflow:hidden;'><img src="+getFirstImage(proyectos[i]['archivos'])+"></div>"+
				"<div class='categoria'>"+getCategoria(proyectos[i]['categoria'])+"</div>"+
				  "</div>"+
				  "<div class='titleCont'>"+
				  "<a href='proyecto.html?projectID="+proyectos[i]["projectID"]+"'><h4 style='font-family:Vagbold;font-size: 1.5vw;'>"+proyectos[i]['nombre']+"</h4></a>"+
				  "</div>"+
				  "<hr>"+
				  "<div class='creador'>"+
				  "<div class='left'><div class='w3-circle' style='width:50px;height:50px;overflow:hidden;'><img src='"+user["avatar"]+"'></div></div>"+
					  "<div class='right'>por <a href='usuario.html?userID="+user["userID"]+"'>"+user["nombre"]+"</a></br>"+
						  "<img src='img/medal.png' style='width:15px;margin-left:-60%;'> <b>"+logros+"</b>"+
					  "</div>"+
				  "</div>"+
				  "<hr>"+
				  "<div class='bottomCont' >"+
				  "<div class='pEstado left' style='width:100%;'>"+
				  "<div class='tortaFrame' style='width:100px;height:100px;'>"+
				  "<div class='w3-circle completo'>&nbsp;</div>"+
				  "<div class='quarter-circle incompleto'>&nbsp;</div>"+
				  "<div class='w3-circle interior'>75%</div>"+
				  "<div style='text-align:center;padding-top:20px;'>LOGRADO<br><span style='color: #00c1ea;'>9 d&Iacute;as<br>restantes</span></div>"+
				  "</div>"+
				  "</div>"+
				  "<div class='pDesc right'><p class='right' style='margin:0px;'>"+proyectos[i]['descripcion']+"</p></div>"+
				  "</div></div>"+				  
				  "</div>"+
			  "</div>"+
		  "</div>";
	}
	
	$("#projectList").html(html);

	$("#favBox li").unbind('click').click( function(){
		console.log("ACA");
		$("#favBox li").css("color","#193462");
		$("#favBox li").css("background-color","white");
		$(this).css("background-color","#f19800");
		$(this).css("color","white");
		var index = parseInt(Math.random()*proyectos.length,10);
		setProyImg(index);
		setProyDesc(index);
	});

	setProyImg(0);
	setProyDesc(0);

});

function getFirstImage(archivos){
	for(var i=0;i<archivos.length;i++){
		if(archivos[i].includes("data:image"))
			return archivos[i];
	}
}

function setProyImg(i){
		var html= "<div style='width:100%;height:1px;padding-bottom:65%;overflow:hidden;'><img src="+getFirstImage(proyectos[i]['archivos'])+" style='width:100%;margin:0px;margin-right: 10px;'></div>";			  
		$("#favImg").html(html);
}

function setProyDesc(i){
	var result = $.grep(users, function(e){ return e.userID == proyectos[i]["userID"]; });
	var user = result[0];

	var logros=0;
	if(proyectos[i]["logros"]!=null)
		logros = proyectos[i]["logros"];

	var html = "<div class='titleCont'>"+
				  "<a href='proyecto.html?projectID="+proyectos[i]["projectID"]+"'><h6 style='font-family:Vagbold'>"+proyectos[i]['nombre']+"</h6></a>"+
				  "</div>"+
				  "<div class='creador'>"+
				  "<div class='left'><div class='w3-circle' style='width:20px;height:20px;overflow:hidden; margin-top:-5px;'><img src='"+user["avatar"]+"'></div></div>"+
				  	"<div style='display:flex;'>por </br><a href='usuario.html?userID="+user["userID"]+"'>"+user["nombre"]+"</a></div>"+
					  "<div class='right'><img src='img/medal.png' style='width:15px;margin-left:1px;margin-top:-5px;'> <b>"+logros+"</b>"+
					  "</div>"+
				  "</div>"+
				  "</div>"+
				  "<div class='pDesc'><p style='margin:0px;font-size:0.8vw;'>"+proyectos[i]['descripcion']+"</p></div>"+
				  "<div class='bottomCont' >"+
				  "<div class='pEstado left' style='width:100%;'>"+
				  "<div class='tortaFrame'>"+
				  "<div class='w3-circle completo'>&nbsp;</div>"+
				  "<div class='quarter-circle incompleto'>&nbsp;</div>"+
				  "<div class='w3-circle interior'>75%</div>"+				  
				  "</div></div>"+
				  "<div class='pEstado right' style='width:100%;text-align:center;padding-top:15px;'><span style='color: #00c1ea;font-family: Vagbold;font-size: 0.9vw;margin-left:-60%;'>9 d&iacute;as restantes</span></div>"+
				  "<br>"+
				  
				  "</div>";
	$("#favDesc").html(html);
}

function getCategoria(cat){
	var text = "";
	if(cat=='invento'){
		//text = "<img src='img/invento.png'><h6>Un "+cat+"</h6>";
		text = "<h6>UN "+changeSpecialCase(cat.toUpperCase(),true)+"</h6>";
	}else if(cat=='soluci&#243;n'){
		//text = "<img src='img/solucion.png'><h6>Una "+cat+"</h6>";
		text = "<h6>UNA "+changeSpecialCase(cat.toUpperCase(),true)+"</h6>";
	}else if(cat=="fant&#225;stico"){
		//text = "<img src='img/fantastico.png'><h6>Algo "+cat+"</h6>";
		text = "<h6>ALGO "+changeSpecialCase(cat.toUpperCase(),true)+"</h6>";
	}else if(cat=="divertido"){
		//text = "<img src='img/divertido.png'><h6>Algo "+cat+"</h6>";
		text = "<h6>ALGO "+changeSpecialCase(cat.toUpperCase(),true)+"</h6>";
	}else if(cat=="ayude"){
		//text = "<img src='img/ayude.png'><h6>Algo que "+cat+"</h6>";
		text = "<h6>ALGO que "+changeSpecialCase(cat.toUpperCase(),true)+"</h6>";
	}else if(cat=="inspirador"){
		//text = "<img src='img/inspirador.png'><h6>Algo "+cat+"</h6>";
		text = "<h6>ALGO "+changeSpecialCase(cat.toUpperCase(),true)+"</h6>";
	}else if(cat=="m&#250;sica"){
		//text = "<img src='img/musica.png'><h6>Musical"+"</h6>";
		text = "<h6>MUSICAL"+"</h6>";
	}else if(cat=="art&#237;stico"){
		//text = "<img src='img/artistico.png'><h6>Art&#237;stico"+"</h6>";
		text = "<h6>ART&#237;STICO"+"</h6>";
	}
	return text;
}
