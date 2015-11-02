var LogoutCtrl = function($location, authFactory){
        
    authFactory.logout();
    
    $location.path('/');
    
};



angular.module('app')
    .controller('LogoutCtrl', [
    '$location',
    'authFactory',
    LogoutCtrl
]);