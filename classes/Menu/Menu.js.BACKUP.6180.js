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
	
	this.cash = 100;
	this.fcns = fcns;

		
	this.initText();
	this.initArrows();
	this.initShops();
	
	this.arrowHandler(); // to the knee
	
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
	this.cCash.innerHTML = "$" + this.cash;
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
<<<<<<< HEAD
	this.KurmujinShop.addOption("White", function() { that.fcns["addKurmujin"](30, new Color(1, 1, 1), {x:0, y:0}); }, 5, "resources/images/white.png");
	this.KurmujinShop.addOption("Black", function() { that.fcns["addKurmujin"](30, new Color(0, 0, 0), {x:0, y:0}); }, 5, "resources/images/black.png");
	this.KurmujinShop.addOption("Green", function() { that.fcns["addKurmujin"](30, new Color(0, 1, 0), {x:0, y:0}); }, 10 , "resources/images/green.png");
	this.KurmujinShop.addOption("Blue", function() { that.fcns["addKurmujin"](30, new Color(0, 0, 1), {x:0, y:0}); }, 10, "resources/images/blue.png");
	this.KurmujinShop.addOption("Red", function() { that.fcns["addKurmujin"](30, new Color(1, 0, 0), {x:0, y:0}); }, 10, "resources/images/red.png");
	this.KurmujinShop.addOption("Yellow", function() { that.fcns["addKurmujin"](30, new Color(1, 1, 0), {x:0, y:0}); }, 15 , "resources/images/yellow.png");
	this.KurmujinShop.addOption("Cyan", function() { that.fcns["addKurmujin"](30, new Color(0, 1, 1), {x:0, y:0}); }, 15, "resources/images/cyan.png");
	this.KurmujinShop.addOption("Magenta", function() { that.fcns["addKurmujin"](30, new Color(1, 0, 1), {x:0, y:0}); }, 15, "resources/images/magenta.png");
=======
	this.KurmujinShop.addOption("Green", function() { that.fcns["addKurmujin"](20, new Color(0, 1, 0), {x:0, y:0}); }, 5 , "resources/images/green.png");
	this.KurmujinShop.addOption("Blue", function() { that.fcns["addKurmujin"](20, new Color(0, 0, 1), {x:0, y:0}); }, 5, "resources/images/blue.png");
	this.KurmujinShop.addOption("Red", function() { that.fcns["addKurmujin"](20, new Color(1, 0, 0), {x:0, y:0}); }, 5, "resources/images/red.png");
>>>>>>> d2749c8c3d30d6deb3dbc921f9f526d230c185b7
	
	this.ItemShop.addOption("Burger", doAThing, 20, "resources/images/burger.png");
	this.ItemShop.addOption("Donut",  doAThing, 20, "resources/images/donut.png");
	
	this.PatternShop.addOption("Spiral", doAThing, 50, "resources/images/spiral.png");
	this.PatternShop.addOption("Star", doAThing, 50, "resources/images/star.png");
	
	this.HardwareShop.addOption("Connect", doAThing, 100, "resources/images/repeater.png");
	
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
	this.cash += this.currentShop.listener(mouseX, mouseY, this.cash);
	
	
	/*
	 * Finally, check to see if an arrow has been clicked
	 */
	// Also check to see if an arrow has been clicked
	if(mouseX > 1010 && mouseX < 1095
		&& mouseY > 520 && mouseY < 560) {
			this.currentShop.prevPage();
			this.arrowHandler();
		}
		
	if(mouseX > 1110 && mouseX < 1195
		&& mouseY > 520 && mouseY < 560) {
			this.currentShop.nextPage();
			this.arrowHandler();
		}
}

Menu.prototype.update = function(){
	this.cCash.innerHTML = "$" + this.cash;
}

Menu.prototype.addCash = function(amount){
	this.cash += amount;
}

