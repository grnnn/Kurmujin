uniform float Size;
uniform float startSize;

void main() {
  gl_Position =  projectionMatrix * modelViewMatrix * vec4(position * vec3(1.0, 1.0, 0.1), 1.0);
}