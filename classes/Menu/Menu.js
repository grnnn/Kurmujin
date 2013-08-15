var Menu = function(fcns){ // Main menu object
	
	
	this.width = 200;
	this.height = 600;
	this.x = 1000;
	this.y = 0;
	
	this.PaintShop = new Shop("Paint");
	this.ItemShop = new Shop("Item");
	this.PatternShop = new Shop("Pattern");
	this.HardwareShop = new Shop("Hardware");
	this.KurmujinShop = new Shop("Kurmujin");
	
	this.currentShop = this.PaintShop;
	

	this.cash = 50;

	this.fcns = fcns;
	this.clicked = new Array();
	
	this.selectionFunc = function(){};
		
	this.initText();
	this.initArrows();
	this.initShops();
	
	this.arrowHandler(); // to the knee
	
	this.fTutorial = false;
	this.pTutorial = false;
	this.bTutorial = false;
	
}




Menu.prototype.initText = function(){ // initializes the text and color
	var elem = document.getElementById('gameArea');
	
	this.image = document.createElement('img');
	this.image.src = "resources/images/menuBackground.png";
	this.image.style.position = 'absolute';
	this.image.style.width = 200 + "px";
	this.image.style.height = 600 + "px";
	this.image.style.top = 0 + "px";
	this.image.style.left = 1000 + "px";
	elem.appendChild(this.image);
	
	this.label = document.createElement('div');
	this.label.style.color = "white";
	this.label.style.position = 'absolute';
	this.label.style.font = "40px Arial";
	this.label.style.top = 15 + 'px';
	this.label.style.left = 1020 + 'px';
	this.label.innerHTML = "Menu";
	elem.appendChild(this.label);
	
	this.iImage = document.createElement('img');
	this.iImage.src = "resources/images/lightBlueRounded.png";
	this.iImage.style.position = 'absolute';
	this.iImage.style.width = 170 + "px";
	this.iImage.style.height = 23 + "px";
	this.iImage.style.top = 60 + "px";
	this.iImage.style.left = 1015 + "px";
	elem.appendChild(this.iImage);
	
	this.items = document.createElement('div');
	this.items.style.color = "white";
	this.items.style.position = 'absolute';
	this.items.style.font = "20px Arial";
	this.items.style.top = 60 + 'px';
	this.items.style.left = 1020 + 'px';
	this.items.innerHTML = "Paint";
	elem.appendChild(this.items);
	
	this.pImage = document.createElement('img');
	this.pImage.src = "resources/images/redRounded.png";
	this.pImage.style.position = 'absolute';
	this.pImage.style.width = 170 + "px";
	this.pImage.style.height = 23 + "px";
	this.pImage.style.top = 85 + "px";
	this.pImage.style.left = 1015 + "px";
	elem.appendChild(this.pImage);
	
	this.paint = document.createElement('div');
	this.paint.style.color = "white";
	this.paint.style.position = 'absolute';
	this.paint.style.font = "20px Arial";
	this.paint.style.top = 85 + 'px';
	this.paint.style.left = 1020 + 'px';
	this.paint.innerHTML = "Item";
	elem.appendChild(this.paint);
	
	this.paImage = document.createElement('img');
	this.paImage.src = "resources/images/yellowRounded.png";
	this.paImage.style.position = 'absolute';
	this.paImage.style.width = 170 + "px";
	this.paImage.style.height = 23 + "px";
	this.paImage.style.top = 110 + "px";
	this.paImage.style.left = 1015 + "px";
	elem.appendChild(this.paImage);
	
	this.pattern = document.createElement('div');
	this.pattern.style.color = "white";
	this.pattern.style.position = 'absolute';
	this.pattern.style.font = "20px Arial";
	this.pattern.style.top = 110 + 'px';
	this.pattern.style.left = 1020 + 'px';
	this.pattern.innerHTML = "Pattern";
	elem.appendChild(this.pattern);
	
	this.hImage = document.createElement('img');
	this.hImage.src = "resources/images/GreenRounded.png";
	this.hImage.style.position = 'absolute';
	this.hImage.style.width = 170 + "px";
	this.hImage.style.height = 23 + "px";
	this.hImage.style.top = 135 + "px";
	this.hImage.style.left = 1015 + "px";
	elem.appendChild(this.hImage);
	
	this.hardware = document.createElement('div');
	this.hardware.style.color = "white";
	this.hardware.style.position = 'absolute';
	this.hardware.style.font = "20px Arial";
	this.hardware.style.top = 135 + 'px';
	this.hardware.style.left = 1020 + 'px';
	this.hardware.innerHTML = "Hardware";
	elem.appendChild(this.hardware);
	
	this.kImage = document.createElement('img');
	this.kImage.src = "resources/images/OrangeRounded.png";
	this.kImage.style.position = 'absolute';
	this.kImage.style.width = 170 + "px";
	this.kImage.style.height = 23 + "px";
	this.kImage.style.top = 160 + "px";
	this.kImage.style.left = 1015 + "px";
	elem.appendChild(this.kImage);
	
	this.kurmujin = document.createElement('div');
	this.kurmujin.style.color = "white";
	this.kurmujin.style.position = 'absolute';
	this.kurmujin.style.font = "20px Arial";
	this.kurmujin.style.top = 160 + 'px';
	this.kurmujin.style.left = 1020 + 'px';
	this.kurmujin.innerHTML = "Kurmujin";
	elem.appendChild(this.kurmujin);
	
	this.cCash = document.createElement('div');
	this.cCash.style.color = "white";
	this.cCash.style.position = 'absolute';
	this.cCash.style.font = "25px Arial";
	this.cCash.style.top = 570 + 'px';
	this.cCash.style.left = 1020 + 'px';
	this.cCash.innerHTML = "$" + Math.round(this.cash);
	elem.appendChild(this.cCash);
}

