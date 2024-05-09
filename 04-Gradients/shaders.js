if (false) {

// Linear gradients
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
void main() {
    vec2 uv = gl_FragCoord.xy / resolution;
    float ratio = resolution.y / resolution.x;
    uv = uv - 0.5;
    uv.x /= ratio;
    // Distorting UV before creating the colour for added strangeness.
    // uv.x *= (sin(sin(uv.x * 1.) * sin(uv.y * 1.) * 10. + time * 0.01));
    vec3 col = vec3(sin(uv.x * 5e1 + time * 0.5));
    // Mapping sin from 0 to 1 for a more even result.
    col = vec3(map(sin(uv.x * 5e1 + time * 0.5), -1.0, 1.0, 0., 1.));
    // Mirror effect using the absolute value of uv.x.
    // col = vec3(map(sin(abs(uv.x) * 5e1 + time * 0.5), -1.0, 1.0, 0., 1.));
    // Vertical oscillation.
    // col = vec3(map(sin(uv.y * 5e1 + time * 0.25), -1.0, 1.0, 0., 1.));
    // Diagonal oscillation.
    // col = vec3(map(sin((uv.x + uv.y) * 5e1 + time * 0.25), -1.0, 1.0, 0., 1.));
    // col = vec3(map(sin((uv.x - uv.y) * 5e1 + time * 0.25), -1.0, 1.0, 0., 1.));
    // Diagonal oscillation made symmetrical with the absolute value.
    // col = vec3(map(sin(abs(uv.x + uv.y) * 5e1 + time * 0.25), -1.0, 1.0, 0., 1.));
    // Diagonal at arbitrary angle with mix().
    // col = vec3(map(sin(abs(mix(uv.x,uv.y,1.25)) * 5e1 + time * 0.5), -1.0, 1.0, 0., 1.));
    // What happens if you multiply x and y ?
    // col = vec3(map(sin((uv.x * uv.y) * 5e1 + time * 0.25), -1.0, 1.0, 0., 1.));
    // What happens if you divide x and y ?
    // col = vec3(map(sin((uv.x / uv.y) * 5. + time * 0.25), -1.0, 1.0, 0., 1.));
    // What is even going on?
    // col = vec3(map(sin((cos(uv.x*5.) + sin(uv.y*5.)) * 2e1 + time * 0.25), -1.0, 1.0, 0., 1.));
    // Oscillating each RGB channel at a different speed.
    // col = vec3(sin(uv.x * 5e1 + time * 0.5 * vec3(1.0, 0.5, 0.25)));
    // col = vec3(sin(uv.x * 5e1 * vec3(1.0, -0.25, 1.5) * sin(time*0.25e-1) + time * 0.5 * vec3(-1.0, 0.5, 0.25)));
    // col = vec3(sin(uv.x * 5e1)*0.5 + 0.5);
    // col = vec3(sin(uv.x * 5e1 + time * 0.5 * vec3(1.0, 0.5, 0.25))*0.5+0.5);
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
    gl_FragColor = vec4(col, 1.0);
}
// endGLSL
`);

// Radial gradients
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
void main() {
    vec2 uv = gl_FragCoord.xy / resolution;
    float ratio = resolution.y / resolution.x;
    uv = uv - 0.5;
    uv.x /= ratio;
    vec3 col = vec3(map(sin(length(uv)*40.-time*0.1), -1., 1., 0., 1.));
    // col = vec3(map(sin(length(uv)*40.-time*0.1), -1., 1., 0., 1.)) * vec3(1.0, 0.5, 0.2);
    // col = map(sin(length(uv)*40.-time*0.1), -1., 1., 0., 1.) * vec3(1.0, 0.5, 0.2);
    // col = (sin(length(uv) * vec3(14., 15., 12.) - time * 0.1 * vec3(1., 2., -3.)) * 0.5 + 0.5) * vec3(1.0, 0.5, 0.5);
    // col = (sin(sin(col) * cos(col) * 10. - time * 0.1));
    // col = vec3(map(sin(length(uv.xx*uv.yy)*40.-time*0.1), -1., 1., 0., 1.));
    // col = vec3(map(sin(length((uv.xx+uv.yy))*40.-time*0.1), -1., 1., 0., 1.));
    // col = vec3(map(sin(length((uv.xx-uv.yy))*40.-time*0.1), -1., 1., 0., 1.));
    // col = vec3(map(sin(length((uv.xx))*20.-time*0.1)+sin(length((uv.yy))*20.-time*0.1), -2., 2., 0., 1.));
    // col = vec3(map(sin(length((uv.xx*uv.yy))*20.-time*0.1)*cos(length((uv.xx*uv.yy))*20.-time*0.1), -0.5, 0.5, 0., 1.));
    // col = vec3(sin(pow((max(uv.x - 20. * 4., uv.y - 20. * 4.)) * 2.0, 2.0)+time));
    gl_FragColor = vec4(col, 1.0);
}
// endGLSL
`);

