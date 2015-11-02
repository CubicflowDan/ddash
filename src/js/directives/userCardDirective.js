// user-card

// Relies on user object being in parent scope

var userCardLink = function(scope, element, attrs){
    
};

var userCardController = function(){
    
    
};

var userCardDirective = function(){
    return {
        restrict: 'A',
        link: userCardLink,
        controller: userCardController,
        templateUrl: 'templates/userCardDirective.html'
    };
};

angular.module('app')
    .directive('userCard',[
    userCardDirective
]);