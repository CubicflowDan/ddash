var HomeCtrl = function(dataFactory, gitApiFactory, data){
        
    var vm = this;
   
    vm.data = data;

//    cf.loadOverviewGraph('#progress', 'Project Total', vm.data.totalCompletion);
//    cf.loadOverviewGraph('#phase-progress', vm.data.currentPhase + ' Phase', vm.data.phaseCompletion);

    
    // I feel a little dirty having this in the controller
    // But I dont really want to make the view wait on this data
    if(data.repoType === 'github'){
        gitApiFactory.gitHub(data.apiUrl).then(function(gitData){
            vm.data.git = gitData;
        })
    }
    
};


HomeCtrl.resolve = {
    
    data: function(dataFactory){
        return dataFactory.getData();
    }
    
};


angular.module('app')
    .controller('HomeCtrl', [
    'dataFactory',
    'gitApiFactory',
    'data',
    HomeCtrl
]);