Meteor.publish('ref', function() {
  return ref.find();
});

Meteor.publish('etapes', function(reference) {
  return etapes.find({reference: reference});
});

Meteor.publish('champs', function() {
  return champs.find();
});

Meteor.publish('valeurs', function() {
  return valeurs.find();
});


//reports
Meteor.publish('times', function() {
  return times.find();
});

Meteor.publish('reports', function() {
  return reports.find();
});





