var appCtrl = function(user, $location){
    
    vm = this;
    
    vm.isAdmin = user.admin;
    
};



angular.module('app')
    .controller('appCtrl', [
    'user',
    '$location',
    appCtrl
]);