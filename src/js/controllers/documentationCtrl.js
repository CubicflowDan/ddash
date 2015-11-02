var DocumentationCtrl = function(data){
    
    var vm = this;
    vm.data = data;
    
};

DocumentationCtrl.resolve = {
    data: function(dataFactory){
        return dataFactory.getData();
    }
};

angular.module('app')
    .controller('DocumentationCtrl', [
    'data',
    DocumentationCtrl
]);