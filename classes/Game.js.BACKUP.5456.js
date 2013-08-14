var Game = function(){  // Game object
	this.camera =  new THREE.PerspectiveCamera(45, 2.0/1.0, 1, 10000);
	this.renderer = new THREE.WebGLRenderer({antialias: true});
	this.scene = new THREE.Scene();
	
	this.kurmujins = new Array();
	
	this.clicked = new Array();
	
}

Game.prototype.init = function(){ // initializes the entire game
	var that = this;
	
	splatSound  = $('#Splat')[0];
	this.splatSound = splatSound;
	
	//this.kurmujins = [];
	this.splotch = new Splotch();
	this.scene.add(this.splotch.particleSystem);
	
	this.renderer.setSize(1200, 600);
    document.body.appendChild(this.renderer.domElement);			
	this.renderer.setClearColor(0xEEEEEE, 1.0);
    this.renderer.clear();
      		
	this.camera.position.y = -100;
	this.camera.position.x = 0;
	this.camera.position.z = 1000;
	
	
	
	//Kurmujin Testing Code, will be deleted
		this.addKurmujin(20, new Color(0, 0, 1), {x:0, y:0});
		this.addKurmujin(20, new Color(0, 1, 1), {x:0, y:0});
		this.addKurmujin(20, new Color(1, 0, 1), {x:0, y:0});
		this.addKurmujin(20, new Color(0, 1, 0), {x:0, y:0});
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
	
	this.fcns = new Object();
	this.fcns["addKurmujin"] = function(size, color, position){ that.addKurmujin(size, color, position); }
	this.fcns["killKurmujin"] = function(i) { that.killKurmujin(i); }
	this.fcns["raycasterOn"] = function(){ that.raycasterOn(); }
	this.fcns["raycasterOff"] = function(){ that.raycasterOff(); }
	
	this.mainMenu = new Menu(that.fcns, that.clicked);
	
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

Game.prototype.birthKurmujin = function(parent1, parent2){
  
  var size = (parent1.size + parent2.size)/2;
  var color = new Color((parent1.color.red + parent2.color.red)/2,
						(parent1.color.green + parent2.color.green)/2,
						(parent1.color.blue + parent2.color.blue)/2);
  var position = {x: (parent1.position.x + parent2.position.x)/2,
				  y: (parent1.position.y + parent2.position.y)/2};
  
  this.kurmujins.push(new Kurmujin(size, color, position));
  this.scene.add(this.kurmujins[this.kurmujins.length-1].body);
}

<<<<<<< HEAD
Game.prototype.killKurmujin = function(kurmujin){
  this.splotches.push(new Splotch(kurmujin.size, kurmujin.color, kurmujin.position, this.splotches.length));
  this.scene.add(this.splotches[this.splotches.length-1].particleSystem);
=======
Game.prototype.killKurmujin = function(i){
  this.splotch.addParticles(5, this.kurmujins[i].color, this.kurmujins[i].position, this.kurmujins[i].size);
>>>>>>> 44288a9960458d2e9e02b5521fea97789213f9d1
  
  this.mainMenu.addCash(10);
  
  this.scene.remove(kurmujin.body);
  
  this.splatSound.play();

  kurmujin = null;
  this.kurmujins.splice(this.kurmujins.indexOf(kurmujin), 1);
}

Game.prototype.mainInput = function(){ //Handling the main input of the game
	
	if(this.mouse.leftClicked()){
		console.log(this.mouse.x + ", " + this.mouse.y);
		
		if(this.mouse.x > 1000){ // Domain of Menu
			this.mainMenu.listener(this.mouse.x, this.mouse.y);
		}
		if(!this.mouse.noRaycasting){
	
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
				  this.clicked.push(this.kurmujins[i]);
        		}
	  		}
		}
	}
	
	if(this.mouse.rightClicked()){
	
	  var clicked = [];
	
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
		  clicked.push(this.kurmujins[i]);
		  this.killNumber = i;
        }
	  }
	  
	  if(clicked.length >= 2) {
		this.birthKurmujin(clicked[0], clicked[1]);
	  }
	  if(clicked.length == 1) {
		this.killKurmujin(clicked[0]);;
	  }
	}
	
	
}

Game.prototype.raycasterOn = function(){ //turns on the raycasting
	this.mouse.noRaycasting = false;
}

Game.prototype.raycasterOff = function(){ //turns off the raycasting, also resets stack of clicked on kurmujins
	this.mouse.noRaycasting = true;
	this.clicked = null;
	this.clicked = new Array();
}

Game.prototype.render = function(t){ // called every frame, main game loop
	
    for(var i = 0; i<this.kurmujins.length; i++) {
	  this.kurmujins[i].update();
	};
	
	this.mainMenu.update();

	//this.camera.lookAt(new THREE.Vector3(this.camera.position.x, this.camera.position.y, this.camera.position.z - 200));
	
	this.camera.lookAt(this.scene.position);

	this.renderer.render(this.scene, this.camera);
	
	this.mainInput();
}
