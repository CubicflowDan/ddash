var AdminProjectsCtrl = function($location, user, modalFactory, adminApiFactory){
        
    var vm = this;
    
    vm.test = 'ssss';
    
    vm.refresh = function(){
        adminApiFactory.getAllProjects().then(function(res){
            vm.projects = res.data;
            console.log(res);
        }).catch(function(err){
            console.log(err)
        });
    };
    
    
    vm.refresh();
    
};


AdminProjectsCtrl.resolve = {
    
};


angular.module('app')
    .controller('AdminProjectsCtrl', [
    '$location',
    'user',
    'modalFactory',
    'adminApiFactory',
    AdminProjectsCtrl
]);