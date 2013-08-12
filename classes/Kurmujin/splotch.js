var Splotch = function(size, color, position) {
  
  this.size = size;
  this.startSize = size;
  
  this.color = color;
  
  this.position = position;
  
  var particleCount = 100;
  var particles = new THREE.Geometry();
  
  var vertexShaderText = loadFile('classes/Kurmujin/Splotch.vert');
  var fragmentShaderText = loadFile('classes/Kurmujin/Splotch.frag');
  var splotchTexture = THREE.ImageUtils.loadTexture('resources/images/splotch.png');
  var particleMaterial = new THREE.ShaderMaterial({
    attributes: {
      'alpha': { type: 'f', value: [] },
    },
    uniforms: {
	  'size': { type: 't', value: splotchTexture },
	  'startSize': { type: 't', value: splotchTexture },
      'tTexture': { type: 't', value: splotchTexture },
    },
    vertexShader: vertexShaderText,
    fragmentShader: fragmentShaderText,
	transparent: true
  });
  
  for(var i = 0; i < particleCount; i++) {
    // New particle offscreen
    var particle = new THREE.Vector3(0, 0, -10000);
    particle.velocity = new THREE.Vector3(0, 0, 0);
    particle.active = false;
    particle.age = 0;
    particles.vertices.push(particle);
    particles.colors.push(new THREE.Color(0xff0000));
  }
  
  // Set attributes to fully opaque
  for(var i = 0; i < particleCount; i++) {
    // Start with particles fully opaque
    particleMaterial.attributes.alpha.value[i] = 1.0;
  }
  
  // Now create particle system itself
  this.particleSystem = new THREE.ParticleSystem(
    particles,
    particleMaterial);
	
  // Turn on sorting, needed for normal blending
  this.particleSystem.sortParticles = true;
  
  // Free list keeps track of unused particles
  this.particleSystem.freeList = [];
  for(var i = 0; i < particleCount; i++) {
    this.particleSystem.freeList.push(i);
  }
};

Splotch.prototype.update = function() {
  if(this.size < this.startSize * 1.5) {
  this.size++;
  }

//  this.particleMaterial.uniforms['Size'].value = this.size;
//  this.particleMaterial.uniforms['startSize'].value = this.startSize;
};