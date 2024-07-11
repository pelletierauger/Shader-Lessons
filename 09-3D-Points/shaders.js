let smoothDotsVertex = new ShaderProgram("smooth-dots-vertex");

smoothDotsVertex.vertText = `
    // beginGLSL
    attribute float vertexID;
    uniform vec2 resolution;
    uniform float time;
    float map(float value, float min1, float max1, float min2, float max2) {
        return min2 + (value - min1) * (max2 - min2) / (max1 - min1);
    }
    mat4 translate(float x, float y, float z) {
        return mat4(
            1.0,  0.0,  0.0,  0.0,
            0.0,  1.0,  0.0,  0.0,
            0.0,  0.0,  1.0,  0.0,
            x,      y,    z,  1.0
        );
    }
    mat4 xRotate(float a) {
        return mat4(
           1.0, 0.0,        0.0, 0.0,
           0.0, cos(a), -sin(a), 0.0,
           0.0, sin(a),  cos(a), 0.0,
           0.0, 0.0,        0.0, 1.0
        );
    }
    mat4 yRotate(float a) {
        return mat4(
           cos(a),  0.0, sin(a), 0.0,
           0.0,     1.0,    0.0, 0.0,
           -sin(a), 0.0, cos(a), 0.0,
           0.0,     0.0,    0.0, 1.0
        );
    }
    mat4 zRotate(float a) {
        return mat4(
           cos(a), -sin(a), 0.0, 0.0,
           sin(a),  cos(a), 0.0, 0.0,
           0.0,        0.0, 1.0, 0.0,
           0.0,        0.0, 0.0, 1.0
        );
    }
    void main(void) {
        float ratio = resolution.y / resolution.x;
        float i = vertexID;
        float s = 240.;
        float x = fract(i / s);
        float y = floor(i / s) / s;
        x = map(x, 0., 1., -1., 1.);
        y = map(y, 0., 1., -1., 1.);
        float a = time * 1e-1;
        vec4 pos = vec4(x, y, 1.0, 1.0);
        pos = translate(0.0, 0.0, 3.0) * pos;
        pos = translate(0.0, 0.0, 3.0) * yRotate(a) * translate(0.0, 0.0, -3.0) * pos;
        pos.x *= ratio;
        gl_Position = vec4(pos.x, pos.y, 0.0, pos.z);
        gl_PointSize = 4.;
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
    #define pi 3.1415926535897932384626433832795
    attribute float vertexID;
    uniform vec2 resolution;
    uniform float time;
    varying float z;
    float rand(vec2 co){
        return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453 * (2.0 + sin(co.x)));
    }
    float map(float value, float min1, float max1, float min2, float max2) {
        return min2 + (value - min1) * (max2 - min2) / (max1 - min1);
    }
    mat4 translate(float x, float y, float z) {
        return mat4(
            1.0,  0.0,  0.0,  0.0,
            0.0,  1.0,  0.0,  0.0,
            0.0,  0.0,  1.0,  0.0,
            x,      y,    z,  1.0
        );
    }
    mat4 xRotate(float a) {
        return mat4(
           1.0, 0.0,        0.0, 0.0,
           0.0, cos(a), -sin(a), 0.0,
           0.0, sin(a),  cos(a), 0.0,
           0.0, 0.0,        0.0, 1.0
        );
    }
    mat4 yRotate(float a) {
        return mat4(
           cos(a),  0.0, sin(a), 0.0,
           0.0,     1.0,    0.0, 0.0,
           -sin(a), 0.0, cos(a), 0.0,
           0.0,     0.0,    0.0, 1.0
        );
    }
    mat4 zRotate(float a) {
        return mat4(
           cos(a), -sin(a), 0.0, 0.0,
           sin(a),  cos(a), 0.0, 0.0,
           0.0,        0.0, 1.0, 0.0,
           0.0,        0.0, 0.0, 1.0
        );
    }
    void main(void) {
        float ratio = resolution.y / resolution.x;
        float i = vertexID;
        float s = 240.;
        float x = fract(i / s);
        float y = floor(i / s) / s;
        x = map(x, 0., 1., -1., 1.);
        y = map(y, 0., 1., -1., 1.);
        float a = time * 1e-1;
        vec4 pos = vec4(x, y, 1.0, 1.0);
        pos.x += rand(pos.xy) * 0.005;
        pos.y += rand(pos.xy) * 0.005;
        pos = translate(0.0, 1.1, 0.5) * xRotate(pi * 1.75) * pos;
        pos = translate(0.0, (sin(pos.x * 2e1 + a) *0.5 + 0.5) * 0.1, 0.0) * pos;
        pos.x *= ratio;
        gl_Position = vec4(pos.x, pos.y, 0.0, pos.z);
        gl_PointSize = 4. - pow(pos.z, 3.) * 0.5;
        z = pos.z;
    }
    // endGLSL
`;
smoothDotsVertex.fragText = `
    // beginGLSL
    precision mediump float;
    varying float z;
    float rand(vec2 co){
        return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453 * (2.0 + sin(co.x)));
    }
    void main(void) {
        // gl_PointCoord is the local pixel position within the point.
        vec2 pos = gl_PointCoord;
        float distSquared = 1.0 - dot(pos - 0.5, pos - 0.5) * 4.;
        gl_FragColor = vec4(vec3(1.0), distSquared * 0.75 / z);
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

smoothDotsVertex.vertText = `
    // beginGLSL
    #define pi 3.1415926535897932384626433832795
    attribute float vertexID;
    uniform vec2 resolution;
    uniform float time;
    varying float z;
    float rand(vec2 co){
        return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453 * (2.0 + sin(co.x)));
    }
    float map(float value, float min1, float max1, float min2, float max2) {
        return min2 + (value - min1) * (max2 - min2) / (max1 - min1);
    }
    mat4 translate(float x, float y, float z) {
        return mat4(
            1.0,  0.0,  0.0,  0.0,
            0.0,  1.0,  0.0,  0.0,
            0.0,  0.0,  1.0,  0.0,
            x,      y,    z,  1.0
        );
    }
    mat4 xRotate(float a) {
        return mat4(
           1.0, 0.0,        0.0, 0.0,
           0.0, cos(a), -sin(a), 0.0,
           0.0, sin(a),  cos(a), 0.0,
           0.0, 0.0,        0.0, 1.0
        );
    }
    mat4 yRotate(float a) {
        return mat4(
           cos(a),  0.0, sin(a), 0.0,
           0.0,     1.0,    0.0, 0.0,
           -sin(a), 0.0, cos(a), 0.0,
           0.0,     0.0,    0.0, 1.0
        );
    }
    mat4 zRotate(float a) {
        return mat4(
           cos(a), -sin(a), 0.0, 0.0,
           sin(a),  cos(a), 0.0, 0.0,
           0.0,        0.0, 1.0, 0.0,
           0.0,        0.0, 0.0, 1.0
        );
    }
    void main(void) {
        float ratio = resolution.y / resolution.x;
        float i = vertexID;
        float s = 240.;
        float x = cos(i * 4e-2+time*1e-2) * i / pow(240., 2.);
        float y = sin(i * 4e-2+time*1e-2) * i / pow(240., 2.);
        float a = time * 1e-1;
        vec4 pos = vec4(x, y, 1.0, 1.0);
        pos = translate(0.0, 1.1, 0.1) * xRotate(pi * 1.8) * pos;
        pos = translate(0.0, ((sin(length(vec2(x,y))*4e1-(time*2e-1)))*0.5+0.5)*0.025, 0.0) * pos;
        pos.x *= ratio;
        gl_Position = vec4(pos.x, pos.y, 0.0, pos.z);
        gl_PointSize = 4. - pow(pos.z, 3.) * 0.5;
        z = pos.z;
    }
    // endGLSL
