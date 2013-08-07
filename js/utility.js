/**
 * Synchronously load contents of file
 * Returns contents as string
 * NOTE:
 *   NOT FOR USE IN PRODUCTION
 *   Use asynchronous loading in production.
 */
var loadFile = function(url) {
  var result = null;
  $.ajax({
    url: url,
    async: false
  }).done(function(data) {
    result = data;
  });
  return result;
};


/*Mouse object for 2D input*/

var Mouse = function(canvas) {
  var that = this;
  this.x = null;
  this.y = null;
  this.hasLeftClicked = false;
  canvas.addEventListener('mousedown', function(event) { //'mousemove' instead of mousedown for updating mouse.x and mouse.y
    var rect = canvas.getBoundingClientRect();
    that.x = (event.clientX - rect.left) / rect.width * 2 - 1;
    that.y = -(event.clientY - rect.top) / rect.height * 2 + 1;
    
    //personal modifications...Now the x and y values represent pixels
    that.x++;
    that.y++;
    that.y = 2 - that.y;
    that.x = that.x*canvas.width/2;
    that.y = that.y*canvas.height/2;
    
    that.hasLeftClicked = true;
  }, false);
};

Mouse.prototype.leftClicked = function() {
  if(this.hasLeftClicked) {
    this.hasLeftClicked = false;
    return true;
  }
  return false;
};