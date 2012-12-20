/* jQuerySlider by Cyrus Smith 
 * (http://coding-contemplation.blogspot.com) 
 * (https://github.com/smithcyr)
 * 
 * Unlike other image sliders this jQuery plugin uses the transition between
 * two divs to create a slideshow of background images. 
 * Created for use on http://grinnellultimate.com
 * 
 * There are three parameters that the user can edit. 
 * @param int interval - the interval in milliseconds between slide transitions
 * @param int duration - the duration of the fade between slides
 * @param object css   - a javascript object with each key as the css parameter 
 *                       and value for the respective parameter
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
                          "height":"450px"}}, 
        pluginName = 'jQuerySlider';

    // create the utility container divs used to hold the background images,
    // list the current options in a comment, and start the slideshow
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
                            .css(base.o.css)
                            .css({"z-index":"-1",                                  
                                  'background-image':'url("' + base.imgs[0] + '")'});
      base.containers[1] = $(document.createElement('div'))
                            .addClass('jqueryslider-slide')
                            .css(base.o.css)
                            .css({"z-index":"-2",
                                  'background-image':'url("' + base.imgs[1] + '")'});
      base.displayOptions = "<!-- ";
      for (var key in base.o) 
        base.displayOptions += key + " - " + base.o[key] + ":";
      base.displayOptions += " -->";
      base.$el.append(base.containers[0],base.containers[1],base.displayOptions);
      this.init();
    };
    
    // fadeOut the foreground div, iterate its background image to the next one
    // in queue, switch the two div's z-index, and fadeIn the now-background div 
    // repeat ad infinitum
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
