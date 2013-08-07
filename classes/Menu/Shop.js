var Shop = function(name){
	this.name = name;
	
	this.options = new Array();
}

Shop.prototype.addOption = function( name, func, cost, image){ //adds an option to the shop, position is determined by array size
	this.options.push(new Option(this.options.length+1, name, func, cost, image));
}

Shop.prototype.makeVisible = function(){ //makes the shop visible
	for(var i = 0; i < this.options.length; i++){
		this.options[i].add();
	}
}

Shop.prototype.makeInvisible = function(){ //makes the shop invisible
	for(var i = 0; i < this.options.length; i++){
		this.options[i].remove();
	}
}
