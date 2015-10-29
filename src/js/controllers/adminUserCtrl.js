var AdminUserCtrl = function($location, apiFactory, user, users, modalFactory, adminApiFactory){
        
    var vm = this;
    
    
    vm.refresh = function(){
        adminApiFactory.getAllUsers().then(function(res){
            vm.users = res.data;
        }).catch(function(err){
            console.log(err)
        });
    };
    
    vm.newUser = function(){
        modalFactory.new.user().then(function(res){
            console.log('done')
            vm.refresh();
        }).catch(function(err){
            console.log('fail')
        });
    };
    
    vm.refresh();
    
//    users.all.get()
//        .$promise.then(function(users){ 
//            vm.users = users;
//        });
//    
//    users.user.get({id: user._id}).$promise
//        .then(function(user){
//        
//            console.log(user);
//            
//        });
//    
 //   console.log(userApi);
    
//    vm.getUsers = function(){
//        apiFactory.admin.getUsers().then(function(res){
//            vm.users = res;
//        });
//    };
//    
//    
//    vm.delete = function(id){
//        
//        console.log(id);
//        
//        apiFactory.admin.deleteUser(id).then(function(res){
//            vm.getUsers();
//        })
//    };
//    
//    vm.getUsers();
    
};


AdminUserCtrl.resolve = {
    
};


angular.module('app')
    .controller('AdminUserCtrl', [
    '$location',
    'apiFactory',
    'user',
    'users',
    'modalFactory',
    'adminApiFactory',
    AdminUserCtrl
]);