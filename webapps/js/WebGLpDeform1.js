app = (function(){

	var debug = false;
	//if(debug)console.log("funcion anonima");

	var pictureprogram;

	var fCount=0;
	//var osX=0;
	//var osY=0;

	var texCoordLocation;   // Location of the texture for the picture fragment shader.

	var texCoordBuffer;   // The buffer for the texture for the picture fragment shader.

	var resolution = 2;  // Resolution of the mesh.
	//var resolution = 1;  // Resolution of the mesh.

	var ready = false;

	var libs = ["audioUtils.js","viento2.js","webgl-debug.js"];
	loadLibs(libs);

	var masterGain;
	var reverb;
	var panner;
	var reverbGain;
	var viento=null;
	var ang = 0;
	var mouseX,mouseY;

	setup = function () {
		// Get a context from our canvas object with id = "webglcanvas".
		var canvas = document.getElementById("webglcanvas"); 

		/* canvas.fillStyle = "white";
		   canvas.fillRect(0,0,canvas.width,canvas.width);*/
		canvas.style.width = document.documentElement.clientWidth+"px";
		canvas.style.height = document.documentElement.clientHeight+"px";
		//if(debug)console.log(canvas.width);
		try {
			// Get the context into a local gl and and a public gl.
			// Use preserveDrawingBuffer:true to keep the drawing buffer after presentation
			gl = canvas.getContext("experimental-webgl", { preserveDrawingBuffer: true });
		}
		catch (e) {
			// Fail quietly 
		}
		// If we can't get a WebGL context (no WebGL support), then display an error message.
		if (!gl) {
			document.getElementById("ErrorMessage").style.display = "block";
			console.log("NO WEBGL SUPPORT");
			return;
		}

		try {
			loadFiles([netPath+'shaders/sTexVert.c', netPath+'shaders/def1frag.c'], function (shaderText) {
				var vertexShader = gl.createShader(gl.VERTEX_SHADER);
				gl.shaderSource(vertexShader, shaderText[0]);
				gl.compileShader(vertexShader);
				// Check the compile status, return an error if failed
				if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
					console.log(gl.getShaderInfoLog(vertexShader));			
				}
				// ... compile shader, etc ...
				var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
				gl.shaderSource(fragmentShader, shaderText[1]);
				gl.compileShader(fragmentShader);
				// Check the compile status, return an error if failed
				if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
					console.log(gl.getShaderInfoLog(fragmentShader));			
				}

				// ... set up shader program and start render loop timer
				pictureprogram = loadProgram(gl,vertexShader,fragmentShader);
				if(debug)console.log("done getShader");
				gl.useProgram(pictureprogram);
				if(debug)console.log("done load program");

				// Look up where the vertex data needs to go.
				texCoordLocation = gl.getAttribLocation(pictureprogram, "a_texCoord");
				if(debug)console.log("done setAttloc");

				// Provide texture coordinates for the rectangle.
				texCoordBuffer = gl.createBuffer();
				gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
				if(debug)console.log("done create buffer");

				// createImageGrid sets up the vector array itself
				gl.bufferData(gl.ARRAY_BUFFER, createImageGrid(), gl.STATIC_DRAW);  // Fill buffer data             
				gl.vertexAttribPointer(texCoordLocation, 2, gl.FLOAT, false, 0, 0);
				gl.enableVertexAttribArray(texCoordLocation);
				if(debug)console.log("done create grid?");
				// Set up uniforms variables (image).
				pictureprogram.u_image = gl.getUniformLocation(pictureprogram, "u_image");
				if(debug)console.log("done set image uniform");

				// Set the texture to use.
				gl.uniform1i(pictureprogram.u_image, 0);
				if(debug)console.log("done init texture");

				// Set some uniform variables for the shaders
				gl.uniform2f(gl.getUniformLocation(pictureprogram, "resolution"), canvas.width, canvas.height);
				gl.uniform1f(gl.getUniformLocation(pictureprogram, "time"), fCount);
				//gl.uniform1f(gl.getUniformLocation(pictureprogram, "offSX"), osX);
				//gl.uniform1f(gl.getUniformLocation(pictureprogram, "offSY"), osY);
				loadImage();
				ready = true;	
				if(debug)console.log("ready!");
			}, function (url) {
				alert('Failed to download "' + url + '"');
				ready = false;
			}); 

		}
		catch (e) {
			console.log('shader fail');
			return;
		}

		try {
			// Fix up for prefixing
			window.AudioContext = window.AudioContext||window.webkitAudioContext;
			audioCtx = new AudioContext();

			if (!audioCtx.createGain)
				audioCtx.createGain = audioCtx.createGainNode;
			if (!audioCtx.createDelay)
				audioCtx.createDelay = audioCtx.createDelayNode;
			if (!audioCtx.createScriptProcessor)
				audioCtx.createScriptProcessor = audioCtx.createJavaScriptNode;

			masterGain = audioCtx.createGain();
			masterGain.connect(audioCtx.destination);
			masterGain.gain.value=0;
			reverb = audioCtx.createConvolver();
			panner = audioCtx.createPanner();
			panner.setOrientation(0,0,1);
			panner.connect(masterGain);
			audioCtx.listener.setPosition(0, 0, 0);
			loadIR(netPath+'ir/binaural_hall.mp3', reverb.buffer);
			reverbGain = audioCtx.createGain();
			reverbGain.gain.value=0.2;
			reverb.connect(reverbGain);
			reverbGain.connect(masterGain);

			viento = new Viento2(audioCtx);
			viento.connect(panner);
			viento.connect(reverb);

			ready = true;
			masterGain.gain.exponentialRampToValueAtTime(0.05, audioCtx.currentTime+1);
			masterGain.gain.exponentialRampToValueAtTime(1.0,audioCtx.currentTime+10);
		}
		catch(e) {
			console.log(e);
			alert('Web Audio API is not supported in this browser');
			ready = false;
		}		


	}

	// Load a default image.
	loadImage = function () {
		var image = new Image();
		image.crossOrigin = "anonymous";

		//image.src = "img/testImg.jpg"; // Default image
		//image.src = "img/grid1.jpg"; // Default image 
		//image.src = "img/tex4.jpg"; // Default image 
		image.src = netPath+"img/cloud.jpg"; // Default image 
		//image.src = "img/logo.jpg"; // Default image
		image.onload = function () {
			if(debug)console.log("Image Loaded");
			setTexture(image);
		}
	}

	// This function does the heavy lifting of creating the texture from the image.
	setTexture = function (image) {

		// Create a texture object that will contain the image.
		var texture = gl.createTexture();

		// Bind the texture the target (TEXTURE_2D) of the active texture unit.
		gl.bindTexture(gl.TEXTURE_2D, texture);

		// Flip the image's Y axis to match the WebGL texture coordinate space.
		gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
		// Check if the image is a power of 2 in both dimensions.
		if (isPowerOf2(image.width) && isPowerOf2(image.height)) {
			// Yes, it's a power of 2. Generate mips.
			//	gl.generateMipmap(gl.TEXTURE_2D);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
		} else {
			// No, it's not a power of 2. Turn of mips and set wrapping to clamp to edge
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE); 
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
			//gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT); 
			//gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)			
		}
		// Upload the resized canvas image into the texture.
		//    Note: a canvas is used here but can be replaced by an image object. 
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
		render();
	}

	render = function () {

		//  Clear color buffer and set it to light gray
		gl.clearColor(1.0, 1.0, 1.0, 0.0);
		gl.clear(gl.COLOR_BUFFER_BIT);

		gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);

		gl.useProgram(pictureprogram);

		gl.vertexAttribPointer(texCoordLocation, 2, gl.FLOAT, false, 0, 0);

		gl.enableVertexAttribArray(texCoordLocation);

		gl.drawArrays(gl.TRIANGLES, 0, resolution * resolution * 2 * 3);		
		if(debug)console.log('render');

		gl.clearColor(1.0, 1.0, 1.0, 0.0);
		gl.clear(gl.COLOR_BUFFER_BIT);

	}

	function isPowerOf2(value) {
		return (value & (value - 1)) == 0;
	}

	function loadFile(url, data, callback, errorCallback) {
		// Set up an asynchronous request
		var request = new XMLHttpRequest();
		request.open('GET', url, true);

		// Hook the event that gets called as the request progresses
		request.onreadystatechange = function () {
			// If the request is "DONE" (completed or failed)
			if (request.readyState == 4) {
				// If we got HTTP status 200 (OK)
				if (request.status == 200) {
					callback(request.responseText, data)
				} else { // Failed
					errorCallback(url);
				}
			}
		};
		request.send(null);    
	}

	function loadFiles(urls, callback, errorCallback) {
		var numUrls = urls.length;
		var numComplete = 0;
		var result = [];

		// Callback for a single file
		function partialCallback(text, urlIndex) {
			result[urlIndex] = text;
			numComplete++;

			// When all files have downloaded
			if (numComplete == numUrls) {
				callback(result);
			}
		}

		for (var i = 0; i < numUrls; i++) {
			loadFile(urls[i], i, partialCallback, errorCallback);
		}
	}



	loadShaders.base = netPath+"shaders/";
	// our shaders loader
	function loadShaders(gl, shaders, callback) {
		if(debug)console.log("loading");
		// (C) WebReflection - Mit Style License
		function onreadystatechange() {
			var xhr = this, i = xhr.i;
			if (xhr.readyState == 4) {
				shaders[i] = gl.createShader(shaders[i].slice(0, 2) == "fs" ? gl.FRAGMENT_SHADER : gl.VERTEX_SHADER );
				gl.shaderSource(shaders[i], xhr.responseText);
				gl.compileShader(shaders[i]);
				if(debug)console.log("compilando sh");
				if (!gl.getShaderParameter(shaders[i], gl.COMPILE_STATUS))throw gl.getShaderInfoLog(shaders[i]);
				!--length && typeof callback == "function" && callback(shaders);
			}
		}
		for (var shaders = [].concat(shaders), asynchronous = !!callback, i = shaders.length,length = i,xhr;i--;) {
			(xhr = new XMLHttpRequest).i = i;
			xhr.open("get", loadShaders.base + shaders[i] + ".c", asynchronous);
			if (asynchronous) {
				xhr.onreadystatechange = onreadystatechange;
			}
			xhr.send(null);
			onreadystatechange.call(xhr);
		}
		return shaders;
	}

	function loadProgram(gl, vertexShader, fragmentShader)
	{
		// create a progam object
		var program = gl.createProgram();
		// attach the two shaders 
		gl.attachShader(program, vertexShader);
		gl.attachShader(program, fragmentShader);
		// link everything 
		gl.linkProgram(program);
		// Check the link status
		var linked = gl.getProgramParameter(program, gl.LINK_STATUS);
		if (!linked) {
			// An error occurred while linking
			var lastError = gl.getProgramInfoLog(program);
			console.warn("Error in program linking:" + lastError);
			gl.deleteProgram(program);
			return null;
		}
		// if all is well, return the program object
		return program;
	};


	function createImageGrid() {
		var q = 0.001;

		var r = (1 - q * 2) / resolution;
		var c = new Float32Array(resolution * resolution * 12); //2 numbers per coord; three coords per triangle; 2 triagles per square; resolution * resolution squares.

		var i = 0;

		for (var xs = 0; xs < resolution; xs++) {
			for (var ys = 0; ys < resolution; ys++) {

				var x = r * xs + q;
				var y = r * ys + q;

				c[i++] = x;
				c[i++] = y;

				c[i++] = x + r;
				c[i++] = y;

				c[i++] = x;
				c[i++] = y + r;

				c[i++] = x + r;
				c[i++] = y;

				c[i++] = x;
				c[i++] = y + r;

				c[i++] = x + r;
				c[i++] = y + r;

			}
		}
		return c;
	}

	return {
		init : function(){
			setup();
			//render();
		},

		     stop : function(){
			     ready=false;
			     if(debug)console.log("WGL stop");
			     var canvas = document.getElementById("webglcanvas"); 
			     canvas.style.zIndex = -2+"";
			     /*gl.useProgram(null);
			       gl.bindBuffer(gl.ARRAY_BUFFER, null);
			       gl.bindTexture(gl.TEXTURE_2D, null);
			       gl.clearColor(1.0, 1.0, 1.0, 1.0);
			       gl.clear(gl.COLOR_BUFFER_BIT);*/
			     WebGLDebugUtils.resetToInitialState(gl);
			     masterGain.disconnect(audioCtx.destination);
		     },

		     update : function(){
			     if(ready){
				     panner.setPosition(0,0, 0);
				     var canvas = document.getElementById("webglcanvas"); 
				     canvas.style.zIndex = 5+"";
				     fCount++;
				     //osX+=mouseX/document.documentElement.clientWidth;
				     //osY+=mouseY/document.documentElement.clientHeight;
				     //var c = fCount/1000.0;
				     //if(debug)console.log(fCount);			     
				     if (gl) {
					     //if(debug)console.log('actualiz');
					     //gl.clearColor(1.0, 1.0, 1.0, 1.0);
					     //gl.clear(gl.COLOR_BUFFER_BIT)
					     gl.uniform1f(gl.getUniformLocation(pictureprogram, "time"), fCount);
					     //gl.uniform1f(gl.getUniformLocation(pictureprogram, "offSX"), osX);
					     //gl.uniform1f(gl.getUniformLocation(pictureprogram, "offSY"), osY);
					     gl.drawArrays(gl.TRIANGLES, 0, resolution * resolution * 2 * 3);
				     }
			     }
		     },
		     keyPressed : function(keyCode){
		     },

		     mousePos : function(mX,mY){
			     mouseX=mX;
			     mouseY=mY;
			     if(ready){
				viento.setBaseF1(500+500*mouseY/document.documentElement.clientHeight);
				viento.setBaseF2(600+1000*mouseX/document.documentElement.clientWidth);
			}
		     }

	};

})();

libsElement[libsElement.length-1].onload=function(){
	app.init();
};

