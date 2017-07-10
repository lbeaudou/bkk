



Template.reports.helpers({
	go: function() {
		numserie= Session.get('numserie');
		reference= Session.get('reference');
		tab = reports.find({reference, numserie});
		return tab;
		
		 
	},
	
	
	
	
});

Template.reports.events({
	'click #down_report': function() {
		numserie= Session.get('numserie');
		reference= Session.get('reference');
		tab = reports.find({reference, numserie});
			var heading = false; // Optional, defaults to true
			var delimiter = ";" // Optional, defaults to ",";
   
		var csv = exportcsv.exportToCSV(tab.fetch(), heading, delimiter);
		var blob = new Blob([csv], {type: "text/plain;charset=utf-8"});
		name = 'Report - '+reference + ' - ' + numserie + '.csv';
		saveAs(blob, name);
		
	},
	'click #down_times': function() {
		numserie= Session.get('numserie');
		reference= Session.get('reference');
		tab = times.find({reference, numserie});
			var heading = true; // Optional, defaults to true
			var delimiter = ";" // Optional, defaults to ",";
   
		var csv = exportcsv.exportToCSV(tab.fetch(), heading, delimiter);
		var blob = new Blob([csv], {type: "text/plain;charset=utf-8"});
		name = 'Times - '+reference + ' - ' + numserie + '.csv';
		saveAs(blob, name);
		
	},
	
	
	
	
});


Template.reports.onCreated(function(){
	
  
  
  Session.set('numserie', this.data.numserie);
  Session.set('reference', this.data.reference);
  
});

Template.moreCharts.rendered = function(){
	
  
  numserie= Session.get('numserie');
		reference= Session.get('reference');
		Meteor.subscribe('times', reference, function() {
		tab = times.find({reference, numserie}).fetch();
		

    var ctx  = document.getElementById("myChart").getContext("2d");
  
   var time = _.pluck(tab, 'time');
   var etapes = _.pluck(tab, 'num_etape');
    var data = { 
        labels: etapes,
        datasets: [{
            label: "Etapes",
            fillColor: "rgba(250,10,10,0.2)",
            strokeColor: "rgba(250,10,10,1)",
            pointColor: "rgba(220,220,220,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: time,
        }]
    };
    var myPieChart = new Chart(ctx).Bar(data);
		});
};





Template.moreCharts.helpers({
	
	tb_temps: function(){
		
		numserie= Session.get('numserie');
		reference= Session.get('reference');
		tab = times.find({reference, numserie}).fetch();
		

   
		return tab;
		
	},
	total: function() {
		numserie= Session.get('numserie');
		reference= Session.get('reference');
		tab = times.find({reference, numserie}).fetch();
		console.log(tab);
		var cumul = 0;
		for(i in tab) {
		
			cumul = cumul + tab[i].time;
			
		}
		console.log(cumul);
		return cumul;
		
	}
	
	

});

function random() {
    return Math.floor((Math.random() * 100) + 1);
}


Template.allreport.helpers({
	tabref:function() {
		return ref.find({});
		
		
	},
	lastenter: function() {
		var options = { "sort": [['date','desc']], "limit":25 };
		tb = reports.find({},options);
		return tb;
		
		
	}
	
	
});

Template.allreport.events({ 
	'submit #checkreport':function(e) {
		console.log('go');
		e.preventDefault();
		ref = e.target.ref.value;
		numserie = e.target.serialnumber.value;
		Router.go('/reports/'+ref+'/'+numserie);
		
	}
	
	
	
});