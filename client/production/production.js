

Template.production.onCreated(function(){
	
  this.num_etape = new ReactiveVar(0);
  this.etapes = new ReactiveVar();
  this.login = new ReactiveVar(this.data.login);
  this.reference = new ReactiveVar(this.data.reference);
  this.numserie = new ReactiveVar(this.data.numserie);
  this.revision = new ReactiveVar(this.data.revision);
  this.numof = new ReactiveVar(this.data.numof);
  if('login' in this.data) {
  Session.set('login', this.data.login);
  } else {
	  Session.set('login', undefined);
  }
  
   if('numserie' in this.data) {
  Session.set('numserie', this.data.numserie);
   } else {
	   Session.set('numserie', undefined);
   }
    if('reference' in this.data) {
  Session.set('reference', this.data.reference);
	} else  {
		Session.set('reference', undefined);
	}
	 if('revision' in this.data) {
  Session.set('revision', this.data.revision);
	 } else {
		 Session.set('revision',undefined);
	 }
	 if('numof' in this.data) {
  Session.set('numof', this.data.numof);
	 } else {
		 Session.set('numof',undefined);
	 }
 // console.log(this.data);


});

Template.login.onCreated(function(){
	

if(this.data) {
	if('login' in this.data) {
  Session.set('login', this.data.login);
  } else {
	  Session.set('login', undefined);
  }
   if('reference' in this.data) {
  Session.set('reference', this.data.reference);
	} else  {
		Session.set('reference', undefined);
	}
}


	
});

Template.login.onrendered = function() {
	
	
	document.getElementById("login").autofocus;
	
};




Template.production.helpers({
	
	html:function() { // affichage du contenu html
		reference = Template.instance().reference.get();
		login = Template.instance().login.get();
		num = Template.instance().num_etape.get();
		revision = Template.instance().revision.get();
		
		
		var options = { "sort": [['num_etape','asc']] };
		tab_etapes = etapes.find({reference, revision},options).fetch();
		
	
		
		if(tab_etapes.length>0) {
			if(num>=tab_etapes.length) {
				num = 0;
				Template.instance().num_etape.set(0);
				Router.go('/production/'+login+'/'+reference+'/');
			}
			var d = new Date();
			var n = d.getTime();
			Session.set('time_start', n);			
				
		return tab_etapes[num];
		} else {
			console.log('error');
			return 0; 
		}
		
		
		
	},
		name_ref: function() {
			reference = Template.instance().reference.get();
			revision = Session.get('revision');
			tab = ref.findOne({reference, revision});
			return  tab.name_ref;
			
		}
});




