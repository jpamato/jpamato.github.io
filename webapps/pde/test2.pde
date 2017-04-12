Bola bola[];
int cant = 100;
boolean seguir;
int mouseX,mouseY;
float alpha=255;

void setup(){
	size(document.documentElement.clientWidth,document.documentElement.clientHeight);
	bola = new Bola[cant];
	for(int i=0;i<cant;i++){
		bola[i] = new Bola(80/(i+1));
	}  
}

void draw(){
	//background(255);
	noStroke();
	fill(255,alpha);
	rect(0,0,width,height);
	for(int i=0;i<cant;i++){  
		bola[i].animar();
		bola[i].dibujar();

		if(seguir){
			if(i>0){
				bola[i].seguir(bola[i-1]);
			}else{
				bola[i].seguir(mouseX,mouseY);
			}      
		}else{
			bola[i].sacudir();
		}
	}

	if(!seguir&&bola[0].dist(mouseX,mouseY)>width/2){
		seguir=true;
		alpha=127;
	}else if(seguir&&bola[cant-1].dist(mouseX,mouseY)<50){
		seguir=false;
		alpha=255;
	}
}
void setMousePos(int mX, int mY){
	mouseX = mX;
	mouseY = mY;
}
class Bola{

	PVector pos,vel,acc;
	int tam;

	Bola(){
		pos = new PVector(random(width),random(height));
		vel = new PVector(random(-5,5),random(-5,5));
		float ang = random(TWO_PI);
		acc = new PVector(cos(ang),sin(ang));
		tam = 10;
	}

	Bola(int t){
		pos = new PVector(random(width),random(height));
		vel = new PVector(random(-5,5),random(-5,5));
		float ang = random(TWO_PI);
		acc = new PVector(cos(ang),sin(ang));
		tam = t;
	}

	void animar(){
		if(vel.mag()>5){
			vel.normalize();
			vel.mult(5);

		}
		pos.add(vel);
		if(pos.x>width){
			pos.x =0;
		}else if(pos.x<0){
			pos.x =width;
		}    
		if(pos.y>height){
			pos.y =0;
		}else if(pos.y<0){
			pos.y =height;
		}
	}

	void sacudir(){
		vel.add(acc);
		float ang = random(TWO_PI);
		acc.set(cos(ang),sin(ang),0);
	}

	void seguir(PVector target){    
		acc = PVector.sub(target,pos);
		acc.normalize();
		acc.mult(5);
		float ang = random(-1,1);
		acc.add(cos(ang),sin(ang),0);
		vel.add(acc);
	}

	void seguir(int x, int y){
		PVector target = new PVector(x,y);    
		acc = PVector.sub(target,pos);
		acc.normalize();
		acc.mult(5);
		float ang = random(TWO_PI);
		acc.add(cos(ang),sin(ang),0);
		vel.add(acc);
	}

	void seguir(Bola target){    
		acc = PVector.sub(target.pos,pos);
		acc.normalize();
		acc.mult(5);
		float ang = random(TWO_PI);
		acc.add(cos(ang),sin(ang),0);
		vel.add(acc);
	}

	float dist(Bola target){    
		return pos.dist(target.pos);
	}

	float dist(PVector target){    
		return pos.dist(target);
	}

	float dist(int x, int y){    
		return pos.dist(new PVector(x,y));
	}

	void dibujar(){
		stroke(0);
		ellipse(pos.x,pos.y,tam,tam);    
	}
}
