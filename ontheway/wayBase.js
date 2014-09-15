define(function(){
  /**全局变量**/
    var WAYCON = (function(){
      return {
         init : false
      }
    })();
  /**父类*/
  function WAY(){
     this.page2MainEl = $('.page2-content');
  }
  WAY.prototype.start = function() {
    WAYCON.init = false;
    this.page2MainEl.html('<div>敬请期待</div>');
  };
    return {
      WAYCON : WAYCON,
      WAY : WAY
    };
});

