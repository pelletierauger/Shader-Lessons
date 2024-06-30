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
    uniform vec2 resolution;
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
smoothDots.vertText = smoothDots.vertText.replace(/[^\x00-\x7F]/g, "");
smoothDots.fragText = smoothDots.fragText.replace(/[^\x00-\x7F]/g, "");
smoothDots.init();
if (shadersReadyToInitiate) {
    currentProgram = smoothDots.program;
    gl.useProgram(currentProgram);
    resolutionUniformLocation = gl.getUniformLocation(currentProgram, "resolution");
    gl.uniform2f(resolutionUniformLocation, cnvs.width, cnvs.height);
}

if (false) {

// Defining the colors of the dots inside the vertex shader.
smoothDots.vertText = `
    // beginGLSL
    attribute vec3 position;
    attribute vec4 color;
    varying vec4 c;
    void main(void) {
        gl_Position = vec4(position, 1.0);
        gl_PointSize = 6.;
        vec2 pos = gl_Position.xy + vec2(0.5);
        c = vec4(pos.x, pos.y, 1.0 - pos.x, 1.0);
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
smoothDots.vertText = smoothDots.vertText.replace(/[^\x00-\x7F]/g, "");
smoothDots.fragText = smoothDots.fragText.replace(/[^\x00-\x7F]/g, "");
smoothDots.init();
currentProgram = smoothDots.program;
gl.useProgram(currentProgram);
resolutionUniformLocation = gl.getUniformLocation(currentProgram, "resolution");
gl.uniform2f(resolutionUniformLocation, cnvs.width, cnvs.height);

// Defining the colors of the dots inside the vertex shader.
smoothDots.vertText = `
    // beginGLSL
    precision mediump float;
    #define pi 3.1415926535897932384626433832795
    attribute vec3 position;
    attribute vec4 color;
    uniform vec2 resolution;
    varying vec4 c;
    void main(void) {
        gl_Position = vec4(position, 1.0);
        gl_PointSize = 6.;
        vec2 pos = gl_Position.xy;
        float ratio = (resolution.y / resolution.x);
        pos.x /= ratio;
        c = vec4(vec3(0.0), 1.0);
        c.r = 1.0 - length(pos);
        c.g = abs(atan(pos.y, pos.x) / pi);
        c.b = sin(c.r * 19. + 3.) * 0.5 + 0.5;
        c.r *= 1.125;
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
smoothDots.vertText = smoothDots.vertText.replace(/[^\x00-\x7F]/g, "");
smoothDots.fragText = smoothDots.fragText.replace(/[^\x00-\x7F]/g, "");
smoothDots.init();
currentProgram = smoothDots.program;
gl.useProgram(currentProgram);
resolutionUniformLocation = gl.getUniformLocation(currentProgram, "resolution");
gl.uniform2f(resolutionUniformLocation, cnvs.width, cnvs.height);

}
