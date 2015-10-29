// user-card

// Relies on user object being in parent scope

var userCardLink = function(scope, element, attrs){

};

var userCardController = function(modalFactory){
    
    var vm = this;
    vm.modalFactory = modalFactory;
    vm.deleted = false;
    
    vm.editUser = function(user){
        modalFactory.edit.user(user);
    };
    
    vm.deleteUser = function(user){
        
        modalFactory.delete.user(user).then(function(res){
            console.log(res);
            vm.deleted = true;
        }).catch(function(err){
            console.log(err);
            vm.deleted = false;
        });
        
    };
    
    vm.editUser = function(user){
        
        modalFactory.edit.user(user).then(function(res){
            console.log(res);
            vm.deleted = true;
        }).catch(function(err){
            console.log(err);
            vm.deleted = false;
        });
        
    };
    
};

var userCardDirective = function(){
    return {
        restrict: 'A',
        link: userCardLink,
        controller: userCardController,
        controllerAs: 'vm',
        templateUrl: 'templates/userCardDirective.html'
    };
};

angular.module('app')
    .directive('userCard',[
    'modalFactory',
    userCardDirective
]);