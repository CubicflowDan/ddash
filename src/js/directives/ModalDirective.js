var modalLink = function(scope, element, attrs){
    
    
    
};

var modalController = function($scope, modalFactory, adminApiFactory, $q, $rootScope){

    var vm = this;
    vm.showModal = false;
    vm.currentTemplate = '';
    vm.currentlyEditing = '';
    vm.formData = '';
    vm.flashMessage = '';
    vm.statusMessage = '';
    vm.deferred = '';
    
    $rootScope.$on('modal:new:user', function (event, deferred) {
        vm.reset();
        vm.showModal = true;
        vm.currentTemplate = 'newUser';
        vm.deferred = deferred;
    });
    
    $rootScope.$on('modal:edit:user', function (event, deferred, user) {
        vm.reset();
        vm.showModal = true;
        vm.currentTemplate = 'editUser';
        vm.deferred = deferred;
        vm.currentlyEditing = user;
        vm.formData = JSON.parse(JSON.stringify(vm.currentlyEditing));
    });
    
    $rootScope.$on('modal:delete:user', function (event, deferred, user) {
        vm.reset();
        vm.showModal = true;
        vm.currentTemplate = 'deleteUser';
        vm.deferred = deferred;
        vm.currentlyEditing = user;
    });
    
    
    vm.closeModal = function(){
        vm.showModal = false;
        vm.formData = '';
        vm.flashMessage = '';
        vm.statusMessage = '';
        vm.changePassword = false;
        vm.deferred.reject('Modal Closed');
    };
    
    vm.reset = function(){
        vm.formData = '';
        vm.flashMessage = '';
        vm.statusMessage = '';
        vm.changePassword = false;
    };

    
    vm.editUser = function(){
        
        adminApiFactory.editUser(vm.formData).then(function(res){
            
            vm.flash('User Edited');
            vm.deferred.resolve(res);
            
        }).catch(function(err){
            vm.flash('Something went wrong');
            console.log(err);
            vm.deferred.reject(err);
        });
        
    };

    vm.createUser = function(){
        
        if (!vm.formData.username || !vm.formData.email || !vm.formData.password){
            vm.statusMessage = 'Oops! Fill out all required fields.'
            return;
        }
            
        adminApiFactory.createUser(vm.formData).then(function(res){
            
            vm.flash('Success');
            vm.deferred.resolve(res);
            
        }).catch(function(err){
            
            vm.flash('Something went wrong');
            vm.deferred.reject(err);
            
        });
    };
    
    vm.deleteUser = function(){
                        
        if (!vm.currentlyEditing._id){
            vm.flash('Error, no user to delete');
            vm.deferred.reject('No user to delete');
            return;
        }
                    
        adminApiFactory.deleteUser(vm.currentlyEditing).then(function(res){

            vm.flash('User Deleted');
            vm.deferred.resolve(res)

        }).catch(function(err){
            
            vm.flash('Something went wrong');
            vm.deferred.reject(err)
            
        });
    };
    
    vm.flash = function(message){
        vm.currentTemplate = 'flash';
        vm.flashMessage = message;
    }
    
};

var modalDirective = function(){
    return {
        restrict: 'AE',
        link: modalLink,
        controller: modalController,
        controllerAs: 'vm',
        templateUrl: 'templates/modalDirective.html'
    };
};

angular.module('app')
    .directive('modalWindow', [
    'modalFactory',
    'adminApiFactory',
    '$q',
    '$rootScope',
    modalDirective
]);