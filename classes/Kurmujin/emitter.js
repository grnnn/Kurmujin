var Emitter = function(size, color, position, height) {
  this.color = color;
  
  this.size = size;
  
  this.position = {x:position.x, y: position.y, z: height + 10};
  
  this.count = 0;
  
  this.count = size/5;
}