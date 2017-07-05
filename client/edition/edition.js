

Template.editeur.onCreated(function(){
	

  Session.set('id', 'load');
  Session.set('new_id',Random.id());
 
});

Template.edition.onCreated(function(){
	

  
 Session.set('reference', this.data.reference);
 Session.set('revision', this.data.revision);

});







Template.summernote_editeur.rendered = function () { // affichage de summernote
    $('#summernote').summernote({
	height:800,
	  maxHeight:800,
	  minHeight:800,
	  callbacks: {
    onImageUpload : function(files) {
      if (!files.length) return;
      var file = files[0];
      var reader  = new FileReader();
      reader.onloadend = function () {
          
         var node = document.createElement('IMG');
		 node.src = reader.result;
		 var taille = confirm('Image on full screen ?');
		 if(taille) {
			 node.style.height = '799px';
		 } else {
		 node.style.width= '200px';
		 }
		 node.style.margin ='0 auto';
          $('#summernote').summernote("insertNode", node);
      }

      if (file) {
        // convert fileObject to datauri
        reader.readAsDataURL(file);
      }
  },
  toolbar: [
    // [groupName, [list of button]]
    ['style', ['bold', 'italic', 'underline', 'clear']],
    ['font', ['strikethrough', 'superscript', 'subscript']],
    ['fontsize', ['fontsize']],
    ['color', ['color']],
    ['para', ['ul', 'ol', 'paragraph']],
    ['height', ['height']]
  ]
  }
    });
	
	

	
  };

  Template.editeur.helpers({
	   etape: function() { // affichage du numero d'etage dans le champ
	   reference = Session.get('reference'); 
	   revision = Session.get('revision');
	  console.log(Session.get('id'));
	   if(Session.get('id')!='load') { 
			
	   tab = etapes.findOne({_id:Session.get('id')});  
			
			for(html_etape in tab) {
				$('#summernote').summernote('code', tab.html_etape);
			}
	   return tab;
	   
	   } else {
		   
		var options = { "limit": 1, "sort": [['num_etape','desc']] };
		array = etapes.find({reference, revision},options).fetch();
		 
		if(array.length>0) {
		 value = array[0].num_etape;
		 value = Number(value) +1;
		 id = Session.get('new_id');
		 
		  var t = {
			  "num_etape":value,
			  "nom_etape":"",
			  "jig_rev":"",
			  "commentaire_etape":"",
			 "_id":id
			  
		  };
			return t;
		} else {
			var t = {
				"num_etape":1
			}
			return t;
		}
	   }
	 },
	 valeur_etape: function() { // affichage des champs valeurs de l'etape
	  
		if(Session.get('id')!='load') { 
		tab = etapes.findOne({_id:Session.get('id')});  
		id = tab._id;
		} else {
		 id = Session.get('new_id');
		}
		 console.log(id);
		 return valeurs.find({id});
		 
	 },
	 champ_etape: function() { // affichage des champs de l'etape
	  
		if(Session.get('id')!='load') { 
		tab = etapes.findOne({_id:Session.get('id')});  
		id = tab._id;
		} else {
		 id = Session.get('new_id');
		}
		
		 return champs.find({id});
		 
	 },
	 
	 reference: function() {
		 
		 return Session.get('reference');
		 
	 }
	 
	
	 
	 
	 	 
	 

	  
	  
  });
  
  Template.summernote_editeur.helpers({
	  html_etape: function(){ 
		return Template.instance().html_etape.get();
	 }
  });
  
  
  
 
 Template.edition.helpers({
	 etapes: function() {
			reference = Session.get('reference');
			revision = Session.get('revision');
		 var options = { "sort": [['num_etape','asc']] };
		  return etapes.find({reference, revision},options);
		  },
 });
 
 Template.editeur.events({
	 'click #add_valider': function() {
		 var node = document.createElement('INPUT');
		 node.type = 'checkbox';
		 node.name = 'check';
		$('#summernote').summernote('insertNode', node);
	 },
	 'click #add_template_a': function() {
		 var ok = confirm('This operation will erase all data in the frame.');
			if(ok) {
		 var html = '<div class="template_a_top"><div class="template_a_top_body"><h3>Text</h3></div></div><div class="template_a_body"><div class="template_a_double"><div class="template_a_double_body"><p>Text</p></div></div><div class="template_a_double"><div class="template_a_double_body"><p>Text</p></div></div></div>';
		$('#summernote').summernote('code', html);
	 }
		 
	 }, 
	 
	 'click #add_template_b': function() {
		 var ok = confirm('This operation will erase all data in the frame.');
			if(ok) {
		 var html = '<div class="template_a_top"><div class="template_a_top_body"><h3>Text</h3></div></div><div class="template_b_simple"><div class="template_b_simple_body"><p>Text</p></div></div>';
		$('#summernote').summernote('code', html);
		 }
	 },
	 
	 'click #add_template_c': function() {
		 var ok = confirm('This operation will erase all data in the frame.');
			if(ok) {
		 var html = '<div class="template_c_top"><div class="template_c_top_body"><h3>Text</h3></div></div><div class="template_c_top_right"></div><br><div class="template_b_simple"><div class="template_b_simple_body"><p>Text</p></div></div>';
		$('#summernote').summernote('code', html);
		 }
	 },

	 'submit #add_valeur_form': function(e) {
		 reference = Session.get('reference');
		 revision = Session.get('revision');
		 e.preventDefault();
		const target = e.target;
		min = target.min.value;
		max = target.max.value;
		normal = target.normal.value;
		
		id = target.id.value;
		name = target.name_champ_ctrl.value;
		
		 console.log(num_etape);
		 var id_input = Random.id();
		valeurs.insert({id, name, type:"valeur_ctrl", min, max, normal, id_input}, function(err, docsInserted){ 
		var id=docsInserted;
		var node = document.createElement('INPUT');
		 node.type = 'text';
		 node.name = id_input;
		 node.id = id_input;
		 node.class = id_input;
		 node.placeholder= name;
		 node.style.cssText = 'width:100px;height:35px;';
		$('#summernote').summernote('insertNode', node);
		console.log(docsInserted) });
 
	 },
	 'submit #add_valeur_nn_ctrl_form': function(e) {
		 reference = Session.get('reference');
		 e.preventDefault();
		const target = e.target;
		name = target.name_champ_nn_ctrl.value;
		 
		 id = target.id.value;
		  var id_input = Random.id();
		champs.insert({id, name, id_input}, function(err, docsInserted){ 
		var id=docsInserted;
		var node = document.createElement('INPUT');
		 node.type = 'text';
		 node.name = id_input;
		 node.id = id_input;
		 node.class = id_input;
		 node.placeholder= name;
		 node.style.cssText = 'width:100px;height:35px;';
		$('#summernote').summernote('insertNode', node);
		console.log(docsInserted) });
	
		 
		 
		 
	 },'submit #add_text_ctrl_form': function(e) {
		 reference = Session.get('reference');
		 e.preventDefault();
		const target = e.target;
		name = target.name_text_ctrl.value;
		val = target.value_text_ctrl.value;
		 
		 id = target.id.value;
		  var id_input = Random.id();
		champs.insert({id, name, id_input, 'type':'check', val}, function(err, docsInserted){ 
		var id=docsInserted;
		var node = document.createElement('INPUT');
		 node.type = 'text';
		 node.name = id_input;
		 node.id = id_input;
		 node.class = id_input;
		 node.placeholder= name;
		 node.style.cssText = 'width:100px;height:35px;';
		$('#summernote').summernote('insertNode', node);
		console.log(docsInserted) });
	
		 
		 
		 
	 },
	 
	 'click .bp_enregistrer':function(e) {
		 reference = Session.get('reference');
		 revision = Session.get('revision');
		 var num_etape = Number(document.getElementById('num_etape').value);
		 var num = document.getElementById('num_etape').value;
		 var nom_etape = document.getElementById('nom_etape').value;
		 var partinbox_etape = document.getElementById('partinbox_etape').value;
		 var commentaire_etape = document.getElementById('commentaire_etape').value;
		 var id_val = document.getElementById('id_val').value;
		 var jig_rev = document.getElementById('jig_rev').value;
		 var html_etape = $('#summernote').summernote('code');
		 if(num_etape!='' && nom_etape != '' && commentaire_etape != '' && html_etape != '') {
			if(etapes.find({reference, num_etape}).count()>=1) {
				var id = document.getElementById('id').value;
				Session.set('id', 'load');
				  
				tab = etapes.findOne({_id:id});
				
				etapes.update({_id:tab._id}, {$set: {nom_etape, commentaire_etape, partinbox_etape, html_etape, jig_rev}});
			} else {
			etapes.insert({reference, num_etape, nom_etape, commentaire_etape, partinbox_etape, html_etape, jig_rev, revision});
			tab = etapes.findOne({reference, num_etape, revision});
			id = tab._id;
			}
			
			array = valeurs.find({id:id_val}).fetch();
			i=0;
			for(i in array) {
			valeurs.update({_id:array[i]._id}, {$set: {id}});
			}
			
			array = champs.find({id:id_val}).fetch();
			i=0;
			for(i in array) {
			champs.update({_id:array[i]._id}, {$set: {id}});
			}
			
			
			var markupStr = '';
			$('#summernote').summernote('code', markupStr);
		 } else {
			 alert('Please complete all fields.');
		 }
		
	 },
	 'change #num_etape':function(e) {
		 Template.instance().num_etape.set(e.target.value);
		
		 
		 
		 
	 },
	 'click #sup_valeur': function() {
		 var valid_sup = confirm('Validate the remove.');
			if(valid_sup == true) {
				valeurs.remove({_id:this._id});
				$( "#"+this.id_input ).remove();
			}
		 
	 },
	 'click #sup_champ': function() {
		 var valid_sup = confirm('Validate the remove.');
			if(valid_sup == true) {
				champs.remove({_id:this._id});
				$( "#"+this.id_input ).remove();
			}
		 
	 },
	 
	 'change #name_valeur':function(e) {
		 name = e.target.value;
		 valeurs.update({_id:this._id}, {$set: {name}});	 
	 },
	 
	 'change #name_champ':function(e) {
		 name = e.target.value;
		 champs.update({_id:this._id}, {$set: {name}});	 
	 },
	 'change #min':function(e) {
		 min = e.target.value;
		 console.log('update');
		 valeurs.update({_id:this._id}, {$set: {min}});	 
	 },
	 
	  'change #max':function(e) {
		 max = e.target.value;
		 valeurs.update({_id:this._id}, {$set: {max}});	 
	 },
  'change #normal':function(e) {
		normal = e.target.value;
		 valeurs.update({_id:this._id}, {$set: {normal}});	 
	 },
	 'click #addvideo': function() {
		url = prompt('Enter the url of the video :');
		 
		html = '<video id="videp" loop controls autoplay preload="auto" class="video-js vjs-default-skin" controls preload="auto" width="1000" height="800" poster="/imgciee.png" >';
		html = html + '<source src="'+url+'" type="video/mp4" />';
		html = html +'<p class="vjs-no-js">To view this video please enable JavaScript, and consider upgrading to a web browser that <a href="http://videojs.com/html5-video-support/" target="_blank">supports HTML5 video</a></p>';
		html = html +'</video>';
		$('#summernote').summernote('code', html);
		 
	 },
	 'click #imgbackground': function() {
		 var img = document.getElementById('editeur').getElementsByTagName('img');
		 h = img[0].height;
		 w = img[0].width;
		 src = img[0].src;
		 console.log(h);
		 console.log(w);
		 
		 
		 div = document.createElement('div');
		 div.style.width=w;
		 div.style.height=h;
		 div.style.cssText = 'width:'+w+'px;height:'+h+'px;background: url('+src+') no-repeat;';

		  $('#summernote').summernote("insertNode", div);
	 }

	 
 });
 
 Template.etape.events({
	'click .bp_supprimer':function() {
		var valid_sup = confirm('Validate the remove.');
			if(valid_sup == true) { 
					etapes.remove(this._id);
					tab = valeurs.find({id:this._id}).fetch();
					for(i in tab) {
					valeurs.remove({_id:tab[i]._id});
					}
					
					tab = champs.find({id:this._id}).fetch();
					for(i in tab) {
					champs.remove({_id:tab[i]._id});
					}
					
					
					
									}
		},
	'change .num_etape':function(e) {
		
		
new_valeur = Number(e.target.value);
	
	etapes.update({_id:this._id}, {$set: {num_etape:new_valeur}});
	
		},
		
	'click .bp_modifier': function() {
		Session.set('id', this._id);
		$("html, body").animate({scrollTop: 350},"slow");
	}
	 
	 
	 

 });
 
 Template.etape.rendered = function () {
    $('#summernote').summernote({
	height:600,
	  maxHeight:600,
	  minHeight:600,
	  
    });
	
  };
 
 
 
 