var text2D = function(text, id, x, y){
	this.text = text;
	this.x = x;
	this.y = y;
	
	this.stuff = document.createElement('div');
	this.stuff.id = text +"id";
	this.stuff.style.color = "white";
	this.stuff.style.position = 'absolute';
	this.stuff.style.font = "15px Arial";
	this.stuff.style.top = y + 'px';
	this.stuff.style.left = x + 'px';
	this.stuff.innerHTML = text;
}
