var TimelineCtrl = function(data){
    
    var vm = this;
    
    // Loop through Phases in timeline
    for (var i=0; i < data.timeline.length ;i++){
        
        var tasksCompleted = 0;
        console.log(data.timeline[i].items);
        
        // Loop through items in Phase
        for (var i2=0; i2 < data.timeline[i].items.length ;i2++){
            
            // If status is done ++
            if (data.timeline[i].items[i2].status === 'done'){
                tasksCompleted++;
            }
            
        }
        
        data.timeline[i].tasksCompleted = tasksCompleted;
        data.timeline[i].tasksLength = data.timeline[i].items.length;
        
        if (data.timeline[i].tasksCompleted === data.timeline[i].tasksLength){
            data.timeline[i].status = 'done';
        } else if (data.timeline[i].tasksCompleted > 0){
            data.timeline[i].status = 'in-progress';
        } else if (data.timeline[i].tasksCompleted === 0){
            data.timeline[i].status = 'incomplete';
        }
        
    }
    
    
    vm.data = data;
        
};

TimelineCtrl.resolve = {
    data: function(dataFactory){
        return dataFactory.getData();
    }
};

angular.module('app')
    .controller('TimelineCtrl', [
    'data', 
    TimelineCtrl
]);