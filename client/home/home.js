


Template.home.events({
	'click .bp_creation':function() {
		val = prompt('pwd ?');
		if(val=='1234') {
		Router.go('/references/');
		}
		
		
	},
	
	'click .bp_production':function() {
		Router.go('/production/');
		
		
	},
	
	
	
	
});

