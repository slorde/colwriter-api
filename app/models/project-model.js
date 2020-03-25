const Joi = require('joi');
const mongoose = require('mongoose');

const ProjectSchema = mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    user_owner: {
        type: String,
        require:true,
        required: 'Must have an user owner'
    },
    created: {
      type: Date,
      default: Date.now,
      required: 'Must have start date - default value is the created date'
    }
});

const Project = mongoose.model('Project', ProjectSchema);

function validateProject(project) {
  const schema = {
    title: Joi.string().min(3).max(255).required(),
    userId: Joi.string().min(3).max(255).required()
  };

  return Joi.validate(project, schema);
}

exports.Project = Project; 
exports.validate = validateProject;