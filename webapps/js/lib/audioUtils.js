//Audio Utiles Generales ----------------------------------------
function AudioUtils (audioCtx) {
	this.actx = audioCtx;
};

AudioUtils.prototype.wNoise = function(dur) {
	var lengthInSamples = dur * this.actx.sampleRate;
	var buffer = this.actx.createBuffer(1, lengthInSamples, this.actx.sampleRate);
	var data = buffer.getChannelData(0);

	for (var i = 0; i < lengthInSamples; i++) {
		data[i] = ((Math.random() * 2) - 1);
	}	
	return buffer;
};

AudioUtils.prototype.clip = function(value,min,max) {
	return value > max ? max : value < min ? min : value;
}

//Generador Sinusoidal ----------------------------------------
function Osc(freq, ac){
	this.ac = ac;
	this.phase = 0;
	this.delta_phase = freq / this.ac.sampleRate;
};
Osc.prototype.getSample = function(){
	var r = Math.sin(2*Math.PI*this.phase);
	this.phase += this.delta_phase;
	return r;
}
Osc.prototype.fillBuffer = function(buffer, length){
	for(var i=0; i<length; i++){
		buffer[i] = this.getSample();				
	}
};
Osc.prototype.setFreq = function(f){
	this.delta_phase = f / this.ac.sampleRate;
};

//RT Noise Generator ----------------------------------------
function Noise(ac){
	this.ac = ac;
	//this.phase = 0;
};
Noise.prototype.getSample = function(){
	var r = ((Math.random() * 2) - 1);
	//this.phase += this.delta_phase;
	return r;
}
Noise.prototype.fillBuffer = function(buffer, length){
	for(var i=0; i<length; i++){
		buffer[i] = this.getSample();				
	}
};

//Envolvente ----------------------------------------
function Envelope(ac) {
	this.ac = ac;
	this.node = audioCtx.createGain()
	this.node.gain.value = 0;
	this.buffer;
}

Envelope.prototype.connect = function(dest) {
	this.node.connect(dest);
};

Envelope.prototype.setDur = function(dur) {
	this.node.gain.setValueCurveAtTime(buffer, this.ac.currentTime, dur);
};

Envelope.prototype.setEad = function(durIn, durOut) {
	var cantIn = durIn * 0.001 * this.ac.sampleRate;
	var cantOut = durOut * 0.001 * this.ac.sampleRate;
	var buffIn = cLogar(0,1,cantIn);
	var buffOut = cExpon(1,0,cantOut);
	this.node.gain.setValueCurveAtTime(buffIn, this.ac.currentTime, durIn*0.001);
	this.node.gain.setValueCurveAtTime(buffOut, this.ac.currentTime+(durIn*0.001), durOut*0.001);
	this.node.gain.setValueAtTime(0, this.ac.currentTime+(durIn*0.001)+(durOut*0.001));
	
};


function cLogar(primero, ultimo, cant) {
	var log = new Float32Array(cant);
	if(cant>1){
		for (var i = 0; i < cant; i++) {
			log[i] = (primero + Math.log(i + 1) / Math.log(cant)*(ultimo - primero));	
		}
	}else{
		log[0]=primero;
	}
	return log;
}

function cExpon(primero, ultimo, cant) {
	var expon = new Float32Array(cant);
	var a=0;
	for (var i = 0; i < cant; i++) {
		a = (i * i) / (cant * cant);
		expon[i] = primero + a * (ultimo - primero);			
	}
	return expon;
}

// Files ---------------------------------------
function loadSound(url) {
	var request = new XMLHttpRequest();
	request.open('GET', url, true);
	request.responseType = 'arraybuffer';

	// Decode asynchronously
	request.onload = function() {
		audioCtx.decodeAudioData(request.response, function(buffer) {
			sound = buffer;
		}, function(error) {
			console.error('decodeAudioData error', error);
		});
	}
	request.send();
}

function loadIR(url, buf) {
	var request = new XMLHttpRequest();
	request.open('GET', url, true);
	request.responseType = 'arraybuffer';

	// Decode asynchronously
	request.onload = function() {
		audioCtx.decodeAudioData(request.response, function(buffer) {
			//reverb.buffer = buffer;
			buf = buffer;
		}, function(error) {
			console.error('decodeAudioData error', error);
		});
	}
	request.send();
}
