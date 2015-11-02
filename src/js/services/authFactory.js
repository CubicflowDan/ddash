var authFactory = function($http, user, base64Factory){
  
    var factory = {};
    
    factory.login = function (username, password) {
        
        var authdata = base64Factory.encode(username + ':' + password);

        //Enable cross domain calls
        $http.defaults.headers.common['Authorization'] = 'Basic ' + authdata;
        
        return $http.get('http://localhost:1337/user/').then(function(res){
            
            user.save(res.data.username, res.data._id, res.data.admin, authdata);
                                 
            return res;
            
        }).catch(function(err){
            return err;
        }); 
        
    };
    
    
    factory.logout = function () {
        
        
        $http.defaults.headers.common['Authorization'] = 'Basic ';
        user.remove();
        
        
    };
    
    
    return factory;
    
};

angular.module('app')
    .factory('authFactory', [
    '$http',
    'user',
    'base64Factory',
    authFactory
]);