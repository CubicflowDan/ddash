/*

cf.parallax

takes an array of objects with selectors to be parallaxed

dont call more the once on a page, instead add more objects

//////////////

Usage:

var parallaxOpts = [
    {
        container: '#parallax-responsive',
        layers: [
            {
                selector: '.parallax-1',
                speed: 0,
                modifier: '+'
            },
            {
                selector: '.parallax-2',
                speed: 10,
                modifier: '-'
            }
        ]
    }
];
cf.parallax.init(parallaxOpts);

////////////

to recalibrate the values after something like a page resize:

cf.parallax.refresh();


*/

cf.parallax = (function () {
    
    var paraGroups = [];
    
    var init = function (opts){
        
        
        // bind to scroll event only once
        $(window).bind('scroll',function(e){
            window.requestAnimationFrame(scrollHandler);
        });
        
        // Setup Class
        function ParallaxGroup(groupObj) {
            this.$container = $(groupObj.container);
            this.offsetTop = this.$container.offset().top;
            this.height = this.$container.height();
            this.endPos = this.offsetTop + this.height; 
            this.layers = [];

            for (var i = 0; i < groupObj.layers.length; i++){

                this.layers[i] = {
                    selector: $(groupObj.container).children(groupObj.layers[i].selector),
                    speed: groupObj.layers[i].speed,
                    modifier: groupObj.layers[i].modifier
                };

            } 
            
            if(this.offsetTop - cf.g.windowHeight < 0){
                this.startPos = 0;
            }else{
                this.startPos = this.offsetTop - cf.g.windowHeight;
            }
            
        }
        
        ParallaxGroup.prototype.refresh = function(){
            this.offsetTop = this.$container.offset().top;
            this.height = this.$container.height();
            if(this.offsetTop - cf.g.windowHeight < 0){
                this.startPos = 0;
            }else{
                this.startPos = this.offsetTop - cf.g.windowHeight;
            }
            this.endPos = this.offsetTop + this.height; 
        }
        
        
        // Instantiate class for each group
        for (var i = 0; i < opts.length; i++){
            paraGroups[i] = new ParallaxGroup(opts[i]);
        }   
        
    }
    
    
    var refresh = function(){
        for (var i = 0; i < paraGroups.length; i++){
            paraGroups[i].refresh();
        }  
        scrollHandler();
    }
    
    
    var scrollHandler = function(){
        
        if (cf.isMobile()) {
        
            for (var i = 0; i < paraGroups.length; i++){

                var group = paraGroups[i];
                
                for (var n = 0; n < group.layers.length; n++){

                    group.layers[n].selector.css('transform', 'translateY(0px)');

                } 
                
            }
            
        } else {

            var scrolledY = $(window).scrollTop();

            for (var i = 0; i < paraGroups.length; i++){

                var group = paraGroups[i];

                if (scrolledY > group.startPos && scrolledY < group.endPos) {
                    

                    var dif = scrolledY - group.startPos;

                    for (var i = 0; i < group.layers.length; i++){

                        var newPos = dif / group.layers[i].speed;
                        
                        group.layers[i].selector.css('transform', 'translateY(' + group.layers[i].modifier +''+ dif / group.layers[i].speed + 'px)');
                        

                    } 

                }
            }  
        }

    };
    
    
	return {
        init : init,
        refresh : refresh
    };
    
}());