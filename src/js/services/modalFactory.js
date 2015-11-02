var modalFactory = function($q, $rootScope){
  
    var factory = {};
    factory.edit = {};
    factory.delete = {};
    factory.new = {};
    

    factory.delete.user = function(user){
        
        var deferred = $q.defer();
        
        if(!user) {
            return console.log('delete.user() must be passed a user object to delete')
        }
        
        $rootScope.$emit('modal:delete:user', deferred, user);
        
        return deferred.promise;

    }
    
    factory.edit.user = function(user){
        
        var deferred = $q.defer();
        
        if(!user) {
            return console.log('edit.user() must be passed a user object to delete')
        }
        
        $rootScope.$emit('modal:edit:user', deferred, user);
        
        return deferred.promise;

    }
    
    factory.new.user = function(){
        
        var deferred = $q.defer();
        $rootScope.$emit('modal:new:user', deferred);
        
        return deferred.promise;
        
    };
    
    
    
    return factory;
    
};

angular.module('app')
    .factory('modalFactory', [
    '$q',
    '$rootScope',
    modalFactory
]);