Menu.prototype.initArrows = function(){ //initiates both of the arrows
	this.right = document.createElement('img');
	this.right.id = "right arrow";
	this.right.src = "resources/images/rightArrow.png";
	this.right.style.position = 'absolute';
	this.right.style.width = 85 + "px";
	this.right.style.height = 40 + "px";
	this.right.style.top = 520 + "px";
	this.right.style.left = 1110 + "px";
	this.right.visible = false;
	
	this.left = document.createElement('img');
	this.left.id = "left arrow";
	this.left.src = "resources/images/leftArrow.png";
	this.left.style.position = 'absolute';
	this.left.style.width = 85 + "px";
	this.left.style.height = 40 + "px";
	this.left.style.top = 520 + "px";
	this.left.style.left = 1010 + "px";
	this.left.visible = false;
	

	
}

Menu.prototype.rightArrowOn = function(){ //makes the right arrow visible
	var that = this;
	var elem = document.getElementById('gameArea');
	elem.appendChild(that.right);
	this.right.visible = true;
}

Menu.prototype.rightArrowOff = function(){ //makes the right arrow invisible
	var div = document.getElementById("right arrow");
	div.parentNode.removeChild(div);
	this.right.visible = false;
}

Menu.prototype.leftArrowOn = function(){ //makes the left arrow visible
	var that = this;
	var elem = document.getElementById('gameArea');
	elem.appendChild(that.left);
	this.left.visible = true;
}

Menu.prototype.leftArrowOff = function(){ //makes the left arrow invisible
	var div = document.getElementById("left arrow");
	div.parentNode.removeChild(div);
	this.left.visible = false;
}

