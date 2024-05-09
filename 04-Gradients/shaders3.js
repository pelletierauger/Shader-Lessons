// Linear gradients
setBothShaders(`
// beginGLSL
precision mediump float;
#define segments 8.0
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
    float radius = length(uv);
    float angle = atan(uv.y, uv.x);
    angle /= pi;
    angle *= segments; 
    // repeat segment
    if (mod(angle, 2.0) >= 1.0) {
        angle = fract(angle);
    } else {
        angle = 1.0 - fract(angle);
    }
    angle /= segments;
    angle *= pi * 2.0;
    vec2 point = vec2(radius * cos(angle), radius * sin(angle));
    // point = fract(point);
    uv = point;
    // uv = rotateUV(uv, angle, 0.0);
    vec3 col = vec3(map(sin(uv.x * 4e1 - time * 0.5), -1.0, 1.0, 0., 1.));
    gl_FragColor = vec4(col, 1.0);
}
// endGLSL
`);