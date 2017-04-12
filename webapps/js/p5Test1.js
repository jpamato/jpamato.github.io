app = (function(){

	var debug = false;
	//if(debug)console.log("funcion anonima");

	var fCount=0;

	var ready = false;

	setup = function () {
		// Get a context from our canvas object with id = "webglcanvas".
		var canvas = document.getElementById("2dcanvas"); 
		canvas.style.width = document.documentElement.clientWidth+"px";
		canvas.style.height = document.documentElement.clientHeight+"px";
		Processing.loadSketchFromSources(canvas,[netPath+'pde/test1.pde']);

		/* canvas.fillStyle = "white";
		   canvas.fillRect(0,0,canvas.width,canvas.width);
		canvas.style.width = document.documentElement.clientWidth+"px";
		canvas.style.height = document.documentElement.clientHeight+"px";*/
		//if(debug)console.log(canvas.width);
		
	}

	return {
		init : function(){
			setup();
			//render();
		},

		stop : function(){
			ready=false;
			if(debug)console.log("stop");
			var pjs = Processing.getInstanceById("2dcanvas");
			pjs.exit();
			var canvas = document.getElementById('2dcanvas'); 
			var context = canvas.getContext('2d');
			context.clearRect(0, 0, canvas.width, canvas.height);
		},

		update : function(){
			if(ready){
		
			}
		},

		keyPressed : function(keyCode){
			var pjs = Processing.getInstanceById("2dcanvas");
			pjs.keyPressed(keyCode);
		},

		mousePos : function(mouseX,mouseY){
		}

	};

})();

app.init();

