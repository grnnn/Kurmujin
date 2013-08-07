var Splotch = function(size, color, position) {
  
  this.size = size;
  this.startSize = size;
  
  this.color = color;
  
  this.position = position;
  
  var vertexShaderText = loadFile('classes/Kurmujin/Splotch.vert');
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
};

Splotch.prototype.update = function() {
  if(this.size < this.startSize * 1.5) {
  this.size++;
  }

  this.myMaterial.uniforms['Size'].value = this.size;
  this.myMaterial.uniforms['startSize'].value = this.startSize;
};