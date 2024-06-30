if (false) {

let resetShader = false;
let smoothDots = new ShaderProgram("smooth-dots");

smoothDots.vertText = `
    // beginGLSL
    attribute vec4 coordinates;
    varying vec2 myposition;
    varying vec2 center;
    varying float alph;
    varying float pointSize;
    void main(void) {
        gl_Position = vec4(coordinates.x, coordinates.y, 0.0, 1.0);
        center = vec2(gl_Position.x, gl_Position.y);
        center = 512.0 + center * 512.0;
        myposition = vec2(gl_Position.x, gl_Position.y);
        alph = coordinates.w;
        gl_PointSize = 256.;
        pointSize = gl_PointSize;
    }
    // endGLSL
`;
smoothDots.fragText = `
    // beginGLSL
    precision mediump float;
    varying vec2 myposition;
    varying vec2 center;
    varying float alph;
    varying float pointSize;
    float rand(vec2 co){
        return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453 * (2.0 + sin(co.x)));
    }
    void main(void) {
        // gl_FragCoord is the global pixel position on the canvas.
        vec2 uv = gl_FragCoord.xy / vec2(2560., 1600.) * 2.;
        // gl_PointCoord is the local pixel position within the point.
        vec2 pos = gl_PointCoord;
        float distSquared = 1.0 - dot(pos - 0.5, pos - 0.5) * 4.;
        vec3 col = vec3(pos.x, pos.y, 1. - pos.x);
        col = vec3(1.0 - length(pos - vec2(0.5)) * 2.);
        col = vec3(distSquared);
        // col = smoothstep(0.0, 1.0, col);
        // col = max(vec3(0.0), col);
        // col = col * col * (3.0 - 4.0 * col);
        gl_FragColor = vec4(col, 1.0);
        
    }
    // endGLSL
`;
smoothDots.vertText = smoothDots.vertText.replace(/[^\x00-\x7F]/g, "");
smoothDots.fragText = smoothDots.fragText.replace(/[^\x00-\x7F]/g, "");
smoothDots.init();
if (resetShader){
    currentProgram = getProgram("smooth-dots");
    gl.useProgram(currentProgram);
}
resetShader = true;

}