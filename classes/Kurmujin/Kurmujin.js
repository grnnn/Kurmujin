var Kurmujin = function(size, color, position) {
  
  this.size = size;
  this.startSize = size;
  
  this.count = this.size / 10;
  
  this.color = color;
  
  this.position = position;
  
  this.toSignal = new Array();
  
  var vertexShaderText = loadFile('classes/Kurmujin/Kurmujin.vert');
  var fragmentShaderText = loadFile('classes/Kurmujin/Kurmujin.frag');
  
  this.myMaterial = new THREE.ShaderMaterial({
    uniforms: { 
      'Size': { type: 'f', value: this.Size },
	  'startSize': { type: 'f', value: this.startSize },
	  'Red': { type: 'f', value: this.color.red },
	  'Green': { type: 'f', value: this.color.green },
	  'Blue': { type: 'f', value: this.color.blue },
    },
    vertexShader: vertexShaderText,
    fragmentShader: fragmentShaderText
  });
  
  //This creates the Kurmujin's body
  this.geometryBody = new THREE.SphereGeometry(this.size, 20, 20);
  this.body = new THREE.Mesh(this.geometryBody, this.myMaterial);
  
  this.body.translateX(this.position.x);
  this.body.translateY(this.position.y);
  
  this.count = 0;
  this.randomX = 0;
  this.randomY = 0;
};

Kurmujin.prototype.move = function(x, y) {
  if(this.position.x < x) {
    this.body.translateX(1);
	this.position.x++;
  };
  if(this.position.x > x) {
    this.body.translateX(-1);
	this.position.x--;
  };
  
  if(this.position.y < y) {
    this.body.translateY(1);
	this.position.y++;
  };
  if(this.position.y > y) {
    this.body.translateY(-1);
	this.position.y--;
  };
};
  
Kurmujin.prototype.update = function() {
  if(this.count % 100 == 0) {
  this.randomX = Math.floor(Math.random()*1001) - 800;
  this.randomY = Math.floor(Math.random()*601) - 300;
  }
  this.count++;
  
  this.move(this.randomX, this.randomY);

  this.myMaterial.uniforms['Size'].value = this.size;
  this.myMaterial.uniforms['startSize'].value = this.startSize;

  
  //cough cough, excuse me you forgot to add these...
  this.myMaterial.uniforms['Red'].value = this.color.red;
  this.myMaterial.uniforms['Green'].value = this.color.green;
  this.myMaterial.uniforms['Blue'].value = this.color.blue;

};

Kurmujin.prototype.getPrice = function() {
  this.price = (this.size / 10);
  return this.price;
}

