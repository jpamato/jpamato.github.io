precision mediump float;

// uniform to use for u_image 
//uniform sampler2D u_image;

// Output of the vertex shader 
//varying vec2 v_texCoord;
uniform float time;
//uniform float offSX;
//uniform float offSY;
uniform vec2 resolution;

void main() {
	//vec2 pos = gl_FragCoord.xy;
	vec2 pos =  -1.0 + 2.0 * gl_FragCoord.xy/resolution.xy;
	float a1 = atan(pos.y, pos.x);
	float r1 = sqrt(dot(pos, pos));
	vec2 uv=pos;

	//uv.x = 0.2 * time + (r1 - r2) * 0.25;
	//uv.y = sin(2.0 * (a1 - a2));

	//uv.x = 0.5*a1/(asin(-1.0));
	//uv.y = sin(7.0*r1);

	uv.x = 1.0/(r1);
	uv.y = a1;

	uv.x += 0.001*time;
	uv.y += 0.001*time;

	//vec3 col = texture2D(u_image, 0.5 - 0.495 * uv).xyz;

	//vec3 col = texture2D(u_image, v_texCoord).xyz;
	//vec3 col = texture2D(u_image, uv).xyz;
	//vec3 col = vec4(uv.y,0,0,1).xyz;
	vec3 col = vec3(0.3,0.1,0.0);

	//float w = 0.7 + 0.3 * sin(7.0*r1);
	//float w =1.0/0.2*(r1*r1*r1);

	float h = (0.5 + 0.5*cos(mod(0.001*time,9.0)*a1+0.0009*time));
	float ao = smoothstep(0.0,0.3,h)-smoothstep(0.5,1.0,h);
	col *= 1.1*ao*r1;
	//col = abs(col-1.0);
	col *= r1*r1;

	gl_FragColor = vec4(col,0.1);
}
