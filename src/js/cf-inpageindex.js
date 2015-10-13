cf.inPageIndex = function(indexContainer, tags, searchContainer){
        
        // If tags are passed used tags, if not use default.
        tags = (tags) ? tags : 'h1, h2, h3, h4';
        
        // if searchContainer is passed search for headings inside of  searchContainer
        if (searchContainer) {
            var container = document.querySelector(searchContainer);
            var headings = container.querySelectorAll(tags);
        } else {
            var headings = document.querySelectorAll(tags);
        }
        
        var inPageIndex = document.querySelector(indexContainer);
        
        // Add <ul> to inPageNav
        inPageIndex.innerHTML = '<ul id="inpageindex-list"></ul>';
        
        var list = inPageIndex.querySelector('#inpageindex-list');

        for (var i = 0; i < headings.length; i++){
            var title = headings[i].textContent;
            
            headings[i].setAttribute('id', i);
            list.innerHTML += '<li><'+headings[i].tagName+'><a href="#'+i+'">'+title+'</a></'+headings[i].tagName+'></li>';

        }

        // If no headings inside of list set inPageNav to display: none
        if (list.innerHTML == ''){
            inPageNav.style.display = 'none';   
        }
        
};