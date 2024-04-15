if (false) {

// A simple circle
setBothShaders(`
// beginGLSL
precision mediump float;
#define pi 3.1415926535897932384626433832795
varying vec2 vTexCoord;
uniform float time;
uniform vec2 resolution;
// float PI = 3.1415926535897932384626433832795;
float circle(vec2 p, float radius, float smoothness) {
    float r = radius * 0.5;
    float ratio = resolution.y / resolution.x;
    float c = length(vec2(p.x / ratio, p.y)) - r;
    return smoothstep(r + smoothness + 1e-7, r, c);
}
float map(float value, float min1, float max1, float min2, float max2) {
    return min2 + (value - min1) * (max2 - min2) / (max1 - min1);
}
void main() {
    vec2 uv = gl_FragCoord.xy / resolution;
    float ratio = resolution.y / resolution.x;
    float t = time;
    float x = cos(time * 0.05) * 0.5 + 0.5;
    float y = sin(time * 0.05) * 0.5 + 0.5;
    vec2 p = vec2(0.0, 0.0);
    // vec2 newV = (uv + sin(uv.y * pi)) - (sin(uv.x * pi));
    // uv.x = uv.x + sin(time * 0.5 + uv.y * 5e1) * 0.01;
    // uv = mod(uv * 3., 1.);    
    // uv = mod(uv * 30., 0.5);
    // uv = fract(uv * 3.);
    // uv = sin(uv * pi);
    // uv = vec2(cos(uv.x *1e-3), sin(uv.y *1e-3));
    // uv = atan(vec2(cos(uv.x), sin(uv.y)));
    // uv.x = cos(uv.x * pi) * 0.5 + 0.5;
    // uv.y = sin(uv.y * pi) * 0.5 + 0.5;
        // uv = vec2(pow(uv.x, 2.), pow(uv.y, 2.));
        // uv = sin(uv * pi + time * 0.001);
    vec3 col = vec3(uv.x, uv.y, 1.0 - uv.x);
    // newV = uv;
    // col *= sin(sin(atan(newV.x, newV.y)) * 50.);
    // uv = uv - 0.5;
    // vec2 newV = (uv + sin(uv.y * pi)) - (sin(uv.x * pi));
    // uv = newV;
    float c = circle(uv - vec2(x, y), 0.1, 0.005);
    // col = col + vec3(c);
    // col *= sin(atan(uv.x / ratio, uv.y) * 5. + time * 0.1);
    // col.r = sin(atan(uv.x / ratio, uv.y) * 5. + time * -0.1);
    // col.g = sin(atan(uv.x / ratio, uv.y) * 5. + time * 0.1);
    // col.b = sin(atan(uv.x / ratio, uv.y) * 5. + time * -0.2);
    // col = sin(atan(uv.x / ratio, uv.y) * 5. + time * vec3(0.1, 0.2, 0.3) + uv.y*10.1);
    // col = sin(atan(uv.x / ratio, uv.y) * 5. + time * vec3(0.1, -0.1, 0.0));
    // col = sin(atan(uv.x / ratio, uv.y) * vec3(20.));
    // col *= sin(atan(uv.x / ratio, uv.y * sin(uv.x*10.)) * 20. + time * 0.1);
       // col *= sin(atan(pow(uv.x, -0.5) / ratio, pow(uv.y, -0.5)) * 5. + time * 0.1);
       // col *= sin(atan(pow(uv.x, -0.5) / ratio, pow(uv.y, -0.5) + sin(uv.x*1e2)) * 5. + time * 0.1);
       // col *= sin(atan(pow(uv.x, -0.5) / ratio, pow(uv.y, -0.5) + sin(uv.x/uv.y*1e2)) * 5. + time * 0.1);
    // col = sin(atan(uv.x / ratio, uv.y+1.) * 150. + time * vec3(0.1, -0.1, 0.0));
    // col = vec3(pow(sin(col.r*1e2), 4.0), pow(sin(col.g*1e2), 4.0), pow(sin(col.b*1e2), 4.0));
    // col *= sin(atan(uv.x / ratio, uv.y) * 5. + time * vec3(0.1, 0.2, 0.3) + uv.y*10.1);
    // col = vec3(sin(col.r), sin(col.g), sin(col.b));
    // col *= sin(atan(uv.x / ratio + sin(uv.x*10.), uv.y + sin(uv.y*10.)) * 10. + time * 1e-1);
    // col *= sin(atan(uv.x / ratio, uv.y) * 5. + time * 1e-1);
    // col *= sin(atan(uv.x / ratio, uv.y) * 5. + time * 1e-1);
    // col = vec3(atan(uv.y, uv.x / ratio))/pi;
        // col = vec3(map(sin(uv.x*20.+time*1e-1), -1., 1., 0., 1.));
    uv = uv - 0.5;
    uv.x /= ratio;
    // ------------------------------------ 
    // LINEAR OSCILLATION
    // ------------------------------------
    // col = vec3(sin(uv.x * 5e1 + time * 0.5));
    // col = vec3(sin(uv.y * 5e1 + time * 0.5));
    // col = vec3(sin(uv.x * uv.x * 1e2 + time * 0.5));
    // col = vec3(sin(uv.y * uv.y * 1e2 + time * 0.5));
    // col = vec3(sin(pow(uv.y, uv.x * 0.01) * 1e3 + time * 0.125));
    // col = vec3(sin(pow(uv.x, uv.y * 0.01) * 1e3 + time * 0.125));
    // col = vec3(sin(uv.x * uv.y * 1e2 + time * 0.5));
    // col = vec3(sin(pow(uv.x * uv.y, 0.125) * 2e1 + time * 0.125));
    // col = vec3(sin(uv.x / uv.y + time * 0.125));
    // col = vec3(sin(uv.x * 50. + time * 0.125) * sin(uv.y * 50. + time * 0.125));
    // col = vec3(sin(sin(uv.x * 25. + time * 0.125) * sin(uv.y * 25. + time * 0.125)*10.));
    // col = vec3(sin(sin(uv.x * 25.) * sin(uv.y * 25.) * 10. + time * 0.1));
    // col = vec3(sin(sin(uv.x * 25.) * sin(uv.y * 25.) * 10. + time * 0.1));
    // Distorting UV before creating the colour for added strangeness.
    // uv.x *= (sin(sin(uv.x * 1.) * sin(uv.y * 1.) * 10. + time * 0.01));
    // col = vec3(sin(sin(uv.x * 25.) * sin(uv.y * 25.) * 10. + time * 0.1));
    // ------------------------------------ 
    // RADIAL OSCILLATION
    // ------------------------------------
    // col = vec3(map(sin(length(uv)*40.+time*0.1), -1., 1., 0., 1.));
    // col = vec3(map(sin(length(uv)*40.+time*0.1), -1., 1., 0., 1.)) * vec3(1.0, 0.5, 0.2);
    // col = map(sin(length(uv)*40.+time*0.1), -1., 1., 0., 1.) * vec3(1.0, 0.5, 0.2);
    // col = (sin(length(uv) * vec3(14., 15., 12.) + time * 0.1 * vec3(1., 2., -3.)) * 0.5 + 0.5) * vec3(1.0, 0.5, 0.5);
    // col = (sin(sin(col) * cos(col) * 10. + time * 0.1));
    // col = vec3(map(sin(length(uv.xx*uv.yy)*40.+time*0.1), -1., 1., 0., 1.));
        col = vec3(map(sin(length((uv.xx+uv.yy))*40.+time*0.1), -1., 1., 0., 1.));
        col = vec3(map(sin(length((uv.xx-uv.yy))*40.+time*0.1), -1., 1., 0., 1.));
        // col = vec3(map(sin(length((uv.xx))*20.+time*0.1)+sin(length((uv.yy))*20.+time*0.1), -2., 2., 0., 1.));
        // col = vec3(map(sin(length((uv.xx*uv.yy))*20.+time*0.1)*cos(length((uv.xx*uv.yy))*20.+time*0.1), -0.5, 0.5, 0., 1.));
    // col = vec3(sin(pow((max(uv.x - 20. * 4., uv.y - 20. * 4.)) * 2.0, 2.0)+time));
    // ------------------------------------ 
    // RECTANGULAR OSCILLATION
    // ------------------------------------ 
    col = vec3(sin(max(abs(uv.x), abs(uv.y)) * 50. + time * 0.25));
    col = vec3(sin(min(abs(uv.x), abs(uv.y)) * 50. + time * 0.25));
    col = vec3(sin((min(abs(uv.x), abs(uv.y)) + max(abs(uv.x), abs(uv.y))) * 50. + time * 0.25));
    // col = vec3(sin((min(abs(uv.x), abs(uv.y))/max(abs(uv.x), abs(uv.y))) * 15. + time * 0.25));
    // col = vec3(sin(max(abs(sin(uv.x * 5.) * 3e1), abs(sin(uv.y * 5.) * 3e1)) * 1. + time * 0.25));
    // col = vec3(sin(max(abs(sin(uv.x * 5. + uv.x * 4.) * 3e1), abs(sin(uv.y * 5. + uv.x * 4.) * 3e1)) * 1. + time * 0.25));
    // col = vec3(sin(mix(max(abs(uv.x), abs(uv.y)), length(uv), 0.5) * 50. + time * 0.25));
    // ------------------------------------ 
    // ANGULAR OSCILLATION
    // ------------------------------------
    // Mapping polar angle to 0-1
    // https://stackoverflow.com/questions/10619382/mapping-polar-angle-to-0-1
    // col = vec3((atan(uv.y, uv.x) + pi) / (2. * pi));
    // uv.y = map(sin(uv.x * 50. + uv.y * 50. + time * 0.1), -1., 1., 0., 1.);
    // uv.y = map(sin(uv.x * 10. * uv.y * 10. + time * 0.1), -1., 1., 0., 1.);
    // col = vec3(map(atan(uv.y, uv.x), -pi, pi, 0., 1.));
    // Using the absolute value to wrap around the greyscale values.
    // col = vec3(abs(map(atan(uv.y, uv.x), -pi, pi, -1., 1.)));
    // The same thing without the mapping.
    // col = vec3(abs(atan(uv.y, uv.x) / pi));
    //  Using the angle from atan to oscillate with sin.
    // col = vec3(map(sin(atan(uv.y, uv.x)+(pi*-0.5)), -1., 1., 0., 1.));
    // Rotate it
    // col = vec3(map(sin(atan(uv.y, uv.x)+(pi*-0.5)+time*1e-1), -1., 1., 0., 1.));
    // Oscillate more than once
    // col = vec3(map(sin(atan(uv.y, uv.x)*3.+(pi*-0.5)+time*1e-1), -1., 1., 0., 1.));
    // Oscillate without mapping to 0-1
    // col = vec3(sin(atan(uv.y, uv.x) * 5. + time * 1e-1));
    // Oscillate with the absolute value, for a different effect
    // col = vec3(map(sin(abs(atan(uv.y, uv.x)) * 3. + time * 1e-1), -1., 1., 0., 1.));
    // col = vec3(map(sin(atan(uv.y, uv.x)-pi*0.5), -1., 1., 0., 1.));
    // Angular colour gradient
    // col.r = map(sin(atan(uv.y, uv.x) * 5. + time * 1e-1), -pi, pi, 0., 1.);
    // col.g = map(sin(atan(uv.y, uv.x) * 2. + time * 1.5e-1), -pi, pi, 1., 0.);
    // col.b = map(sin(atan(uv.y, uv.x) * 6. + time * 3e-1), -pi, pi, 1., 0.);
    // col = vec3(circle(uv, 0.1*col.r, 0.05));
    // col = vec3(map(sin(abs(atan(uv.y*uv.x+0.025, uv.x*uv.x)) * 12. + time * uv.y * 0.5e-1 + time * 0.25), -1., 1., 0., 1.));
    // col = vec3(abs(map(atan(uv.y, uv.x), -pi, pi, -1., 1.)));
    // col = vec3(map(sin(atan(uv.y, uv.x) + time * 1e-1),-1.,1., 0., 1.));
    // col = vec3(map(sin(atan(uv.y, uv.x) * 6. + time * 1e-1),-1.,1., 0., 1.));
    // col = vec3(map(sin(atan(uv.y, uv.x) * 6. + time * 1e-1),-1.,1., 0., 1.));
    // col.r = map(sin(col.r*pi*2.+time*1e-1), -1., 1., 0., 1.);
    // col.gb = vec2(0.);
    // col = mix(vec3(1.0, 0.0, 0.0), vec3(0.0, 0.0, 1.0), map(atan(uv.y, uv.x), -pi, pi, 0., 1.));
    // col = vec3(sin(atan(uv.y, uv.x / ratio)));
    // col = vec3(sin(atan(uv.y, uv.x / ratio) * 5. + time * 1e-1));
    // col = sin(atan(uv.x / ratio, uv.y) * 5. + time * vec3(0.1, -0.1, 0.0));
    // col *= sin(atan(uv.y, uv.x / ratio) * 5. + time * 1e-1);
    gl_FragColor = vec4(col, 1.0);
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
    uv -= 0.5;
    uv *= sin(atan(uv.x / ratio, uv.y) + time * 0.25e-1);
    for (int i = 0; i < 100; i++) {
       float j = float(i);
       float x = cos(j * time * 5e-4) * 0.005 * j * ratio;
       float y = sin(j * time * 5e-4) * 0.005 * j;
       vec2 pos = vec2(x, y);
       vec3 c = circleRGB(uv - pos, 0.001 + 0.00015 * j, 0.001, vec3(1.0, 0.0, 0.0));
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