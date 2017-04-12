function Burbuja(ac) {
	this.ac = ac;
	this.node = this.ac.createOscillator();
	this.g = this.ac.createGain();
	this.g.gain.value = 0;
	this.mGain = 0.03;
	this.node.connect(this.g);
	this.isPlaying = false;	
	this.hp1  = this.ac.createBiquadFilter();
	this.hp1.type = "highpass";
	this.hp1.frequency.value = 100;
	this.g.connect(this.hp1);
	this.freq = 1000;
	this.fAtt = 1000;//0 a 3000
	this.fDec = 50;//0 a 3000
	this.gAtt = 23;
	this.gDec = 100;
	this.buffIn = cLogar(0,this.mGain, this.gAtt * 0.001 * this.ac.sampleRate);
	this.buffOut = cExpon(this.mGain,0, this.gDec * 0.001 * this.ac.sampleRate);
	this.fbuffIn = cLogar(0,this.freq, this.fAtt * 0.001 * this.ac.sampleRate);
	this.fbuffOut = cExpon(this.freq,0, this.fDec * 0.001 * this.ac.sampleRate);
}

Burbuja.prototype.connect = function(dest) {
	this.hp1.connect(dest);
};


Burbuja.prototype.playF = function(f){

	//console.log("Fin:"+this.fAtt+" Fout:50"+"F:"+f);
	this.g.gain.cancelScheduledValues(this.ac.currentTime);
	this.node.frequency.cancelScheduledValues(this.ac.currentTime);	
	var att = 0;
	if(stopT>this.ac.currentTime){
		att = 0.5;
		this.g.gain.linearRampToValueAtTime(0,att);
	}
	
	this.g.gain.setValueCurveAtTime(this.buffIn, att+this.ac.currentTime, this.gAtt * 0.001);
	this.g.gain.setValueCurveAtTime(this.buffOut, att+this.ac.currentTime+(this.gAtt * 0.001), this.gDec * 0.001);
	var stopT = att + this.ac.currentTime+(this.gAtt * 0.001)+(this.gDec * 0.001);
	this.g.gain.setValueAtTime(0, stopT);
	this.freq = f;
	this.fbuffIn = cLogar(0,this.freq, this.fAtt * 0.001 * this.ac.sampleRate);
	this.fbuffOut = cExpon(this.freq,0, this.fDec * 0.001 * this.ac.sampleRate);
	this.node.frequency.setValueCurveAtTime(this.fbuffIn, att+this.ac.currentTime, this.fAtt * 0.001);
	this.node.frequency.setValueCurveAtTime(this.fbuffOut, att+this.ac.currentTime+(this.fAtt * 0.001), this.fDec * 0.001);
	this.node.frequency.setValueAtTime(0, att+this.ac.currentTime+(this.fAtt * 0.001)+(this.fDec * 0.001));

	if(!this.isPlaying){
		this.node[this.node.start ? 'start' : 'noteOn'](att);
		this.isPlaying = true;
	}
}
Burbuja.prototype.playFDel = function(f,start){

	//console.log("Fin:"+this.fAtt+" Fout:50"+"F:"+f);
	this.g.gain.cancelScheduledValues(this.ac.currentTime);
	this.node.frequency.cancelScheduledValues(this.ac.currentTime);	
	var att = 0.0;
	if(stopT>this.ac.currentTime){
		att = 0.5;
		this.g.gain.linearRampToValueAtTime(0,att);
	}
	att+=start;
	this.g.gain.setValueCurveAtTime(this.buffIn, att+this.ac.currentTime, this.gAtt * 0.001);
	this.g.gain.setValueCurveAtTime(this.buffOut, att+this.ac.currentTime+(this.gAtt * 0.001), this.gDec * 0.001);
	var stopT = att + this.ac.currentTime+(this.gAtt * 0.001)+(this.gDec * 0.001);
	this.g.gain.setValueAtTime(0, stopT);
	this.freq = f;
	this.fbuffIn = cLogar(0,this.freq, this.fAtt * 0.001 * this.ac.sampleRate);
	this.fbuffOut = cExpon(this.freq,0, this.fDec * 0.001 * this.ac.sampleRate);
	this.node.frequency.setValueCurveAtTime(this.fbuffIn, att+this.ac.currentTime, this.fAtt * 0.001);
	this.node.frequency.setValueCurveAtTime(this.fbuffOut, att+this.ac.currentTime+(this.fAtt * 0.001), this.fDec * 0.001);
	this.node.frequency.setValueAtTime(0, att+this.ac.currentTime+(this.fAtt * 0.001)+(this.fDec * 0.001));

	if(!this.isPlaying){
		this.node[this.node.start ? 'start' : 'noteOn'](att+start);
		this.isPlaying = true;
	}
}
Burbuja.prototype.play = function(){

	//console.log("Fin:"+this.fAtt+" Fout:50"+"F:"+this.freq);
	this.g.gain.cancelScheduledValues(this.ac.currentTime);
	this.node.frequency.cancelScheduledValues(this.ac.currentTime);	
	var att = 0
	if(stopT>this.ac.currentTime){
		att = 0.5;
		this.g.gain.linearRampToValueAtTime(0,att);
	}
	
	this.g.gain.setValueCurveAtTime(this.buffIn, att+this.ac.currentTime, this.gAtt * 0.001);
	this.g.gain.setValueCurveAtTime(this.buffOut, att+this.ac.currentTime+(this.gAtt * 0.001), this.gDec * 0.001);
	var stopT = att + this.ac.currentTime+(this.gAtt * 0.001)+(this.gDec * 0.001);
	this.g.gain.setValueAtTime(0, stopT);
	
	this.node.frequency.setValueCurveAtTime(this.fbuffIn, att+this.ac.currentTime, this.fAtt * 0.001);
	this.node.frequency.setValueCurveAtTime(this.fbuffOut, att+this.ac.currentTime+(this.fAtt * 0.001), this.fDec * 0.001);
	this.node.frequency.setValueAtTime(0, att+this.ac.currentTime+(this.fAtt * 0.001)+(this.fDec * 0.001));

	if(!this.isPlaying){
		this.node[this.node.start ? 'start' : 'noteOn'](att);
		this.isPlaying = true;
	}
}