`;
smoothDotsVertex.fragText = `
    // beginGLSL
    precision mediump float;
    varying float z;
    float rand(vec2 co){
        return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453 * (2.0 + sin(co.x)));
    }
    void main(void) {
        // gl_PointCoord is the local pixel position within the point.
        vec2 pos = gl_PointCoord;
        float distSquared = 1.0 - dot(pos - 0.5, pos - 0.5) * 4.;
        gl_FragColor = vec4(vec3(1.0), distSquared * 0.5 / z);
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

smoothDotsVertex.vertText = `
    // beginGLSL
    #define pi 3.1415926535897932384626433832795
    attribute float vertexID;
    uniform vec2 resolution;
    uniform float time;
    varying float z;
    const mat2 mr = mat2 (
        0.84147,  0.54030,
        0.54030, -0.84147
    );
    float hash(in float n) {
      return fract(sin(n)*43758.5453);
    }
    float noise(in vec2 x) {
        vec2 p = floor(x);
        vec2 f = fract(x);
        f = f*f*(3.0-2.0*f);  
        float n = p.x + p.y*57.0;
        float res = mix(mix( hash(n+  0.0), hash(n+  1.0),f.x),
              mix( hash(n+ 57.0), hash(n+ 58.0),f.x),f.y);
        return res;
    }
    float fbm( in vec2 p ) {
        float f;
        f  = 0.5000*noise( p ); p = mr*p*2.02;
        f += 0.2500*noise( p ); p = mr*p*2.33;
        f += 0.1250*noise( p ); p = mr*p*2.01;
        f += 0.0625*noise( p ); p = mr*p*5.21;
        return f/(0.9375)*smoothstep( 260., 768., p.y ); // flat at beginning
    }
    float rand(vec2 co){
        return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453 * (2.0 + sin(co.x)));
    }
    float map(float value, float min1, float max1, float min2, float max2) {
        return min2 + (value - min1) * (max2 - min2) / (max1 - min1);
    }
    mat4 translate(float x, float y, float z) {
        return mat4(
            1.0,  0.0,  0.0,  0.0,
            0.0,  1.0,  0.0,  0.0,
            0.0,  0.0,  1.0,  0.0,
            x,      y,    z,  1.0
        );
    }
    mat4 xRotate(float a) {
        return mat4(
           1.0, 0.0,        0.0, 0.0,
           0.0, cos(a), -sin(a), 0.0,
           0.0, sin(a),  cos(a), 0.0,
           0.0, 0.0,        0.0, 1.0
        );
    }
    mat4 yRotate(float a) {
        return mat4(
           cos(a),  0.0, sin(a), 0.0,
           0.0,     1.0,    0.0, 0.0,
           -sin(a), 0.0, cos(a), 0.0,
           0.0,     0.0,    0.0, 1.0
        );
    }
    mat4 zRotate(float a) {
        return mat4(
           cos(a), -sin(a), 0.0, 0.0,
           sin(a),  cos(a), 0.0, 0.0,
           0.0,        0.0, 1.0, 0.0,
           0.0,        0.0, 0.0, 1.0
        );
    }
    void main(void) {
        float ratio = resolution.y / resolution.x;
        float i = vertexID;
        float s = 240.;
        float x = fract(i / s);
        float y = floor(i / s) / s;
        x = map(x, 0., 1., -1., 1.);
        y = map(y, 0., 1., -1., 1.);
        float a = time * 1e-2;
        vec4 pos = vec4(x, y, 1.0, 1.0);
        vec4 pos2 = vec4(pos);
        pos2 = zRotate(pi * 0.25) * pos2;
        pos.z = pos.z + fbm((vec2(pos2.x, pos2.y) + a) * 2.5) * 0.5;
        pos = translate(0.0, 1.1, 0.5) * xRotate(pi * 1.75) * pos;
        pos.x *= ratio;
        gl_Position = vec4(pos.x, pos.y, 0.0, pos.z);
        gl_PointSize = 4. - (pos.z * 0.5);
        z = pos.z;
    }
    // endGLSL
`;
smoothDotsVertex.fragText = `
    // beginGLSL
    precision mediump float;
    varying float z;
    float rand(vec2 co){
        return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453 * (2.0 + sin(co.x)));
    }
    void main(void) {
        // gl_PointCoord is the local pixel position within the point.
        vec2 pos = gl_PointCoord;
        float distSquared = 1.0 - dot(pos - 0.5, pos - 0.5) * 4.;
        gl_FragColor = vec4(vec3(1.0), distSquared * 0.5 / pow(z, 3.));
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

}