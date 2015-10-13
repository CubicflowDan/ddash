cf.preload = (function () {
    
        var preloaderHtml = '\
            <div id="cf-preloader" class="fullscreen valign-wrapper">\
                <div class="preloader-wrapper med active valign">\
                    <div class="spinner-layer spinner-blue-only">\
                        <div class="circle-clipper left">\
                            <div class="circle"></div>\
                        </div>\
                        <div class="gap-patch">\
                            <div class="circle"></div>\
                        </div>\
                        <div class="circle-clipper right">\
                            <div class="circle"></div>\
                        </div>\
                    </div>\
                </div>\
            </div>\
            ';
    

        var _showPreloader = function() {
            
            var loader = document.querySelector('#cf-preloader');
            
                $('#cf-preloader').removeClass('loaded');
            
                if (typeof callback === 'function') {
                    callback();
                }
            
        }
        
        
        
        var _hidePreloader = function(callback) {
            
            var loader = document.querySelector('#cf-preloader');

                loader.className = loader.className + " loaded";
            
                if (typeof callback === 'function') {
                    callback();
                }
            
        }
    
        
        // preloader
        var everything = function(callback){
            
            _showPreloader();
                
            window.addEventListener("load", function(){

                _hidePreloader(callback);
                
            });

        };
    
    
    
        var imageList = function(selector, callback){
            
            _showPreloader();
            
            var imageNum = $(selector).length;
            console.log(imageNum);
            
            var loaded = 0;
            $(selector).each(function() {
                
                console.log(this);
                
                $(this).load(function() {
                    
                    
                    
                    loaded++;
                    if(loaded === imageNum){
                        
                        _hidePreloader(callback);
                       
                    }
                    
                });
             });
            
        };
        
    
    
        var images = function(selector, callback){
            var container = document.querySelector(selector);
            var innerHtml = container.innerHTML;
            
            var images = container.querySelectorAll('img');
        
            
            var wrapperBeginning = '<div class="hide">';
            var wrapperEnd = '</div>';
            
            var preloaderHtml = '\
            <div id="cf-preloader" class="inline valign-wrapper">\
                <div class="preloader-wrapper big active valign">\
                    <div class="spinner-layer spinner-blue-only">\
                        <div class="circle-clipper left">\
                            <div class="circle"></div>\
                        </div>\
                        <div class="gap-patch">\
                            <div class="circle"></div>\
                        </div>\
                        <div class="circle-clipper right">\
                            <div class="circle"></div>\
                        </div>\
                    </div>\
                </div>\
            </div>\
            ';
            
            container.innerHTML = preloaderHtml + wrapperBeginning + innerHtml + wrapperEnd;
            
            
            
            var imageObj = [];
            
            var number = 0;
            
            for (var i = 0; i < images.length; i++){
                var src = images[i].currentSrc;
                
                imageObj[i] = new Image();
                    
                imageObj[i].onload = function () {
                   number++
                   if(number === images.length){
                        var preloader = document.querySelector('#cf-preloader');
                        container.innerHTML = innerHtml;
                   }
                }
                
                imageObj[i].src = src;
                 
            }
            
            
        }

    
    
	return {
        everything : everything,
        images : images,
        imageList : imageList
    };
    
}());