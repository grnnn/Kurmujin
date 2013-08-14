attribute float red;
attribute float green;
attribute float blue;
varying float vRed;
varying float vGreen;
varying float vBlue;

void main() {
  vRed = red;
  vBlue = blue;
  vGreen = green;
  float size = 40.0;
  gl_Position = projectionMatrix *
                modelViewMatrix *
                vec4(position, 1.0);
  gl_PointSize = size * 1.5 * projectionMatrix[0][0] / gl_Position.w * 600.0;
}