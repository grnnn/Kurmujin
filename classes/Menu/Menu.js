var Menu = function(){
	
	
	this.width = 200;
	this.height = 600;
	this.x = 1000;
	this.y = 0;
	
	this.init();
	
}




Menu.prototype.init = function(){
	this.image = document.createElement('img');
	this.image.src = "resources/images/menuBackground.png";
	this.image.style.width = 200 + "px";
	this.image.style.height = 600 + "px";
	this.image.style.top = 0 + "px";
	this.image.style.left = 1000 + "px";
	document.body.appendChild(this.image);
}
