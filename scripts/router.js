

var DrunkRouter = Backbone.Router.extend({
  routes: {
    " ": "index",
    "play": "play",
    "win": "win",
    "lose": "lose"
  },

  initialize: function(){
    //this.render();
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

export default new DrunkRouter();
