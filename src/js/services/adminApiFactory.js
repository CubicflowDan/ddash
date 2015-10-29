var adminApiFactory = function($http, user){
  
    var factory = {};
    
    var baseUrl = 'http://localhost:1337/'
    
    factory.getAllUsers = function(userData){
        return $http.get( baseUrl + 'user/all', function(res){
           return res; 
        });
    };
    
    factory.createUser = function(userData){
        return $http.post( baseUrl + 'user/', userData, function(res){
           return res; 
        });
    };
    
    factory.deleteUser = function(userData){
        return $http.delete( baseUrl + 'user/' + userData._id, userData, function(res){
           return res; 
        });
    };
    
    
    return factory;
    
};

angular.module('app')
    .factory('adminApiFactory', [
    '$http',
    'user',
    adminApiFactory
]);