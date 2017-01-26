var userReg;
var userIndex;
var app = (function(){
	//localStorage.clear();
	//
	//
	var logged = 0;
	var user;
	var userType;
	var uID;	

	getVersion();

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
	if(userIndex!=null)
		userReg=users[userIndex];

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

	if($(window).width()<768){
		$('#explorar').html('<button class="w3-btn kButton alphaButton" onclick=javascript:location.href="explorar.html">EXPLORAR</button>');
	}else{
		$('#explorar').html('<button class="w3-btn kButton alphaButton" onclick=javascript:location.href="explorar.html">DESCUBRE PROYECTOS <i class="fa fa-search" aria-hidden="true"></i></button>');
	}

	// Listener por resize de la ventana
	window.addEventListener("resize", function() {
			if($(window).width()<768){
				$('#explorar').html('<button class="w3-btn kButton alphaButton" onclick=javascript:location.href="explorar.html">EXPLORAR</button>');
			}else{
				$('#explorar').html('<button class="w3-btn kButton alphaButton" onclick=javascript:location.href="explorar.html">DESCUBRE PROYECTOS <i class="fa fa-search" aria-hidden="true"></i></button>');
			}
	}, false);
	
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

	function getVersion(){
		$.getJSON( "data/version.json", function( data ) {
			var ver = localStorage.getItem("version");
			console.log("Version: "+ver);
			if(ver!=null){
				if(Number(data['version'])!=Number(ver)){
					localStorage.clear();
					localStorage.setItem("version",data['version']);
					location.reload(true); 
				}
			}else{
					localStorage.clear();
					localStorage.setItem("version",data['version']);
					location.reload(true);
			}		
  		});
	}



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
		console.log("Log: "+log);
		if(log==null){
			localStorage.setItem("logged",0);
			log = 0;
		}
		this.logged = Number(log);

		if(this.logged==1){
			$('#menuBars').hide();
			$('#logged').show();
			$('#logged img').attr("src",localStorage.getItem("avatar"));
			this.user = localStorage.getItem("user");
			this.uID = localStorage.getItem("userID");
			$('#loggedName').html(this.user);
			//$("#crear").show();
			//$("#explorar").show();
			$("#ingresar").hide();
		}else{
			$('#menuBars').show();
			$('#logged').hide();
			//$("#crear").hide();
			//$("#explorar").hide();
			$("#ingresar").show();
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
		var h = $(window).height();
		/*if($(window).height()<350)
			$('#dialogContent').css('margin-top','10%');
		else
			$('#dialogContent').css('margin-top','120px');*/
		$('#dialog').css('height',h+"px");
	}
}

function closeDialog(e){
	e.parentElement.style.display='none';	
	fullMaskToggle();
}

function send(e){
	e.parentElement.parentElement.parentElement.style.display='none';	
	fullMaskToggle();
}
$("#crear").unbind('click').click( function(){
		if(app.log==1){
			location.href='crear.html';
		}else{
			location.href='sign.html'
		}
	});


$("#menuBars").unbind('click').click( function(){
	$('#dialog').css("top","-16px");
	$('#dialog').css("left","-16px");
	$('#dialog').css("width","100%");
	//$('#dialog').css("height","100%");
	$('#dialog').css("padding","0px 4%");
	$('#dialog').css("color","#00c1ea");
	var html = "<ul><li onclick='ingresar()'>LOGIN/REGISTRO</li>"+
			"<li onclick=location.href='explorar.html'>PROYECTOS DESTACADOS</li>"+
			"<li>FAQS</li>"+
			"<li onclick=location.href='terminos.html'>T&Eacute;RMINOS Y CONDICIONES</li>"+
			"<li onclick=location.href='contacto.html'>CONTACTO</li></ul>";
	$('#dialogContent').html(html);
	$('#dialog').show();
	fullMaskToggle();
	});

function ingresar(val=true){
	if(val)fullMaskToggle();
	$('#dialog').css("top","-16px");
	$('#dialog').css("left","-16px");
	$('#dialog').css("width","100%");
	//$('#dialog').css("height","100%");
	$('#dialog').css("padding","0px 4%");
	$('#dialog').css("color","#001782");

	/*$('#dialogContent').css("margin-left","auto");
	$('#dialogContent').css("margin-right","auto");
	$('#dialogContent').css("margin-top","120px");*/

	var html = "<H4 style='font-family:Vagbold;letter-spacing:2px;'>LOGIN</H4>"+
		"<form class='w3-container' style='text-align:left;'>"+
		"<div style='display:flex;width:100%;border-bottom: 3px solid #808080;padding-bottom:5px;margin-bottom:10px;'><label><b>CORREO</b></label><input id='email' class='w3-input' type='text' style='background-color:inherit;color:#f19800;'></div>"+
		"<div style='display:flex;width:100%;border-bottom: 3px solid #808080;padding-bottom:5px;margin-bottom:10px;'><label><b>CONTRASE&Ntilde;A</b></label><input id='pass' class='w3-input' type='text' style='background-color:inherit;color:#f19800;'></div>"+		
		"<div style='font-size:1vw'><input class='w3-check' type='checkbox' ><label style='color:rgba(0,0,0,0.2);'>RECORDARME</label>"+
		"<a style='float:right;margin-top:10px;color:rgba(0,0,0,0.2);letter-spacing:2px;' href='#' onclick='getPassword()'>OLVID&Eacute; MI CONTRASE&Ntilde;A</a></div><br>"+
		"<button class='w3-btn kButton blueButton' style='width:100%;' onclick='logIn()'>ENTRAR</button><br>"+
		"<hr style='width:100%;border:solid 1px #aaa'>"+
		"<H4 style='text-align:center;font-family:Vagbold;'>&iquest;NO TIENES USUARIO?</H4>"+
		"<button class='w3-btn kButton blueButton' style='width:100%;' onclick=location.href='sign.html'>REGISTRARME</button>"+
		"</form>";
	$('#dialogContent').html(html);
	$('#dialog').show();
	fullMaskToggle();
}

function logIn(){
	if(checkUsers($('#email').val(),$('#pass').val())){
		$('#menuBars').hide();
		$('#ingresar').hide();
		$('#logged').show();
		$('#dialog').hide();
		$('#logged img').attr("src",localStorage.getItem("avatar"));
		app.user = localStorage.getItem("user");
		app.uID = localStorage.getItem("userID");
		app.userType = localStorage.getItem("userType");
		app.log = localStorage.getItem("logged");

		$('#loggedName').html(app.user);
		fullMaskToggle();
		
		location.reload(true); 
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
	$('#menuBars').show();	
	localStorage.setItem("userIndex","");
	localStorage.setItem("user","");
	localStorage.setItem("userID","");	
	localStorage.setItem("userType","");	
	localStorage.setItem("avatar",'img/avatar.png');
	localStorage.setItem("logged",0);
	app.log = 0;
	
	location.reload(true); 
}

function misProyectos(){
	location.href='usuario.html?userID='+app.userID;
}

function getPassword(){
	$('#dialog').css("top","-16px");
	$('#dialog').css("left","-16px");
	$('#dialog').css("width","100%");
	//$('#dialog').css("height","100%");
	$('#dialog').css("padding","0px 4%");
	$('#dialog').css("color","#001782");

	var html = "<H4 style='margin:20px 0px 20px 0px;font-family: Vagbold;'>OLVID&Eacute; MI CONTRASE&Ntilde;A</H4>"+
		"<form class='w3-container' style='text-align:left;'>"+
		"<div style='display:flex;width:100%;border-bottom: 2px solid #808080;'><label style='color:#00c1ea;letter-spacing:2px;'><b>EMAIL</b></label><input class='w3-input' type='text' style='background-color:inherit; color:#db9600;'></div>"+
		"<H6 style='text-align:center;margin-top:20px;margin-bottom:30px;color:rgba(0,0,0,0.5);'>Te enviaremos un email con tu contrase&ntilde;a</H6>"+
		"<div style='width:100%;text-align:center;'><button class='w3-btn kButton blueButton' style='width:100%;' onclick='send(this)'>RECUPERAR</button></div>"+
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

function changeSpecialCase(text,toUpper){
	if(toUpper){
		text = text.replace("&#225;", "&#193;");
		text = text.replace("&#233;", "&#201;"); 
		text = text.replace("&#237;", "&#205;"); 
		text = text.replace("&#243;", "&#211;"); 
		text = text.replace("&#250;", "&#218;"); 
		text = text.replace("&#241;", "&#209;"); 
	}else{
		text = text.replace("&#193;", "&#225;");
		text = text.replace("&#201;", "&#233;"); 
		text = text.replace("&#205;", "&#237;"); 
		text = text.replace("&#211;", "&#243;"); 
		text = text.replace("&#218;", "&#250;");
		text = text.replace("&#209;", "&#241;");
	}
	return text;
}

console.log(app.log);
console.log(app.userName);
console.log(app.userID);
