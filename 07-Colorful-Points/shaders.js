let resetShader = false;
let smoothDots = new ShaderProgram("smooth-dots");

smoothDots.vertText = `
    // beginGLSL
    attribute vec3 position;
    attribute vec4 color;
    varying vec4 c;
    void main(void) {
        gl_Position = vec4(position, 1.0);
        gl_PointSize = 6.;
        c = color;
    }
    // endGLSL
`;
smoothDots.fragText = `
    // beginGLSL
    precision mediump float;
    varying vec4 c;
    float rand(vec2 co){
        return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453 * (2.0 + sin(co.x)));
    }
    void main(void) {
        // gl_PointCoord is the local pixel position within the point.
        vec2 pos = gl_PointCoord;
        float distSquared = 1.0 - dot(pos - 0.5, pos - 0.5) * 4.;
        gl_FragColor = vec4(c.r, c.g, c.b, c.a * distSquared);
    }
    // endGLSL
`;
smoothDots.init();
if (resetShader){
    currentProgram = getProgram("smooth-dots");
    gl.useProgram(currentProgram);
}
resetShader = true;