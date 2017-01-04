$(function(){

	var userID = GetUrlValue("userID");

	var users = localStorage.getItem("users");	
	users = JSON.parse(users);
	//console.log(users);
	var user = $.grep(users, function(e){ return e.userID ==userID; })[0];
	
	$("#avatar").attr("src",user["avatar"]);
	$("#userName").html(user["nombre"].toUpperCase());
	$("#userName").attr("href","usuario.html?userID="+user["userID"]);

	$("#ciudad").html(user["ciudad"]);
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
			logros+="<div class='left' style='font-size:33px;margin-right:25px;'><i class='fa fa-trophy' aria-hidden='true'></i></div>"+
				"<h6 style='text-align:left;font-size:1vw;line-height:1.2;padding-top:11px;'><b>"+proyectos[i]['nombre']+"</b></h6>";
			cantLogros++;
		}
		
		html+="<div class='w3-col l6 m6 w3-container w3-padding-12'>"+
			"<div class='proyecto'>"+
				  "<div>"+
				  "<div style='height:130px;overflow:hidden;'><img src="+proyectos[i]['archivos'][0]+"></div>"+
				"<h6 class='categoria'>"+proyectos[i]['categoria'].toUpperCase()+"</h6>"+
				  "</div>"+
				  "<a href='proyecto.html?projectID="+proyectos[i]["projectID"]+"'><h3 style='height:36px;overflow:auto;'>"+proyectos[i]['nombre']+"</h3></a>"+
				  "<div class='creador'>"+
				  "<div class='left'><div class='w3-circle' style='width:40px;height:40px;overflow:hidden;'><img src='"+user["avatar"]+"'></div></div>"+
					  "<div class='right'>por <a href='#'>"+user["nombre"]+"</a></br>"+
						  "<i class='fa fa-trophy' aria-hidden='true'></i> <b>"+logro+"</b>"+
					  "</div>"+
				  "</div>"+
				  "<p style='margin:0px 0px 20px 0px;height:100px;overflow:auto;padding-top:15px;padding-bottom:15px'>"+proyectos[i]['descripcion']+"</p>"+
				  "<div class='barra'>"+
				  "<div class='barraLlena' style='width:60%;'>&nbsp;</div><div class='barraVacia' style='width:40%;'>&nbsp;</div>"+
				  "</div>"+
				  "<div class='left'><b>60% logrado</b></div><div class='right'><b>5 días restantes</b></div>"+
			  "</div>"+
		  "</div>";

			
		}
	}
	
	$("#projectList").html(html);
	$("#logros").html(logros);
	$("#cantLogros").html("LOGROS:"+cantLogros);

	var votados = "";
	if(user["votados"]!=null){
		
		proyectos = localStorage.getItem("projects");
		proyectos = JSON.parse(proyectos);
		for(var i=0;i<user["votados"].length;i++){
			proyecto = $.grep(proyectos, function(e){ return e.projectID == user["votados"][i]; })[0];
			votados+="<div class='left' style='font-size:33px;margin-right:25px;'><i class='fa fa-thumbs-up' aria-hidden='true'></i></div>"+
				"<h6 style='text-align:left;font-size:1vw;line-height:1.2;padding-top:11px;'><a href='proyecto.html?projectID="+user['votados'][i]+"'><b>"+proyecto['nombre']+"</b></a></h6>";
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
