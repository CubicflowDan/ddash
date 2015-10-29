var apiFactory = function($http, user){
  
    var factory = {};
    factory.admin = {};
    
    $http.defaults.headers.common['Authorization'] = 'Basic ' + user.auth;
    
    factory.getProjects = function () {
        
        return $http.get('http://localhost:1337/project').then(function(res){
            return res.data;
        }).catch(function(err){
            return err;
        }); 
  
    };
    
    factory.admin.getUsers = function(){
       
        return $http.get('http://localhost:1337/user/all').then(function(res){
            return res.data;
        }).catch(function(err){
            return err;
        });
        
    };
    
    factory.admin.deleteUser = function(id){
       
        return $http.delete('http://localhost:1337/user?id='+id).then(function(res){
            return res.data;
        }).catch(function(err){
            return err;
        });
        
    };
    
    
    return factory;
    
};

angular.module('app')
    .factory('apiFactory', [
    '$http',
    'user',
    apiFactory
]);