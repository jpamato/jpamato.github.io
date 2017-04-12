precision mediump float;

// uniform to use for u_image 
uniform sampler2D u_image;

// Output of the vertex shader 
varying vec2 v_texCoord;
uniform float time;
uniform float offSX;
uniform float offSY;
uniform vec2 resolution;

#define PI 3.1415926535897932384626433832795

void main() {
	//vec2 pos = gl_FragCoord.xy;
	vec2 pos =  -1.0 + 2.0 * gl_FragCoord.xy/resolution.xy;
	pos.x-=offSX;
	pos.y+=offSY;
	float a1 = atan(pos.y, pos.x);
	float r1 = sqrt(dot(pos, pos));
	vec2 uv=pos;

	//uv.x = 0.2 * time + (r1 - r2) * 0.25;
	//uv.y = sin(2.0 * (a1 - a2));

	//uv.x = 0.5*a1/(asin(-1.0));
	//uv.y = sin(7.0*r1);

	uv.x = 0.0125*a1/PI;
	uv.y = sin(4.0*PI*r1);

	//uv.y += 0.01*time;
	uv.y =0.1*sin(uv.y+0.05*time);

	//vec3 col = texture2D(u_image, 0.5 - 0.495 * uv).xyz;

	//vec3 col = texture2D(u_image, v_texCoord).xyz;
	vec3 col = texture2D(u_image, uv).xyz;
	//col.xy*=0.9;
	//vec3 col = vec4(uv.y,0,0,1).xyz;
	//vec3 col = vec3(0.0,0.0,0.0);

	//float w = 0.9 + 0.1 * sin(4.0*PI*r1);	
	float w = 0.85 + 0.05 * sin(uv.y+0.05*time);	
	gl_FragColor = vec4(col,w);
}
