var modalLink = function(scope, element, attrs){
    
    
    
};

var modalController = function($scope, modalFactory, adminApiFactory, $q){

    var vm = this;
    
//    vm.modalFactory = modalFactory;
//    vm.formData = '';
//    vm.flashMessage = '';
//    vm.statusMessage = null;
//    
//    vm.closeModal = function(){
//        
//        vm.modalFactory.closeModal();
//        
//        vm.formData = '';
//        vm.flashMessage = '';
//        vm.statusMessage = null;
//        vm.changePassword = false;
//    };
//    
//    vm.editUser = function(){
//        
//        vm.formData = modalFactory.currentlyEditing
//        
//        adminApiFactory.editUser(vm.formData).then(function(res){
//            
//            vm.flash('User Edited');
//            vm.modalFactory.success();
//            
//        }).catch(function(err){
//            vm.flash('Something went wrong');
//            console.log(err);
//            vm.modalFactory.failure();
//        });
//        
//    };
//    
//    vm.createUser = function(){
//        
//        if (!vm.formData.username || !vm.formData.email || !vm.formData.password){
//            vm.statusMessage = 'Oops! Fill out all required fields.'
//            return;
//        }
//            
//        adminApiFactory.createUser(vm.formData).then(function(res){
//            
//            vm.flash('Success');
//            vm.modalFactory.success();
//            
//        }).catch(function(err){
//            vm.flash('Something went wrong');
//            console.log(err);
//            vm.modalFactory.failure();
//        });
//    };
//    
//    vm.deleteUser = function(){
//                        
//        if (!vm.modalFactory.currentlyEditing._id){
//            vm.flash('Error, no user to delete');
//            deferred.reject('No user to delete');
//            return;
//        }
//                    
//        adminApiFactory.deleteUser(vm.modalFactory.currentlyEditing).then(function(res){
//
//            vm.flash('User Deleted');
//            vm.modalFactory.success();
//
//        }).catch(function(err){
//            
//            vm.flash('Something went wrong');
//            vm.modalFactory.failure();
//            
//        });
//    };
//    
//    vm.flash = function(message){
//        vm.modalFactory.setTemplate('flash');
//        vm.flashMessage = message;
//    }
    
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
    modalDirective
]);