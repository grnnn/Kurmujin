var Game = function(){  // Game object
	this.camera =  new THREE.PerspectiveCamera(45, 2.0/1.0, 1, 10000);
	this.renderer = new THREE.WebGLRenderer({antialias: true});
	this.scene = new THREE.Scene();
}

Game.prototype.init = function(){ // initializes the entire game
	var that = this;
	
	this.kurmujins = [];
	this.splotches = [];
	
	this.renderer.setSize(1200, 600);
    document.body.appendChild(this.renderer.domElement);			
	this.renderer.setClearColor(0xEEEEEE, 1.0);
    this.renderer.clear();
      		
	this.camera.position.y = -100;
	this.camera.position.x = 0;
	this.camera.position.z = 1000;
	
	//Kurmujin Testing Code, will be deleted
		this.addKurmujin(30, new Color(0, 0, 1), {x:0, y:0});
		this.addKurmujin(30, new Color(0, 1, 1), {x:0, y:0});
		this.addKurmujin(30, new Color(1, 0, 1), {x:0, y:0});
		this.addKurmujin(30, new Color(0, 1, 0), {x:0, y:0});
	//End

	
	
	this.renderer.render(this.scene, this.camera);
	
	this.composer = new THREE.EffectComposer(this.renderer);
    this.composer.addPass(new THREE.RenderPass(this.scene, this.camera));
	  
  // Add single cube
  this.cube = new THREE.Mesh(
    new THREE.PlaneGeometry(1800, 900),
    new THREE.MeshLambertMaterial({
      color: new THREE.Color(0xffffff)
    }));
  this.scene.add(this.cube);

  // Add a light source
  var light = new THREE.PointLight(0xffffff);
  light.position.set(700, 1300, 1000);
  this.scene.add(light);
	
	this.mainMenu = new Menu();
	
	// Container div
  	this.container = document.getElementById('gameArea');
  	this.container.style.position = 'relative';
	
	// Visible canvas area on top of 3D rendering area
  	this.canvas = document.createElement('canvas');
  	this.canvas.style.position = 'absolute';
  	this.canvas.style.top = 0;
  	this.canvas.style.left = 0;
  	this.canvas.width = 1200;
  	this.canvas.height = 600;
  	this.canvas.style["zIndex"] = 1;
  	this.container.appendChild(this.canvas);
  	this.ctx = this.canvas.getContext('2d');
	
  	this.mouse = new Mouse(this.canvas);
  	
  	
  	
  	
  	//setup keyboard events
    this.keys = {};
  	$('body').keydown(function(e) {
    if (e.which && that.keys[e.which] !== 'triggered') {
      that.keys[e.which] = true;
    }
  	});
  	$('body').keyup(function(e) {
    if (e.which) {
      that.keys[e.which] = false;
    }
  	});
  	
	
}

Game.prototype.addKurmujin = function(size, color, position){
  this.kurmujins.push(new Kurmujin(size, color, position));
  this.scene.add(this.kurmujins[this.kurmujins.length-1].body);
}

Game.prototype.killKurmujin = function(i){
  this.splotches.push(new Splotch(this.kurmujins[i].size, this.kurmujins[i].color, this.kurmujins[i].position));
  this.scene.add(this.splotches[this.splotches.length-1].body);
  
  this.scene.remove(this.kurmujins[i].body);
  
  this.kurmujins.splice(i, 1);
}

Game.prototype.mainInput = function(){ //Handling the main input of the game
	
	if(this.mouse.leftClicked()){
		console.log(this.mouse.x + ", " + this.mouse.y);
		
		if(this.mouse.x > 1000){ // Domain of Menu
			this.mainMenu.listener(this.mouse.x, this.mouse.y);
		}
		if(this.mouse.x <= 1000){ // Domain of Kurmujin
			
		}
	}
	
	if(this.mouse.rightClicked()){
	
	  var that = this;
      // Figure out vector for which direction user clicked
      var projector = new THREE.Projector();
      var vector = new THREE.Vector3(this.mouse.x, this.mouse.y, 0);
      projector.unprojectVector(vector, this.camera);
	  
      // Subtract camera position to get relative direction from camera
      vector.sub(this.camera.position);
      vector.multiplyScalar(1000.0);
	  
	  //create raycaster
	  var vec2 = new THREE.Vector3(vector.x, vector.y, vector.z);
      vec2.normalize();
      var raycaster = new THREE.Raycaster(this.camera.position, vec2);

	  //check intersections
	  for(var i = 0; i<this.kurmujins.length; i++) {
	    if(raycaster.intersectObject(this.kurmujins[i].body).length > 0) {
		  this.killKurmujin(i);
        }
	  }
	}
	
	
}

Game.prototype.render = function(t){ // called every frame, main game loop
	
    for(var i = 0; i<this.kurmujins.length; i++) {
	  this.kurmujins[i].update();
	};
	
	for(var i = 0; i<this.splotches.length; i++) {
	  this.splotches[i].update();
	};
	
	this.mainMenu.update();

	//this.camera.lookAt(new THREE.Vector3(this.camera.position.x, this.camera.position.y, this.camera.position.z - 200));
	
	this.camera.lookAt(this.scene.position);

	this.renderer.render(this.scene, this.camera);
	
	this.mainInput();
}
