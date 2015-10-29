var circleGraphLink = function(scope, element, attrs){
    var elemId = element.attr('id');
    cf.loadOverviewGraph('#'+elemId, attrs.graphLabel, attrs.graphCompletion);
};

var circleGraph = function(){
    return {
        restrict: 'E',
        transclude: true,
        link: circleGraphLink,
        template: ''
    };
};

angular.module('app')
    .directive('circleGraph', circleGraph);