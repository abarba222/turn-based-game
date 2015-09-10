import router from './router';

(function(){
  'use strict';

  $(document).ready(function(){
    Backbone.history.start();
    $('.app').html(JST.index());
  });


})();
