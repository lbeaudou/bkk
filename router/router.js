
Router.configure({
	notFoundTemplate:'home',
	loadingTemplate: 'loading',
	
});



Router.route('/production/', {  

waitOn: function() {  
return Meteor.subscribe('ref');
	 },
	
action : function() {
	this.render('login');
}

} );
Router.route('/references/', {
waitOn: function() {  
return Meteor.subscribe('ref');
	 },	
	
action : function() {  this.render('references');} 


});
Router.route('/production/:login/:reference/', {

waitOn: function() {  
return Meteor.subscribe('ref');
	 },
	 
	action:function() {  
	var login = this.params.login;
	var reference = this.params.reference;
	var t = {
		login,
		reference
	}
	this.render('login', {
	data: function() {
		return t;
	}
	});
}
});

Router.route('/references/:reference/:revision', {
	waitOn: function() {  
	Meteor.subscribe('ref')
return Meteor.subscribe('etapes', this.params.reference);
	 },

	action:function() {  
	var revision = this.params.revision;
	var reference = this.params.reference;
	var t = {
		revision,
		reference
	}
	this.render('total_ref', {
	data: function() {
		return t;
	}
	});
}

});

Router.route('/production/:login/:reference/:revision', {
	waitOn: function() {  
return Meteor.subscribe('ref');
	 },
action: function() {  
	var login = this.params.login;
	var reference = this.params.reference;
	var revision = this.params.revision;
	
	
	var t = {
		login,
		reference,
		revision
		
	}
	
	this.render('login', {
	
	data: function() {
		return t;
	}
	});
}

});

Router.route('/production/:login', {
	waitOn: function() {  
return Meteor.subscribe('ref');
	 },
	action:function() {  
	var login = this.params.login;
	var t = {
		login
		
	}
	
	this.render('login', {
	
	data: function() {
		return t;
	}
	});


}} );
Router.route('/production/:login/:reference/:revision/:numof/:numserie', {
	waitOn: function() {  
	Meteor.subscribe('ref');
	Meteor.subscribe('valeurs');
	Meteor.subscribe('champs');
return Meteor.subscribe('etapes', this.params.reference);
	 },
	
	action:function() {
	var login = this.params.login;
	var reference = this.params.reference;
	var numserie = this.params.numserie;
	var revision = this.params.revision;
	var numof = this.params.numof;
	var t = {
		login,
		reference,
		numserie,
		revision,
		numof
		
	}
	
	this.render('production', {
	
	data: function() {
		return t;
	}
	});

	}
	});


// Page accueil
Router.route('/edition/:reference/:revision', {
	waitOn: function() {  
	
	Meteor.subscribe('valeurs');
	Meteor.subscribe('champs');
	Meteor.subscribe('ref');
return Meteor.subscribe('etapes', this.params.reference);
	 },
	action:function() {
var reference = this.params.reference;
var revision = this.params.revision;
t = {
	reference,
revision}

this.render('edition', {
	
	data: function() {
		return t;
	}
	});

}
});

Router.route('/reports/:reference/:numserie', {
	waitOn: function() {  
	
	Meteor.subscribe('times')
return Meteor.subscribe('reports');
	 },
	
	
	action:function() {
	
	var reference = this.params.reference;
	var numserie = this.params.numserie;
	var t = {
		reference,
		numserie
	}
	this.render('reports', {
		data : function() {
			return t;
		}
	});

}
});

Router.route('/reports', {
	waitOn: function() {  
	
	Meteor.subscribe('reports');
return Meteor.subscribe('ref');
	 },
	
action : function() {
	this.render('allreport');
}

});
