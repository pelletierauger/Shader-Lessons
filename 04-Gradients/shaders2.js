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
    // float c = circle(uv - vec2(x, y), 0.1, 0.005);
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
        // col = vec3(map(sin(length((uv.xx+uv.yy))*40.+time*0.1), -1., 1., 0., 1.));
        // col = vec3(map(sin(length((uv.xx-uv.yy))*40.+time*0.1), -1., 1., 0., 1.));
        // col = vec3(map(sin(length((uv.xx))*20.+time*0.1)+sin(length((uv.yy))*20.+time*0.1), -2., 2., 0., 1.));
        // col = vec3(map(sin(length((uv.xx*uv.yy))*20.+time*0.1)*cos(length((uv.xx*uv.yy))*20.+time*0.1), -0.5, 0.5, 0., 1.));
    // col = vec3(sin(pow((max(uv.x - 20. * 4., uv.y - 20. * 4.)) * 2.0, 2.0)+time));
    // ------------------------------------ 
    // RECTANGULAR OSCILLATION
    // ------------------------------------ 
    // col = vec3(sin(max(abs(uv.x), abs(uv.y)) * 50. + time * 0.25));
    // col = vec3(sin(min(abs(uv.x), abs(uv.y)) * 50. + time * 0.25));
    // col = vec3(sin((min(abs(uv.x), abs(uv.y)) + max(abs(uv.x), abs(uv.y))) * 50. + time * 0.25));
    // col = vec3(sin((min(abs(uv.x), abs(uv.y))/max(abs(uv.x), abs(uv.y))) * 15. + time * 0.25));
    // col = vec3(sin(max(abs(sin(uv.x * 5.) * 3e1), abs(sin(uv.y * 5.) * 3e1)) * 1. + time * 0.25));
    // col = vec3(sin(max(abs(sin(uv.x * 5. + uv.x * 4.) * 3e1), abs(sin(uv.y * 5. + uv.x * 4.) * 3e1)) * 1. + time * 0.25));
    // col = vec3(sin(mix(max(abs(uv.x), abs(uv.y)), length(uv), 0.5) * 50. + time * 0.25));
    // ------------------------------------ 
    // col = 1.0 - vec3(sin(max(abs(uv.x), abs(uv.y)))) * 2.;
    // col = 1.0 - vec3(max(abs(uv.x), abs(uv.y))) * 2.;
    
    // uv = uv + 0.5;
    // float fx = map(cos(time*2e-2),-1., 1., 0.2, 0.8);
    // float fy = map(sin(time*2e-2),-1., 1., 0.2, 0.8);
    // if (uv.x < fx) {
    //     uv.x = map(uv.x, 0., fx, 0., 1.);
    // } else {
    //     uv.x = map(uv.x, fx, 1.0, 1., 0.);
    // };
    // if (uv.y < fy) {
    //     uv.y = map(uv.y, 0., fy, 0., 1.);
    // } else {
    //     uv.y = map(uv.y, fy, 1.0, 1., 0.);
    // };
    // col = 1.0 - vec3(sin(max(1.0-uv.x, 1.0-uv.y)*10.-time*0.1*vec3(1.5, 1.2, 1.9)+vec3(1e1, 1e2, 1e3))*0.5+0.5);
        // col = vec3(distance(uv.xy, vec2(0.0)));
    // vec2 point = vec2(0.25, 0.25);
    // col = vec3(max(distance(uv.xx, point), distance(uv.yy, point)));
    // col = vec3(sin((max(abs(uv.x), abs(uv.y)) - time * 0.01 * vec3(1.1, 1.2, 1.3)) * 10.));
    // col = vec3(sin((max(abs(uv.x), abs(uv.y)) - time * 0.01 * vec3(1.1, 1.2, 1.3) + vec3(10., 0., -1.))*10.));
    col = vec3(sin((max(abs(uv.x), abs(uv.y)) - time * 0.01 * vec3(1.1, 1.2, 1.3) + vec3(10., 0., -1.))*10.)*0.5+0.5);
    // col = vec3(abs(sin((max(abs(uv.x), abs(uv.y)) - time * 0.01 * vec3(1.1, 1.2, 1.3) + vec3(10., 0., -1.))*10.)));
    // uv.xy *= 2.0;
    // vec2 centerPoint = vec2(cos(time* 0.1), sin(time* 0.1));
    // float d = distance(uv.xy, centerPoint);
    // col = 1.0 - vec3(max(abs(uv.x*sin(uv.x+time*0.1)), abs(uv.y)));
    // if (uv.y < 0.) {uv.y = uv.y * 4.0;}
    // uv.y -= 1.;
        // col = vec3(max(abs(uv.x), abs(uv.y)));
        // col = vec3(abs(sin((max(abs(uv.x), abs(uv.y)) - time * 0.01 * vec3(1.1, 1.2, 1.3) + vec3(10., 0., -1.))*10.)));
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