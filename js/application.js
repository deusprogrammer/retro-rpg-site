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

//Sprites
spr.cursor           = new Sprite('assets/sprites/cursor.png', 1, 0, 0);
spr.titleScreen      = new Sprite('assets/sprites/titlescreen.png', 1, 0, 0);

//Music
snd.titleMusic       = new Sound('assets/music/title.mp3');
snd.preludeMusic     = new Sound('assets/music/prelude.mp3');
//snd.narsheMusic      = new Sound('assets/music/narshe.mp3');
//snd.battleMusic      = new Sound('assets/music/battle.mp3');
//snd.fanfareMusic     = new Sound('assets/music/fanfare.mp3');
snd.overworldMusic   = new Sound('assets/music/overworld.mp3');
//snd.finalLevelMusic  = new Sound('assets/music/final.mp3');
//snd.finalBattleMusic = new Sound('assets/music/finalBattle.mp3');

//Sound effects
snd.pointerSound     = new Sound('assets/sounds/pointer.mp3');
snd.chimeSound       = new Sound('assets/sounds/chime.wav');

//Menu
var frame     = new Frame("master", 0, 0, 640, 480);
var subFrame  = new Frame("rightFrame", frame.width - 110, 5, 100, 165);
frame.addChild(subFrame);
frame.artist = new PropArtist();

var rightMenu = new Menu("rightMenu", spr.cursor);
subFrame.border.color = "white";
subFrame.border.width = 4;
subFrame.addChild(rightMenu);

rightMenu.setPadding(10);

rightMenu.addChild(new MenuItem("item", "Item", function() {
   console.log("ITEMS ACTIVATED!");
   $("div#test-div").html("ITEM");
}));
rightMenu.addChild(new MenuItem("skills", "Skills", function() {
   console.log("SKILLS ACTIVATED!");
   $("div#test-div").html("SKILLS");
}));
rightMenu.addChild(new MenuItem("equip", "Equip", function() {
   console.log("EQUIP ACTIVATED!");
   $("div#test-div").html("EQUIP");
}));
rightMenu.addChild(new MenuItem("relic", "Relic", function() {
   console.log("RELICS ACTIVATED!");
   $("div#test-div").html("RELIC");
}));
rightMenu.addChild(new MenuItem("status", "Status", function() {
   console.log("STATUS ACTIVATED!");
   $("div#test-div").html("STATUS");
}));
rightMenu.addChild(new MenuItem("config", "Config", function() {
   console.log("CONFIG ACTIVATED!");
   $("div#test-div").html("CONFIG");
}));
rightMenu.addChild(new MenuItem("save", "Save", function() {
   console.log("SAVE ACTIVATED!");
   $("div#test-div").html("SAVE");
}));

frame.setActiveChild(rightMenu);

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
      menu: frame,
      
      initialize: function(t) {
         snd.overworldMusic.currentTime = 0;
         snd.overworldMusic.play();
      },
      
      tick: function(t) {
         var active = frame.getActiveChild();
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
   
   rm.title = function() {
      loop.register(obj.titleScreen);
   }
   
   rm.menuTest = function() {
      loop.register(obj.owMenu);
   }
   
   loop.active = true;
   loop.room = rm.title;

});