Menu.prototype.initShops = function(){ //initializes what the shops contain
	var that = this;
	
	
	this.PaintShop.addOption("Black", function() { if( that.fcns["checkAmount"](1) && that.cashCheck(5)){
														that.fcns["raycasterOn"]();
														that.selectionFunc = function(){ that.color( new Color(0, 0, 0) ); }; 
												   }
												   if(that.pTutorial == false) {
														alert("Click on the kurmujin you wish to modify");
														that.pTutorial = true;
												   }
												 }, 5, "resources/images/black.png");
	this.PaintShop.addOption("Green", function() { if(that.fcns["checkAmount"](1) && that.cashCheck(10)){
													that.fcns["raycasterOn"](); 
													that.selectionFunc = function(){ that.color( new Color(0, 1, 0) ); }; 
												   }
												   if(that.pTutorial == false) {
														alert("Click on the kurmujin you wish to modify");
														that.pTutorial = true;
												   }
												 }, 10 , "resources/images/green.png");
	this.PaintShop.addOption("Blue", function() { if(that.fcns["checkAmount"](1) && that.cashCheck(10)){
													that.fcns["raycasterOn"](); 
													that.selectionFunc = function(){ that.color( new Color(0, 0, 1) ); }; 
												   }
												   if(that.pTutorial == false) {
														alert("Click on the kurmujin you wish to modify");
														that.pTutorial = true;
												   }
												}, 10, "resources/images/blue.png");
	this.PaintShop.addOption("Red", function() { if(that.fcns["checkAmount"](1) && that.cashCheck(10)){
													that.fcns["raycasterOn"](); 
													that.selectionFunc = function(){ that.color( new Color(1, 0, 0) ); }; 
												   }
												   if(that.pTutorial == false) {
														alert("Click on the kurmujin you wish to modify");
														that.pTutorial = true;
												   }
											   }, 10, "resources/images/red.png");
	this.PaintShop.addOption("Yellow", function() { if(that.fcns["checkAmount"](1) && that.cashCheck(15)){
													that.fcns["raycasterOn"](); 
													that.selectionFunc = function(){ that.color( new Color(1, 1, 0) ); };
												   }
												   if(that.pTutorial == false) {
														alert("Click on the kurmujin you wish to modify");
														that.pTutorial = true;
												   }
												 }, 15 , "resources/images/yellow.png");
	this.PaintShop.addOption("Cyan", function() { if(that.fcns["checkAmount"](1) && that.cashCheck(15)){
													that.fcns["raycasterOn"](); 
													that.selectionFunc = function(){ that.color( new Color(0, 1, 1) ); }; 
													alert("Click on the kurmujin you wish to modify");
												   }
												   if(that.pTutorial == false) {
														alert("Click on the kurmujin you wish to modify");
														that.pTutorial = true;
												   }
												 }, 15, "resources/images/cyan.png");
	this.PaintShop.addOption("Magenta", function() { if(that.fcns["checkAmount"](1) && that.cashCheck(15)){
														that.fcns["raycasterOn"](); 
														that.selectionFunc = function(){ that.color( new Color(1, 0, 1) ); }; 
												   }
												   if(that.pTutorial == false) {
														alert("Click on the kurmujin you wish to modify");
														that.pTutorial = true;
												   }
												   }, 15, "resources/images/magenta.png");
	this.PaintShop.addOption("Brown", function() { if(that.fcns["checkAmount"](1) && that.cashCheck(20)){
														that.fcns["raycasterOn"](); 
														that.selectionFunc = function(){ that.color( new Color(3/5, 1/5, 0) ); }; 
														alert("Click on the kurmujin you wish to modify");
													 }
												   }, 20, "resources/images/brown.png");
	this.PaintShop.addOption("Orange", function() { if(that.fcns["checkAmount"](1) && that.cashCheck(20)){
														that.fcns["raycasterOn"](); 
														that.selectionFunc = function(){ that.color( new Color(1, 2/5, 0) ); }; 
														alert("Click on the kurmujin you wish to modify");
													 }
												   }, 20, "resources/images/orange.png");
	this.PaintShop.addOption("Purple", function() { if(that.fcns["checkAmount"](1) && that.cashCheck(20)){
														that.fcns["raycasterOn"](); 
														that.selectionFunc = function(){ that.color( new Color(3/5, 0, 3/5) ); }; 
														alert("Click on the kurmujin you wish to modify");
													 }
												   }, 20, "resources/images/purple.png");
	this.PaintShop.addOption("Pink", function() { if(that.fcns["checkAmount"](1) && that.cashCheck(20)){
														that.fcns["raycasterOn"](); 
														that.selectionFunc = function(){ that.color( new Color(1, 1/5, 3/5) ); }; 
														alert("Click on the kurmujin you wish to modify");
													 }
												   }, 20, "resources/images/pink.png");
	
	
	
	this.ItemShop.addOption("Donut",function() { if(that.fcns["checkAmount"](1) && that.cashCheck(10)){
													that.fcns["raycasterOn"]();
													that.selectionFunc = function(){ that.feed(5); };
												 }
												 if(that.fTutorial == false) {
													alert("Click on the kurmujin you wish to feed");
													that.fTutorial = true;
												 }
											   }, 10, "resources/images/donut.png");
	this.ItemShop.addOption("Burger",  function() { if(that.fcns["checkAmount"](1) && that.cashCheck(15)){
														that.fcns["raycasterOn"]();
														that.selectionFunc = function(){ that.feed(10); };
													}
													if(that.fTutorial == false) {
														alert("Click on the kurmujin you wish to feed");
														that.fTutorial = true;
													}
												  }, 15, "resources/images/burger.png");
	
	//this.PatternShop.addOption("N/A", doAThing, 50, "resources/images/spiral.png");
	//this.PatternShop.addOption("Star", doAThing, 50, "resources/images/star.png");
	
	this.HardwareShop.addOption("Connect", function() { if( that.fcns["checkAmount"](2) && that.cashCheck(100) ){
															that.fcns["raycasterOn"]();
															that.selectionFunc = function(){ that.connect(); };
															alert("Click 2 Kurmujins. \nThe first kurmujin will explode the second kurmujin upon its demise\nWait for 2 dings");
													    }
													  }, 100, "resources/images/repeater.png");
	
	this.KurmujinShop.addOption("White", function() {if(that.cashCheck(6)) that.fcns["addKurmujin"](20, new Color(1,1,1), {x:0, y:0}, 4); } , 6, "resources/images/white.png");
	this.KurmujinShop.addOption("Breed", function() { if( that.fcns["checkAmount"](2) && that.cashCheck(50) ){
														 that.fcns["raycasterOn"]();
														 that.selectionFunc = function(){ that.breed(); };
													  }
													  if(that.bTutorial == false) {
														alert("Click on 2 kurmujins you wish to breed\nWait for 2 dings");
														that.bTutorial = true;
													  }
													}, 50, "resources/images/heart.png");	
	this.KurmujinShop.addOption("Register", function() { if(that.fcns["checkAmount"](1) && that.cashCheck(30)){
														 	that.fcns["raycasterOn"]();
														 	that.selectionFunc = function(){ that.register(); };
														 	alert("Click on the kurmujin you wish to register");
														 }
													   }, 30, "resources/images/barcode.png");	
	
	this.PaintShop.makeVisible();
}

