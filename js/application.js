console.log("SCRIPT STARTED");

//Propulsion variables
var spr=PP.spr,rm=PP.rm,obj=PP.obj,snd=PP.snd,al=PP.al,global=PP.global,Alarm=PP.Alarm,collision=PP.collision,draw=PP.draw,init=PP.init,key=PP.key,load=PP.load,loop=PP.loop,mouse=PP.mouse,physics=PP.physics,Sound=PP.Sound,SoundEffect=PP.SoundEffect,Sprite=PP.Sprite,view=PP.view,walkDown=PP.walkDown;

function drawElement(element, index) {
   if (element.type == "frame") {
      draw.rectangle(element.x, element.y, element.width, element.height, false, element.border.color);
      draw.rectangle(element.x + element.border.width, element.y + element.border.width, element.width - element.border.width - 2, element.height - element.border.width - 2, false, element.background.color);
   } else if (element.type == "menu") {
   } else {
      draw.font = 'normal normal normal 12px Georgia';
      draw.color = element.text.color;
      draw.textHalign = 'left';
      draw.text(element.x + element.padding.left + 30, element.y + (index * 20) + element.padding.top + 20, element.itemText);
   }
   
   for (var i = 0; i < element.children.length; i++) {
      drawElement(element.children[i], i);
   }
}

init("surface", 640, 480);
view.height = 480;
view.width  = 640;
loop.rate = 30;

//Menu
var frame     = new Frame("master", 0, 0, 640, 480);
var subFrame  = new Frame("rightFrame", frame.width - 120, 5, 100, 160);
frame.addChild(subFrame);

var rightMenu = new Menu("rightMenu");
subFrame.border.width = 2;
subFrame.addChild(rightMenu);

rightMenu.setPadding(10);

rightMenu.addChild(new MenuItem("item", "Item", function() {
   console.log("ITEMS ACTIVATED!");
}));
rightMenu.addChild(new MenuItem("skills", "Skills", function() {
   console.log("SKILLS ACTIVATED!");
}));
rightMenu.addChild(new MenuItem("equip", "Equip", function() {
   console.log("EQUIP ACTIVATED!");
}));
rightMenu.addChild(new MenuItem("relic", "Relic", function() {
   console.log("RELICS ACTIVATED!");
}));
rightMenu.addChild(new MenuItem("status", "Status", function() {
   console.log("STATUS ACTIVATED!");
}));
rightMenu.addChild(new MenuItem("config", "Config", function() {
   console.log("CONFIG ACTIVATED!");
}));
rightMenu.addChild(new MenuItem("save", "Save", function() {
   console.log("SAVE ACTIVATED!");
}));

console.log("JSON: " + JSON.stringify(frame));

//Sprites
spr.cursor           = new Sprite('assets/sprites/cursor.png', 1, 0, 0);
spr.titleScreen      = new Sprite('assets/sprites/titlescreen.png', 1, 0, 0);

//Music
snd.titleMusic       = new Sound('assets/music/title.mp3');
snd.preludeMusic     = new Sound('assets/music/prelude.mp3');
snd.narsheMusic      = new Sound('assets/music/narshe.mp3');
snd.battleMusic      = new Sound('assets/music/battle.mp3');
snd.fanfareMusic     = new Sound('assets/music/fanfare.mp3');
snd.overworldMusic   = new Sound('assets/music/overworld.mp3');
snd.finalLevelMusic  = new Sound('assets/music/final.mp3');
snd.finalBattleMusic = new Sound('assets/music/finalBattle.mp3');

//Sound effects
snd.pointerSound     = new Sound('assets/sounds/pointer.mp3');
snd.chimeSound       = new Sound('assets/sounds/chime.wav');

var cursorIndex    = 0;
var maxCursorIndex = 0;

console.log("FINISHING LOAD!");

//After all resources are loaded
load(function () {
   console.log("DONE LOADING");

   obj.titleScreen = {
      initialize: function(t) {
         console.log("TITLE INIT");
         snd.titleMusic.play();
      },
      
      tick: function(t) {
         if (key.space.pressed) {
            console.log("Start Pressed!");
            snd.titleMusic.pause();
            loop.room = rm.start;
         }
         else if (key.m.pressed) {
            console.log("M Pressed!");
            snd.titleMusic.pause();
            loop.room = rm.menuTest;
         }
      },
      
      draw: function(t) {
         spr.titleScreen.draw(0, 0);
         
         draw.font = 'normal normal normal 20px Georgia';
         draw.color = 'white';
         draw.textHalign = 'center';
         draw.textValign = 'middle';
         draw.text(300, 300, "The HTML Within");
         
         draw.font = 'normal normal normal 10px Georgia';
         draw.text(300, 320, "<Press Space>");
      }
   };
   
   obj.startScreen = {
      initialize: function(t) {
         console.log("START INIT");
         snd.preludeMusic.play();
         cursorIndex    = 0;
         maxCursorIndex = 2;
         t.x = 250;
         t.y = 35;
      },
      
      tick: function(t) {
            if (key.up.down || key.w.down) {
               console.log("Up Pressed!");
               if (cursorIndex > 0) {
				  snd.pointerSound.pause();
				  snd.pointerSound.currentTime = 0;
                  snd.pointerSound.play();
                  t.y -= 40;
                  cursorIndex--;
               }
            }
            else if (key.down.down || key.s.down) {
               console.log("Down Pressed!");
               if (cursorIndex < maxCursorIndex) {
                  snd.pointerSound.pause();
                  snd.pointerSound.currentTime = 0;
                  snd.pointerSound.play();
                  t.y += 40;
                  cursorIndex++;
               }
            }
            else if (key.enter.down) {
               console.log("Start pressed!");
               snd.chimeSound.play();
               console.log("SAVE FILE " + cursorIndex + " SELECTED!");
            }
      },
      
      draw: function(t) {
         draw.rectangle(0, 0, 640, 480, false, "black");
      
         draw.font = 'normal normal normal 12px Georgia';
         draw.color = 'white';
         draw.text(300, 10, "Select Save File");
         
         draw.font = 'normal normal normal 10px Georgia';
         
         for (var i = 0; i < 3; i++) {
            draw.text(300, 40 + 40 * i, "New Game");
         }
         
         spr.cursor.draw(t.x, t.y);
      }
   }
   
   obj.menuTest = {
      initialize: function(t) {
         snd.overworldMusic.play();
      },
      
      tick: function(t) {
            if (key.up.down || key.w.down) {
               rightMenu.cursorUp();
               snd.pointerSound.pause();
               snd.pointerSound.currentTime = 0;
               snd.pointerSound.play();
            }
            else if (key.down.down || key.s.down) {
               rightMenu.cursorDown();
               snd.pointerSound.pause();
               snd.pointerSound.currentTime = 0;
               snd.pointerSound.play();
            }
            else if (key.enter.down) {
               snd.chimeSound.play();
               rightMenu.activateSelected();
            }
      },
      
      draw: function(t) {
         drawElement(frame);
         spr.cursor.draw(rightMenu.x + 10, rightMenu.y + (rightMenu.cursor * 20) + 13);
      }      
   }
   
   rm.title = function() {
      loop.register(obj.titleScreen);
   }
   
   rm.start = function() {
      loop.register(obj.startScreen);
   }
   
   rm.menuTest = function() {
      loop.register(obj.menuTest);
   }
   
   loop.active = true;
   loop.room = rm.title;

});
