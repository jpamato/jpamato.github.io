app = (function(){

	var debug = false;
	//if(debug)console.log("funcion anonima");

	var fCount=0;

	var ready = false;



	setup = function () {
		// Get a context from our canvas object with id = "webglcanvas".
		var canvas = document.getElementById("logocanvas"); 
		canvas.style.width = document.documentElement.clientWidth+"px";
		canvas.style.height = document.documentElement.clientHeight+"px";
		Processing.loadSketchFromSources(canvas,[netPath+'pde/logo1.pde']);

		var logoE = document.getElementById('Image1_img');
		var x,y;		
		var x = findPosX(logoE);
		var y = findPosY(logoE);
				//posts[i].style.position="absolute";
				canvas.style.left = x+"px";
				canvas.style.top = y+"px";
				canvas.style.zIndex = 2+"";
				canvas.style.position="absolute";
	
	}

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

	return {
		init : function(){
			setup();
			//render();
		},

		stop : function(){
			ready=false;
			if(debug)console.log("stop");
			var pjs = Processing.getInstanceById("logocanvas");
			pjs.exit();
			var canvas = document.getElementById('logocanvas'); 
			var context = canvas.getContext('2d');
			context.clearRect(0, 0, canvas.width, canvas.height);
		},

		update : function(){
			if(ready){
		
			}
		},

		keyPressed : function(keyCode){
			var pjs = Processing.getInstanceById("logocanvas");
			pjs.keyPressed(keyCode);
		},

		mousePos : function(mouseX,mouseY){
			
		}

	};

})();

app.init();

