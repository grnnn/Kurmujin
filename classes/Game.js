var Game = function(){  // Game object
	this.camera =  new THREE.PerspectiveCamera(45, 2.0/1.0, 1, 10000);
	this.renderer = new THREE.WebGLRenderer({antialias: true});
	this.scene = new THREE.Scene();
	
}

Game.prototype.init = function(){
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
			
	this.renderer.render(this.scene, this.camera);
	
	this.composer = new THREE.EffectComposer(this.renderer);
    this.composer.addPass(new THREE.RenderPass(this.scene, this.camera));
    
      		
    this.spot = new THREE.PointLight(0xffffff, 1, 1000);
    this.spot.position.set( 0, 0, 200 );
	this.scene.add(this.spot);
	
	var ambient_light = new THREE.AmbientLight(0x101010);
  	this.scene.add(ambient_light);
  	
  	
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
    this.kTester.move(50, 50);
	this.renderer.render(this.scene, this.camera);
}
