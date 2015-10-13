cf.carousel = (function () {
    
    var currentSlide = 0,
        carousel = '',
        slides = '',
        indicatorParent = '',
        indicators = '',
        activeSlide = '',
        activeIndicator = '',
        autoSlideDuration = 6000,   // DEFAULT
        autoSlideStatus = 0,
        timeoutStatus = 0;
    
    
    var init = function(selector, options){
        
        if (!selector) console.warn('no selector for cf.carousel');
        
        // SETUP VARS
        carousel = document.querySelector(selector);
        slides = carousel.querySelectorAll('.slide');
        indicatorParent = document.querySelector(selector + '-controls');
        indicators = indicatorParent.querySelectorAll('.indicator');
        
        
        // IF WE DONT HAVE ACTIVE SLIDE THEN MAKE ONE
        activeSlide = carousel.querySelectorAll('.active');
        
        if(activeSlide.length === 0){
            slides[currentSlide].className = slides[currentSlide].className + ' active';
            activeSlide = slides[currentSlide];
        }
        
        // IF WE DONT HAVE ACTIVE INDICATOR THEN MAKE ONE
        activeIndicator = indicatorParent.querySelectorAll('.active');
        
        if(activeIndicator.length === 0){
            indicators[currentSlide].className = indicators[currentSlide].className + ' active';
            activeIndicator = indicators[currentSlide];
        }
        
        // ADD EVENT LISTENER TO INDICATORS
        for(var i = 0; i < indicators.length; i++){
            indicators[i].addEventListener('click', _onIndicatorClick);
        }
        
        if(options.duration) autoSlideDuration = options.duration;
        
        autoSlide();
        
        
        

        // REQUIRES HAMMER.JS (Currently inside materialize.js)
        if(typeof Hammer === 'function'){
            var hammertime = new Hammer(carousel);
            hammertime.on('swipe', function(event) {
                if(event.direction === 2) nextSlide();
                if(event.direction === 4) prevSlide();
                pauseAutoSlide(10000);
            });
        }
        
        
        
    };
    
    
    
    var _onIndicatorClick = function(event){
        var panelNum = this.getAttribute('data-controls');
        
        jumpToSlide(panelNum);
        pauseAutoSlide(10000);
    };
    
    var autoSlide = function(){
        
        autoSlideStatus = setInterval(function(){
            
            nextSlide();
            
        }, autoSlideDuration);
        
    };
    
    var stopAutoSlide = function() {
        clearInterval(autoSlideStatus);
    };
    
    var pauseAutoSlide = function(duration){
        stopAutoSlide();
        clearTimeout(timeoutStatus);
        timeoutStatus = setTimeout(function(){
            autoSlide();
        }, duration);
    };
    
    var nextSlide = function(){
        
        // REMOVE CURRENT ACTIVE STATES
        activeSlide.className = 'slide';
        activeIndicator.className = 'indicator';
        
        // FIND AND ADD CLASS TO NEXT SLIDE
        var nextSlide = activeSlide.nextElementSibling;
        if (nextSlide === null) nextSlide = slides[0];
        nextSlide.className = nextSlide.className + ' active';
        
        // FIND AND ADD CLASS TO NEXT INDICATOR
        var nextIndicator = activeIndicator.nextElementSibling;
        if(nextIndicator === null) nextIndicator = indicators[0];
        nextIndicator.className = nextIndicator.className + ' active';

        // UPDATE VARS
        activeIndicator = nextIndicator;
        activeSlide = nextSlide;
        
    };
    
    var prevSlide = function(){
        
        // REMOVE CURRENT ACTIVE STATES
        activeSlide.className = 'slide';
        activeIndicator.className = 'indicator';
        
        // FIND AND ADD CLASS TO NEXT SLIDE
        var nextSlide = activeSlide.previousElementSibling;
        if (nextSlide === null) nextSlide = slides[slides.length - 1];
        nextSlide.className = nextSlide.className + ' active';
        
        // FIND AND ADD CLASS TO NEXT INDICATOR
        var nextIndicator = activeIndicator.previousElementSibling;
        if(nextIndicator === null) nextIndicator = indicators[indicators.length - 1];
        nextIndicator.className = nextIndicator.className + ' active';
        
        // UPDATE VARS
        activeIndicator = nextIndicator;
        activeSlide = nextSlide;
        
    };
    
    var jumpToSlide = function(slideNum){
        
        // REMOVE CURRENT ACTIVE STATES
        activeSlide.className = 'slide';
        activeIndicator.className = 'indicator';
        
        var nextSlide = carousel.querySelector('#slide-' + slideNum);
        if (nextSlide === null) {
            console.warn('slide ' + slideNum + ' does not exist');
            nextSlide = activeSlide;
        };
        nextSlide.className = nextSlide.className + ' active';
        
        var nextIndicator = indicators[slideNum];
        if (nextIndicator === null) {
            console.warn('indicator ' + slideNum + ' does not exist');
            nextIndicator = activeIndicator;
        };
        nextIndicator.className = nextIndicator.className + ' active';
        
        // UPDATE VARS
        activeIndicator = nextIndicator;
        activeSlide = nextSlide;
  
    };

    return {
        init : init,
        nextSlide : nextSlide,
        prevSlide : prevSlide,
        jumpToSlide : jumpToSlide,
        autoSlide : autoSlide,
        stopAutoSlide : stopAutoSlide,
        pauseAutoSlide : pauseAutoSlide
    };

}());