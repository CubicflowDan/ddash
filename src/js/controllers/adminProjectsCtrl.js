var AdminProjectsCtrl = function($location, user, modalFactory, adminApiFactory){
        
    var vm = this;
    
    vm.newProject = function(){
        modalFactory.new.project().then(function(res){
            console.log(res)
            vm.refresh();
        }).catch(function(err){
            console.log(err)
        });
    };
    
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