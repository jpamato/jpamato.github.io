var proyectos = [];
$(function(){
	var proyectos = localStorage.getItem("projects");
	//console.log(proyectos);
	proyectos = JSON.parse(proyectos);
	//console.log(proyectos);
	/*proyectos.pop();
	localStorage.setItem("projects",JSON.stringify(proyectos));*/
	var html = "";
	for(var i=0;i<proyectos.length;i++){
		var users = localStorage.getItem("users");	
		users = JSON.parse(users);
		var result = $.grep(users, function(e){ return e.userID == proyectos[i]["userID"]; });
		var user = result[0];

		var logros=0;
		if(proyectos[i]["logros"]!=null)
			logros = proyectos[i]["logros"];

		//console.log(user);
		html+="<div class='w3-col l4 m6 w3-container w3-padding-12'>"+
			"<div class='proyecto'>"+
				  "<div>"+
				  "<div style='height:130px;overflow:hidden;'><img src="+proyectos[i]['archivos'][0]+"></div>"+
				"<h6 class='categoria'>"+proyectos[i]['categoria'].toUpperCase()+"</h6>"+
				  "</div>"+
				  "<a href='proyecto.html?projectID="+proyectos[i]["projectID"]+"'><h3 style='height:36px;overflow:auto;'>"+proyectos[i]['nombre']+"</h3></a>"+
				  "<div class='creador'>"+
				  "<div class='left'><div class='w3-circle' style='width:40px;height:40px;overflow:hidden;'><img src='"+user["avatar"]+"'></div></div>"+
					  "<div class='right'>por <a href='usuario.html?userID="+user["userID"]+"'>"+user["nombre"]+"</a></br>"+
						  "<i class='fa fa-trophy' aria-hidden='true'></i> <b>"+logros+"</b>"+
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
	
	$("#projectList").html(html);

});
