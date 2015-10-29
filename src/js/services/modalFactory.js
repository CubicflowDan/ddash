var modalFactory = function($q){
  
    var factory = {};
    factory.edit = {};
    factory.delete = {};
    factory.new = {};
    
    factory.showModal= false;
    factory.currentTemplate = 'none';
    factory.currentlyEditing = 'none';


    
    var openModal = function(){
        factory.showModal = true;  
    };
    
    factory.closeModal = function(){
        factory.showModal = false;
        factory.currentTemplate = 'none';
        factory.currentlyEditing = 'none';
        
        factory.failure();
    };
    
    factory.setTemplate = function(template){
        factory.currentTemplate = template;
    };
    
    factory.setCurrentlyEditing = function(obj){
        factory.currentlyEditing = obj;
    };
    factory.success = function(){
        factory.deferred.resolve('Success');
    };
    factory.failure = function(){
        factory.deferred.reject('Failed');
    };
    
    
    
    
    factory.delete.user = function(user){
        
        factory.deferred = $q.defer();
        
        if(!user) {
            return console.log('delete.user() must be passed a user object to delete')
        }
        
        factory.setCurrentlyEditing(user);
        factory.setTemplate('deleteUser');
        
        openModal(); 
        
        return factory.deferred.promise;

    }
    
    factory.edit.user = function(user){
        
        factory.deferred = $q.defer();
        
        if(!user) {
            return console.log('edit.user() must be passed a user object to edit')
        }
        
        factory.setCurrentlyEditing(user);
        factory.setTemplate('editUser');
        
        openModal(); 
        
        return factory.deferred.promise;

    }
    
    factory.new.user = function(){
        
        factory.deferred = $q.defer();
        
        factory.setTemplate('newUser');
        openModal(); 
        console.log('making new user');
        
        return factory.deferred.promise;
        
    };
    
    
    
    return factory;
    
};

angular.module('app')
    .factory('modalFactory', [
    '$q',
    modalFactory
]);