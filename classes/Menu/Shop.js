var Shop = function(name){
	this.name = name;
	
	this.options = new Array();
	
	this.page = 1;
	
	
}

Shop.prototype.addOption = function( name, func, cost, image){ //adds an option to the shop, position is determined by array size
	this.options.push(new Option(this.options.length, name, func, cost, image));
}

Shop.prototype.makeVisible = function(){ //makes the shop visible
	for(var i = 4*(this.page - 1); i < 4*this.page; i++){
		if(i == this.options.length) break;
		this.options[i].add();
	}
}

Shop.prototype.makeInvisible = function(){ //makes the shop invisible
	for(var i = 4*(this.page - 1); i < 4*this.page; i++){
		if(i == this.options.length) break;
		this.options[i].remove();
	}
}

Shop.prototype.listener = function(mouseX, mouseY){ //check each visible option
	for(var i = 4*(this.page - 1); i < 4*this.page; i++){
		if(i == this.options.length) break;
			this.options[i].listener(mouseX, mouseY);
	}
	
	
	
	
}

Shop.prototype.nextPage = function(){ //goes to the next page in the shop
	this.makeInvisible();
	this.page++;
	this.makeVisible();
}

Shop.prototype.prevPage = function(){ // goes to the previous page in the shop
	this.makeInvisible();
	this.page--;
	this.makeVisible();
}