attribute float alpha;
varying float vAlpha;

void main() {
  vAlpha = alpha;
  float size = 40.0;
  gl_Position = projectionMatrix *
                modelViewMatrix *
                vec4(position, 1.0);
  gl_PointSize = size * projectionMatrix[0][0] / gl_Position.w * 600.0;
}