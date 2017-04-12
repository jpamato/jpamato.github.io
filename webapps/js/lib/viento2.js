function Viento2(ac) {
	this.ac = ac;
	var noise = new Noise(this.ac);
	this.node = this.ac.createScriptProcessor(512, 0, 1);
	this.node.onaudioprocess = function(e)
	{
		noise.fillBuffer(e.outputBuffer.getChannelData(0), e.outputBuffer.length);
	};
	var mult1 = 80000;
	var mult2 = 160000;
	var baseF1 = 500;
	var baseF2 = 600;
	this.lp1  = this.ac.createBiquadFilter();
	this.lp1.type = "lowpass";
	this.lp1.frequency.value =0.1;
	this.node.connect(this.lp1);
	this.lp2  = this.ac.createBiquadFilter();
	this.lp2.type = "lowpass";
	this.lp2.frequency.value =0.19;
	this.node.connect(this.lp2);
	var bp1  = this.ac.createBiquadFilter();
	bp1.type = "bandpass";
	bp1.Q.value = 7;
	var bp2  = this.ac.createBiquadFilter();
	bp2.type = "bandpass";
	bp2.Q.value = 20;
	var proc1 = this.ac.createScriptProcessor(512, 1, 1);
	proc1.onaudioprocess = function(e){
		var Lin = e.inputBuffer.getChannelData(0);
		var Lout = e.outputBuffer.getChannelData(0);
		for (var i = 0; i < e.inputBuffer.length; i++) {
			var buff = Lin[i]*mult1;
			buff = buff > 1000 ? 1000 : buff < 0 ? 0 : buff;
			bp1.frequency.value = buff+baseF1;
			Lout[i] = Lin[i];
		}
	};
	var proc2 = this.ac.createScriptProcessor(512, 1, 1);
	proc2.onaudioprocess = function(e){
		var Lin = e.inputBuffer.getChannelData(0);
		var Lout = e.outputBuffer.getChannelData(0);
		for (var i = 0; i < e.inputBuffer.length; i++) {
			var buff = Lin[i]*mult2;
			buff = buff > 1000 ? 1000 : buff < 0 ? 0 : buff;
			bp2.frequency.value = buff+baseF2;
			Lout[i] = Lin[i];
		}
	};
	this.lp1.connect(proc1);
	this.lp2.connect(proc2);
	proc1.connect(bp1);
	proc2.connect(bp2);
	this.node.connect(bp1);
	this.node.connect(bp2);
	this.gval = 0.45;
	this.g = this.ac.createGain();
	this.g.gain.value = this.gval;
	bp1.connect(this.g);	
	bp2.connect(this.g);	
	var lp3  = this.ac.createBiquadFilter();
	lp3.type = "lowpass";
	lp3.frequency.value=1.0;
	this.node.connect(lp3)
	var g2 = this.ac.createGain();
	g2.gain.value = 0;
	var proc3 = this.ac.createScriptProcessor(512, 1, 1);
	proc3.onaudioprocess = function(e){
		var Lin = e.inputBuffer.getChannelData(0);
		var Lout = e.inputBuffer.getChannelData(0);
		//console.log(e.inputBuffer.length);
		for (var i = 0; i < e.inputBuffer.length; i++) {
			var b = Lin[i]*Lin[i]*2000+0.5;
			//console.log(b);
			//this.g2.gain.value = (Math.pow(Lin[i],2)*2000)+0.5;
			g2.gain.value = b;
			//this.g2.gain.setValueAtTime(b, this.ac.currentTime);
			Lout[i] = Lin[i];
		}
	};
	lp3.connect(proc3);
	this.g.connect(g2);
	this.lastBp  = this.ac.createBiquadFilter();
	this.lastBp.type = "bandpass";
	this.lastBp.frequency.value = 1000;
	this.lastBp.Q.value = 7;
	proc3.connect(this.lastBp);
	g2.connect(this.lastBp);
	this.isPlaying = false;	
	this.gAtt = 100;
	this.gDec = 1000;
	this.buffIn = cLogar(0,this.gval, this.gAtt * 0.001 * this.ac.sampleRate);
	this.buffOut = cExpon(this.gval,0, this.gDec * 0.001 * this.ac.sampleRate);
	var mult1 = 80000;
	var mult2 = 160000;
	var baseF1 = 500;
	var baseF2 = 600;
	this.setBp1Q = function(val) {
		bp1.Q.value = val;
	}
	this.setBp2Q = function(val) {
		bp2.Q.value = val;
	}
	this.setBaseF1 = function(val) {
		baseF1 = val;
	}
	this.setBaseF2 = function(val) {
		baseF2 = val;
	}
	this.setMult1 = function(val) {
		mult1 = val;
	}
	
	this.setMult2 = function(val) {
		mult2 = val;
	}
}

Viento2.prototype.connect = function(dest) {
	this.lastBp.connect(dest);
};

Viento2.prototype.play = function(){

	//console.log("Fin:"+this.fAtt+" Fout:50"+"F:"+this.freq);
	this.g.gain.cancelScheduledValues(this.ac.currentTime);
	var att = 0
	if(stopT>this.ac.currentTime){
		att = 500;
		this.g.gain.linearRampToValueAtTime(0,att);
	}
	

	this.g.gain.setValueCurveAtTime(this.buffIn, att+this.ac.currentTime, this.gAtt * 0.001);
	this.g.gain.setValueCurveAtTime(this.buffOut, att+this.ac.currentTime+(this.gAtt * 0.001), this.gDec * 0.001);
	var stopT = att + this.ac.currentTime+(this.gAtt * 0.001)+(this.gDec * 0.001);
	this.g.gain.setValueAtTime(0, stopT);

	/*if(!this.isPlaying){
		this.node[this.node.start ? 'start' : 'noteOn'](att);
		this.isPlaying = true;
	}*/
}

Viento2.prototype.setEad = function(durIn, durOut) {
	var cantIn = durIn * 0.001 * this.ac.sampleRate;
	var cantOut = durOut * 0.001 * this.ac.sampleRate;
	var buffIn = cLogar(0,0.1,cantIn);
	var buffOut = cExpon(0.1,0,cantOut);
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


