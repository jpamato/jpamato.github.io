'use strict';

//window.onload = init();    // Startup

// shim layer with setTimeout fallback
window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
	  window.oRequestAnimationFrame      ||
          window.msRequestAnimationFrame     ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();


var netPath = 'https://jpamato.github.io/u/webapps/';
//var netPath = '';
var gl;
var audioCtx;
var IDLE_TIMEOUT = 60 * 10 ; //seconds
var appPath = netPath+'js/';
var libPath = netPath+'js/lib/';
//var appList = ['audioTest4_.js'];
var appList = ['p5Logo1.js'];
//var appList = ['p5Logo1.js','WebGLGota1.js','simpleDOManim.js','WebGLpDeform1.js','p5Test1.js','p5Test2.js'];
var head;
var appElement;
var libsElement = [];
var cont=0;

var app = {};
app.update = function(){};
app.keyPressed = function(keyCode){};
app.mousePos = function(mouseX,mouseY){};
app.stop = function(){};
var Input = new function() {

	this.init = function () {
		
		document.onclick = function() {
			if(Cron.getIdState())Cron.reset();
		};
		/*document.onmousemove = function() {
			//if(Cron.getIdState())Cron.reset();
			if(!Cron.getIdState())Cron.set2Cero();
		};*/
		document.onmouseover = function() {
			//if(Cron.getIdState())Cron.reset();
			if(!Cron.getIdState())Cron.set2Cero();
		};
		document.onmousemove = function(e) {
			if(Cron.getIdState())app.mousePos(e.clientX,e.clientY);
		};
		document.onkeydown = function(e) {
			//if(Cron.getIdState())Cron.reset();

			//alert(e.keyCode);
			if(Cron.getIdState())app.keyPressed(e.keyCode);
			
			if(e.keyCode===65){//A
				if(Cron.getIdState())app.stop();
				Cron.setIdle();
				nextApp(cont);
				cont++;
				if(cont>appList.length-1)cont=0;
			}
			/*if(e.keyCode===100){//o
				mediator.desordenar();
			}else if(e.keyCode===111){
				mediator.ordenar();
			}else if(e.keyCode===97){//a
				mediator.animar();
			}else if(e.keyCode===65){
				mediator.stop();
			}*/
		};
		window.onscroll = function () {
  			var canvas3D = document.getElementById("webglcanvas"); 
			canvas3D.style.top = window.scrollY+"px";
			var canvas2D = document.getElementById("2dcanvas"); 
			canvas2D.style.top = window.scrollY+"px";
			if(!Cron.getIdState())Cron.set2Cero();
		};
	}
}

init();

// Program starts here
function init() {

	
	initApp();

	Input.init(); // Initialize mouse and UI handler        
}

function initApp(){
	head = document.getElementsByTagName('head')[0];
	appElement = document.createElement('script');
	appElement.type = 'text/javascript';
	appElement.id = 'app';	
	head.appendChild(appElement);
	libsElement[0] = document.createElement('script');
	libsElement[0].type = 'text/javascript';
	libsElement[0].id = 'lib0';	
	head.appendChild(libsElement[0]);
}

function nextApp(){
	head.removeChild(appElement);
	for(var i=0;i<libsElement.length;i++)head.removeChild(libsElement[i]);
	appElement = document.createElement('script');
	appElement.type = 'text/javascript';
	appElement.id = 'app';	
	appElement.src = appPath+appList[parseInt(Math.random()*appList.length)];
	console.log(appElement.src);
	head.appendChild(appElement);
}

function nextApp(prox){
	head.removeChild(appElement);
	//for(var i=0;i<libsElement.length;i++)head.removeChild(libsElement[i]);
	appElement = document.createElement('script');
	appElement.type = 'text/javascript';
	appElement.id = 'app';	
	if(prox===undefined){
		appElement.src = appPath+appList[parseInt(Math.random()*appList.length)];
	}else{
		appElement.src = appPath+appList[prox];
	}
	console.log(appElement.src);
	head.appendChild(appElement);
}

var Cron = new function() {

	var _idleSecondsCounter = 0;
	var isIdle = false;

	this.check = function() {
	    if(!isIdle){
		    if (_idleSecondsCounter > IDLE_TIMEOUT) {
			isIdle = true;
			nextApp();
			//app.init();
			console.log("Idle "+_idleSecondsCounter);
		    }
		    _idleSecondsCounter++;
		    //console.log(_idleSecondsCounter);
	    }
	}

	this.reset = function() {
		_idleSecondsCounter = 0;
		isIdle = false;
		app.stop();
		console.log("Active");
	}
	
	this.set2Cero = function() {
		_idleSecondsCounter = 0;	
		//console.log("Cron: " + _idleSecondsCounter);
	}
	
	this.getIdState = function(){
		return isIdle;	
	}
	this.setIdle = function(){
		isIdle=true;	
	}

}

function handleFileSelect(evt) {

	document.getElementById("openphoto1").style.display = "inline";
	document.getElementById("openphoto2").style.display = "none";

	var files = evt.target.files; // FileList object

	// files is a FileList of File objects. List some properties.
	var file = files[0];

	var reader = new FileReader();

	// Closure to capture the file information.
	reader.onload = function (e) {
		renderer.loadImageX(this.result);
	};

	// Read in the image file as a data URL.

	reader.readAsDataURL(file);
}

function isPowerOf2(value) {
    return (value & (value - 1)) == 0;
}

function convertCanvasToImage(canvas) {
	var image = new Image();
	image.src = canvas.toDataURL("image/png");
	return image;
}
function loadLibs(lib){
	for(var i=0;i<lib.length;i++){
		libsElement[i] = document.createElement('script');
		libsElement[i].type = 'text/javascript';
		libsElement[i].id = 'lib'+i;	
		libsElement[i].src = libPath+lib[i];
		console.log(libsElement[i].src);
		head.appendChild(libsElement[i]);
	}
}

(function animloop(){
  requestAnimFrame(animloop);
  Cron.check();
  if(Cron.getIdState()){
	//console.log("deberia animar");
  	app.update();
  }
})();


