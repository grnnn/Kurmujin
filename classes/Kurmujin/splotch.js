var Splotch = function() {
  var particles = new THREE.Geometry();
  
  var vertexShaderText = loadFile('classes/Kurmujin/Splotch.vert');
  var fragmentShaderText = loadFile('classes/Kurmujin/Splotch.frag');
  
  var splotchTexture = THREE.ImageUtils.loadTexture('resources/images/splotch.png');
  
  this.particleMaterial = new THREE.ShaderMaterial({
    attributes: {
      'red': { type: 'f', value: [] },
	  'green': { type: 'f', value: [] },
	  'blue': { type: 'f', value: [] },
    },
    uniforms: {
      'tTexture': { type: 't', value: splotchTexture },
    },
    vertexShader: vertexShaderText,
    fragmentShader: fragmentShaderText,
	transparent: true
  });
  
  // Now create particle system itself
  this.particleSystem = new THREE.ParticleSystem(
    particles,
    this.particleMaterial);
	
  // Turn on sorting, needed for normal blending
  this.particleSystem.sortParticles = true;
  
  for(var i = 0; i<1000; i++) {
    this.particleSystem.geometry.vertices.push(new THREE.Vector3(0, 0, -100));
	this.particleMaterial.attributes.red.value.push(0);
	this.particleMaterial.attributes.green.value.push(0);
	this.particleMaterial.attributes.blue.value.push(0);
  }
  
  this.bigCount = 0;
};

Splotch.prototype.addParticles = function(count, color, loc, size) {
  for(var i = 0; i<count; i++) {
    var particle = this.particleSystem.geometry.vertices[this.bigCount + i];
	var rand = function(x) {
	  return x * (Math.random() * 2.0 - 1.0);
	};
	particle.x = loc.x + rand(size);
	particle.y = loc.y + rand(size);
	particle.z = 5;
  }
  
  for(var i = 0; i < count; i++) {
    // Set the Particle Colors
    this.particleMaterial.attributes.red.value[this.bigCount + i] = color.red;
	this.particleMaterial.attributes.green.value[this.bigCount + i] = color.green;
	this.particleMaterial.attributes.blue.value[this.bigCount + i] = color.blue;
  }
  
  this.bigCount += count;

  this.particleSystem.geometry.verticesNeedUpdate = true;
};
