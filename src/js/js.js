var cf = ( function( window, undefined ) {
  
    // DECLARE MODULE VARS
    var g = {
        windowHeight: window.innerHeight,
        windowWidth: window.innerWidth,
        
        smallBrowser: 600,
        medBrowser: 1024,
        largeBrowser: 1200,
    };
    
    
    // is run on load
    var _init = function(){
        
    };
    
    
    
    
    // COUNTS IPADS AS MOBILE
    // SHOULD ONLY BE USED FOR PARALAX
    var isMobile = function(){
        
        var mobileDevice = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        
        if(cf.g.windowWidth < cf.g.smallBrowser || mobileDevice) {

            return true;
        } else {
            return false;
        }
    };
    
    
    var isRetina = function() {
        if (window.matchMedia) {
            var mq = window.matchMedia("only screen and (min--moz-device-pixel-ratio: 1.3), only screen and (-o-min-device-pixel-ratio: 2.6/2), only screen and (-webkit-min-device-pixel-ratio: 1.3), only screen  and (min-device-pixel-ratio: 1.3), only screen and (min-resolution: 1.3dppx)");
            return (mq && mq.matches || (window.devicePixelRatio > 1)); 
        }
    }
    
    
    /*
    
    Adds the class '.active' to each of the items contained inside the parent with the specified delay between each
    
    cf.showInOrder('ul.parent', 'li.child', 'active', 1000);
    
    will add the class 'active' to all the li.child elements inside of ul.parent with a 1 second delay between each
    
    */

    var showInOrder = function(parent, items, classname, delay) {

        if (typeof delay === 'undefined' || typeof delay === 'null'){
            var delay = 150;
        }
        
        if (typeof classname === 'undefined' || typeof classname === 'null'){
            var classname = 'active';
        }
        
        var $items = $(parent).children(items);

        $.each($items, function(i){

            var el = this;
            setTimeout(function(){
               $(el).addClass(classname);
            },i * delay );

        });
    };
    
    
    
    /*
    
    Resizes the selected element based on viewport height
    
    cf.toBrowserHeight('.fullsize', -100);
    
    Will change the height of all elements with the '.fullsize' class to 100px less the the viewport height
    
    */
    
    var toBrowserHeight = function(selector, modifier){
        
        if (typeof modifier === 'undefined'){
            var modifier = 0;
        }
        
        var elements = document.querySelectorAll(selector);
        
        for (var i = 0; i< elements.length; i++){
            elements[i].style.height = g.windowHeight + modifier + 'px';
        }
        
    };
    
    
    // Adds event listener to the window.resize event.
    var _resizeWatch = function(){
        
        window.addEventListener("resize", function(){
            g.windowHeight = window.innerHeight;
            g.windowWidth = window.innerWidth;
            //toBrowserHeight('.fullsize');
            cf.parallax.refresh();
            
            cf.assets.replaceAssets();
        });
        
    };
    
    
    // Run init 
    _init();
    

    // explicitly return public methods when this object is instantiated
    return {
        g : g,
        showInOrder : showInOrder,
        toBrowserHeight : toBrowserHeight,
        isMobile : isMobile,
        isRetina : isRetina
    };
} )( window );
  