Template.production.events({
	
	'submit .production_submit': function(e) { // bouton suivant
	reference = Template.instance().reference.get();
	numserie = Session.get('numserie');
	login = Session.get('login');
	revision = Session.get('revision');
	numof = Session.get('numof');
		console.log(numof);
		e.preventDefault();
		const target = e.target;
		
		var suivant = true;
		_id = target.id.value;
	
		num_etape = Template.instance().num_etape.get() + 1;
		num_etape = num_etape.toString();
		// enregistrement des champs
		array = champs.find({id:_id}).fetch();
		i = 0;
		for(i in array) {
			var name = array[i].id_input;
			console.log(name);
			var val = document.getElementById(name).value;
			if(val=='') { suivant = false; 
			document.getElementById(name).style.background = 'red';
			} else {
				document.getElementById(name).style.background = 'green';
			}
			
			 
			if('type' in array[i]) {
				
				if(array[i].val == val) {
					
					document.getElementById(name).style.background = 'green';
				} else {
					document.getElementById(name).style.background = 'red';
					reports.insert({reference, numserie, numof,login, date: new Date(), comment:"ngo text", value:val, num_etape}); ///reports
					suivant = false;
				}
				
				
			}
			
			reports.insert({reference, numserie, numof, login,  date: new Date(), comment:array[i].name, value:val, num_etape});
		}
		//verification des champs e
		array = valeurs.find({id:_id}).fetch();
		i = 0;
		console.log('champs :' + array);
		for(i in array) {
			var name = array[i].id_input;
			console.log(name);
			var val = Number(document.getElementById(name).value);
			var min =  array[i].min;
			var max =  array[i].max;
			var normal =  array[i].normal;
			
			console.log(min);
			console.log(val);
		if(val < min || val > max) { console.log('nok');  
		document.getElementById(name).style.background = 'red';
		suivant =false;
		reports.insert({reference, numserie, numof,login, date: new Date(), comment:"nogo value", value:val, num_etape}); //// reports
		} else {
			console.log('ok');
			document.getElementById(name).style.background = 'green';
			reports.insert({reference, numserie, numof,login, date: new Date(), comment:"go value", value:val, num_etape}); ///reports
			}
			 
		}
		// verification des checkbox
		if('check' in target && suivant == true) { 
			i = 0;
			if(length in target.check) { // si plusieur check box
			for(var i in target.check) {
				val = target.check[i].checked;
				
				if(target.check[i].checked==false) { 	
						comment = "nogo checkbox "+num_etape+" - "+i;
						reports.insert({reference, numserie, numof,login, date: new Date(), comment, value:val, num_etape});
						alert('Please verify verification - โปรดยืนยันการยืนยัน'); 
						suivant = false;
						return false;
						} else {
							if(target.check[i].checked==true) {
							comment = "go checkbox "+num_etape+" - "+i;
						reports.insert({reference, numserie, numof,login, date: new Date(), comment, value:val, num_etape});
						}}
			}
			} else  { // si une seul checkbox
			val = target.check.checked;
				if(target.check.checked==false) { 
					comment = "nogo checkbox "+num_etape+" - 0";
					alert('Please verify verification - โปรดยืนยันการยืนยัน'); 
					reports.insert({reference, numserie, numof,login, date: new Date(), comment, value:val, num_etape});
					suivant = false;
					} else if(target.check.checked==true) {
						comment = "go checkbox "+num_etape+" - 0";
						reports.insert({reference, numserie, numof,login, date: new Date(), comment, value:val, num_etape});
					}
			}
		
		}
		// Gestion des etapes
		var d = new Date();
		var n = d.getTime();
		time = (n - Session.get('time_start'))/1000;
		console.log(time);
		times.insert({reference, numserie, login, date: new Date(), num_etape, time});
		if(suivant == true) { // incrementation du numero d'etape
			num = Template.instance().num_etape.get() + 1;
		Template.instance().num_etape.set(num);
			reports.insert({reference, numserie, numof, login, date: new Date(), comment:"step go", num_etape});
		} 
		return false; 
		
	},
	'click .bp_retour': function() { // bouton retour
		number = Number(Template.instance().num_etape.get());
		console.log(number);
		if(number > 0) {
			number = Template.instance().num_etape.get() - 1;
			Template.instance().num_etape.set(number);
		} else {
			number = 0;
			Template.instance().num_etape.set(number);
			Router.go('/production/'+login+'/');
		}
		
		
			return false;
	}, 
	'click #return_home': function() {
		reference = Template.instance().reference.get();
	numserie = Session.get('numserie');
	login = Session.get('login');
	revision = Session.get('revision');
		Router.go('/production/'+login+'/');
	
		
	}

});


Template.login.events({
	'submit #form_login': function(e) {
		e.preventDefault();
		const target = e.target;
		
		login = target.login.value;
		numserie = target.numserie.value;
		numof = target.numof.value;
		tab = ref.findOne({_id:target.reference.value});
		
		reference = tab.reference;
		revision = tab.revision;
		if(login != '' && numserie != '' && numof != '' && reference != '' && revision != '') {
		if(reports.find({reference, numserie}).count()>0) {
			var go = confirm('The serial number ' + numserie + ' has already recordings - หมายเลขซีเรียล ' + numserie + '  มีการบันทึกอยู่แล้ว');
				if(go==true) {
					Router.go('/production/'+login+'/'+reference+'/'+revision+'/'+numof+'/'+numserie);
				} 
			} else {
				
				Router.go('/production/'+login+'/'+reference+'/'+revision+'/'+numof+'/'+numserie);
			}
		
		
		}
		
		
	},
	
	'click #refresh': function() {
		Router.go('/production/');
		Session.set('reference', undefined);
	}
	
});


Template.login.helpers({
	login : function() {
		return Session.get('login');
		
		
	},
	
	references : function() {
		reference = Session.get('reference');
		console.log(reference);
		// var myArray = etapes.find().fetch();
		// var distinctArray = _.uniq(myArray, false, function(d) {return d.reference});
		// var references = _.pluck(distinctArray, 'reference');
		// console.log(references);
		if(reference!=undefined) {
			references = ref.find({reference, validation:true}).fetch();
			console.log(references);
			// references = new Array({reference});
			console.log(references);
		} else {
		references = ref.find({validation:true});
		}
		return references;
		
	}
	
	
	
	
})

