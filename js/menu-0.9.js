function Element(elementName) {
   this.elementName = elementName;
   this.type        = "element";
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
   this.activeMenu  = null;
   this.active      = false;
   
   this.history     = [];
   
   this.visible     = true;
   
   this.artist      = null;
   
   this.addChild = function(child) {
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
   
   this.getActiveMenu = function() {
      if (!this.activeMenu) {
         return null;
      }
      else {
         var activeMenu = this.activeMenu.getActiveMenu()
         if (!activeMenu) {
            return this.activeMenu;
         }
         else {
            return null;
         }
      }
   };
   
   this.setActiveMenu = function(child, perserve) {
      if (this.activeMenu) {
         console.log("SETTING " + this.activeMenu.elementName + " INACTIVE AND INVISIBLE!");
         this.activeMenu.active = false;
         this.activeMenu.parent.visible = false;
         if (perserve) {
            this.history.push(this.activeMenu);
         }
      }
   
      this.activeMenu = child;
      console.log("SETTING " + this.activeMenu.elementName + " ACTIVE AND VISIBLE!");
      this.activeMenu.active = true;
      this.activeMenu.parent.visible = true;
   }
   
   this.setPadding = function(padding_left, padding_top, padding_right, padding_bottom) {
      padding.left   = padding_left;
      padding.top    = padding_top;
      padding.right  = padding_right;
      padding.bottom = padding_bottom;
   };
   
   this.setPadding = function(padding) {
      padding.left = padding.right = padding.top = padding.bottom = padding;
   };
   
   this.getRoot = function() {
      if (this.parent == null) {
         return this;
      } else {
         return this.parent.getRoot();
      }
   }
   
   this.draw = function() {
      var absolute = this.getOffset();
      var artist   = this.getArtist();
      
      if (!this.visible) {
         return;
      }
      
      //Draw menu
      artist.drawRectangle(absolute.x, absolute.y, this.width, this.height, this.border.color);
      artist.drawRectangle(absolute.x + this.border.width, absolute.y + this.border.width, this.width - (this.border.width * 2), this.height - (this.border.width * 2), this.background.color);
      
      //Draw children
      for (var i = 0; i < this.children.length; i++) {
         this.children[i].draw();
      }
   };
}

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
   this.activeMenu = null;
   this.active      = false;
   
   this.history     = [];
   
   this.visible     = true;
   
   this.artist      = null;
   
   this.addChild = function(child) {
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
   
   this.getActiveMenu = function() {
      if (!this.activeMenu) {
         return null;
      }
      else {
         var activeMenu = this.activeMenu.getActiveMenu()
         if (!activeMenu) {
            return this.activeMenu;
         }
         else {
            return null;
         }
      }
   };
   
   this.setActiveMenu = function(child, perserve) {
      if (this.activeMenu) {
         console.log("SETTING " + this.activeMenu.elementName + " INACTIVE AND INVISIBLE!");
         this.activeMenu.active = false;
         this.activeMenu.parent.visible = false;
         if (perserve) {
            this.history.push(this.activeMenu);
         }
      }
   
      this.activeMenu = child;
      console.log("SETTING " + this.activeMenu.elementName + " ACTIVE AND VISIBLE!");
      this.activeMenu.active = true;
      this.activeMenu.parent.visible = true;
   }

   this.setPadding = function(padding_left, padding_top, padding_right, padding_bottom) {
      padding.left   = padding_left;
      padding.top    = padding_top;
      padding.right  = padding_right;
      padding.bottom = padding_bottom;
   };
   
   this.setPadding = function(padding) {
      padding.left = padding.right = padding.top = padding.bottom = padding;
   };
   
   this.getRoot = function() {
      if (this.parent == null) {
         return this;
      } else {
         return this.parent.getRoot();
      }
   }
   
   this.draw = function() {
      var absolute = this.getOffset();
      var artist   = this.getArtist();
      
      if (!this.visible) {
         return;
      }
      
      //Draw menu
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
   this.x            = 0;
   this.y            = 0;
   this.width        = 0;
   this.height       = 0;
   
   this.padding      = {left: 0, top: 0, right: 0, bottom: 0};
   this.margin       = {left: 0, top: 0, right: 0, bottom: 0};
   
   this.background   = {color: "none", image: "", type: "none"};

   this.parent       = null;   
   this.children     = [];
   this.activeMenu  = null;
   this.active       = false;
   
   this.history      = [];
   
   this.visible      = true;
   
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
   
   this.getActiveMenu = function() {
      if (!this.activeMenu) {
         return null;
      }
      else {
         var activeMenu = this.activeMenu.getActiveMenu()
         if (!activeMenu) {
            return this.activeMenu;
         }
         else {
            return null;
         }
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
      var link = this.children[this.cursor].link
      if (link) {
         this.getRoot().setActiveMenu(link, true);
      }
      else if (this.children[this.cursor].callback) {
         this.children[this.cursor].callback.activated();
      }
   };
   
   this.cursorUp = function() {
      if (this.cursor > 0 && this.active)
         this.cursor--;
      this.children[this.cursor].callback.selected();
      return this;
   };
   
   this.cursorDown = function() {
      if (this.cursor < this.nChildren - 1 && this.active)
         this.cursor++;
      this.children[this.cursor].callback.selected();
      return this;
   };
   
   this.back = function() {
      var root = this.getRoot();
      
      var lastActive = root.history.pop();
      
      if (lastActive) {
         console.log("LAST ACTIVE PARENT: " + lastActive.parent.elementName);
         root.setActiveMenu(lastActive, false);
      }
   };
   
   this.getRoot = function() {
      if (this.parent == null) {
         return this;
      } else {
         return this.parent.getRoot();
      }
   }
   
   this.draw = function() {
      var absolute = this.getOffset();
      var artist   = this.getArtist();
      
      if (!this.visible) {
         return;
      }
      
      //If active and a menu, draw cursor
      if (this.active && this.type == "menu") {
         artist.drawSprite(this.cursorSprite, absolute.x + 10, absolute.y + (this.cursor * 20) + 13);
      }
      
      //Draw children
      for (var i = 0; i < this.children.length; i++) {
         this.children[i].draw();
      }
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
      
   this.parent      = null;   
   this.children    = [];
   this.activeMenu = null;
   this.active      = false;
   
   this.history     = [];
   
   this.visible     = true;
   
   this.callback    = callback;
   this.link        = null;
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
   
   this.getActiveMenu = function() {
      if (!this.activeMenu) {
         return null;
      }
      else {
         var activeMenu = this.activeMenu.getActiveMenu()
         if (!activeMenu) {
            return this.activeMenu;
         }
         else {
            return null;
         }
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
   
   this.getRoot = function() {
      if (this.parent == null) {
         return this;
      } else {
         return this.parent.getRoot();
      }
   } 

   this.draw = function() {
      var absolute = this.getOffset();
      var artist   = this.getArtist();
      
      if (!this.visible) {
         return;
      }
      
      //Draw menu item text   
      artist.drawText(absolute.x + this.padding.left, absolute.y + (this.index * 20) + this.padding.top, {size: "12px", family: "Georgia", color: "white"}, {h: "left", v: "middle"}, this.itemText);
   };
}
