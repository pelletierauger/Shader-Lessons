if (false) {

// The simplest shader
setBothShaders(`
// beginGLSL
precision mediump float;
varying vec2 vTexCoord;
uniform float time;
uniform vec2 resolution;
void main() {
    vec2 uv = gl_FragCoord.xy / resolution;
    gl_FragColor = vec4(uv.x, uv.y, 0.0, 1.0);
}
// endGLSL
`);

}