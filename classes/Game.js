var Game = function(){  // Game object
	this.camera =  new THREE.PerspectiveCamera(45, 5.0/3.0, 1, 10000);
	this.renderer = new THREE.WebGLRenderer({antialias: true});
	this.scene = new THREE.Scene();
	
}

Game.prototype.init = function(){
	var that = this;
	
	this.renderer.setSize(1000, 600);
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
	
//	var ambient_light = new THREE.AmbientLight(0x101010);
// 	this.scene.add(ambient_light);
  	
  	var mainMenu = new Menu();
  	
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

Game.prototype.render = function(t){

    this.kTester.update();
	this.sTester.update();

	this.camera.lookAt(new THREE.Vector3(this.camera.position.x, this.camera.position.y, this.camera.position.z - 200));

	this.renderer.render(this.scene, this.camera);
}
