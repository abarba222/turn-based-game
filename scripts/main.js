<<<<<<< HEAD
(function(){
  'use strict';

  $(document).ready(function(){
    $('.app').prepend(JST.index());
  });

  
=======
//import router from './router';
window.Game = window.Game || {};

(function(){
  'use strict';

var worldLeader;
var move;
var champSelect = $('.champSelect').attr('src');
var player;
var playerSobriety;
var newPlayerMoney;
var newPlayerSobriety;
var playerMoney;
var buddy;
var buddySobriety;
var buddyMoney;
var newBuddyMoney;
var newBuddySobriety;
var image;
var nextDrink;
var myDrink;
var avcPlayer;
var costPlayer;
var buddyDrinkName;
var avcBuddy;
var costBuddy;
var playerTurn = false;
var isDrinking = true;
var fadeOut;
var fade_out;
//var drinkLoop;

  $(document).ready(function(hero){
  $('.index').html(JST['index']());
  Game.router = new Game.GameRouter();
  Backbone.history.start();

  Game.Hero = function(params) {
    _.extend(this, params);
  };

//Call World Leader

      function worldLeader (type, sobriety, money, image) {
        this.type = type;
        this.sobriety = sobriety;
        this.money = money;
        this.image = image;
      }

//World Leader Array


      var leaderStats = new Array([]);
          leaderStats[0] = new worldLeader("Cameron", 140, 150, "../images/characters/Cameron.png");
          leaderStats[1] = new worldLeader("Putin", 150, 140, "../images/characters/Putin.png");
          leaderStats[2] = new worldLeader("Hollande", 130, 160, "../images/characters/Hollande.png");
          leaderStats[3] = new worldLeader("Merkel", 120, 170, "../images/characters/Merkel.png");
          leaderStats[4] = new worldLeader("Obama", 100, 190, "../images/characters/Obama.png");
          leaderStats[5] = new worldLeader("Al-Assad", 170, 120, "../images/characters/Al-Assad.png");
          leaderStats[6] = new worldLeader("Jong-un", 190, 100, "../images/characters/Jong-un.png");
          leaderStats[7] = new worldLeader("Castro", 160, 130, "../images/characters/Castro.png");
          leaderStats[8] = new worldLeader("Mugabe", 180, 110, "../images/characters/Mugabe.png");
          leaderStats[9] = new worldLeader("Abbott", 110, 180, "../images/characters/Abbott.png");

//Moves Array

        function move (drink, avc, cost){
            this.drink = drink;
            this.avc = avc;
            this.cost = cost;
          }

        var drinks = new Array([]);
          drinks[0] = new move("IPA", [5,15], [14]);
          drinks[1] = new move("Wheat", [7,13], [12]);
          drinks[2] = new move("Ale", [8,12], [11]);
          drinks[3] = new move("Porter", [9,11], [12]);
          drinks[4] = new move("Stout", [10], [13]);

//Select Your Champion

        $(document).on('click', '.champSelect', function(e) {
          e.preventDefault();
          if (player === undefined) {
          var name = $(event.target).attr('name');
          var hero = _.where(leaderStats, {type: name});
          image = $(event.target).attr('src');
          player = _.findWhere(hero, {type: name});
          console.log(name);
          var playerSobriety = player.sobriety;
          var playerMoney = player.money;
          console.log(playerMoney);
          $('.display').append(JST.champion ({
            name: $(event.target).attr('name'),
            image: $(event.target).attr('src')
          }));
        }else alert('Champion already selected!');


//Select Enemy and Go To Bar

        $('.go-to-bar').on('click', function(e) {
          e.preventDefault();
          if  (player !== undefined) {
          buddy = leaderStats[Math.floor(Math.random() * leaderStats.length)];
          Game.router.navigate('play', {trigger: true});
          $('.champion').append('<img src="'+image+'" style="height:auto; width:auto; max-width:150px; max-height:165px;">');
          $('.buddies').append('<img src="'+buddy.image+'" style="height:auto; width:auto; max-width:150px; max-height:165px;">');

           buddySobriety = buddy.sobriety;
           buddyMoney = buddy.money;
           console.log(buddy);
          // console.log(image);
          // console.log(buddy.image);
        }else alert('Select a champion!');

//Call Player Buys

          $('.beerSelect').click(selectMove);

          function selectMove(e){
              e.preventDefault();
              var drinkName = $(event.target).attr('name');
              nextDrink = _.findWhere(drinks, {drink: drinkName});
              myDrink = nextDrink.drink;
              avcPlayer = _.sample(nextDrink.avc);
              costPlayer = _.sample(nextDrink.cost);
              console.log(nextDrink);

//Player's Turn to Buy

              if(buddySobriety > 0 && playerMoney > costPlayer) {
                newBuddySobriety = buddySobriety -= avcPlayer;
                newPlayerMoney = playerMoney -= costPlayer;
                displayBuddySobriety(newBuddySobriety);
                displayPlayerMoney(newPlayerMoney);
                buddySobriety = newBuddySobriety;
                playerMoney = newPlayerMoney;
                console.log(newBuddySobriety);
                champServes();
                //alert(buddy.name + " has " + buddySobriety + " sobriety remaining.");
                playerTurn = true;
                drinkLoop();
              }else {
                alert(buddy.name + " passed out!");
                buddyOut();
                console.log("Get more money!");
              }
            }

        function champServes(){
            $('.myDrinkText').html("");
            $('.myDrinkText').css('color', 'aqua');
            $('.myDrinkText').html("<p class='champText'>" + "You buy " + buddy.type + " a " + avcPlayer + "% " + myDrink + "." + "</p>");
            setTimeout(fadeOut, 2000);
        }

        function displayBuddySobriety() {
          var percentBuddySobriety = (newBuddySobriety / buddySobriety) + "%";
          $('.buddy-health-bar').css({"width": buddySobriety});
          $('.buddySobrietyNumber').html("<p>" + buddySobriety + "</p>");
        }

        function displayPlayerMoney() {
          var percentPlayerMoney = (newPlayerMoney / playerMoney) + "%";
          $('.champ-money-bar').css({"width": playerMoney});
          $('.champMoneyNumber').html("<p>" + playerMoney + "</p>");
        }

//Call Buddy Buys

        function buddyMove() {
          var nextBuddyDrink = drinks[Math.floor(Math.random() * drinks.length)];
          buddyDrinkName = nextBuddyDrink.drink;
          avcBuddy = _.sample(nextBuddyDrink.avc);
          costBuddy = _.sample(nextBuddyDrink.cost);
          console.log(nextBuddyDrink);
        }

//Buddy's Turn to Buy

        function buddyBuys() {
            if(playerSobriety > 0) {
              var newPlayerSobriety = playerSobriety -= avcBuddy;
              var newBuddyMoney = buddyMoney -= costBuddy;
              displayPlayerSobriety(newPlayerSobriety);
              displayBuddyMoney(newBuddyMoney);
              playerSobriety = newPlayerSobriety;
              buddyMoney = newBuddyMoney;
              buddyServes();
              buddyRestore();
              //alert(buddy.type + " buys you a " + avcBuddy + "% " + buddyDrinkName + ".");
              console.log(newPlayerSobriety);
              playerTurn = false;

              //drinkLoop();
            }else {
              alert(player.name + " passed out!");
              playerOut();
            }
        }

        function buddyServes(){
            $('.yourDrinkText').html("");
            $('.yourDrinkText').css('color', 'aqua');
            $('.yourDrinkText').html("<p class='buddyText'>" + buddy.type + " buys you a " + avcBuddy + "% " + buddyDrinkName + "." + "</p>");
            setTimeout(fade_out, 2000);
          }

        function buddyRestore() {
          if (costBuddy > buddyMoney) {
            newBuddySobriety = buddySobriety -= 15;
            newBuddyMoney = buddyMoney += 30;
          }
        }

        function displayPlayerSobriety() {
          var percentPlayerSobriety = Number(newPlayerSobriety) / Number(playerSobriety) + "%";
          $('.champ-health-bar').css({"width": playerSobriety});
          $('.champSobrietyNumber').html("<p>" + playerSobriety + "</p>");
          //console.log(percentPlayerSobriety);
        }

        function displayBuddyMoney() {
          var percentBuddyMoney = (newBuddyMoney / buddyMoney) + "%";
          $('.buddy-money-bar').css({"width": buddyMoney});
          $('.buddyMoneyNumber').html("<p>" + buddyMoney + "</p>");
        }

          function drinkLoop() {
            setTimeout(function () {
              if (!isDrinking)
             {
                  playerTurn = true;
                  buddyRestore();
                  buddyMove();
                  buddyBuys();
               }
              else
               {
                 playerTurn = false;
                 buddyOut();
                 selectMove();
                 playerRestore();
               }
             }, 3000);
            }

           function fadeOut() {
             $('.champText').fadeOut().empty();
           }

           function fade_out() {
             $('.buddyText').fadeOut().empty();
           }


           function buddyOut(){
             if (buddySobriety < 1){
               setTimeout(function() {
                 Game.router.navigate('win', {trigger: true});
                 $('.playerWins').append('<img src="'+image+'" style="height:auto; width:auto; max-width:190px; max-height:190px;">');
                 $('.winner-name').append('<p>' + player.type + '</p>');
               }, 1000);
               //alert(leaderStats[worldLeader].type + "has passed out");
             }else {drinkLoop();}
           }
           function playerOut(){
             if (playerSobriety < 1){
               setTimeout(function() {
                 Game.router.navigate('lose', {trigger: true});
                 $('.playerLoses').append('<img src="'+image+'" style="height:auto; width:auto; max-width:190px; max-height:190px;">');
                 $('.loser-name').append('<p>' + player.type + '</p>');
               }, 1000);
             }else {drinkLoop();}
           }

//Start Drinking

      $(document).on('click', '.start-drinking', function(e){
        e.preventDefault();
        console.log('hi');
        if (isDrinking) {
        isDrinking = false;
        drinkLoop();
      }

      $('.get-money').click(playerRestore);

      function playerRestore(e) {
        e.preventDefault();
        if (!isDrinking){
          newPlayerSobriety = playerSobriety -= 15;
          newPlayerMoney = playerMoney += 30;
        }
      }

//Start Rematch

      $(document).on('click', '.rematch', function(e) {
        e.preventDefault();
        name = player.type;
        buddy = buddy;
        playerSobriety = player.sobriety;
        playerMoney = player.money;
        buddySobriety = buddy.sobriety;
        buddyMoney = buddy.money;
        isDrinking = true;
        Game.router.navigate('play', {trigger: true});
        });




          });
        });

      });

//Start Over

      $(document).on('click', '.new-game', function(e) {
        e.preventDefault();
        player = '';
        buddy = '';
        document.clear();
        Game.router.navigate('', {trigger: true});
      });

    });
>>>>>>> a09fa686b90f6ceea7ac099d6d7e8416f9b051ee
})();
