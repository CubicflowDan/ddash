angular.module('app', [
    'ui.router',
    'ngAnimate'
])
.config(['$urlRouterProvider', '$stateProvider', function($urlRouterProvider, $stateProvider){
    
    $urlRouterProvider.otherwise('/');
    
    $stateProvider
        .state('home', {
            url: '/',
            templateUrl: 'templates/home.html',
            controller: 'HomeCtrl',
            controllerAs: 'vm',
            resolve: HomeCtrl.resolve
        })
        .state('git', {
            url: '/git',
            templateUrl: 'templates/git.html',
            controller: 'GitCtrl',
            controllerAs: 'vm',
            resolve: GitCtrl.resolve
        })
        .state('payment', {
            url: '/payment',
            templateUrl: 'templates/payment.html',
            controller: 'PaymentCtrl',
            controllerAs: 'vm',
            resolve: PaymentCtrl.resolve
        })
        .state('timeline', {
            url: '/timeline',
            templateUrl: 'templates/timeline.html',
            controller: 'TimelineCtrl',
            controllerAs: 'vm',
            resolve: TimelineCtrl.resolve
        })
        .state('documentation', {
            url: '/documentation',
            templateUrl: 'templates/documentation.html',
            controller: 'DocumentationCtrl',
            controllerAs: 'vm',
            resolve: DocumentationCtrl.resolve
        });
    
}])



.factory('gitApiFactory', ['$http', function($http){
    
    var gitHub = function(apiUrl){
        
        return $http.get(apiUrl, {cache: true}).then(function(response){
            
            var constructedData = [];
            
            for (var i=0; i < response.data.length; i++){
                constructedData[i] = {
                    date: response.data[i].commit.committer.date,
                    name: response.data[i].commit.author.name,
                    message: response.data[i].commit.message
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
    
    return {
        gitHub: gitHub
    }
    
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