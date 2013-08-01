var Kurmujin = function(size, color) {
  
  this.size = size;
  
  this.color = color;
  
  var vertexShaderText = loadFile('classes/Kurmujin/Kurmujin.vert');
  var fragmentShaderText = loadFile('classes/Kurmujin/Kurmujin.frag');
  
  this.myMaterial = new THREE.ShaderMaterial({
    uniforms: { 
      'Size': { type: 'f', value: this.Size },
	  'Red': { type: 'f', value: this.color.red },
	  'Green': { type: 'f', value: this.color.green },
	  'Blue': { type: 'f', value: this.color.blue },
    },
    vertexShader: vertexShaderText,
    fragmentShader: fragmentShaderText
  });
  
  //This creates the Kurmujin's body
  //this.myMaterial = new THREE.MeshLambertMaterial({color: 0xbbbbbb});
  this.geometryBody = new THREE.SphereGeometry(this.size, 20, 20);
  this.body = new THREE.Mesh(this.geometryBody, this.myMaterial);
};

