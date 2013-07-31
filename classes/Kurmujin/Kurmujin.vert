uniform float size;

void main() {
  gl_Position =  projectionMatrix * modelViewMatrix * vec4(size * position, 1.0);
}