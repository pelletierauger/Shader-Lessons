// Diamond gradient with rotateUV
setBothShaders(`
// beginGLSL
precision mediump float;
#define pi 3.1415926535897932384626433832795
varying vec2 vTexCoord;
uniform float time;
uniform vec2 resolution;
float map(float value, float min1, float max1, float min2, float max2) {
    return min2 + (value - min1) * (max2 - min2) / (max1 - min1);
}
vec2 rotateUV(vec2 uv, float rotation, float mid) {
    return vec2(
      cos(rotation) * (uv.x - mid) + sin(rotation) * (uv.y - mid) + mid,
      cos(rotation) * (uv.y - mid) - sin(rotation) * (uv.x - mid) + mid
    );
}
void main() {
    vec2 uv = gl_FragCoord.xy / resolution;
    float ratio = resolution.y / resolution.x;
    uv = uv - 0.5;
    uv.x /= ratio;
    uv *= 2.8;
    uv = rotateUV(uv, pi*0.25, 0.0);
    vec3 col = 1.0 - vec3(max(abs(uv.x), abs(uv.y)));
    gl_FragColor = vec4(col, 1.0);
}
// endGLSL
`);

// Diamond gradient without rotateUV
setBothShaders(`
// beginGLSL
precision mediump float;
varying vec2 vTexCoord;
uniform float time;
uniform vec2 resolution;
float map(float value, float min1, float max1, float min2, float max2) {
    return min2 + (value - min1) * (max2 - min2) / (max1 - min1);
}
void main() {
    vec2 uv = gl_FragCoord.xy / resolution;
    float ratio = resolution.y / resolution.x;
    uv = uv - 0.5;
    uv.x /= ratio;
    uv *= 2.0;
    vec3 col = 1.0 - vec3(max(abs(uv.x + uv.y), abs(uv.y - uv.x)));
    gl_FragColor = vec4(col, 1.0);
}
// endGLSL
`);

// Diamond gradient, oscillating
setBothShaders(`
// beginGLSL
precision mediump float;
varying vec2 vTexCoord;
uniform float time;
uniform vec2 resolution;
float map(float value, float min1, float max1, float min2, float max2) {
    return min2 + (value - min1) * (max2 - min2) / (max1 - min1);
}
void main() {
    vec2 uv = gl_FragCoord.xy / resolution;
    float ratio = resolution.y / resolution.x;
    uv = uv - 0.5;
    uv.x /= ratio;
    uv *= 2.0;
    vec3 col = 1.0 - vec3(sin(max(abs(uv.x+uv.y), abs(uv.y-uv.x)) * 4. - time * 1e-1) * 0.5 + 0.5);
    gl_FragColor = vec4(col, 1.0);
}
// endGLSL
`);

// Diamond gradient, rotating and oscillating
setBothShaders(`
// beginGLSL
precision mediump float;
#define pi 3.1415926535897932384626433832795
varying vec2 vTexCoord;
uniform float time;
uniform vec2 resolution;
float map(float value, float min1, float max1, float min2, float max2) {
    return min2 + (value - min1) * (max2 - min2) / (max1 - min1);
}
vec2 rotateUV(vec2 uv, float rotation, float mid) {
    return vec2(
      cos(rotation) * (uv.x - mid) + sin(rotation) * (uv.y - mid) + mid,
      cos(rotation) * (uv.y - mid) - sin(rotation) * (uv.x - mid) + mid
    );
}
void main() {
    vec2 uv = gl_FragCoord.xy / resolution;
    float ratio = resolution.y / resolution.x;
    uv = uv - 0.5;
    uv.x /= ratio;
    uv *= 2.0;
    uv = rotateUV(uv, time * -4e-2, 0.0);
    vec3 col = 1.0 - vec3(sin(max(abs(uv.x+uv.y), abs(uv.y-uv.x)) * 4. - time * 1e-1) * 0.5 + 0.5);
    gl_FragColor = vec4(col, 1.0);
}
// endGLSL
`);


// Diamond gradient, rotating and oscillating, with colours
setBothShaders(`
// beginGLSL
precision mediump float;
#define pi 3.1415926535897932384626433832795
varying vec2 vTexCoord;
uniform float time;
uniform vec2 resolution;
float map(float value, float min1, float max1, float min2, float max2) {
    return min2 + (value - min1) * (max2 - min2) / (max1 - min1);
}
vec2 rotateUV(vec2 uv, float rotation, float mid) {
    return vec2(
      cos(rotation) * (uv.x - mid) + sin(rotation) * (uv.y - mid) + mid,
      cos(rotation) * (uv.y - mid) - sin(rotation) * (uv.x - mid) + mid
    );
}
void main() {
    vec2 uv = gl_FragCoord.xy / resolution;
    float ratio = resolution.y / resolution.x;
    uv = uv - 0.5;
    uv.x /= ratio;
    uv *= 2.0;
    uv = rotateUV(uv, time * -4e-2, 0.0);
    vec3 col = 1.0 - vec3(sin(max(abs(uv.x+uv.y), abs(uv.y-uv.x)) * 4. - time * 0.5e-1 * vec3(1.1, 3.2, 2.3) + vec3(0.0, 1e1, 1e2)) * 0.5 + 0.5);
    gl_FragColor = vec4(col, 1.0);
}
// endGLSL
`);