Menu.prototype.changeShop = function(type){ //Changes the visible shop and the background color of the menu
	this.currentShop.makeInvisible();
	switch(type){
		case "Paint":		this.currentShop = this.PaintShop;
							this.image.src = "resources/images/menuBackground.png";
					 		break;
		case "Item": 		this.currentShop = this.ItemShop;
							this.image.src = "resources/images/redBack.png";
					 		break;
		case "Pattern": 	this.currentShop = this.PatternShop;
							this.image.src = "resources/images/yellowBack.png";
					 		break;
		case "Hardware": 	this.currentShop = this.HardwareShop;
							this.image.src = "resources/images/greenBack.png";
					 		break;
		case "Kurmujin": 	this.currentShop = this.KurmujinShop;
							this.image.src = "resources/images/orangeBack.png";
					 		break;
	}	
	this.currentShop.makeVisible();
	this.arrowHandler();
}

Menu.prototype.arrowHandler = function(){ // decides which arrows should be on and off based on currentShop
	if(this.currentShop.page == 1 && this.left.visible) this.leftArrowOff(); 
	if(this.currentShop.page*4 >= this.currentShop.options.length && this.right.visible) this.rightArrowOff();
	if(this.currentShop.page > 1 && !this.left.visible) this.leftArrowOn();
	if(this.currentShop.page*4 < this.currentShop.options.length && !this.right.visible) this.rightArrowOn();
}

