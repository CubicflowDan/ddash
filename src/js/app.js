angular.module('app', [
    'ui.router',
    'ngAnimate',
    'ngResource'
])
.config(['$urlRouterProvider', '$stateProvider', function($urlRouterProvider, $stateProvider){
    
    $urlRouterProvider.otherwise('/');
    
    $stateProvider
        .state('login', {
            url: '/',
            templateUrl: 'templates/login.html',
            controller: 'LoginCtrl',
            controllerAs: 'vm'
        })
        .state('logout', {
            url: '/logout',
            templateUrl: 'templates/logout.html',
            controller: 'LogoutCtrl',
            controllerAs: 'vm'
        })
        .state('app', {
            abstract: true,
            url: '/app',
            templateUrl: 'app.html',
            controller: 'appCtrl',
            controllerAs: 'vm',
            resolve: appCtrl.resolve
        })
        .state('app.overview', {
            url: '/overview',
            templateUrl: 'templates/home.html',
            controller: 'HomeCtrl',
            controllerAs: 'vm',
            resolve: HomeCtrl.resolve
        })
        .state('app.git', {
            url: '/git',
            templateUrl: 'templates/git.html',
            controller: 'GitCtrl',
            controllerAs: 'vm',
            resolve: GitCtrl.resolve
        })
        .state('app.payment', {
            url: '/payment',
            templateUrl: 'templates/payment.html',
            controller: 'PaymentCtrl',
            controllerAs: 'vm',
            resolve: PaymentCtrl.resolve
        })
        .state('app.timeline', {
            url: '/timeline',
            templateUrl: 'templates/timeline.html',
            controller: 'TimelineCtrl',
            controllerAs: 'vm',
            resolve: TimelineCtrl.resolve
        })
        .state('app.documentation', {
            url: '/documentation',
            templateUrl: 'templates/documentation.html',
            controller: 'DocumentationCtrl',
            controllerAs: 'vm',
            resolve: DocumentationCtrl.resolve
        })
        .state('admin', {
            abstract: true,
            url: '/admin',
            templateUrl: 'admin.html',
            controller: 'AdminCtrl',
            controllerAs: 'vm'
        })
        .state('admin.users', {
            url: '',
            templateUrl: 'templates/admin-users.html',
            controller: 'AdminUsersCtrl',
            controllerAs: 'vm'
        })
        .state('admin.projects', {
            url: '/projects',
            templateUrl: 'templates/admin-projects.html',
            controller: 'AdminProjectsCtrl',
            controllerAs: 'vm'
        });
    
}])
.run(['$rootScope', '$location', 'user', function($rootScope, $location, user) {

    // register listener to watch route changes
    $rootScope.$on( "$locationChangeStart", function(event, next, current) {
        if (!user.isLoggedIn) {
            // no logged user, we should be going to #login
            if ( next.templateUrl == "login.html" ) {
              // already going to #login, no redirect needed
            } else {
              // not going to #login, we should redirect now
              $location.path( "/" );
            }
        }         
    });
}])


.factory('gitApiFactory', ['$http', function($http){
    
    var gitApiFactory = {};
        
    gitApiFactory.gitHub = function(username, repoName){
        
        var apiUrl = 'https://api.github.com/repos/'+username+'/'+repoName+'/commits';
        
        return $http.get(apiUrl, {cache: true}).then(function(response){
            
            var constructedData = [];
            
            for (var i=0; i < response.data.length; i++){
                constructedData[i] = {
                    date: response.data[i].commit.committer.date,
                    name: response.data[i].commit.author.name,
                    message: response.data[i].commit.message,
                    avatarUrl: response.data[i].author.avatar_url
                };
            }
            
            localStorage.setItem("cf-githubdata", JSON.stringify(constructedData));
            
            return constructedData;
            
        }, function(response){
            
            var savedData = localStorage.getItem("cf-githubdata");
            var parsedData = JSON.parse(savedData);
            
            if (typeof parsedData === 'object'){
                console.log('Returning Old Data | ERROR IN gitApiFactory', response);
                return parsedData
            } else {
                console.log('ERROR IN gitApiFactory', response);
            }
            
        });
        
    };
    
    return gitApiFactory;
    
}])



.factory('dataFactory', ['$http', function($http){
          
    var dataFactory = {};

    dataFactory.getData = function(){
        
        return $http.get('data.json', {cache: true}).then(function(response){
            return response.data;
        }).catch(function(err){
            return err;
        }); 
    };

    return dataFactory;
            
}]);