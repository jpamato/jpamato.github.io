// outgoing coordinate
varying vec2 v_texCoord;

// incoming coordinate (point)
attribute vec2 a_texCoord;  

void main() { 
	v_texCoord = a_texCoord;  
	// Set up position variable with current coordinate normalized from 0 - 1 to -1 to 1 range 
	vec2 position = a_texCoord * 2.0 - 1.0; 
	// gl_Position always specifies where to render this vector 
	gl_Position = vec4(position, 0.0, 1.0);     // x,y,z,
}
