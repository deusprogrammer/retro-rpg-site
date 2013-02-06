//Propulsion variables
var spr=PP.spr,rm=PP.rm,obj=PP.obj,snd=PP.snd,al=PP.al,global=PP.global,Alarm=PP.Alarm,collision=PP.collision,draw=PP.draw,init=PP.init,key=PP.key,load=PP.load,loop=PP.loop,mouse=PP.mouse,physics=PP.physics,Sound=PP.Sound,SoundEffect=PP.SoundEffect,Sprite=PP.Sprite,view=PP.view,walkDown=PP.walkDown;

//Propulsion adapter for menu.js
function PropArtist () {
   this.drawRectangle = function(x, y, width, height, color) {
      draw.rectangle(x, y, width, height, false, color);
   };
   
   this.drawText = function(x, y, font, align, text) {
      draw.font = 'normal normal normal ' + font.size + ' ' + font.family;
      draw.color = font.color;
      draw.textHalign = align.h;
      draw.textValign = align.v;
      draw.text(30 + x, 20 + y, text);
   };
   
   this.drawSprite = function(sprite, x, y) {
      sprite.draw(x, y);
   };
}

//Initialize propulsion.js
init("surface", 640, 480);
view.height = 480;
view.width  = 640;
loop.rate = 30;

//Loading text
draw.font = 'normal normal normal 20px Georgia';
draw.color = 'black';
draw.textHalign = 'center';
draw.textValign = 'middle';
draw.text(300, 300, "The HTML Within");

draw.font = 'normal normal normal 10px Georgia';
draw.text(300, 320, "Loading.  Please wait...");

//<START RESOURCES>//

//--------------------------------------//
//Sprites                              |//
//--------------------------------------//
spr.cursor           = new Sprite('assets/sprites/cursor.png', 1, 0, 0);
spr.titleScreen      = new Sprite('assets/sprites/titlescreen.png', 1, 0, 0);

//--------------------------------------//
//Music                                |//
//--------------------------------------//
snd.titleMusic       = new Sound('assets/music/title.mp3');
snd.preludeMusic     = new Sound('assets/music/prelude.mp3');
snd.battleMusic      = new Sound('assets/music/battle.mp3');
snd.overworldMusic   = new Sound('assets/music/overworld.mp3');
//snd.narsheMusic      = new Sound('assets/music/narshe.mp3');
//snd.fanfareMusic     = new Sound('assets/music/fanfare.mp3');
//snd.finalLevelMusic  = new Sound('assets/music/final.mp3');
//snd.finalBattleMusic = new Sound('assets/music/finalBattle.mp3');

//--------------------------------------//
//SFX                                  |//
//--------------------------------------//
snd.pointerSound     = new Sound('assets/sounds/pointer.mp3');
snd.chimeSound       = new Sound('assets/sounds/chime.wav');

//--------------------------------------//
//Menus                                |//
//--------------------------------------//

//***************
// Overworld Menu
//***************
var owFrame   = new Frame("owFrame", 0, 0, 640, 480);
var owRightFrame  = new Frame("owRightFrame", owFrame.width - 110, 5, 100, 165);
owFrame.addChild(owRightFrame);
owFrame.artist = new PropArtist();

var owRightMenu = new Menu("owRightMenu", spr.cursor);
owRightFrame.border.color = "white";
owRightFrame.border.width = 4;
owRightFrame.addChild(owRightMenu);

owRightMenu.setPadding(10);

owRightMenu.addChild(new MenuItem("item", "Item", 
   {
      activated: function() {
         console.log("ITEMS ACTIVATED!");
         $("div#test-div").html("ITEM ACTIVATED");
      },
      selected: function() {
         console.log("ITEMS SELECTED!");
         $("div#test-div").html("ITEM SELECTED");
      }
   }
));

owRightMenu.addChild(new MenuItem("skills", "Skills", 
   {
      activated: function() {
         console.log("SKILLS ACTIVATED!");
         $("div#test-div").html("SKILLS ACTIVATED");
      },
      selected: function() {
         console.log("SKILLS SELECTED!");
         $("div#test-div").html("SKILLS SELECTED");
      }
   }
));

owRightMenu.addChild(new MenuItem("equip", "Equip", 
   {
      activated: function() {
         console.log("EQUIP ACTIVATED!");
         $("div#test-div").html("EQUIP ACTIVATED");
      },
      selected: function() {
         console.log("EQUIP SELECTED!");
         $("div#test-div").html("EQUIP SELECTED");
      }
   }
));

owRightMenu.addChild(new MenuItem("relic", "Relic", 
   {
      activated: function() {
         console.log("RELIC ACTIVATED!");
         $("div#test-div").html("RELIC ACTIVATED");
      },
      selected: function() {
         console.log("RELIC SELECTED!");
         $("div#test-div").html("RELIC SELECTED");
      }
   }
));

