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
//snd.narsheMusic      = new Sound('assets/music/narshe.mp3');
snd.battleMusic      = new Sound('assets/music/battle.mp3');
//snd.fanfareMusic     = new Sound('assets/music/fanfare.mp3');
snd.overworldMusic   = new Sound('assets/music/overworld.mp3');
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

owFrame.setActiveChild(owRightMenu);

//***************
// Battle Menu
//***************
var btFrame   = new Frame("btFrame", 0, 330, 640, 150);
btFrame.border.color = "white";
btFrame.border.width = 10;
btFrame.artist = new PropArtist();

var btActionFrame = new Frame("btActionFrame", 200, 11, 100, 128);
btActionFrame.border.color = "white";
btActionFrame.border.width = 6;

var btMagicFrame = new Frame("btMagicFrame", 200, 11, 200, 128);
btMagicFrame.border.color = "white";
btMagicFrame.border.width = 6;
btMagicFrame.visible = false;

var btItemFrame = new Frame("btItemFrame", 200, 11, 200, 128);
btItemFrame.border.color = "white";
btItemFrame.border.width = 6;
btItemFrame.visible = false;

var btActionMenu = new Menu("btActionMenu", spr.cursor);
btActionMenu.addChild(new MenuItem("attack", "Attack", 
   {
      activated: function() {
         console.log("ATTACK ACTIVATED!");
         $("div#test-div").html("ATTACK ACTIVATED");
         //Switch to targeting
      },
      selected: function() {
         console.log("ATTACK SELECTED!");
         $("div#test-div").html("ATTACK SELECTED");
      }
   }
));

btActionMenu.addChild(new MenuItem("trance", "Trance", 
   {
      activated: function() {
         console.log("TRANCE ACTIVATED!");
         $("div#test-div").html("ATTACK ACTIVATED");
         //Activate trance
      },
      selected: function() {
         console.log("TRANCE SELECTED!");
         $("div#test-div").html("ATTACK SELECTED");
      }
   }
));

btActionMenu.addChild(new MenuItem("magic", "Magic", 
   {
      activated: function() {
         //console.log("MAGIC ACTIVATED!");
         $("div#test-div").html("MAGIC ACTIVATED");
         //Open magic menu
         btMagicMenu.parent.visible = true;
         btActionMenu.parent.visible = false;
         btFrame.setActiveChild(btMagicMenu);
      },
      selected: function() {
         console.log("MAGIC SELECTED!");
         $("div#test-div").html("MAGIC SELECTED");
      }
   }
));

btActionMenu.addChild(new MenuItem("item", "Item", 
   {
      activated: function() {
         console.log("ITEM ACTIVATED!");
         $("div#test-div").html("ITEM ACTIVATED");
         //Open item menu
         btItemMenu.parent.visible = true;
         btActionMenu.parent.visible = false;
         btFrame.setActiveChild(btItemMenu);
      },
      selected: function() {
         console.log("ITEM SELECTED!");
         $("div#test-div").html("ITEM SELECTED");
      }
   }
));

var btMagicMenu = new Menu("btMagicMenu", spr.cursor);

btMagicMenu.addChild(new MenuItem("fire", "o Fire",
   {
      activated: function() {
         console.log("FIRE ACTIVATED!");
         $("div#test-div").html("FIRE ACTIVATED");
      },
      selected: function() {
         console.log("FIRE SELECTED!");
         $("div#test-div").html("FIRE SELECTED");
      }
   }
));

btMagicMenu.addChild(new MenuItem("fira", "o Fira",
   {
      activated: function() {
         console.log("FIRA ACTIVATED!");
         $("div#test-div").html("FIRA ACTIVATED");
      },
      selected: function() {
         console.log("FIRA SELECTED!");
         $("div#test-div").html("FIRA SELECTED");
      }
   }
));

btMagicMenu.addChild(new MenuItem("firaga", "o Firaga",
   {
      activated: function() {
         console.log("FIRAGA ACTIVATED!");
         $("div#test-div").html("FIRAGA ACTIVATED");
      },
      selected: function() {
         console.log("FIRAGA SELECTED!");
         $("div#test-div").html("FIRAGA SELECTED");
      }
   }
));

var btItemMenu = new Menu("btItemMenu", spr.cursor);

btItemMenu.addChild(new MenuItem("tonic", "o Tonic",
   {
      activated: function() {
         console.log("TONIC ACTIVATED!");
         $("div#test-div").html("TONIC ACTIVATED");
      },
      selected: function() {
         console.log("TONIC SELECTED!");
         $("div#test-div").html("TONIC SELECTED");
      }
   }
));

btItemMenu.addChild(new MenuItem("elixir", "o Elixir",
   {
      activated: function() {
         console.log("ELIXIR ACTIVATED!");
         $("div#test-div").html("ELIXIR ACTIVATED");
      },
      selected: function() {
         console.log("ELIXIR SELECTED!");
         $("div#test-div").html("ELIXIR SELECTED");
      }
   }
));

btItemMenu.addChild(new MenuItem("megaElixir", "o Mega Elixir",
   {
      activated: function() {
         console.log("MEGA ELIXIR ACTIVATED!");
         $("div#test-div").html("MEGA ELIXIR ACTIVATED");
      },
      selected: function() {
         console.log("MEGA ELIXIR SELECTED!");
         $("div#test-div").html("MEGA ELIXIR SELECTED");
      }
   }
));

btActionFrame.addChild(btActionMenu);
btMagicFrame.addChild(btMagicMenu);
btItemFrame.addChild(btItemMenu);

btFrame.addChild(btActionFrame);
btFrame.addChild(btMagicFrame);
btFrame.addChild(btItemFrame);
btFrame.setActiveChild(btActionMenu);


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
         var active = this.menu.getActiveChild();
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
   
   obj.btMenu = {
      //Overworld menu
      menu: btFrame,
      
      initialize: function(t) {
         snd.battleMusic.currentTime = 0;
         snd.battleMusic.play();
      },
      
      tick: function(t) {
         var active = this.menu.getActiveChild();
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
         draw.rectangle(0, 0, view.width, view.height, false, "black");
         this.menu.draw();
      }      
   }
   
   rm.title = function() {
      loop.register(obj.titleScreen);
   }
   
   rm.menuTest = function() {
      loop.register(obj.owMenu);
   }
   
   rm.battleTest = function() {
      loop.register(obj.btMenu);
   }
   
   loop.active = true;
   loop.room = rm.title;

});