Menu.prototype.listener = function(mouseX, mouseY){ //Listen for which type of event to trigger
	
	/*
	 * Simple change for checking which shop
	 */
	if(mouseX >= 1020 && mouseX <= 1185
		&& mouseY >= 60 && mouseY <= 82.5) this.changeShop("Paint");
	if(mouseX >= 1020 && mouseX <= 1185
		&& mouseY > 82.5 && mouseY <= 107.5) this.changeShop("Item");
	if(mouseX >= 1020 && mouseX <= 1185
		&& mouseY > 107.5 && mouseY <= 132.5) this.changeShop("Pattern");
	if(mouseX >= 1020 && mouseX <= 1185
		&& mouseY > 132.5 && mouseY <= 157.5) this.changeShop("Hardware");
	if(mouseX >= 1020 && mouseX <= 1185
		&& mouseY > 157.5 && mouseY <= 182.5) this.changeShop("Kurmujin");
		
	/*
	 * More complex check for each visible option
	 */
	this.currentShop.listener(mouseX, mouseY, this.cash);
	
	
	/*
	 * Finally, check to see if an arrow has been clicked
	 */
	// Also check to see if an arrow has been clicked
	if(mouseX > 1010 && mouseX < 1095
		&& mouseY > 520 && mouseY < 560 && this.left.visible) {
			this.currentShop.prevPage();
			this.arrowHandler();
		}
		
	if(mouseX > 1110 && mouseX < 1195
		&& mouseY > 520 && mouseY < 560 && this.right.visible) {
			this.currentShop.nextPage();
			this.arrowHandler();
		}
}

Menu.prototype.update = function(){ //updates the main menu every frame
	this.cCash.innerHTML = "$" + this.cash;
	
	this.selectionFunc();
	
}

Menu.prototype.addCash = function(amount){ // adds more cash
	this.cash += amount;
}

Menu.prototype.cashCheck = function(amount){ //takes away cash, also checks if one can even buy
	if(amount > this.cash){
		alert("You don't have the money");
		return false;
	}
	this.cash = this.cash - amount;
	return true;
}

/*
 * Modifying kurmujins! The functions created to modify kurmujins when clicked on
 * Also modifies menu options
 */

Menu.prototype.color = function(color){ //colors the kurmujin on the clicked stack
	if(this.clicked.length > 0){
		this.clicked[0].color = color;
		var red, green, blue;
		if(color.red == 0) red = 0; else red = 5/color.red;
		if(color.green == 0) green = 0; else green = 5/color.green;
		if(color.blue == 0) blue = 0; else blue = 5/color.blue;
		this.clicked[0].price += red+green+blue; 
		this.fcns["raycasterOff"]();
		this.selectionFunc = function(){};
		this.clicked = null;
	}
}

Menu.prototype.rNumber = 1;
Menu.prototype.register = function(){ //registers a kurmujin to be added at player will
	var that = this;
	if(this.clicked.length > 0){
		var k = that.clicked[0];
		var size = that.clicked[0].size;
		var color = that.clicked[0].color;
		var price = that.clicked[0].price;
		var string = prompt("What would you like this to be called?", "Number "+this.rNumber);
		this.KurmujinShop.addOption(string, function() { 
														if(that.cashCheck(price/2)){ that.fcns["addKurmujin"](size, color, {x:0, y:0}, price) } 
													   } , price/2, that.fcns["snapShot"](k) );
		this.arrowHandler();
		this.fcns["raycasterOff"]();
		this.selectionFunc = function(){};
		this.rNumber++;
		this.currentShop.makeVisible();
		this.clicked = null;
	}
}

Menu.prototype.breed = function(){ //breeds two kurmujins
	var that = this;
	if(this.clicked.length > 1){
		this.fcns["birthKurmujin"](that.clicked[0], that.clicked[1]);
		this.fcns["raycasterOff"]();
		this.selectionFunc = function(){};
		this.clicked = null;
	}
}

Menu.prototype.feed = function(dSize){ //feeds a selected kurmujin
	if(this.clicked.length > 0){
		this.clicked[0].size += dSize;
		this.fcns["raycasterOff"]();
		this.selectionFunc = function(){};
		this.clicked = null;
	}
}

Menu.prototype.connect = function(){ //connect two kurmujins
	if(this.clicked.length > 1){
		this.clicked[0].toSignal.push(this.clicked[1]);
		this.clicked.price += 50;
		this.fcns["raycasterOff"]();
		this.selectionFunc = function(){};
		this.clicked = null;
	}
}
