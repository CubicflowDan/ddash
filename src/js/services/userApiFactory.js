var userApiFactory = function($resource, user){
  
    var factory = {};
    
//    $resource.headers.common['Authorization'] = 'Basic ' + user.auth;
    factory.all = $resource('http://localhost:1337/user/all', {},{
        get:{
            method:"GET",
            isArray: true,
            headers:{'Authorization': 'Basic ' + user.auth} 
        }
    });
    
    var userResource = $resource('http://localhost:1337/user/:id',{id: '@id'}, {
        get:{
            method:"GET",
            isArray: false,
            headers:{'Authorization': 'Basic ' + user.auth} 
        },
        put:{
            method:"PUT",
            isArray: false,
            headers:{'Authorization': 'Basic ' + user.auth} 
        },
        post:{
            method:"POST",
            isArray: false,
            headers:{'Authorization': 'Basic ' + user.auth} 
        },
        delete:{
            method:"DELETE",
            headers:{'Authorization': 'Basic ' + user.auth} 
        }
    });
    
    
    
    var User = function(data){

    };
    
    User.prototype.getUser = function(id){
        
        var self = this;
        userResource.get({id: id})
            .$promise.then(function(user){
                self.update(user);
                return self;
           });
    
    };
    
    User.prototype.update = function(data){
        angular.extend(this, data || {});   
    };
    
    
    /// BEING WEIRD
    User.prototype.edit = function(data){
        userResource.put({id: this._id})
            .$promise.then(function(user){
                console.log(user);
           });
    };
    
    User.prototype.delete = function(){
        var self = this;
        userResource.delete({id: this._id})
            .$promise.then(function(user){

           });
    };
    
    return User;
    
};

angular.module('app')
    .factory('users', [
    '$resource',
    'user',
    userApiFactory
]);