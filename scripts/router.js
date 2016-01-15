window.Game = window.Game || {};
(function(){

Game.GameRouter = Backbone.Router.extend({
  routes: {
    "": "index",
    "play": "play",
    "win": "win",
    "lose": "lose"
  },

  index: function(){
    $('.app').html(JST.index());
  },

  play: function(){
    $('.app').html(JST.play());
  },

  win: function(){
    $('.app').html(JST.win());
  },

  lose: function(){
    $('.app').html(JST.lose());
  }

});
  Game.router = new Game.GameRouter();
})();
//export default new DrunkRouter();
