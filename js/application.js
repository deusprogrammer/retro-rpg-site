console.log("SCRIPT STARTED");

//Propulsion variables
var spr=PP.spr,rm=PP.rm,obj=PP.obj,snd=PP.snd,al=PP.al,global=PP.global,Alarm=PP.Alarm,collision=PP.collision,draw=PP.draw,init=PP.init,key=PP.key,load=PP.load,loop=PP.loop,mouse=PP.mouse,physics=PP.physics,Sound=PP.Sound,SoundEffect=PP.SoundEffect,Sprite=PP.Sprite,view=PP.view,walkDown=PP.walkDown;

init("surface", 640, 480);
loop.rate = 30;

console.log("BEGINNING LOAD!");

//Sprites
spr.cursor           = new Sprite('assets/sprites/cursor.png', 1, 0, 0);
spr.titleScreen      = new Sprite('assets/sprites/titlescreen.jpg', 1, 0, 0);

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
      },
      
      draw: function(t) {
         spr.titleScreen.draw(0, 0, 0, 0, 0.64, 0.45);
         
         draw.font = 'normal normal normal 12px Georgia';
         draw.color = 'white';
         draw.text(95, 100, "The HTML Within");
         
         draw.font = 'normal normal normal 10px Georgia';
         draw.text(110, 120, "<Press Space>");
      }
   };
   
   obj.startScreen = {
      initialize: function(t) {
         console.log("START INIT");
         snd.preludeMusic.play();
         cursorIndex    = 0;
         maxCursorIndex = 2;
         t.x = 50;
         t.y = 30;
      },
      
      tick: function(t) {
            if (key.up.down || key.w.down) {
               console.log("Up Pressed!");
               if (cursorIndex > 0) {
                  snd.pointerSound.play();
                  t.y -= 40;
                  cursorIndex--;
               }
            }
            else if (key.down.down || key.s.down) {
               console.log("Down Pressed!");
               if (cursorIndex < maxCursorIndex) {
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
         draw.rectangle(0, 0, 640, 480, "black");
      
         draw.font = 'normal normal normal 12px Georgia';
         draw.color = 'white';
         draw.text(100, 10, "Select Save File");
         
         draw.font = 'normal normal normal 10px Georgia';
         draw.color = 'white';
         
         for (var i = 0; i < 4; i++) {
            draw.text(80, 40 + 40 * i, "New Game");
         }
         
         spr.cursor.draw(t.x, t.y);
      }
   }
   
   rm.title = function() {
      loop.register(obj.titleScreen);
   }
   
   rm.start = function() {
      loop.register(obj.startScreen);
   }
   
   loop.active = true;
   loop.room = rm.title;
});
