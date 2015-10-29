var LoginCtrl = function($location, authFactory, user){
        
    var vm = this;
    
    vm.showWarn = false;
    
    vm.warn = 'Incorrect username or password';
    
    vm.tryLogin = function(){
        
        authFactory.login(vm.username, vm.password).then(function(res){
            
            if (res.status === 401) {
                vm.showWarn = true;
                vm.warn = 'Incorrect username or password';
            } else if (res.status === 500) {
                vm.showWarn = true;
                vm.warn = 'Server error, try again later';
            } else if (res.status === 200) {
                vm.showWarn = true;
                vm.warn = 'Success';
                
                $location.path('app/overview');
            }
            
        });
    };
    
};


LoginCtrl.resolve = {
    
    data: function(dataFactory){
        return dataFactory.getData();
    }
    
};


angular.module('app')
    .controller('LoginCtrl', [
    '$location',
    'authFactory',
    'user',
    LoginCtrl
]);