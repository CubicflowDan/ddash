cf.assets = (function () {
    
    // OPTIONS
    var x2ext = '@2x';
    
    var largeSuffix = '-large';
    
    var mediumSuffix = '-med';
    
    var responsiveClass = '.cf-responsive';
    
    ////////
    
    var responsiveImages = [];
    var responsiveBgImages = [];
    var allResponsiveImages = [];
    
    var _sortImages = function(){
            
        var images = document.querySelectorAll('img');

        var responsiveImages = [];

        for (var i = 0; i < images.length; i++){

            var src = images[i].src;
            var extension = src.split('.').pop();

            //console.log(image);

            if(extension === 'jpg' || extension === 'png') {

                var re = /([\w\d_-]*)\.?[^\\\/]*$/i;

                var image = images[i];
                image.type = 'img';
                image.oldSrc = images[i].src;
                image.filename = image.oldSrc.match(re)[1];
                image.extension = image.oldSrc.split('.').pop();
                image.parentFolder =  image.oldSrc.substr(0, image.oldSrc.lastIndexOf('/'));

                responsiveImages.push(image);
            }
        }

        return responsiveImages;
            
    };
    var _sortBgImages = function(){
        
        var responsiveBgImages = [];
        var bgImages = document.querySelectorAll(responsiveClass);
 
        for (var i = 0; i < bgImages.length; i++){

            var re = /([\w\d_-]*)\.?[^\\\/]*$/i;
            var bgImage = bgImages[i];
            
            bgImage.compStyle = bgImage.currentStyle || window.getComputedStyle(bgImage, false);
            bgImage.type = 'bgImg';
            bgImage.oldSrc = bgImage.compStyle.backgroundImage.slice(4, -1);
            bgImage.filename = bgImage.oldSrc.match(re)[1];
            bgImage.extension = bgImage.oldSrc.split('.').pop();
            bgImage.parentFolder =  bgImage.oldSrc.substr(0, bgImage.oldSrc.lastIndexOf('/'));
                
            responsiveBgImages.push(bgImage);
            
        }
        
        return responsiveBgImages;
        
    };

    
    //
    
    var init = function(callback){

        responsiveImages = _sortImages();
        responsiveBgImages = _sortBgImages();
        allResponsiveImages = responsiveImages.concat(responsiveBgImages);
                
        replaceAssets(allResponsiveImages);
        
        if (typeof callback === 'function') callback();
    }
    
    
    var replaceAssets = function (){
        
        var assets = allResponsiveImages;
        
        for (var i = 0; i < assets.length; i++) {
            

            var newSrc = getNewSrc(assets[i]);

            
            // DO STUFF
            if (assets[i].type === 'img') {
                assets[i].src = newSrc;
            }
            else if (assets[i].type === 'bgImg'){
                assets[i].style.backgroundImage = 'url('+newSrc+')';
            }
            
            
        }

    };
    
    
    var getNewSrc = function(asset){
    
        var newSrc = '';
        
        // SMALL AND 2X
            if (window.innerWidth <= cf.g.smallBrowser && cf.isRetina()){
                newSrc = asset.parentFolder + '/' + asset.filename + x2ext + '.' + asset.extension;
            }

            // SMALL AND NOT 2X
            else if (window.innerWidth <= cf.g.smallBrowser && !cf.isRetina()){
                newSrc = asset.parentFolder + '/' + asset.filename + '.' + asset.extension;
            }

            // MEDIUM BROWSERS AND 2X
            else if (window.innerWidth > cf.g.smallBrowser && window.innerWidth <= cf.g.medBrowser && cf.isRetina()){
                newSrc = asset.parentFolder + '/' + asset.filename + mediumSuffix + x2ext + '.' + asset.extension;
            }

            // MEDIUM BROWSERS AND NOT 2X
            else if (window.innerWidth > cf.g.smallBrowser && window.innerWidth <= cf.g.medBrowser && !cf.isRetina()){
                newSrc = asset.parentFolder + '/' + asset.filename + mediumSuffix + '.' + asset.extension;
            }

            // LARGE BROWSER AND IS X2
            else if (window.innerWidth >= cf.g.medBrowser && cf.isRetina()){
                newSrc = asset.parentFolder + '/' + asset.filename + largeSuffix + x2ext + '.' + asset.extension;
            }

            // LARGE AND NOT 2x
            else if (window.innerWidth >= cf.g.medBrowser && !cf.isRetina()){
                newSrc = asset.parentFolder + '/' + asset.filename + largeSuffix + '.' + asset.extension;
            }
        
            return newSrc;
        
    };
    


    return {
        init : init,
        replaceAssets : replaceAssets
    };

}());