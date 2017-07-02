


Template.references.helpers({
	ref: function() {
		var myArray = ref.find().fetch();
		var distinctArray = _.uniq(myArray, false, function(d) {return d.reference});
		return myArray;
		
		
		
	},
	
	
});


Template.references.events({
	'click #edit_ref': function() {
		
		Router.go('/edition/'+this.reference+'/'+this.revision);
		
	},
	'submit #add_ref': function(e){
		e.preventDefault();
		const target = e.target;
		reference = target.name_ref.value;
		if(ref.find({reference}).count()>0) {
			alert('The reference already exists');
		} else {
		ref.insert({reference, date: new Date(), validation:false, revision:"A0"}); 
		}
	}, 
	'click .valid_ref': function(e) {
		
		val = e.target.checked;
		ref.update({_id:this._id}, {$set: {validation:val}});
	
		
	},
	
	'click #del_ref': function() {
		valid = confirm('Do you want to remove the reference ?');
		if(valid==true) {
			console.log('fr');
			tab = ref.findOne({_id:this._id});
			reference = tab.reference;
			revision = tab.revision;
			array = etapes.find({reference, revision}).fetch();
			for(i in array) {
			_id = array[i]._id;
					tb = valeurs.find({id:_id}).fetch();
						for(y in tb) {
							valeurs.remove({_id:tb[y]._id});
								}
				etapes.remove({_id});
			}
		 ref.remove({_id:this._id});
		 
		}

	},
	'click #commit': function() {
		reference = this.reference;
		revision = this.revision;
		tab = etapes.find({reference, revision}).fetch();
		revision = prompt('Give a version number');
		if(revision) {
			console.log('insert');
		ref.insert({reference, date: new Date(), validation:false, revision});
		
		for(i in tab) // copie des etapes
		{
			reference = tab[i].reference;
			num_etape = tab[i].num_etape; 
			nom_etape = tab[i].nom_etape;
			commentaire_etape = tab[i].commentaire_etape;
			html_etape = tab[i].html_etape;
			jig_rev = tab[i].jig_rev;
			id = tab[i]._id;
			var array = valeurs.find({id}).fetch();
			console.log('id : ' + id);
			console.log('arr : ' + array);
			var new_id;
			new_id = etapes.insert({reference, num_etape, nom_etape, commentaire_etape, html_etape, jig_rev, revision}, function(err, docsInserted){ 
			id=docsInserted;
			return id;	
			}); 
			
			for(y in array) {  
						name = array[y].name;
						type = array[y].type;
						min = array[y].min;
						max= array[y].max;
						normal= array[y].normal;
						id_input= array[y].id_input;
						console.log('fef');
						id = new_id;
						valeurs.insert({id, name, type, min, max, normal, id_input});
						console.log(y);
									}
					
			
			
		}
		console.log(tab);
			}
		
	},
	'click #all': function() {
		tab = etapes.find({reference:this.reference, revision:this.revision}).fetch();
	
Router.go('/references/'+this.reference+'/'+this.revision+'/');
		
		
	}
	
	
	
});


Template.total_ref.onCreated(function(){
	
  
  this.reference = new ReactiveVar(this.data.reference);

  this.revision = new ReactiveVar(this.data.revision);
  Session.set('reference', this.data.reference);
  Session.set('revision', this.data.revision);
 // console.log(this.data);


});
Template.total.helpers({
	html:function() { // affichage du contenu html
		reference = Session.get('reference');
		revision = Session.get('revision');
		
		console.log(reference);
		console.log(revision);
		var options = { "sort": [['num_etape','asc']] };
		tab_etapes = etapes.find({reference, revision},options).fetch();
		
		console.log(tab_etapes);
		
		return tab_etapes
		
		
		
	} 

});

Template.total_ref.events({
	'click #download': function() {
		
			
		window.print();
		
		
	 }
	
	
});