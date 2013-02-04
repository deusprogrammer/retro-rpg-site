function Frame(frameName, x, y, width, height) {
   this.elementName = frameName;
   this.type        = "frame";
   this.x           = x;
   this.y           = y;
   this.width       = width;
   this.height      = height;
   
   this.padding     = {left: 0, top: 0, right: 0, bottom: 0};
   this.margin      = {left: 0, top: 0, right: 0, bottom: 0};
   
   this.background  = {color: "blue", image: "", type: "color"};
   this.border      = {color: "gray", width: 2};
   
   this.parent      = null;
   this.children    = [];
   this.activeChild = null;
   this.active      = false;
   
   this.artist      = null;
   
   this.addChild = function(child) {
      //child.x += this.x + this.border.width;
      //child.y += this.y + this.border.width;
      child.parent = this;
      this.children.push(child);
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
      
      //If active and a menu, draw cursor
      if (this.active && this.type == "menu") {
         console.log("Draw cursor");
         artist.drawSprite(this.cursorSprite, absolute.x + 10, absolute.y + (this.cursor * 20) + 13);
      }
      
      //Draw frame or menu/menu items
      if (this.type == "frame") {
         artist.drawRectangle(absolute.x, absolute.y, this.width, this.height, this.border.color);
         artist.drawRectangle(absolute.x + this.border.width, absolute.y + this.border.width, this.width - (this.border.width * 2), this.height - (this.border.width * 2), this.background.color);
      } else if (this.type == "menu") {
      } else {
         artist.drawText(absolute.x + this.padding.left, absolute.y + (this.index * 20) + this.padding.top, {size: "12px", family: "Georgia", color: "white"}, {h: "left", v: "middle"}, this.itemText);
      }
      
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

function Menu(menuName, cursorSprite) {
   this.elementName  = menuName;
   this.type         = "menu";
   this.x            = 0;
   this.y            = 0;
   this.width        = 0;
   this.height       = 0;
   
   this.padding      = {left: 0, top: 0, right: 0, bottom: 0};
   this.margin       = {left: 0, top: 0, right: 0, bottom: 0};
   
   this.background   = {color: "none", image: "", type: "none"};

   this.parent       = null;   
   this.children     = [];
   this.activeChild  = null;
   this.active       = false;
   
   this.cursor       = 0;
   this.nChildren    = 0;
   
   this.artist       = null;
   this.cursorSprite = cursorSprite;
   
   this.addChild = function(child) {
      child.parent = this;
      child.index = this.nChildren++;
      this.children.push(child);
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
      
      //If active and a menu, draw cursor
      if (this.active && this.type == "menu") {
         artist.drawSprite(this.cursorSprite, absolute.x + 10, absolute.y + (this.cursor * 20) + 13);
      }
      
      //Draw frame or menu/menu items
      if (this.type == "frame") {
         artist.drawRectangle(absolute.x, absolute.y, this.width, this.height, this.border.color);
         artist.drawRectangle(absolute.x + this.border.width, absolute.y + this.border.width, this.width - (this.border.width * 2), this.height - (this.border.width * 2), this.background.color);
      } else if (this.type == "menu") {
      } else {
         artist.drawText(absolute.x + this.padding.left, absolute.y + (this.index * 20) + this.padding.top, {size: "12px", family: "Georgia", color: "white"}, {h: "left", v: "middle"}, this.itemText);
      }
      
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
   
   this.getCursorCoordinates = function() {
      return {x: 0, y: 0};
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
   
   this.padding     = {left: 0, top: 0, right: 0, bottom: 0};
   this.margin      = {left: 0, top: 0, right: 0, bottom: 0};
   
   this.background  = {color: "none", image: "", type: "none"};
   this.text        = {color: "white", fontFamily: "georgia", fontSize: 12};
      
   this.parent       = null;   
   this.children     = [];
   this.activeChild  = null;
   this.active       = false;
   
   this.callback    = callback;
   this.index       = 0;
   
   this.artist      = null;
   
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
      
      //If active and a menu, draw cursor
      if (this.active && this.type == "menu") {
         console.log("Draw cursor");
         artist.drawSprite(this.cursorSprite, absolute.x + 10, absolute.y + (this.cursor * 20) + 13);
      }
      
      //Draw frame or menu/menu items
      if (this.type == "frame") {
         artist.drawRectangle(absolute.x, absolute.y, this.width, this.height, this.border.color);
         artist.drawRectangle(absolute.x + this.border.width, absolute.y + this.border.width, this.width - (this.border.width * 2), this.height - (this.border.width * 2), this.background.color);
      } else if (this.type == "menu") {
      } else {
         artist.drawText(absolute.x + this.padding.left, absolute.y + (this.index * 20) + this.padding.top, {size: "12px", family: "Georgia", color: "white"}, {h: "left", v: "middle"}, this.itemText);
      }
      
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
