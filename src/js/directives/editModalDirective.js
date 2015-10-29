// user-card

// Relies on user object being in parent scope

var editModalLink = function(scope, element, attrs){
    
    var openEditModal = function(user){
        element.children('.dd-modal').addClass('active');
        
    };
    

};

var editModalController = function(){
};

var editModalDirective = function(){
    return {
        restrict: 'E',
        link: editModalLink,
        scope: {
            openEditModal: '='  
        },
        controller: editModalController,
        templateUrl: 'templates/editModalDirective.html'
    };
};

angular.module('app')
    .directive('editModal',[
    editModalDirective
]);