var userReg;
var userIndex;
var app = (function(){
	//localStorage.clear();
	//
		
	var logged = 0;
	var user;
	var userType;
	var uID;

	//localStorage.setItem("localSaved",0);
	var localSaved = localStorage.getItem("localSaved");
	if(localSaved==null){
		localStorage.setItem("localSaved",0);
		localSaved = 0;		
	}
	var users;
	console.log("localSaved: "+localSaved);
	if(Number(localSaved)==0){
		getU();
		getP();
	}else{
		users = localStorage.getItem("users");
		users = JSON.parse(users);
	}

	userIndex = localStorage.getItem("userIndex");

	checkLogin();
	
	/*var users;	
	getU();
	for(var i=0;i<users.length;i++)console.log("nombre"+i+": "+users[i]["nombre"]);*/

	/*var projects;
	getP();*/
	
	//downloadData(users);

	
	console.log(userReg);


	/*$.getJSON( "data/users.json", function( data ) {
  		var items = [];
 		 $.each( data, function(index) {
    			console.log(data[index]["nombre"]);
  		}); 		 
	});

	$.getJSON( "data/projects.json", function( data ) {
  		var items = [];
 		 $.each( data, function(index) {
    			console.log(data[index]["nombre"]);
  		}); 		 
	});*/
	
	return {
		getUsers: function(){
			return users;
		},

		getProjects: function(){
			return projects;
		},

		setUsers:function(u){

		},

		setProjects:function(p){

		},

		log: this.logged,

		userName:this.user,

		userType:this.userType,

		userID:this.uID

	};
	var jsonDone = false;
	function getU(){
		users = [];
		$.getJSON( "data/users.json", function( data ) {
			$.each( data, function(index) {
				users.push(data[index]);	
  			});
			//for(var i=0;i<users.length;i++)console.log("nombre"+i+": "+users[i]["nombre"]);			
			localStorage.setItem("users",JSON.stringify(users));
			if(jsonDone){
				localStorage.setItem("localSaved",1);
				localSaved = 1;
				location.reload(true); 
				console.log("doneUsers");
			}else{
				jsonDone=true;
			}
  		});		
	}

	function getP(){
		var projects=[];
		$.getJSON( "data/projects.json", function( data ) {
  			$.each( data, function(index) {
				projects.push(data[index]);				
  			});
			for(var i=0;i<projects.length;i++)console.log("nombre"+i+": "+projects[i]["nombre"]);
			localStorage.setItem("projects",JSON.stringify(projects));
			if(jsonDone){
				localStorage.setItem("localSaved",1);
				localSaved = 1;
				location.reload(true); 
				console.log("doneUsers");
			}else{
				jsonDone=true;
			}
  		});		
	}

	function checkLogin() {
		var log = localStorage.getItem("logged");
		if(log==null){
			localStorage.setItem("logged",0);
			log = 0;
		}
		this.logged = Number(log);

		if(this.logged==1){
			$('#toLog').hide();
			$('#logged').show();
			$('#logged img').attr("src",localStorage.getItem("avatar"));
			this.user = localStorage.getItem("user");
			this.uID = localStorage.getItem("userID");
			$('#logged H6').html(this.user);
			$("#crear").show();
		}else{
			$('#toLog').show();
			$('#logged').hide();
			$("#crear").hide();
		}
	}

})();

/* Toggle between adding and removing the "responsive" class to topnav when the user clicks on the icon */
function NavToggle() {
    var x = document.getElementById("myTopnav");
    if (x.className === "w3-top topnav") {
        x.className += " responsive";
    } else {
        x.className = "w3-top topnav";
    }
}

function toggleMenu() {
    if($('#userMenu').is(":visible") == true)
		$('#userMenu').hide();
	else
		$('#userMenu').show();	
}

function fullMaskToggle(){
	if($('#fullMask').is(":visible") == true)
		$('#fullMask').hide();
	else{
		$('#fullMask').show();
		$('#fullMask').css("height",$(document).height()+"px");
	}
}

function closeDialog(e){
	e.parentElement.style.display='none';	
	fullMaskToggle();
}

