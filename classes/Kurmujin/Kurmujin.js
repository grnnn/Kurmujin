var Bouncer = function(size) {
  
  this.size = size;
  
  var vertexShaderText = loadFile('Kurmujin.vert');
  var fragmentShaderText = loadFile('Kurmujin.frag');
  
  this.myMaterial = new THREE.ShaderMaterial({
    uniforms: { 
      'size': { type: 'f', value: this.size },
    },
    vertexShader: vertexShaderText,
    fragmentShader: fragmentShaderText
  });
  
  //This creates the Kurmujin's body
  this.geometryBody = new THREE.SphereGeometry(this.size, 20, 20);
  this.body = new THREE.Mesh(this.geometryBody, this.material);
};

