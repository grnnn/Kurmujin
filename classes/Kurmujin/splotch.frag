uniform sampler2D tTexture;
varying float vRed;
varying float vGreen;
varying float vBlue;

void main() {
  // gl_PointCoord is like texture coordinates but for point sprites
  vec2 sampleLoc = gl_PointCoord;
  vec4 tColor = texture2D(tTexture, sampleLoc);
  gl_FragColor = vec4(vRed, vGreen, vBlue, tColor.a * 1.0);
}