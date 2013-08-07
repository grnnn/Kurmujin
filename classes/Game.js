var Game = function(){  // Game object
	this.camera =  new THREE.PerspectiveCamera(45, 2.0/1.0, 1, 10000);
	this.renderer = new THREE.WebGLRenderer({antialias: true});
	this.scene = new THREE.Scene();
}

Game.prototype.init = function(){ // initializes the entire game
	var that = this;
	
	this.renderer.setSize(1200, 600);
    document.body.appendChild(this.renderer.domElement);			
	this.renderer.setClearColor(0xEEEEEE, 1.0);
    this.renderer.clear();
      		
	this.camera.position.y = 0;
	this.camera.position.x = 0;
	this.camera.position.z = 1000;
	
	//Kurmujin Testing Code, will be deleted
	this.kTester = new Kurmujin(30, new Color(0, 0, 1), {x:100, y:-50});
	this.scene.add(this.kTester.body);
	//End
	
	//Splotch Testing Code, will be deleted
	this.sTester = new Splotch(30, new Color(0, 1, 0), {x:100, y:50});
	this.scene.add(this.sTester.body);
	//End
	
	
	
	this.renderer.render(this.scene, this.camera);
	
	this.composer = new THREE.EffectComposer(this.renderer);
    this.composer.addPass(new THREE.RenderPass(this.scene, this.camera));
    
      		
    this.spot = new THREE.PointLight(0xffffff, 1, 100);
    this.spot.position.set( 0, 0, 200 );
	this.scene.add(this.spot);
	
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
	/*
	var that = this;
    // Figure out vector for which direction user clicked
    var projector = new THREE.Projector();
    var vector = new THREE.Vector3(mouse.x, mouse.y, 0);
    console.log('Raw vector', vector.x, vector.y, vector.z);
    projector.unprojectVector(vector, this.camera);
    console.log('Unprojected vector', vector.x, vector.y, vector.z);
    // Subtract camera position to get relative direction from camera
    vector.sub(this.camera.position);
    vector.multiplyScalar(10000.0);
    console.log('Scaled relative vector', vector.x, vector.y, vector.z);
	*/
	}
	
	
}

Game.prototype.render = function(t){ // called every frame, main game loop

    this.kTester.update();
	this.sTester.update();

	this.camera.lookAt(new THREE.Vector3(this.camera.position.x, this.camera.position.y, this.camera.position.z - 200));

	this.renderer.render(this.scene, this.camera);
	
	this.mainInput();
}
