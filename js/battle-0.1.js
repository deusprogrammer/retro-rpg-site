function Spell(type, name, cost, damageRange, sprite) {
   this.spellName = name;
   this.cost = cost;
   this.damageRange = damageRange;
   
   this.sprite = sprite;
   
   this.type = type;
}

function Equipment(type, name, mods) {
   this.equipmentName = name;
   this.mods = mods;

   this.type = type;
}

function Character(type, name, maxHp, maxMp, levelTemplate, sprite) {
   this.characterName = name;
   this.hp = maxHp;
   this.maxHp = maxHp;
   this.mp = maxMp;
   this.maxMp = maxMp;
   this.equipment = {leftArm: {}, rightArm: {}, head: {}, arms: {}, chest: {}, feet: {}, accessories: []};
   this.spells = {black: [], white: []};
   this.actions = [];
   this.sprite = sprite;
   
   this.type = type;
   
   this.levels = levelTemplate;
   
   this.equip = function(type, equipment) {
      if (type != equipment.type) {
         return;
      } else {
         this.equipment[type] = equipment;
      }
   };
}

function Party () {
   this.characters = [];
   
   this.addCharacter = function(character) {
      this.characters.push(character);
   }
}

function BattleScreen(heroParty, enemyParty, cursorSprite, artist) {
   this.targets = [];
   this.heroParty = heroParty;
   this.enemyParty = enemyParty;
   this.cursorSprite = cursorSprite;
   this.artist = artist;
   
   this.state = "idle";
   
   this.currentCommand = {src: {}, dst: {}, act: {}};
   
   //Load all possible targets into one array for easy access.
   for (var i in heroParty) {
      var hero = this.heroParty[i]
      this.targets.push(hero);
   }
   for (var i in enemyParty) {
      var enemy = this.enemyParty[i]
      this.targets.push(enemy);
   }
   
   this.tick = function() {
      switch (this.state) {
         case "idle":
            break;
         case "menu":
            break;
         case "targetting":
            break;
         case "animation":
            break;
      }
   }
   
   this.draw = function() {
      this.btFrame.draw();
   }
   
   this.getActiveMenu = function() {
      switch (this.state) {
         case "idle":
            return null;
         case "menu":
            return this.btFrame.getActiveMenu();
         case "targetting":
            return null;
      }
   }
   
   this.commitAction = function() {
      var command = this.currentCommand;
      console.log(command.src + " " + command.act + " " + command.dst);
   }
     
   this.setCommandAction = function(action) {
      this.currentCommand.act = action;
   }
   
   this.setCommandSource = function(source) {
      this.currentCommand.src = source;   
   }
   
   this.setCommandTarget = function(target) {
      this.currentCommand.dst = target;
   }
   
   ///***************
   // Battle Menu
   //***************
   this.btFrame   = new Frame("btFrame", 0, 330, 640, 150);
   this.btFrame.border.color = "white";
   this.btFrame.border.width = 10;
   this.btFrame.artist = this.artist;

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

   //Declare magic menu
   var btMagicMenu = new Menu("btMagicMenu", this.cursorSprite);

   btMagicMenu.addChild(new MenuItem("fire", "o Fire",
      {
         activated: function() {
            console.log("FIRE ACTIVATED!");
            $("div#test-div").html("FIRE ACTIVATED");
            
            //this.currentCommand.act = "cast: fire";
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
            
            //this.currentCommand.act = "cast: fira";
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
            
            //this.currentCommand.act = "cast: firaga";
         },
         selected: function() {
            console.log("FIRAGA SELECTED!");
            $("div#test-div").html("FIRAGA SELECTED");
         }
      }
   ));

   //Declare item menu
   var btItemMenu = new Menu("btItemMenu", this.cursorSprite);

   btItemMenu.addChild(new MenuItem("tonic", "o Tonic",
      {
         activated: function() {
            console.log("TONIC ACTIVATED!");
            $("div#test-div").html("TONIC ACTIVATED");
            
            //this.currentCommand.act = "use: tonic";
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
            
            //this.currentCommand.act = "use: elixir";
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
            
            //this.currentCommand.act = "use: megaElixir";
         },
         selected: function() {
            console.log("MEGA ELIXIR SELECTED!");
            $("div#test-div").html("MEGA ELIXIR SELECTED");
         }
      }
   ));

   //Declare main action menu
   var btActionMenu = new Menu("btActionMenu", this.cursorSprite);
   btActionMenu.addChild(new MenuItem("attack", "Attack", 
      {
         activated: function() {
            console.log("ATTACK ACTIVATED!");
            $("div#test-div").html("ATTACK ACTIVATED");

            //this.currentCommand.act = "use: attack";
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
            
            //this.currentCommand.act = "use: trance";
         },
         selected: function() {
            console.log("TRANCE SELECTED!");
            $("div#test-div").html("ATTACK SELECTED");
         }
      }
   ));

   //Link menus together
   var item = new MenuItem("magic", "Magic", 
      {
         activated: function() {
         },
         selected: function() {
            console.log("MAGIC SELECTED!");
            $("div#test-div").html("MAGIC SELECTED");
         }
      }
   );

   item.link = btMagicMenu;
   btActionMenu.addChild(item);

   item = new MenuItem("item", "Item", 
      {
         activated: function() {
         },
         selected: function() {
            console.log("ITEM SELECTED!");
            $("div#test-div").html("ITEM SELECTED");
         }
      }
   );

   item.link = btItemMenu;
   btActionMenu.addChild(item);

   //Finish laying out hierarchy
   btActionFrame.addChild(btActionMenu);
   btMagicFrame.addChild(btMagicMenu);
   btItemFrame.addChild(btItemMenu);

   this.btFrame.addChild(btActionFrame);
   this.btFrame.addChild(btMagicFrame);
   this.btFrame.addChild(btItemFrame);
   this.btFrame.setActiveMenu(btActionMenu);
}
