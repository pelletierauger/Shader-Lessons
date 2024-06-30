let smoothDotsVertex = new ShaderProgram("smooth-dots-vertex");

smoothDotsVertex.vertText = `
    // beginGLSL    
    attribute float vertexID;
    uniform vec2 resolution;
    uniform float time;
    void main(void) {
        float i = vertexID;
        float x = cos(i * time * 1e-3) * i * 1e-4;
        float y = sin(i * time * 1e-3) * i * 1e-4;
        float ratio = resolution.y / resolution.x;
        x *= ratio;
        gl_Position = vec4(x, y, 0.0, 1.0);
        gl_PointSize = 3.;
    }
    // endGLSL
`;
smoothDotsVertex.fragText = `
    // beginGLSL
    precision mediump float;
    float rand(vec2 co){
        return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453 * (2.0 + sin(co.x)));
    }
    void main(void) {
        // gl_PointCoord is the local pixel position within the point.
        vec2 pos = gl_PointCoord;
        float distSquared = 1.0 - dot(pos - 0.5, pos - 0.5) * 4.;
        gl_FragColor = vec4(vec3(1.0), distSquared);
    }
    // endGLSL
`;
smoothDotsVertex.vertText = smoothDotsVertex.vertText.replace(/[^\x00-\x7F]/g, "");
smoothDotsVertex.fragText = smoothDotsVertex.fragText.replace(/[^\x00-\x7F]/g, "");
smoothDotsVertex.init();
if (shadersReadyToInitiate) {
    currentProgram = smoothDotsVertex.program;
    gl.useProgram(currentProgram);
    resolutionUniformLocation = gl.getUniformLocation(currentProgram, "resolution");
    gl.uniform2f(resolutionUniformLocation, cnvs.width, cnvs.height);
    timeUniformLocation = gl.getUniformLocation(currentProgram, "time");
}

if (false) {


smoothDotsVertex.vertText = `
    // beginGLSL    
    precision mediump float;
    #define pi 3.1415926535897932384626433832795
    attribute float vertexID;
    uniform vec2 resolution;
    uniform float time;
    varying vec4 c;
    void main(void) {
        float i = vertexID;
        float x = cos(i * time * 1e-3) * i * 1e-4;
        float y = sin(i * time * 1e-3) * i * 1e-4;
        float ratio = resolution.y / resolution.x;
        x *= ratio;
        gl_Position = vec4(x, y, 0.0, 1.0);
        vec2 pos = vec2(x, y);
        pos.x /= ratio;
        c = vec4(vec3(0.0), 1.0);
        c.r = 1.0 - length(pos);
        c.g = abs(atan(pos.y, pos.x) / pi);
        c.b = sin(c.r * 20.) * 0.5 + 0.5;
        gl_PointSize = 6.;
    }
    // endGLSL
`;
smoothDotsVertex.fragText = `
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
smoothDotsVertex.vertText = smoothDotsVertex.vertText.replace(/[^\x00-\x7F]/g, "");
smoothDotsVertex.fragText = smoothDotsVertex.fragText.replace(/[^\x00-\x7F]/g, "");
smoothDotsVertex.init();
currentProgram = smoothDotsVertex.program;
gl.useProgram(currentProgram);
resolutionUniformLocation = gl.getUniformLocation(currentProgram, "resolution");
gl.uniform2f(resolutionUniformLocation, cnvs.width, cnvs.height);
timeUniformLocation = gl.getUniformLocation(currentProgram, "time");

}