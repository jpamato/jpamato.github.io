$(function(){

	var userID = GetUrlValue("userID");

	var users = localStorage.getItem("users");	
	users = JSON.parse(users);
	//console.log(users);
	var user = $.grep(users, function(e){ return e.userID ==userID; })[0];
	
	$("#avatar").find("img").attr("src",user["avatar"]);
	$("#userName").html(user["nombre"].toUpperCase());
	$("#userName").attr("href","usuario.html?userID="+user["userID"]);

	$("#ciudad").html(changeSpecialCase(user["ciudad"].toUpperCase(),true));
	$("#escuela").html(user["escuela"]);	
	$('#birthday').html(getDate(user['day'],Number(user['month'])+1,user['year']));	

	var proyectos = localStorage.getItem("projects");
	//console.log(proyectos);
	proyectos = JSON.parse(proyectos);
	//console.log(proyectos);
	/*proyectos.pop();
	localStorage.setItem("projects",JSON.stringify(proyectos));*/
	var html = "";
	var logros = "";
	var cantLogros = 0;
	for(var i=0;i<proyectos.length;i++){
		if(proyectos[i]["userID"]==userID){
		//console.log(user);
		var logro = 0;	
		if(proyectos[i]["logros"]!=null){
			logro = proyectos[i]["logros"];
			logros+="<div class='left' style='font-size:33px;margin-right:25px;margin-left:5%;'><img src='img/medal.png' style='width:25px;margin-top:20px;'></div>"+
				"<h6 style='text-align:left;font-size:1vw;line-height:1.2;padding-top:15px;font-family:Vagbold;'>"+proyectos[i]['nombre']+"</h6><br/><hr style='margin:0px'>";
			cantLogros++;
		}
		
		html+="<div class='w3-col l6 m6 w3-container w3-padding-12'>"+
			"<div class='proyecto'>"+
				  "<div>"+
				  "<div style='width:100%;height:1px;padding-bottom:56.25%;overflow:hidden;'><img src="+getFirstImage(proyectos[i]['archivos'])+"></div>"+
				"<div class='categoria'>"+getCategoria(proyectos[i]['categoria'])+"</div>"+
				  "</div>"+
				  "<div class='titleCont'>"+
				  "<a href='proyecto.html?projectID="+proyectos[i]["projectID"]+"'><h4 style='font-family:Vagbold'>"+proyectos[i]['nombre']+"</h4></a>"+
				  "</div>"+
				  "<div class='creador'>"+
				  "<div class='left'><div class='w3-circle' style='width:50px;height:50px;overflow:hidden;border:solid 3px #001782'><img src='"+user["avatar"]+"'></div></div>"+
					  "<div class='right'>por <a href='usuario.html?userID="+user["userID"]+"'>"+user["nombre"]+"</a></br>"+
						  "<img src='img/medal.png' style='width:15px;margin-left:1px;'> <b>"+logro+"</b>"+
					  "</div>"+
				  "</div>"+
				  "<hr>"+
				  "<div class='bottomCont' >"+
				  "<div class='pEstado left' style='width:100%;'>"+
				  "<div class='tortaFrame' style='width:100px;height:100px;'>"+
				  "<div class='w3-circle completo'>&nbsp;</div>"+
				  "<div class='quarter-circle incompleto'>&nbsp;</div>"+
				  "<div class='w3-circle interior'>75%</div>"+
				  "<div style='text-align:center;padding-top:20px;'>LOGRADO<br><span style='color:#0069e9'>9 D&Iacute;AS<br>restantes</span></div>"+
				  "</div>"+
				  "</div>"+
				  "<div class='pDesc right'><p class='right' style='margin:0px;'>"+proyectos[i]['descripcion']+"</p></div>"+
				  "</div></div>"+				  
				  "</div>"+
			  "</div>"+
		  "</div>";

			
		}
	}
	
	$("#projectList").html(html);
	$("#logros").html(logros);
	//$("#cantLogros").html("LOGROS:"+cantLogros);

	var votados = "";
	if(user["votados"]!=null){
		
		proyectos = localStorage.getItem("projects");
		proyectos = JSON.parse(proyectos);
		for(var i=0;i<user["votados"].length;i++){
			proyecto = $.grep(proyectos, function(e){ return e.projectID == user["votados"][i]; })[0];
			votados+="<div class='left' style='font-size:33px;margin-right:25px;margin-left:5%;'><img src='img/like.png' style='width:25px;margin-top:20px;'></div>"+
				"<h6 style='text-align:left;font-size:1vw;line-height:1.2;padding-top:11px;'><a href='proyecto.html?projectID="+user['votados'][i]+"'><b>"+proyecto['nombre']+"</b></a></h6><br/><hr style='border-color:blue;margin:0px'>";
		}
	}
	$("#pVotados").html(votados);
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

function getDate(day,month,year){
	var html = '<div id="day" style="width: auto;">'+day+'</div>/';	
	html+='<div id="month" style="width: auto;">'+month+'</div>/';
	html+='<div id="year" style="width: auto;">'+year+'</div>';		
	return html;
}

function getFirstImage(archivos){
	for(var i=0;i<archivos.length;i++){
		if(archivos[i].includes("data:image"))
			return archivos[i];
	}
}

function getCategoria(cat){
	var text = "";
	if(cat=='invento'){
		text = "<img src='img/invento.png'><h6>Un "+cat+"</h6>";
	}else if(cat=='soluci&#243;n'){
		text = "<img src='img/solucion.png'><h6>Una "+cat+"</h6>";
	}else if(cat=="fant&#225;stico"){
		text = "<img src='img/fantastico.png'><h6>Algo "+cat+"</h6>";
	}else if(cat=="divertido"){
		text = "<img src='img/divertido.png'><h6>Algo "+cat+"</h6>";
	}else if(cat=="ayude"){
		text = "<img src='img/ayude.png'><h6>Algo que "+cat+"</h6>";
	}else if(cat=="inspirador"){
		text = "<img src='img/inspirador.png'><h6>Algo "+cat+"</h6>";
	}else if(cat=="m&#250;sica"){
		text = "<img src='img/musica.png'><h6>Musical"+"</h6>";
	}else if(cat=="art&#237;stico"){
		text = "<img src='img/artistico.png'><h6>Art&#237;stico"+"</h6>";
	}
	return text;
}
