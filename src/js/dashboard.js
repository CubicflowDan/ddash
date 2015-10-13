/*

var cfDashboard = ( function( window, undefined ) {
    
    var opts = {
        timeFormat: d3.time.format("%d %m %Y")
    };
    
    var pageData = {};
    
    // is run on load
    var _init = function(){
        loadData(loadOverview);
    };
    
    
    var loadData = function(callback){
        $.getJSON( "data.json")
        .done(function(data){ 
            
            loadGitHubData(arguments[0].repoUrl, arguments[0].repoType, function(gitData){
                
                    data.gitData = gitData;
                    pageData = data;
                    
                    if (callback) callback(data);
                
            });
            
        })
        .fail(function(){ 
            console.log('failure', arguments); 
        });
    };
    
    var loadGitHubData = function(url, repoType, callback){
        
        var savedData = localStorage.getItem("cf-githubdata");
        
        
        if(repoType === 'github') {
                
            $.getJSON(url)
            .done(function(){ 
                localStorage.setItem("cf-githubdata", JSON.stringify(arguments[0]));
                if (callback) callback(arguments[0]);
            })
            .fail(function(){ 
                if (savedData) {
                    var parsedData = JSON.parse(savedData);
                    if (typeof parsedData === 'object' && callback) callback(parsedData);
                    console.log('failure - USED SAVED DATA', arguments); 
                } else {
                    console.log('failure', arguments); 
                }
            });
            
        }
    };
    
    var loadOverview = function(data){
        
        var $page = $('#overview');
        
        var $projectName = $('#project-name-label');
        $projectName.text(data.projectName);
        
        var $startedOn = $('#started-label');
        $startedOn.text(data.startDate);
        
        var $startedOn = $('#completion-label');
        $startedOn.text(data.goal);
        
        var $currentPhase = $('#current-phase-label');
        $currentPhase.text(data.currentPhase);
        
        loadOverviewGraph('#progress', 'Project Total', data.totalCompletion);
        
        loadOverviewGraph('#phase-progress', data.currentPhase, data.phaseCompletion);
        
        
        
        
        
        var lastCommit = new Date(data.gitData[0].commit.committer.date);
        var lastCommitTime = opts.timeFormat(lastCommit);
        var $lastCommit = $('#last-commit-label');
        $lastCommit.text(lastCommitTime);
        
        var $committer = $('#committer-label');
        $committer.text(data.gitData[0].commit.author.name);
        
        var $commitMessage = $('#commit-message-label');
        $commitMessage.text(data.gitData[0].commit.message);
        
        console.log(data.gitData);
        
        $page.toggleClass('active');
        
        
        
    };
    
    */
    cf.loadOverviewGraph = function(container, label, percent){
                    
        var dataset = [
            { label: 'uncomplete', count: 100 - percent }, 
            { label: 'completed', count: percent }, 
        ];

        var width = 130;
        var height = 130;
        var strokeWidth = 5;
        var radius = Math.min(width, height) / 2;

        var svg = d3.select(container)
            .append('svg')    
            .attr('width', width) 
            .attr('height', height)
            .append('g')
            .attr('transform', 'translate(' + (width / 2) + 
            ',' + (height / 2) + ')');

        var arc = d3.svg.arc()
            .outerRadius(radius)
            .innerRadius(radius - strokeWidth);

        var pie = d3.layout.pie()
            .value(function(d) { return d.count; })
            .sort(null);

        var path = svg.selectAll('path')
            .data(pie(dataset))
            .enter()
            .append('path')
            .attr('d', arc)
            .attr('class', function(d, i) { 
                if(i === 0) return 'base';
                if(i === 1) return 'completed';
            });

        var label = svg.append('text')
            .text(label)
            .attr('x', 0)
            .attr('y', 20)
            .attr('text-anchor', 'middle')
            .attr('class', 'label-text');

        var label = svg.append('text')
            .text(dataset[1].count + '%')
            .attr('x', 0)
            .attr('y', 0)
            .attr('text-anchor', 'middle')
            .attr('class', 'label-percent');

    };


    cf.loadPaymentGraph = function(container, label, paid, projectTotal){
                    
        var dataset = [
            { label: 'uncomplete', count: projectTotal - paid }, 
            { label: 'completed', count: paid }, 
        ];

        var width = 130;
        var height = 130;
        var strokeWidth = 5;
        var radius = Math.min(width, height) / 2;

        var svg = d3.select(container)
            .append('svg')    
            .attr('width', width) 
            .attr('height', height)
            .append('g')
            .attr('transform', 'translate(' + (width / 2) + 
            ',' + (height / 2) + ')');

        var arc = d3.svg.arc()
            .outerRadius(radius)
            .innerRadius(radius - strokeWidth);

        var pie = d3.layout.pie()
            .value(function(d) { return d.count; })
            .sort(null);

        var path = svg.selectAll('path')
            .data(pie(dataset))
            .enter()
            .append('path')
            .attr('d', arc)
            .attr('class', function(d, i) { 
                if(i === 0) return 'base';
                if(i === 1) return 'completed';
            });

        var label = svg.append('text')
            .text(label)
            .attr('x', 0)
            .attr('y', 20)
            .attr('text-anchor', 'middle')
            .attr('class', 'label-text');

        var label = svg.append('text')
            .text('$' + dataset[1].count)
            .attr('x', 0)
            .attr('y', 0)
            .attr('text-anchor', 'middle')
            .attr('class', 'label-percent');

    };
    /*
    
    // Run init 
    _init();
    

    // explicitly return public methods when this object is instantiated
    return {
        loadOverview : loadOverview
    };
} )( window );
  
*/