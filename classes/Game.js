var Game = function(){  // Game object
	this.camera =  new THREE.PerspectiveCamera(45, 2.0/1.0, 1, 10000);
	this.renderer = new THREE.WebGLRenderer({antialias: true});
	this.scene = new THREE.Scene();
	
	this.kurmujins = new Array();
	
	this.clicked = new Array();
	
	this.feedBack = new Array();
	
}

Game.prototype.init = function(){ // initializes the entire game
	var that = this;
	
	splatSound  = $('#Splat')[0];
	this.splatSound = splatSound;
	
	dingSound  = $('#Ding')[0];
	this.dingSound = dingSound;
	
	//this.kurmujins = [];
	this.splotch = new Splotch();
	this.scene.add(this.splotch.particleSystem);
	
	this.renderer.setSize(1200, 600);
    document.body.appendChild(this.renderer.domElement);			
	this.renderer.setClearColor(0xEEEEEE, 1.0);
    this.renderer.clear();
      		
	this.camera.position.y = 0;
	this.camera.position.x = 0;
	this.camera.position.z = 1000;
	
	
	
	//Kurmujin Testing Code, will be deleted
		this.addKurmujin(20, new Color(1, 1, 1), {x:0, y:0});
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
	this.fcns["birthKurmujin"] = function(p1, p2){ that.birthKurmujin(p1, p2); }
	this.fcns["checkAmount"] = function(amount){ return that.checkAmount(amount); }
	
	this.mainMenu = new Menu(that.fcns);
	
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


Game.prototype.killKurmujin = function(i){
  this.splotch.addParticles(this.kurmujins[i].sCount, this.kurmujins[i].color, this.kurmujins[i].position, this.kurmujins[i].size);
  
  this.mainMenu.addCash(this.kurmujins[i].getPrice());
  
  this.scene.remove(this.kurmujins[i].body);
  
  for(var j = 0; j < this.kurmujins[i].toSignal.length; j++){
  	this.killKurmujin(j);
  	if(j < i) i--;
  }
  
  this.splatSound.play();
  
  var feedBackText = new text2D("$" + this.kurmujins[i].getPrice(), 
								Math.random()*1000, 
								(this.mouse.x + 1)*this.canvas.width/2, 
								(2 - (this.mouse.y + 1))*this.canvas.height/2 - this.kurmujins[i].size/2 - 30);
  feedBackText.timer = 100;
  this.feedBack.push(feedBackText);
 
  var elem = document.getElementById('gameArea');
  elem.appendChild(feedBackText.stuff);
  
  this.kurmujins[i] = null;
  this.kurmujins.splice(i, 1);
}

Game.prototype.mainInput = function(){ //Handling the main input of the game
	
	if(this.mouse.leftClicked()){
		var soundBool = true;
		
		if(this.mouse.x > 1000){ // Domain of Menu
			this.mainMenu.listener(this.mouse.x, this.mouse.y);
			soundBool = false;
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
	  		
	  		this.mainMenu.clicked = this.clicked;
	  		if(soundBool)this.dingSound.play();
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
	  
	  if(clicked.length == 1) {
		this.killKurmujin(this.killNumber);;
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

Game.prototype.checkAmount = function(amount){
	if(this.kurmujins.length < amount){
		if(this.kurmujins.length == 1) {alert("You can't do that with only 1 kurmujin");}
		else {alert("You can't do that with " + this.kurmujins.length + " kurmujins");}
		
		return false;
	}
	return true;
}

Game.prototype.feedbackChecker = function(){
	for(var i=0;i<this.feedBack.length;i++){
		this.feedBack[i].timer--;
		if(this.feedBack[i].timer == 0){
			var div = document.getElementById(this.feedBack[i].stuff.id);
			div.parentNode.removeChild(div);
			this.feedBack[i] = null;
			this.feedBack.splice(i, 1);
		}
	}
} 

Game.prototype.render = function(t){ // called every frame, main game loop
	
    for(var i = 0; i<this.kurmujins.length; i++) {
	  this.kurmujins[i].update();
	};
	
	
	this.mainMenu.update();

	this.feedbackChecker();
	
	this.camera.lookAt(this.scene.position);

	this.renderer.render(this.scene, this.camera);
	
	this.mainInput();
}

