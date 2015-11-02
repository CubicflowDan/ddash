var AdminUsersCtrl = function($location, user, modalFactory, adminApiFactory){
        
    var vm = this;
    
    vm.test = 'ssss';
    
    vm.refresh = function(){
        adminApiFactory.getAllUsers().then(function(res){
            vm.users = res.data;
        }).catch(function(err){
            console.log(err)
        });
    };
    
    
    vm.newUser = function(){
        modalFactory.new.user().then(function(res){
            console.log(res)
            vm.refresh();
        }).catch(function(err){
            console.log(err)
        });
    };
    
    
    vm.deleteUser = function(user){
        
        modalFactory.delete.user(user).then(function(res){
            console.log(res);
            vm.refresh();
        }).catch(function(err){
            console.log(err);
        });
        
    };
    
    vm.editUser = function(user){
        
        modalFactory.edit.user(user).then(function(res){
            console.log(res);
            vm.refresh();
        }).catch(function(err){
            console.log(err);
        });
        
    };
    
    vm.refresh();
    
};


AdminUsersCtrl.resolve = {
    
};


angular.module('app')
    .controller('AdminUsersCtrl', [
    '$location',
    'user',
    'modalFactory',
    'adminApiFactory',
    AdminUsersCtrl
]);