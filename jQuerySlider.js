/* jQuerySlider by Cyrus Smith (http://coding-contemplation.blogspot.com)
 * 
 * Unlike other image sliders this jQuery plugin uses the transition between
 * two divs to create a slideshow of background images. 
 * Created for use on http://grinnellultimate.com
 * 
 * There are three parameters that the user can edit. 
 * interval: (int) the interval in milliseconds between slide transitions
 * duration: (int) the duration of the fade between slides
 * css     : (object) a javascript object with each key as the css parameter 
 *                    and value for the respective parameter
 * 
 * */
;(function( $ ) {
    var defaults = {interval:10000,
                    duration:500,
                    css: {"position":"absolute",
                          "background-repeat":"no-repeat",
                          "background-position": "top center",
                          "background-size": "cover",
                          "width":"100%",
                          "height":"450px"}), 
        pluginName = 'jQuerySlider',

    function Plugin (el, options) {
      if (options.images.length < 2)
        return;
      base = this;
      base.o = {};
      $.extend(base.o,defaults,options);
      base.el = el;
      base.$el = $(el);
      base.imgs = base.o.images;
      base.num = base.o.images.length;
      base.current = 1;
      base.topContainer = 0;
      base.containers = Array();
      base.containers[0] = $(document.createElement('div'))
                            .addClass('jqueryslider-slide')
                            .css(css)
                            .css({"z-index":"-1",                                  
                                  'background-image':'url("' + base.imgs[0] + '")'});
      base.containers[1] = $(document.createElement('div'))
                            .addClass('jqueryslider-slide')
                            .css(css)
                            .css({"z-index":"-2",
                                  'background-image':'url("' + base.imgs[1] + '")'});
      base.displayOptions = "<!-- ";
      for (var key in base.o) 
        base.displayOptions += key + " - " + base.o[key] + ":";
      base.displayOptions += " -->";
      base.$el.append(base.containers[0],base.containers[1],base.displayOptions);
      this.init();
    };
    
    Plugin.prototype.init = function () {
      setInterval(function(){
                    base.current = (base.current + 1) % base.num;
                    base.containers[base.topContainer].fadeOut(base.o.duration,function () {
                      $(this).css({'background-image':'url("' + base.imgs[base.current] + '")',
                                   "z-index":"-2"});
                      base.containers[(base.topContainer + 1) % 2].css("z-index","-1");
                      $(this).show();
                      base.topContainer = (base.topContainer + 1) % 2;
                    });
                  },
                  base.o.interval);
    };
    
   
    $.fn[pluginName] = function (options) {
      return this.each( function () {
        if(!$.data(this,'plugin_'+pluginName)) {
           $.data(this,'plugin_'+pluginName,
           new Plugin(this, options));
        }
      });
    };

})( jQuery );
