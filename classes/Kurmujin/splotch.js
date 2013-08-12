var Splotch = function(size, color, position) {
  this.color = color;
  
  this.position = {x:position.x, y: position.y, z: 20};
  
  var particleCount = 200;
  var particles = new THREE.Geometry();
  
  this.emitter = this.position;
  
  var vertexShaderText = loadFile('classes/Kurmujin/Splotch.vert');
  var fragmentShaderText = loadFile('classes/Kurmujin/Splotch.frag');
  var splotchTexture = THREE.ImageUtils.loadTexture('resources/images/splotch.png');
  var particleMaterial = new THREE.ShaderMaterial({
    attributes: {
      'alpha': { type: 'f', value: [] },
    },
    uniforms: {
	  'red' : { type: 'f', value: color.red },
	  'green' : { type: 'f', value: color.green },
	  'blue' : { type: 'f', value: color.blue },
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
  if(this.particleSystem.freeList.length > 0) {
      var newIndex = this.particleSystem.freeList.pop();
      var elem = this.particleSystem.geometry.vertices[newIndex];
      var rand = function(x) {
        return x * (Math.random() * 2.0 - 1.0);
      };
      elem.age = 0;
      elem.x = this.emitter.x + rand(10);
      elem.y = this.emitter.y + rand(10) + 10.0;
      elem.z = this.emitter.z + rand(10);
      elem.velocity.x = rand(10);
      elem.velocity.y = 50 + rand(10);
      elem.velocity.z = rand(10);
      elem.active = true;
	  
  }
};