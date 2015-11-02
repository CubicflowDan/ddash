var HomeCtrl = function($location, apiFactory, user){
        
    var vm = this;
    
    apiFactory.getProjects().then(function(res){
        console.log(res);
    })
    
};


HomeCtrl.resolve = {
    
};


angular.module('app')
    .controller('HomeCtrl', [
    '$location',
    'apiFactory',
    'user',
    HomeCtrl
]);