Burbuja.prototype.setEad = function(durIn, durOut) {
	var cantIn = durIn * 0.001 * this.ac.sampleRate;
	var cantOut = durOut * 0.001 * this.ac.sampleRate;
	var buffIn = cLogar(0,0.1,cantIn);
	var buffOut = cExpon(0.1,0,cantOut);
	this.node.gain.setValueCurveAtTime(buffIn, this.ac.currentTime, durIn*0.001);
	this.node.gain.setValueCurveAtTime(buffOut, this.ac.currentTime+(durIn*0.001), durOut*0.001);
	this.node.gain.setValueAtTime(0, this.ac.currentTime+(durIn*0.001)+(durOut*0.001));
	
};
Burbuja.prototype.setFreq = function(freq) {
	this.freq = freq;
	this.fbuffIn = cLogar(0,this.freq, this.fAtt * 0.001 * this.ac.sampleRate)
	this.fbuffOut = cExpon(this.freq,0, this.fDec * 0.001 * this.ac.sampleRate);
}
Burbuja.prototype.setFAtt = function(val) {
	this.fAtt = val;
	this.fbuffIn = cLogar(0,this.freq, this.fAtt * 0.001 * this.ac.sampleRate)
}
Burbuja.prototype.setFDec = function(val) {
	this.fDec = val;
	this.fbuffOut = cExpon(this.freq,0, this.fDec * 0.001 * this.ac.sampleRate);
}
Burbuja.prototype.setGAtt = function(val) {
	this.gAtt = val;
	this.buffIn = cLogar(0,this.mGain, this.gAtt * 0.001 * this.ac.sampleRate);
}
Burbuja.prototype.setGDec = function(val) {
	this.gDec = val;
	this.buffOut = cExpon(this.mGain,0, this.gDec * 0.001 * this.ac.sampleRate);
}
Burbuja.prototype.setGVal = function(val) {
	this.mGain = val;
	this.buffIn = cLogar(0,this.mGain, this.gAtt * 0.001 * this.ac.sampleRate);
	this.buffOut = cExpon(this.mGain,0, this.gDec * 0.001 * this.ac.sampleRate);
}

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


