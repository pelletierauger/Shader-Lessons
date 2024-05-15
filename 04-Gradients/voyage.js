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
    col.g = pow(col.r, 3.);
    col.b = (1.0 - col.r);
    col.r = col.r * 2.;
    col.r = pow(col.r, 0.65);
    col.b = mix(col.b, (1.0 - col.r), 0.5);
    gl_FragColor = vec4(col, 1.0);
}
// endGLSL
`);