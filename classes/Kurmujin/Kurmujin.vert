uniform float Size;
uniform float startSize;

void main() {
  gl_Position =  projectionMatrix * modelViewMatrix * vec4(position * (Size/startSize), 1.0);
}