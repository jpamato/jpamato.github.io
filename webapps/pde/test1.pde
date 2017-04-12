int c=0;
int[] px,py,pxa,pya,c;
float[] vel,ang,rango;
int cant=100;
float alpha=16;
boolean up;
int MAX=127,MIN=0;
int resTrazo = 100;
int anchoTrazo = 30;

void setup(){
	size(document.documentElement.clientWidth,document.documentElement.clientHeight);
	px = new int[cant];
	py = new int[cant];
	pxa = new int[cant];
	pya = new int[cant];
	c = new int[cant];
	vel = new float[cant];
	ang = new float[cant];
	for(int i=0;i<cant;i++){
		px[i] = (int)random(width);
		py[i] = (int)random(height);
		pxa[i]=px[i];
		pya[i]=py[i];
		vel[i] = random(0.1,5);
		ang[i] = random(TWO_PI);
		ang[i] = atan2(mouseX-width/2,mouseY-height/2);
		c[i] = color((int)random(255),(int)random(255),(int)random(255));
	}
	background(255);
}

void draw(){
	//background(127);
	noStroke();
	fill(255,alpha);
	rect(0,0,width,height);
	for(int i=0;i<cant;i++){
		stroke(c[i]);
		//stroke(0);
		line(px[i],py[i],pxa[i],pya[i]);
		//trazoLinea(px[i],py[i],anchoTrazo,resTrazo);
		pxa[i] = px[i];
		pya[i] = py[i];
		px[i]+=vel[i]*sin(ang[i]);
		if(px[i]>width){
			px[i]=0;
			pxa[i]=0;
		}else if(px[i]<0){
			px[i]=width;
			pxa[i]=width;
		}
		py[i]+=vel[i]*cos(ang[i]);
		if(py[i]>height){
			py[i]=0;
			pya[i]=0;
		}else if(py[i]<0){
			py[i]=height;
			pya[i]=height;
		}
		ang[i]+=random(-0.5,0.5);
	}
	
	/*anchoTrazo = 30 * noise(frameCount*0.1);
	//println(anchoTrazo);
	resTrazo = 50 + 50 * noise(frameCount*0.1);*/

	

	if(up){
		alpha+=0.1;
		if(alpha>MAX){
			alpha=MAX;
			up=false;
		}
	}else{
		alpha-=0.1;
		if(alpha<MIN){
			alpha=MIN;
			up=true;
		}
	}
}

void keyPressed(int keycode){
	if(keycode==99){//c
		for(int i=0;i<cant;i++){
			c[i] = color((int)random(255),(int)random(255),(int)random(255));
		}
	}
}

void trazoPunto(float x, float y, int anchoT, int trazR){
  pushStyle();
  float mdist = dist(anchoT,0,0,anchoT);
 color a = color(0,127,127);
  color b = color(0,0,0); 
  for(int i=0;i<trazR;i++){
    float ppx=x+random(anchoT);
    float ppy=y+random(anchoT);
    float alpha = dist(x,y,ppx,ppy)/mdist;   
    stroke(lerpColor(a,b,alpha),64-64*alpha);   
    point(ppx,ppy);    
  }
  popStyle();  
}

void trazoLinea(float x, float y, int anchoT, int trazR){
  pushStyle();
  float mdist = dist(anchoT,0,0,anchoT);
  color a = color(255,32,0);
  color b = color(255,255,255);
  for(int i=0;i<trazR;i++){
    float ppx=x+random(anchoT);
    float ppy=y+random(anchoT);
    float alpha = dist(x,y,ppx,ppy)/mdist;   
    stroke(lerpColor(a,b,alpha),64-64*alpha);   
    line(x,y,ppx,ppy);    
  }
  popStyle();
}

void trazoEllipse(float x, float y, int anchoT, int trazR,int tam){
  pushStyle();
  float mdist = dist(anchoT,0,0,anchoT);
  color a = color(255,32,0);
  color b = color(255,255,255);
  for(int i=0;i<trazR;i++){
    float ppx=x+random(anchoT);
    float ppy=y+random(anchoT);
    float alpha = dist(x,y,ppx,ppy)/mdist;
     noStroke();   
    fill(lerpColor(a,b,alpha),64-64*alpha);   
    ellipse(ppx,ppy,tam,tam);    
  }
  popStyle();
}

void trazoPenta(float x, float y, int anchoT, int trazR, int reso, int tam){
  pushStyle();
  float mdist = dist(anchoT,0,0,anchoT);
  for(int i=0;i<trazR;i++){
    float ppx=x+random(anchoT*10);
    float ppy=y+random(anchoT*10);
    float alpha = dist(x,y,ppx,ppy)/mdist;      
    noFill();
    stroke(255,0,0,64-64*alpha);   
    
    beginShape();
   for(int j=0;j<reso;j++){
     float px = ppx + tam * sin(j*TWO_PI/reso);
     float py = ppy + tam * cos(j*TWO_PI/reso);
     vertex(px,py);   
   } 
   endShape(CLOSE);   
  }
  popStyle();
}
