if (false) {

// A beautiful RGB twirl
setBothShaders(`
// beginGLSL
precision mediump float;
varying vec2 vTexCoord;
uniform float time;
uniform vec2 resolution;
// https://gist.github.com/ayamflow/c06bc0c8a64f985dd431bd0ac5b557cd
vec2 rotateUV(vec2 uv, float rotation, float mid) {
    return vec2(
      cos(rotation) * (uv.x - mid) + sin(rotation) * (uv.y - mid) + mid,
      cos(rotation) * (uv.y - mid) - sin(rotation) * (uv.x - mid) + mid
    );
}
void main() {
    vec2 uv = gl_FragCoord.xy / resolution;
    uv = rotateUV(uv, time * -0.1, 0.5);
    gl_FragColor = vec4(uv.x, uv.y, 1.0 - uv.x, 1.0);
}
// endGLSL
`);


// Rotating colourful grid
setBothShaders(`
// beginGLSL
precision mediump float;
varying vec2 vTexCoord;
uniform float time;
uniform vec2 resolution;
// https://gist.github.com/ayamflow/c06bc0c8a64f985dd431bd0ac5b557cd
vec2 rotateUV(vec2 uv, float rotation, float mid) {
    return vec2(
      cos(rotation) * (uv.x - mid) + sin(rotation) * (uv.y - mid) + mid,
      cos(rotation) * (uv.y - mid) - sin(rotation) * (uv.x - mid) + mid
    );
}
vec2 rotateUV2(vec2 uv, float rotation, float mid) {
    return vec2(
      cos(rotation + sin(uv.x * 1e2)) * (uv.x - mid) + sin(rotation + sin(uv.x * 1e2)) * (uv.y - mid) + mid,
      cos(rotation + cos(uv.y * 1e2)) * (uv.y - mid) - sin(rotation + sin(uv.x * 1e2)) * (uv.x - mid) + mid
    );
}
void main() {
    vec2 uv = gl_FragCoord.xy / resolution;
    uv = rotateUV(uv, time * -0.025, 0.5);
    uv = rotateUV2(uv, time * -0.1, 0.5);
    gl_FragColor = vec4(uv.x, uv.y, 1.0 - uv.x, 1.0);
}
// endGLSL
`);

// Melting crayons
setBothShaders(`
// beginGLSL
precision mediump float;
varying vec2 vTexCoord;
uniform float time;
uniform vec2 resolution;
// https://gist.github.com/ayamflow/c06bc0c8a64f985dd431bd0ac5b557cd
vec2 rotateUV(vec2 uv, float rotation, float mid) {
    return vec2(
      cos(rotation) * (uv.x - mid) + sin(rotation) * (uv.y - mid) + mid,
      cos(rotation) * (uv.y - mid) - sin(rotation) * (uv.x - mid) + mid
    );
}
vec2 rotateUV2(vec2 uv, float rotation, float mid) {
    return vec2(
      cos(rotation * uv.x / 50. + sin(uv.x * 3e1)) * (uv.x - mid) + sin(rotation + sin(uv.x * 3e1)) * (uv.y - mid) + mid,
      cos(rotation * uv.x / 50. + cos(uv.y * 3e1)) * (uv.y - mid) - sin(rotation + sin(uv.x * 3e1)) * (uv.x - mid) + mid
    );
}
void main() {
    vec2 uv = gl_FragCoord.xy / resolution;
    uv = rotateUV(uv, time * -0.025, 0.5);
    uv = rotateUV2(uv, time * -0.1, 0.5);
    gl_FragColor = vec4(uv.x, 1.0 - uv.y, sin(uv.y*1e1), 1.0);
}
// endGLSL
`);

}