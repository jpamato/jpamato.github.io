//app = false;
//delete window.app;
app = (function(){
	var w = 800;
	var h = document.height;
	var oPos = new Array();
	var vel = [];


	desordenar = function(){
		var posts = document.getElementsByClassName('post hentry');
		for (var i = 0; i < posts.length; i++){
			posts[i].style.position="absolute";
			posts[i].style.left = Math.random()*800+"px";
			posts[i].style.top = Math.random()*600+"px";
		}	
		//console.log(posts[0].absolutePosition.left);
	};

	ordenar = function(){
		var posts = document.getElementsByClassName('post hentry');
		for (var i = 0; i < posts.length; i++){
			posts[i].style.position="relative";
			posts[i].style.left = 0+"px";
			posts[i].style.top = 0+"px";
			posts[i].style.zIndex = 0+"";
		}	
	};

	function findPosX(obj){
		var left = 0;
		if(obj.offsetParent){
			while(1){
				left += obj.offsetLeft;
				if(!obj.offsetParent)
					break;
				obj = obj.offsetParent;
			}
		}else if(obj.x){
			left += obj.x;
		}
		//console.log(left);
		return left;
	}

	function findPosY(obj){
		var top = 0;
		if(obj.offsetParent){
			while(1){
				top += obj.offsetTop;
				if(!obj.offsetParent)
					break;
				obj = obj.offsetParent;
			}
		}else if(obj.y){
			top += obj.y;
		}
		//console.log(top);
		return top;
	}

	//console.log("funcion anonima");

	return {
		init : function(){
			//console.log("App 0 init");
			var posts = document.getElementsByClassName('post hentry');
			var x,y;
			var pDiv = document.getElementById('main-wrapper');
			var divW;
			if (pDiv.currentStyle){
				divW = pDiv.currentStyle['width'];
			}else if (window.getComputedStyle){
				divW = document.defaultView.getComputedStyle(pDiv,null).getPropertyValue('width');
			}
			for (var i = 0; i < posts.length; i++){
				var x = findPosX(posts[i]);
				var y = findPosY(posts[i]);
				//posts[i].style.position="absolute";
				posts[i].style.left = x+"px";
				posts[i].style.width = divW;
				posts[i].style.top = y+"px";
				posts[i].style.zIndex = 2+"";
				var vx = Math.random()*4-2;
				var vy = Math.random()*4-2;
				vel[i] = [vx,vy];
			}

			for (var i = 0; i < posts.length; i++){
				posts[i].style.position="absolute";
			}		
		},

		stop : function(){
		     ordenar();
		     //console.log("stop anim");
		},

		update : function(){

		     //console.log("App 0 update");
		     var posts = document.getElementsByClassName('post hentry');
		     for (var i = 0; i < posts.length; i++){
			     var px = parseInt(posts[i].style.left)+vel[i][0];
			     if(px>w){
				     vel[i][0]*=-1;
			     }else if(px<0){
				     vel[i][0]*=-1;
			     }
			     posts[i].style.left = px+"px";
			     var py = parseInt(posts[i].style.top)+vel[i][1];
			     if(py>h){
				     vel[i][1]*=-1;
			     }else if(py<0){
				     vel[i][1]*=-1;
			     }
			     posts[i].style.top = py+"px";
		     }	

		},
		keyPressed : function(keyCode){
		},

		mousePos : function(mouseX,mouseY){
		}


	};



})();
app.init();

