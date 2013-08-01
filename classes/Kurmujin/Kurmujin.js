var Kurmujin = function(size) {
  
  this.size = size;
  
  var vertexShaderText = loadFile('Kurmujin.vert');
  var fragmentShaderText = loadFile('Kurmujin.frag');
  /*
  this.myMaterial = new THREE.ShaderMaterial({
    uniforms: { 
      'Size': { type: 'f', value: this.Size },
    },
    vertexShader: vertexShaderText,
    fragmentShader: fragmentShaderText
  });
  */
  
  //This creates the Kurmujin's body
  this.myMaterial = new THREE.MeshLambertMaterial({color: 0xbbbbbb});
  this.geometryBody = new THREE.SphereGeometry(this.size, 20, 20);
  this.body = new THREE.Mesh(this.geometryBody, this.myMaterial);
};

