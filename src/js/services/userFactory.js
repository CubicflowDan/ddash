var userFactory = function(){
  
    var factory = {};
    
    factory.save = function (username, userId, admin, auth) {
        
        factory.username = username;
        factory.userId = userId;
        factory.auth = auth;
        factory.admin = admin;
        factory.isLoggedIn = true;
        
        var stored = {
            username : username,
            userId : userId,
            auth : auth,
            admin : admin,
            isLoggedIn : true
        };
        
        localStorage.setItem('ddash-user', JSON.stringify(stored));
    };
    
    
    factory.remove = function () {
        
        factory.username = null;
        factory.userId = null;
        factory.auth = null;
        factory.admin = null;
        factory.isLoggedIn = false;
        
        console.log('logged out');
        
        localStorage.removeItem('ddash-user');
    };
    
    
    if(!factory.isLoggedIn){
        var savedUser = JSON.parse(localStorage.getItem('ddash-user'));
        if(savedUser) {
            factory.username = savedUser.username;
            factory.userId = savedUser.userId;
            factory.auth = savedUser.auth;
            factory.admin = savedUser.admin;
            factory.isLoggedIn = true;
        }
    }
    
    return factory;
    
};

angular.module('app')
    .factory('user', [
    userFactory
]);