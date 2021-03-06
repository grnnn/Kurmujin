var Option = function(pos, name, func, cost, image){
	this.pos = 180 + (pos%4) * 80; // an integer value
	this.name = name; //label of the option
	
	this.func = func; //the thing the option does when pressed
	
	this.cost = cost; //amount of money it takes to do this thing
	
	this.src = image; // image url
	
	if(typeof image !== "string") this.bool = true;
	else this.bool = false;
	
	this.elem = document.getElementById('gameArea');
	
	
	this.init();
	
}


Option.prototype.init = function(){  // creates and positions the html elements correctly
	var that = this;
	this.header = document.createElement('div');
	this.header.id = "header" + this.name;
	this.header.style.color = "white";
	this.header.style.position = 'absolute';
	this.header.style.font = "40px Arial";
	this.header.style.top = this.pos + 'px';
	this.header.style.left = 1020 + 'px';
	this.header.innerHTML = this.name;
	
	
	this.money = document.createElement('div');
	this.money.id = "money"+this.name;
	this.money.style.color = "white";
	this.money.style.position = 'absolute';
	this.money.style.font = "20px Arial";
	this.money.style.top = (this.pos + 50) + 'px';
	this.money.style.left = 1020 + 'px';
	this.money.innerHTML = '$' + Math.round(this.cost);
	
	
	this.image = document.createElement('img');
	this.image.id = "image"+this.name;
	if(this.bool) this.image.innerHTML = this.src;
	else this.image.src = this.src;
	this.image.style.position = 'absolute';
	this.image.style.width = 30 + "px";
	this.image.style.height = 30 + "px";
	this.image.style.top = (this.pos+40) + "px";
	this.image.style.left = 1150 + "px";
	
	
}

Option.prototype.add = function(){ //adds the html elements to the canvas
	var that = this;
	var elem = document.getElementById('gameArea');
	elem.appendChild(that.header);
	elem.appendChild(that.money);
	elem.appendChild(that.image);
}

Option.prototype.remove = function(){ //removes the html elements from the canvas
	var div = document.getElementById("header"+this.name);
	div.parentNode.removeChild(div);
	div = document.getElementById("money"+this.name);
	div.parentNode.removeChild(div);
	div = document.getElementById("image"+this.name);
	div.parentNode.removeChild(div);
}

Option.prototype.listener = function(mouseX, mouseY){ //check the click on the current option
	if(mouseX > 1020 && mouseX < 1180
		&& mouseY > this.pos+10 && mouseY < this.pos + 75){
			this.func();	
	}
}