function ingresar(){
	$('#dialog').css("left","35%");
	$('#dialog').css("width","30%");
	$('#dialog').css("height","300px");
	var html = "<H4>INGRESAR</H4>"+
		"<form class='w3-container' style='text-align:left;'>"+
		"<div style='display:flex;width:100%;border-bottom: 2px solid #808080;'><label><b>CORREO</b></label><input id='email' class='w3-input' type='text'></div>"+
		"<div style='display:flex;width:100%;border-bottom: 2px solid #808080;'><label><b>CONTRASE&Ntilde;A</b></label><input id='pass' class='w3-input' type='text'></div>"+		
		"<div style='font-size:1vw'><input class='w3-check' type='checkbox'><label>RECORDARME</label>"+
		"<a style='margin-left:25px;' href='#' onclick='getPassword()'>OLVID&Eacute; MI CONTRASE&Ntilde;A</a></div>"+
		"<H4 style='text-align:center;' onclick='logIn()'>ENTRAR</H4>"+
		"<hr style='border-bottom: 1px dashed;'>"+
		"<H4 style='text-align:center;'>¿NO TIENES USUARIO?</H4>"+
		"<H4 style='text-align:center;' onclick=location.href='sign.html'>REGISTRARME</H4>"+
		"</form>";
	$('#dialogContent').html(html);
	$('#dialog').show();
	fullMaskToggle();
}

function logIn(){
	if(checkUsers($('#email').val(),$('#pass').val())){
		$('#toLog').hide();
		$('#logged').show();
		$('#dialog').hide();
		$('#logged img').attr("src",localStorage.getItem("avatar"));
		app.user = localStorage.getItem("user");
		app.uID = localStorage.getItem("userID");
		app.userType = localStorage.getItem("userID");
		app.log = localStorage.getItem("logged");

		$('#logged H6').html(app.user);
		fullMaskToggle();
		
	}
}
function checkUsers(email,pass){
	console.log(email+" - "+pass);
	var users = localStorage.getItem("users");	
	users = JSON.parse(users);
	//console.log(users);
	
	//var users = app.getUsers();
	var result = $.grep(users, function(e){ return e.email == email; });
	if(result.length>0){
		if(result[0]["contrasena"]==pass){
			userReg = result[0];
			userIndex = users.indexOf(result[0]);
			localStorage.setItem("userIndex",userIndex);
			localStorage.setItem("user",userReg['nombre']);
			localStorage.setItem("userID",userReg['userID']);	
			localStorage.setItem("userType",userReg['userType']);	
			localStorage.setItem("avatar",userReg['avatar']);
			localStorage.setItem("logged",1);
			return true;
		}else{
			return false;
		}

	}else{
		return false;
	}
}
function logOut(){
	toggleMenu();
	$('#logged').hide();
	$('#toLog').show();	
	localStorage.setItem("userIndex","");
	localStorage.setItem("user","");
	localStorage.setItem("userID","");	
	localStorage.setItem("userType","");	
	localStorage.setItem("avatar",'img/avatar.png');
	localStorage.setItem("logged",0);
	app.log = 0;
}

function misProyectos(){
	location.href='usuario.html?userID='+app.userID;
}

function getPassword(){
	$('#dialog').css("left","30%");
	$('#dialog').css("width","40%");
	$('#dialog').css("height","200px");
	var html = "<H4 style='margin:20px 0px 20px 0px;'>OLVID&Eacute; MI CONTRASE&Ntilde;A</H4>"+
		"<form class='w3-container' style='text-align:left;'>"+
		"<div style='display:flex;width:100%;border-bottom: 2px solid #808080;'><label><b>EMAIL</b></label><input class='w3-input' type='text'></div>"+
		"<H6 style='text-align:center;margin-top:20px;'>Te enviaremos un email con tu contrase&ntilde;a</H6>"+
		"<H4 style='text-align:center;'>RECUPERAR</H4>"+
		"</form>";
	$('#dialogContent').html(html);
	$('#dialog').show();
	//fullMaskToggle();
}

function generateID(){
	return new Date().valueOf();
}

function downloadData(dataJson){
	var data = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(dataJson));
	$('<a href="data:' + data + '" download="data.json">download JSON</a>').appendTo('#userMenu');
}

//reemplazar carateres por html ascii codes
function getCleanText(some_text) {
	var clean_text = some_text;
	clean_text = clean_text.replace("¿", "&#191;"); 

	clean_text = clean_text.replace("\u00C1", "&#193;"); 
	clean_text = clean_text.replace("É", "&#201;"); 
	clean_text = clean_text.replace("Í", "&#205;"); 
	clean_text = clean_text.replace("Ó", "&#211;"); 
	clean_text = clean_text.replace("Ú", "&#218;"); 

	clean_text = clean_text.replace("á", "&#225;"); 
	clean_text = clean_text.replace("é", "&#233;"); 
	clean_text = clean_text.replace("í", "&#237;"); 
	clean_text = clean_text.replace("ó", "&#243;"); 
	clean_text = clean_text.replace("ú", "&#250;"); 

	clean_text = clean_text.replace("Ñ", "&#209;"); 
	clean_text = clean_text.replace("ñ", "&#241;"); 

	return clean_text;
}

console.log(app.log);
console.log(app.userName);
console.log(app.userID);