owRightMenu.addChild(new MenuItem("status", "Status", 
   {
      activated: function() {
         console.log("STATUS ACTIVATED!");
         $("div#test-div").html("STATUS ACTIVATED");
      },
      selected: function() {
         console.log("STATUS SELECTED!");
         $("div#test-div").html("STATUS SELECTED");
      }
   }
));

owRightMenu.addChild(new MenuItem("config", "Config", 
   {
      activated: function() {
         console.log("CONFIG ACTIVATED!");
         $("div#test-div").html("CONFIG ACTIVATED");
      },
      selected: function() {
         console.log("CONFIG SELECTED!");
         $("div#test-div").html("CONFIG SELECTED");
      }
   }
));

owRightMenu.addChild(new MenuItem("save", "Save", 
   {
      activated: function() {
         console.log("SAVE ACTIVATED!");
         $("div#test-div").html("SAVE ACTIVATED");
      },
      selected: function() {
         console.log("SAVE SELECTED!");
         $("div#test-div").html("SAVE SELECTED");
      }
   }
));

owFrame.setActiveMenu(owRightMenu);

//<END RESOURCES>//

//After all resources are loaded
load(function () {
   obj.titleScreen = {
      initialize: function(t) {
         snd.titleMusic.currentTime = 0;
         snd.titleMusic.play();
      },
      
      tick: function(t) {
         if (key.space.pressed) {
            snd.titleMusic.pause();
            loop.room = rm.menuTest;
         } else if (key.b.pressed) {
            snd.titleMusic.pause();
            loop.room = rm.battleTest;
         }
      },
      
      draw: function(t) {
         //Draw title screen
         spr.titleScreen.draw(0, 0);
         
         //Add stupid subtitle
         draw.font = 'normal normal normal 20px Georgia';
         draw.color = 'white';
         draw.textHalign = 'center';
         draw.textValign = 'middle';
         draw.text(300, 300, "The HTML Within");
         
         draw.font = 'normal normal normal 10px Georgia';
         draw.text(300, 320, "<Press Space>");
      }
   };
   
   obj.owMenu = {
      //Overworld menu
      menu: owFrame,
      
      initialize: function(t) {
         snd.overworldMusic.currentTime = 0;
         snd.overworldMusic.play();
      },
      
      tick: function(t) {
         var active = this.menu.getActiveMenu();
         if (key.up.down || key.w.down) {
            active.cursorUp();
            snd.pointerSound.pause();
            snd.pointerSound.currentTime = 0;
            snd.pointerSound.play();
         }
         else if (key.down.down || key.s.down) {
            active.cursorDown();
            snd.pointerSound.pause();
            snd.pointerSound.currentTime = 0;
            snd.pointerSound.play();
         }
         else if (key.enter.down) {
            active.activateSelected();
            snd.chimeSound.pause();
            snd.chimeSound.currentTime = 0;
            snd.chimeSound.play();
         }
         else if (key.escape.down) {
            snd.overworldMusic.pause();
            loop.room = rm.title;
         }
      },
      
      draw: function(t) {
         this.menu.draw();
      }      
   }
   
   obj.battle = {
      //Overworld menu
      battleScreen: new BattleScreen([], [], spr.cursor, new PropArtist()),
      
      initialize: function(t) {
         snd.battleMusic.currentTime = 0;
         snd.battleMusic.play();
         this.battleScreen.state = "menu";
      },
      
      tick: function(t) {
         var active = this.battleScreen.getActiveMenu();
         if (key.up.down || key.w.down) {
            active.cursorUp();
            snd.pointerSound.pause();
            snd.pointerSound.currentTime = 0;
            snd.pointerSound.play();
         }
         else if (key.down.down || key.s.down) {
            active.cursorDown();
            snd.pointerSound.pause();
            snd.pointerSound.currentTime = 0;
            snd.pointerSound.play();
         }
         else if (key.left.down || key.a.down) {
            active.cursorUp();
            snd.pointerSound.pause();
            snd.pointerSound.currentTime = 0;
            snd.pointerSound.play();
         }
         else if (key.right.down || key.d.down) {
            active.cursorDown();
            snd.pointerSound.pause();
            snd.pointerSound.currentTime = 0;
            snd.pointerSound.play();
         }
         else if (key.enter.down) {
            active.activateSelected();
            snd.chimeSound.pause();
            snd.chimeSound.currentTime = 0;
            snd.chimeSound.play();
         }
         else if (key.escape.down) {
            active.back();
            snd.pointerSound.pause();
            snd.pointerSound.currentTime = 0;
            snd.pointerSound.play();
         }
      },
      
      draw: function(t) {
         //Fill screen with black
         draw.rectangle(0, 0, view.width, view.height, false, "black");
         
         this.battleScreen.draw();
      }      
   }
   
   rm.title = function() {
      loop.register(obj.titleScreen);
   }
   
   rm.menuTest = function() {
      loop.register(obj.owMenu);
   }
   
   rm.battleTest = function() {
      loop.register(obj.battle);
   }
   
   loop.active = true;
   loop.room = rm.title;

});