// Angular gradients
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
void main() {
    vec2 uv = gl_FragCoord.xy / resolution;
    float ratio = resolution.y / resolution.x;
    vec3 col = vec3(uv.x, uv.y, 1.0 - uv.x);
    uv = uv - 0.5;
    uv.x /= ratio;
    // Mapping polar angle to 0-1
    // https://stackoverflow.com/questions/10619382/mapping-polar-angle-to-0-1
    col = vec3((atan(uv.y, uv.x) + pi) / (2. * pi));
    // Using the map function for the mapping.
    // col = vec3(map(atan(uv.y, uv.x), -pi, pi, 0., 1.));
    // Using the mix function to interpolate two colours.
    // col = mix(vec3(1.0, 0.0, 0.0), vec3(0.0, 0.0, 1.0), map(atan(uv.y, uv.x), -pi, pi, 0., 1.));
    // Using the absolute value to wrap around the greyscale values.
    // col = vec3(abs(map(atan(uv.y, uv.x), -pi, pi, -1., 1.)));
    // The same thing without the mapping.
    // col = vec3(abs(atan(uv.y, uv.x) / pi));
    //  Using the angle from atan to oscillate with sin.
    // col = vec3(map(sin(atan(uv.y, uv.x) + (pi * -0.5) ), -1., 1., 0., 1.));
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
    // Modulating only one channel (the red channel).    
    // col.r = map(sin(col.r*pi*2.+time*1e-1), -1., 1., 0., 1.);
    gl_FragColor = vec4(col, 1.0);
}
// endGLSL
`);



// Angular gradient - Voyage to the 90s
setBothShaders(`
// beginGLSL
precision mediump float;
#define pi 3.1415926535897932384626433832795
varying vec2 vTexCoord;
uniform float time;
uniform vec2 resolution;
vec2 rotateUV(vec2 uv, float rotation, float mid) {
    return vec2(
      cos(rotation) * (uv.x - mid) + sin(rotation) * (uv.y - mid) + mid,
      cos(rotation) * (uv.y - mid) - sin(rotation) * (uv.x - mid) + mid
    );
}
float map(float value, float min1, float max1, float min2, float max2) {
    return min2 + (value - min1) * (max2 - min2) / (max1 - min1);
}
void main() {
    vec2 uv = gl_FragCoord.xy / resolution;
    float ratio = resolution.y / resolution.x;
    vec3 col = vec3(uv.x, uv.y, 1.0 - uv.x);
    uv = uv - 0.5;
    uv.x /= ratio;
    uv = rotateUV(uv, 2.5, 0.0);
    uv += vec2(0.3, 0.);
    col = vec3(abs(map(atan(uv.y, uv.x), -pi, pi, -1., 1.)));
    col.g = (col.r - 0.5) * 2.;
    col.b = (1.0 - col.r);
    col.r = col.r * 2.0;
    gl_FragColor = vec4(col, 1.0);
}
// endGLSL
`);

// Angular gradient - Voyage to the 90s Animated
setBothShaders(`
// beginGLSL
precision mediump float;
#define pi 3.1415926535897932384626433832795
varying vec2 vTexCoord;
uniform float time;
uniform vec2 resolution;
vec2 rotateUV(vec2 uv, float rotation, float mid) {
    return vec2(
      cos(rotation) * (uv.x - mid) + sin(rotation) * (uv.y - mid) + mid,
      cos(rotation) * (uv.y - mid) - sin(rotation) * (uv.x - mid) + mid
    );
}
float map(float value, float min1, float max1, float min2, float max2) {
    return min2 + (value - min1) * (max2 - min2) / (max1 - min1);
}
void main() {
    vec2 uv = gl_FragCoord.xy / resolution;
    float ratio = resolution.y / resolution.x;
    vec3 col = vec3(uv.x, uv.y, 1.0 - uv.x);
    uv = uv - 0.5;
    uv.x /= ratio;
    uv = rotateUV(uv, 2.5, 0.0);
    uv += vec2(0.3, 0.);
    col = vec3(sin(abs(map(atan(uv.y, uv.x), -pi, pi, -1., 1.)) * 1. + time * 1e-1) * 0.5 + 0.5);
    col.g = (col.r - 0.5) * 2.;
    col.b = (1.0 - col.r);
    col.r = col.r * 2.0;
    gl_FragColor = vec4(col, 1.0);
}
// endGLSL
`);

// Rectangular gradients
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
    vec3 col = 1.0 - vec3(max(abs(uv.x), abs(uv.y)));
    gl_FragColor = vec4(col, 1.0);
}
// endGLSL
`);

// Animated rectangular gradient
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
    vec3 col = vec3(sin((max(abs(uv.x), abs(uv.y)) - time * 0.01 * vec3(1.1, 1.2, 1.3) + vec3(10., 0., -1.)) *10.) *0.5 + 0.5);
    gl_FragColor = vec4(col, 1.0);
}
// endGLSL
`);


// Animated rectangular gradient, asymmetrical version
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
void main() {
    vec2 uv = gl_FragCoord.xy / resolution;
    float ratio = resolution.y / resolution.x;
    float fx = map(cos(time * -2e-2), -1., 1., 0.2, 0.8);
    float fy = map(sin(time * -2e-2), -1., 1., 0.2, 0.8);
    if (uv.x < fx) {
        uv.x = map(uv.x, 0., fx, 1., 0.);
    } else {
        uv.x = map(uv.x, fx, 1.0, 0., 1.);
    };
    if (uv.y < fy) {
        uv.y = map(uv.y, 0., fy, 1., 0.);
    } else {
        uv.y = map(uv.y, fy, 1.0, 0., 1.);
    };
    vec3 col = vec3(sin(max(uv.x, uv.y) * 10. - time * 0.1 * vec3(1.1, 1.2, 1.3) + vec3(10., 0., -1.)) * 0.5 + 0.5);
   // col = vec3(1.0 - max(uv.x, uv.y));
    gl_FragColor = vec4(col, 1.0);
}
// endGLSL
`);

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

}