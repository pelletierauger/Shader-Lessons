if (false) {

// Basic noise
setBothShaders(`
// beginGLSL
precision mediump float;
uniform float time;
uniform vec2 resolution;
void main() {
    vec2 uv = gl_FragCoord.xy / resolution;
    float ratio = resolution.y / resolution.x;
    uv = uv - 0.5;
    uv.x /= ratio;
    float col = fract((sin(uv.x * 100. + uv.y * 4231.) * 0.5 + 0.5) * 5462.);
    gl_FragColor = vec4(vec3(col), 1.0);
}
// endGLSL
`);

// Animated noise
setBothShaders(`
// beginGLSL
precision mediump float;
uniform float time;
uniform vec2 resolution;
void main() {
    vec2 uv = gl_FragCoord.xy / resolution;
    float ratio = resolution.y / resolution.x;
    uv = uv - 0.5;
    uv.x /= ratio;
    float col = fract((sin(uv.x * 31. + uv.y * time) * 0.5 + 0.5) * 5462.);
    gl_FragColor = vec4(vec3(col), 1.0);
}
// endGLSL
`);

// Another noise function
setBothShaders(`
// beginGLSL
precision mediump float;
uniform float time;
uniform vec2 resolution;
float rand(vec2 co){
    return fract(sin(dot(co.xy ,vec2(12.9898, 78.233))) * 43758.5453 * (2.0 + sin(time)));
}
void main() {
    vec2 uv = gl_FragCoord.xy / resolution;
    float ratio = resolution.y / resolution.x;
    uv = uv - 0.5;
    uv.x /= ratio;
    float col = rand(uv);
    gl_FragColor = vec4(vec3(col), 1.0);
}
// endGLSL
`);

// Smooth noise
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
float noise(vec2 p) {
    return fract((sin(p.x * 100. + p.y * 4231.)) * 5462.);
}
void main() {
    vec2 uv = gl_FragCoord.xy / resolution;
    float ratio = resolution.y / resolution.x;
    uv = uv - 0.5;
    uv.x /= ratio;
    float col = fract((sin(uv.x*100.+uv.y*4231.+time)*0.5+0.5)*5462.);
    vec2 lv = fract(uv * 10.);    
    // lv = smoothstep(0., 1.0, fract(uv * 10.));
    // lv = lv * lv * (3. -2. * lv);
    lv = sin(lv * pi - pi * 0.5) * 0.5 + 0.5;
    vec2 id = floor(uv * 10.);
    float bl = noise(id);
    float br = noise(id + vec2(1.0, 0.0));
    float b = mix(bl, br, lv.x);
    float tl = noise(id + vec2(0.0, 1.0));
    float tr = noise(id + vec2(1.0, 1.0));
    float t = mix(tl, tr, lv.x);
    float tbm = mix(b, t, lv.y);
    col = tbm;
    // col = mix(tbm, noise(uv), 0.1 );
    gl_FragColor = vec4(vec3(col), 1.0);
}
// endGLSL
`);

// Smooth noise, multi-level
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
float noise(vec2 p) {
    return fract((sin(p.x * 100. + p.y * 4231.)) * 5462.);
}
float noiseOctave (vec2 p) {
    vec2 lv = fract(p);    
    // lv = smoothstep(0., 1.0, fract(p * 10.));
    // lv = lv * lv * (3. -2. * lv);
    lv = sin(lv * pi - pi * 0.5) * 0.5 + 0.5;
    vec2 id = floor(p);
    float bl = noise(id);
    float br = noise(id + vec2(1.0, 0.0));
    float b = mix(bl, br, lv.x);
    float tl = noise(id + vec2(0.0, 1.0));
    float tr = noise(id + vec2(1.0, 1.0));
    float t = mix(tl, tr, lv.x);
    float tbm = mix(b, t, lv.y);
    return tbm;
}
void main() {
    vec2 uv = gl_FragCoord.xy / resolution;
    float ratio = resolution.y / resolution.x;
    uv = uv - 0.5;
    uv.x /= ratio;
    float col = noiseOctave(uv * 4.);
    col += noiseOctave(uv * 8.) * 0.5;
    col += noiseOctave(uv * 16.) * 0.25;
    col += noiseOctave(uv * 32.) * 0.125;
    col += noiseOctave(uv * 65.) * 0.0625;
    col /= 2.0;
    gl_FragColor = vec4(vec3(col), 1.0);
}
// endGLSL
`);

