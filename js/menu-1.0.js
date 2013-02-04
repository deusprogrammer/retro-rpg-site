//Requires inheritance.js

function Element(elementName) {
   this.elementName = elementName;
   this.type        = "element";
   this.x           = 0;
   this.y           = 0;
   this.width       = 0;
   this.height      = 0;
   
   this.padding     = {left: 0, top: 0, right: 0, bottom: 0};
   this.margin      = {left: 0, top: 0, right: 0, bottom: 0};
   
   this.background  = {color: "blue", image: "", type: "color"};
   this.border      = {color: "gray", width: 2};
   
   this.parent      = null;
   this.children    = [];
   this.nChildren   = 0;
   this.activeChild = null;
   this.active      = false;
   
   this.artist      = null;
   
   this.addChild = function(child) {
      child.parent = this;
      this.children.push(child);
      this.nChildren++;
   };
   
   this.getOffset = function() {
      var offset = {x: 0, y: 0}
      if (this.parent) {
         offset = this.parent.getOffset();
      }
      
      offset.x += this.x;
      offset.y += this.y;
      
      return offset;
   };
   
   this.getArtist = function() {
      if (!this.artist && this.parent) {
         return this.parent.getArtist();
      } else {
         return this.artist;
      }
   };
   
   this.getActiveChild = function() {
      if (!this.activeChild) {
         return null;
      }
      else {
         var activeChild = this.activeChild.getActiveChild()
         if (!activeChild) {
            return this.activeChild;
         }
         else {
            return null;
         }
      }
   };
   
   this.setActiveChild = function(child) {
      if (this.activeChild) {
         this.activeChild.active = false;
      }
   
      this.activeChild = child;
      child.active = true;
   }
   
   this.draw = function() {
      var absolute = this.getOffset();
      var artist   = this.getArtist();
      
      //Draw menu
      artist.drawRectangle(absolute.x, absolute.y, this.width, this.height, this.border.color);
      artist.drawRectangle(absolute.x + this.border.width, absolute.y + this.border.width, this.width - (this.border.width * 2), this.height - (this.border.width * 2), this.background.color);
      
      //Draw children
      for (var i = 0; i < this.children.length; i++) {
         this.children[i].draw();
      }
   };
   
   this.setPadding = function(padding_left, padding_top, padding_right, padding_bottom) {
      padding.left   = padding_left;
      padding.top    = padding_top;
      padding.right  = padding_right;
      padding.bottom = padding_bottom;
   };
   
   this.setPadding = function(padding) {
      padding.left = padding.right = padding.top = padding.bottom = padding;
   };
}

function Frame(frameName, x, y, width, height) {
   this.elementName = frameName;
   this.type        = "frame";
   
   this.draw = function() {
      var absolute = this.getOffset();
      var artist   = this.getArtist();
      
      //Draw frame
      artist.drawRectangle(absolute.x, absolute.y, this.width, this.height, this.border.color);
      artist.drawRectangle(absolute.x + this.border.width, absolute.y + this.border.width, this.width - (this.border.width * 2), this.height - (this.border.width * 2), this.background.color);
      
      //Draw children
      for (var i = 0; i < this.children.length; i++) {
         this.children[i].draw();
      }
   };
}

function Menu(menuName, cursorSprite) {
   this.elementName  = menuName;
   this.type         = "menu";
   
   this.cursorSprite = cursorSprite;
   
   this.draw = function() {
      var absolute = this.getOffset();
      var artist   = this.getArtist();
      
      //If active and a menu, draw cursor
      if (this.active && this.type == "menu") {
         artist.drawSprite(this.cursorSprite, absolute.x + 10, absolute.y + (this.cursor * 20) + 13);
      }
      
      //Draw children
      for (var i = 0; i < this.children.length; i++) {
         this.children[i].draw();
      }
   };
   
   this.getSelected = function() {
      return children[this.cursor];
   };
   
   this.activateSelected = function() {
      this.children[this.cursor].callback();
   };
   
   this.cursorUp = function() {
      if (this.cursor > 0 && this.active)
         this.cursor--;
      return this;
   };
   
   this.cursorDown = function() {
      if (this.cursor < this.nChildren - 1 && this.active)
         this.cursor++;
      return this;
   };
}

function MenuItem(itemName, itemText, callback) {
   this.elementName = itemName;
   this.type        = "menuItem";
   this.itemText    = itemText;
   
   this.callback    = callback;
   this.index       = 0;
   
   this.draw = function() {
      var absolute = this.getOffset();
      var artist   = this.getArtist();
   
      //Draw menu item text   
      artist.drawText(absolute.x + this.padding.left, absolute.y + (this.index * 20) + this.padding.top, {size: "12px", family: "Georgia", color: "white"}, {h: "left", v: "middle"}, this.itemText);
   };
 }
 
 Frame.inherits(Element);
 Menu.inherits(Element);
 MenuItem.inherits(Element);
