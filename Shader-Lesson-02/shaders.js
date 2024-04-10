if (false) {

// A simple circle
setBothShaders(`
// beginGLSL
precision mediump float;
varying vec2 vTexCoord;
uniform float time;
uniform vec2 resolution;
float circle(vec2 p, float radius, float smoothness) {
    float r = radius * 0.5;
    float ratio = resolution.y / resolution.x;
    float c = length(vec2(p.x / ratio, p.y)) - r;
    return smoothstep(r + smoothness + 1e-7, r, c);
}
void main() {
    vec2 uv = gl_FragCoord.xy / resolution;
    // uv.x = uv.x + sin(time * 0.5 + uv.y * 5e1) * 0.01;
    float c = circle(uv - vec2(0.5, 0.5), 0.25, 0.05);
    gl_FragColor = vec4(vec3(c), 1.0);
}
// endGLSL
`);

// An eclipse (substracting a circle)
setBothShaders(`
// beginGLSL
precision mediump float;
varying vec2 vTexCoord;
uniform float time;
uniform vec2 resolution;
float circle(vec2 p, float radius, float smoothness) {
    float r = radius * 0.5;
    float ratio = resolution.y / resolution.x;
    float c = length(vec2(p.x / ratio, p.y)) - r;
    return smoothstep(r + smoothness + 1e-7, r, c);
}
void main() {
    vec2 uv = gl_FragCoord.xy / resolution;
    float sun = circle(uv - vec2(0.5, 0.5), 0.25, 0.05);
    float moon = circle(uv - vec2(0.5, 0.4), 0.25, 0.05);
    float eclipse = sun - moon;
    gl_FragColor = vec4(vec3(eclipse), 1.0);
}
// endGLSL
`);

// RGB circles
setBothShaders(`
// beginGLSL
precision mediump float;
varying vec2 vTexCoord;
uniform float time;
uniform vec2 resolution;
float circle(vec2 p, float radius, float smoothness) {
    float r = radius * 0.5;
    float ratio = resolution.y / resolution.x;
    float c = length(vec2(p.x / ratio, p.y)) - r;
    return smoothstep(r + smoothness + 1e-7, r, c);
}
vec3 circleRGB(vec2 p, float radius, float smoothness, vec3 col) {
    return circle(p, radius, smoothness) * col;
}
void main() {
    vec2 uv = gl_FragCoord.xy / resolution;
    // uv.x = uv.x + sin(time * 0.5 + uv.y * 5e1) * 0.01;
    vec3 c1 = circleRGB(uv - vec2(0.25, 0.5), 0.25, 0.05, vec3(1.0, 0.0, 0.0));
    vec3 c2 = circleRGB(uv - vec2(0.5, 0.5), 0.25, 0.05, vec3(0.0, 1.0, 0.0));
    vec3 c3 = circleRGB(uv - vec2(0.75, 0.5), 0.25, 0.05, vec3(0.0, 0.0, 1.0));
    gl_FragColor = vec4(c1 + c2 + c3, 1.0);
}
// endGLSL
`);

// RGB Rectangle
setBothShaders(`
// beginGLSL
precision mediump float;
varying vec2 vTexCoord;
uniform float time;
uniform vec2 resolution;
// https://www.shadertoy.com/view/lsfBDS
vec3 rectangle(vec2 uv, vec2 pos, float width, float height, vec3 color) {
    float t = 0.0;
    float ratio = resolution.y / resolution.x;
    if ((uv.x/ratio > pos.x/ratio - width / 2.0) && (uv.x/ratio < pos.x/ratio + width / 2.0)
       && (uv.y > pos.y - height / 2.0) && (uv.y < pos.y + height / 2.0)) {
       t = 1.0;
    }
    return color * t;
}
void main() {
    vec2 uv = gl_FragCoord.xy / resolution;
    float ratio = resolution.y / resolution.x;
    // uv.x = uv.x + sin(time * 0.5 + uv.y * 5e1) * 0.01;
    vec3 c = rectangle(uv, vec2(0.5, 0.5), 0.5, 0.5, vec3(1.0, 0.0, 0.0));
    gl_FragColor = vec4(c, 1.0);
}
// endGLSL
`);

// RGB Rounded rectangle
setBothShaders(`
// beginGLSL
precision mediump float;
varying vec2 vTexCoord;
uniform float time;
uniform vec2 resolution;
vec3 roundedRectangle(vec2 uv, vec2 pos, vec2 size, float radius, float thickness, vec3 color) {
    float ratio = resolution.y / resolution.x;
    float d = length(max(abs(vec2(uv.x / ratio, uv.y) - vec2(pos.x / ratio, pos.y)), size) - size) - radius;
    return smoothstep(0.66, 0.33, d / thickness) * color;
}
void main() {
    vec2 uv = gl_FragCoord.xy / resolution;
    float ratio = resolution.y / resolution.x;
    // uv.x = uv.x + sin(time * 0.5 + uv.y * 5e1) * 0.01;
    vec3 c = roundedRectangle(uv, vec2(0.5, 0.5), vec2(0.25,0.25), 0.00001, 0., vec3(1.0, 0.0, 0.0));
    gl_FragColor = vec4(c, 1.0);
}
// endGLSL
`);

// A spiral with For Loop
setBothShaders(`
// beginGLSL
precision mediump float;
varying vec2 vTexCoord;
uniform float time;
uniform vec2 resolution;
float circle(vec2 p, float radius, float smoothness) {
    float r = radius * 0.5;
    float ratio = resolution.y / resolution.x;
    float c = length(vec2(p.x / ratio, p.y)) - r;
    return smoothstep(r + smoothness + 1e-7, r, c);
}
vec3 circleRGB(vec2 p, float radius, float smoothness, vec3 col) {
    return circle(p, radius, smoothness) * col;
}
void main() {
    vec2 uv = gl_FragCoord.xy / resolution;
    float ratio = resolution.y / resolution.x;
    vec3 col = vec3(0.0, 0.0, 0.0);
    for (int i = 0; i < 100; i++) {
       float j = float(i);
       float x = cos(j * time * 5e-4) * 0.01 * j * ratio;
       float y = sin(j * time * 5e-4) * 0.01 * j;
       vec2 pos = vec2(0.5 - x, 0.5 - y);
       vec3 c = circleRGB(uv - pos, 0.01 + 0.0005 * j, 0.001, vec3(1.0, 0.0, 0.0));
       col = col + c;
    }
    gl_FragColor = vec4(col, 1.0);
}
// endGLSL
`);

// A spiral with For Loop with multicolour circles
setBothShaders(`
// beginGLSL
precision mediump float;
varying vec2 vTexCoord;
uniform float time;
uniform vec2 resolution;
float circle(vec2 p, float radius, float smoothness) {
    float r = radius * 0.5;
    float ratio = resolution.y / resolution.x;
    float c = length(vec2(p.x / ratio, p.y)) - r;
    return smoothstep(r + smoothness + 1e-7, r, c);
}
vec3 circleRGB(vec2 p, float radius, float smoothness, vec3 col) {
    return circle(p, radius, smoothness) * col;
}
void main() {
    vec2 uv = gl_FragCoord.xy / resolution;
    float ratio = resolution.y / resolution.x;
    vec3 col = vec3(0.0, 0.0, 0.0);
    // uv.x = uv.x + sin(time * 0.05 + uv.y * 25.) * 0.05;
    for (int i = 0; i < 100; i++) {
       float j = float(i);
       float x = cos(j * time * 5e-4) * 0.01 * j * ratio;
       float y = sin(j * time * 5e-4) * 0.01 * j;
       vec2 pos = vec2(0.5 - x, 0.5 - y);
       float r = sin(j * 0.05) * 0.5 + 0.5;
       float g = cos(j * 0.05) * 0.5 + 0.5;
       float b = sin(j * j * 0.05) * 0.5 + 0.5;
       vec3 c = circleRGB(uv - pos, 0.01 + 0.001 * j, 0.001, vec3(r, g, b));
       col = col + c;
    }
    gl_FragColor = vec4(col, 1.0);
}
// endGLSL
`);

}