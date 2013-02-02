function Frame(frameName, x, y, width, height) {
   this.elementName = frameName;
   this.type        = "frame";
   this.x           = x;
   this.y           = y;
   this.width       = width;
   this.height      = height;
   this.padding     = {left: 0, top: 0, right: 0, bottom: 0};
   this.margin      = 0;
   this.background  = {color: "blue"};
   this.border      = {color: "gray", width: 2};
   this.children    = [];
   
   this.addChild = function(child) {
      child.x += this.x + this.border.width;
      child.y += this.y + this.border.width;
      this.children.push(child);
   };
   
   this.setDepth = function() {
   }
   
   this.setPadding = function(padding_left, padding_top, padding_right, padding_bottom) {
      padding.left   = padding_left;
      padding.top    = padding_top;
      padding.right  = padding_right;
      padding.bottom = padding_bottom;
   }
   
   this.setPadding = function(padding) {
      padding.left = padding.right = padding.top = padding.bottom = padding;
   }
}

function Menu(menuName, callback) {
   this.elementName  = menuName;
   this.type         = "menu";
   this.x            = 0;
   this.y            = 0;
   this.width        = 0;
   this.height       = 0;
   this.padding      = {left: 0, top: 0, right: 0, bottom: 0};
   this.margin       = 0;
   this.background  = {color: "blue"};
   this.cursor       = 0;
   this.nChildren    = 0;
   this.children     = [];
   this.callback     = callback;
   
   this.addChild = function(child) {
      child.x += this.x;
      child.y += this.y;
      this.children.push(child);
      this.nChildren++;
   };
  
   this.setPadding = function(padding_left, padding_top, padding_right, padding_bottom) {
      padding.left   = padding_left;
      padding.top    = padding_top;
      padding.right  = padding_right;
      padding.bottom = padding_bottom;
   }
   
   this.setPadding = function(padding) {
      padding.left = padding.right = padding.top = padding.bottom = padding;
   }
   
   this.getSelected = function() {
      return children[this.cursor];
   };
   
   this.activateSelected = function() {
      this.children[this.cursor].callback();
   };
   
   this.cursorUp = function() {
      if (this.cursor > 0)
         this.cursor--;
      return this;
   };
   
   this.cursorDown = function() {
      if (this.cursor < this.nChildren - 1)
         this.cursor++;
      return this;
   };
   
   this.getCursorPosition = function() {
   };
}

function MenuItem(itemName, itemText, callback) {
   this.elementName = itemName;
   this.type        = "menuItem";
   this.itemText    = itemText;
   this.x           = 0;
   this.y           = 0;
   this.width       = 0;
   this.height      = 0;
   this.background  = {color: "blue"};
   this.text        = {color: "white"};
   this.padding     = {left: 0, top: 0, right: 0, bottom: 0};
   this.callback    = callback;
   this.parent      = null;
   this.children    = {};
   
   this.setPadding = function(padding_left, padding_top, padding_right, padding_bottom) {
      padding.left   = padding_left;
      padding.top    = padding_top;
      padding.right  = padding_right;
      padding.bottom = padding_bottom;
   }
   
   this.setPadding = function(padding) {
      padding.left = padding.right = padding.top = padding.bottom = padding;
   }
}