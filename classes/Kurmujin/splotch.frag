uniform sampler2D tTexture;
uniform float red;
uniform float green;
uniform float blue;
varying float vAlpha;

void main() {
  // gl_PointCoord is like texture coordinates but for point sprites
  vec2 sampleLoc = gl_PointCoord;
  vec4 tColor = texture2D(tTexture, sampleLoc);
  gl_FragColor = vec4(red, green, blue, tColor.a * vAlpha);
}