// Smooth noise, multi-level
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
float noise(vec2 p) {
    return fract((sin(p.x * 100. + p.y * 4231.)) * 5462.);
}
float noiseOctave (vec2 p) {
    vec2 lv = fract(p);    
    // lv = smoothstep(0., 1.0, fract(p * 10.));
    // lv = lv * lv * (3. -2. * lv);
    lv = sin(lv * pi - pi * 0.5) * 0.5 + 0.5;
    vec2 id = floor(p);
    float bl = noise(id);
    float br = noise(id + vec2(1.0, 0.0));
    float b = mix(bl, br, lv.x);
    float tl = noise(id + vec2(0.0, 1.0));
    float tr = noise(id + vec2(1.0, 1.0));
    float t = mix(tl, tr, lv.x);
    float tbm = mix(b, t, lv.y);
    return tbm;
}
void main() {
    vec2 uv = gl_FragCoord.xy / resolution;
    float ratio = resolution.y / resolution.x;
    uv = uv - 0.5;
    uv.x /= ratio;
    uv.x += 2.0;
    float col = noiseOctave(uv * 4.);
    col += noiseOctave(uv * 8.) * 0.5;
    col += noiseOctave(uv * 16.) * 0.25;
    col += noiseOctave(uv * 32.) * 0.125;
    col += noiseOctave(uv * 65.) * 0.0625;
    col /= 2.0;
    gl_FragColor = vec4(vec3(col), 1.0);
}
// endGLSL
`);



// Inigo Quilez Noise
// https://www.shadertoy.com/view/Msf3WH
setBothShaders(`
// beginGLSL
precision mediump float;
uniform float time;
uniform vec2 resolution;
vec2 hash(vec2 p) {
  p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
  return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
}
float noise( in vec2 p ) {
    const float K1 = 0.366025404; // (sqrt(3)-1)/2;
    const float K2 = 0.211324865; // (3-sqrt(3))/6;
    vec2  i = floor(p + (p.x + p.y) * K1 );
    vec2  a = p - i + (i.x + i.y) * K2;
    float m = step(a.y, a.x); 
    vec2  o = vec2(m, 1.0 - m);
    vec2  b = a - o + K2;
    vec2  c = a - 1.0 + 2.0 * K2;
    vec3  h = max(0.5 - vec3(dot(a,a), dot(b,b), dot(c,c)), 0.0);
    vec3  n = h * h * h * h * vec3(dot(a, hash(i + 0.0)), dot(b, hash(i + o)), dot(c, hash(i + 1.0)));
    return dot(n, vec3(70.0));
}
void main() {
    vec2 uv = gl_FragCoord.xy / resolution;
    float ratio = resolution.y / resolution.x;
    uv = uv * vec2(resolution.x / resolution.y, 1.0);
    vec2 p = uv;
    uv = uv + time * 2e-3;
    float f = 0.0;
    // left: value noise  
    if (p.x < 0.5 / ratio) {
        f = noise(16.0 * uv);
    }
    // right: fractal noise (4 octaves)
    else  {
        uv *= 5.0;
        mat2 m = mat2(1.6, 1.2, -1.2, 1.6);
        f  = 0.5000 * noise(uv);
        uv = m * uv;
        f += 0.2500 * noise(uv);
        uv = m * uv;
        f += 0.1250 * noise(uv);
        uv = m * uv;
        f += 0.0625 * noise(uv);
    }
    f = 0.5 + 0.5 * f;
    f *= smoothstep(0.0, 0.005, abs(p.x - 0.5 / ratio));  
    gl_FragColor = vec4( f, f, f, 1.0 );
}
// endGLSL
`);

// Cloud effect
setBothShaders(`
// beginGLSL
precision mediump float;
#define pi 3.1415926535897932384626433832795
uniform float time;
uniform vec2 resolution;
const float TURBULENCE = 0.009;
//noise function from iq: https://www.shadertoy.com/view/Msf3WH
vec2 hash(vec2 p) {
    p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
    return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
}
float noise(vec2 p) {
    const float K1 = 0.366025404;
    const float K2 = 0.211324865;
    vec2 i = floor(p + (p.x + p.y) * K1);
    vec2 a = p - i + (i.x + i.y) * K2;
    float m = step(a.y, a.x);
    vec2 o = vec2(m, 1.0 - m);
    vec2 b = a - o + K2;
    vec2 c = a - 1.0 + 2.0 * K2;
    vec3 h = max(0.5 - vec3(dot(a, a), dot(b, b), dot(c, c)), 0.0);
    vec3 n = h * h * h * h * vec3(dot(a, hash(i + 0.0)), dot(b, hash(i + o)), dot(c, hash(i + 1.0)));
    return dot(n, vec3(70.0));
}
const mat2 m2 = mat2(1.6,  1.2, -1.2,  1.6);
float fbm(vec2 p) {
    float amp = 0.5;
    float h = 0.0;
    for (int i = 0; i < 8; i++) {
        float n = noise(p);
        h += amp * n;
        amp *= 0.5;
        p = m2 * p;
    }
    return  0.5 + 0.5 * h;
}
vec3 cloudEffect(vec2 uv) {
    vec3 col = vec3(0.0, 0.0, 0.0);
    // time scale
    float v = 0.0002;
    vec3 smoke = vec3(1.0);
    vec2 scale = uv * 0.5;
    vec2 turbulence = TURBULENCE * vec2(noise(uv));
    scale += turbulence;
    float n1 = fbm(scale);
    col = mix(col, smoke, smoothstep(0.35, 0.9, n1));
    col = clamp(col, vec3(0.0), vec3(1.0));
    return col;
}
void main() {
    vec2 uv = gl_FragCoord.xy / resolution;
    float ratio = resolution.y / resolution.x;
    uv = uv - 0.5;
    uv.x /= ratio;
    vec3 col = cloudEffect(uv * 2. + vec2(1.5, 0.0));
    gl_FragColor = vec4(col, 1.0);
}
// endGLSL
`);

}