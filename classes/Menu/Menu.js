var Menu = function(){ // Main menu object
	
	
	this.width = 200;
	this.height = 600;
	this.x = 1000;
	this.y = 0;
	
	this.ItemShop = new Shop("Item");
	this.PaintShop = new Shop("Paint");
	this.PatternShop = new Shop("Pattern");
	this.HardwareShop = new Shop("Hardware");
	
	this.currentShop = this.ItemShop;
	
	this.initText();
	this.initShops();
	
		
}




Menu.prototype.initText = function(){ // initializes the text and color
	this.image = document.createElement('img');
	this.image.src = "resources/images/menuBackground.png";
	this.image.style.width = 200 + "px";
	this.image.style.height = 600 + "px";
	this.image.style.top = 0 + "px";
	this.image.style.left = 1000 + "px";
	document.body.appendChild(this.image);
	
	this.label = document.createElement('div');
	this.label.style.color = "white";
	this.label.style.position = 'absolute';
	this.label.style.font = "40px Arial";
	this.label.style.top = 15 + 'px';
	this.label.style.left = 1020 + 'px';
	this.label.innerHTML = "Menu";
	document.body.appendChild(this.label);
	
	this.iImage = document.createElement('img');
	this.iImage.src = "resources/images/lightBlueRounded.png";
	this.iImage.style.position = 'absolute';
	this.iImage.style.width = 170 + "px";
	this.iImage.style.height = 23 + "px";
	this.iImage.style.top = 60 + "px";
	this.iImage.style.left = 1015 + "px";
	document.body.appendChild(this.iImage);
	
	this.items = document.createElement('div');
	this.items.style.color = "white";
	this.items.style.position = 'absolute';
	this.items.style.font = "20px Arial";
	this.items.style.top = 60 + 'px';
	this.items.style.left = 1020 + 'px';
	this.items.innerHTML = "Items";
	document.body.appendChild(this.items);
	
	this.pImage = document.createElement('img');
	this.pImage.src = "resources/images/redRounded.png";
	this.pImage.style.position = 'absolute';
	this.pImage.style.width = 170 + "px";
	this.pImage.style.height = 23 + "px";
	this.pImage.style.top = 85 + "px";
	this.pImage.style.left = 1015 + "px";
	document.body.appendChild(this.pImage);
	
	this.paint = document.createElement('div');
	this.paint.style.color = "white";
	this.paint.style.position = 'absolute';
	this.paint.style.font = "20px Arial";
	this.paint.style.top = 85 + 'px';
	this.paint.style.left = 1020 + 'px';
	this.paint.innerHTML = "Paint";
	document.body.appendChild(this.paint);
	
	this.paImage = document.createElement('img');
	this.paImage.src = "resources/images/yellowRounded.png";
	this.paImage.style.position = 'absolute';
	this.paImage.style.width = 170 + "px";
	this.paImage.style.height = 23 + "px";
	this.paImage.style.top = 110 + "px";
	this.paImage.style.left = 1015 + "px";
	document.body.appendChild(this.paImage);
	
	this.pattern = document.createElement('div');
	this.pattern.style.color = "white";
	this.pattern.style.position = 'absolute';
	this.pattern.style.font = "20px Arial";
	this.pattern.style.top = 110 + 'px';
	this.pattern.style.left = 1020 + 'px';
	this.pattern.innerHTML = "Pattern";
	document.body.appendChild(this.pattern);
	
	this.hImage = document.createElement('img');
	this.hImage.src = "resources/images/GreenRounded.png";
	this.hImage.style.position = 'absolute';
	this.hImage.style.width = 170 + "px";
	this.hImage.style.height = 23 + "px";
	this.hImage.style.top = 135 + "px";
	this.hImage.style.left = 1015 + "px";
	document.body.appendChild(this.hImage);
	
	this.hardware = document.createElement('div');
	this.hardware.style.color = "white";
	this.hardware.style.position = 'absolute';
	this.hardware.style.font = "20px Arial";
	this.hardware.style.top = 135 + 'px';
	this.hardware.style.left = 1020 + 'px';
	this.hardware.innerHTML = "Hardware";
	document.body.appendChild(this.hardware);
	
}

Menu.prototype.initShops = function(){ //initializes what the shops contain
	this.ItemShop.addOption("burger", doAThing, 5 , "resources/images/burger.png");
	this.ItemShop.addOption("donut", doAThing, 10, "resources/images/donut.png");
	
	this.PaintShop.addOption("green", doAThing, 20, "resources/images/green.png");
	this.PaintShop.addOption("blue", doAThing, 20, "resources/images/blue.png");
	
	this.PatternShop.addOption("spiral", doAThing, 50, "resources/images/spiral.png");
	this.PatternShop.addOption("star", doAThing, 50, "resources/images/star.png");
	
	this.HardwareShop.addOption("connect", doAThing, 100, "resources/images/repeater.png");
	
	this.ItemShop.makeVisible();
}

Menu.prototype.changeShop = function(type){ //Changes the visible shop and the background color of the menu
	this.currentShop.makeInvisible();
	switch(type){
		case "Item": 		this.currentShop = this.ItemShop;
							this.image.src = "resources/images/menuBackground.png";
					 		break;
		case "Paint": 		this.currentShop = this.PaintShop;
							this.image.src = "resources/images/redBack.png";
					 		break;
		case "Pattern": 	this.currentShop = this.PatternShop;
							this.image.src = "resources/images/yellowBack.png";
					 		break;
		case "Hardware": 	this.currentShop = this.HardwareShop;
							this.image.src = "resources/images/greenBack.png";
					 		break;
	}	
	this.currentShop.makeVisible();
}
