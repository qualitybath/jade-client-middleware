jade.templates = {};
jade.render = function(template, data) {
  if(!template.match(/\.jade$/)) {
    template += '.jade';
  }
  return jade.templates[template](data);
};
