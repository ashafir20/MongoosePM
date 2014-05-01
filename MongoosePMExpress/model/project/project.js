var mongoose = require('mongoose');
var validator = require('../validation');
var creationInfo = require('../creationInfo');
var modifiedOn = require('../modifiedOn');

var taskSchema = new mongoose.Schema({
    taskName: { type: String, required: true, validate: validator.validateLength },
    taskDesc: String,
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

taskSchema.plugin(modifiedOn);
taskSchema.plugin(creationInfo);

var projectSchema = new mongoose.Schema({
    projectName: String,
    contributors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    tasks: [taskSchema]
});

projectSchema.plugin(creationInfo);
projectSchema.plugin(modifiedOn);


/* Add all projectName validation using schemaType methods, outside of the schema delcaration */
projectSchema.path('projectName').required(true);
projectSchema.path('projectName').validate(validator.isNotTooShort, 'Is too short');
/* Asynchronous validator checking against the database*/
projectSchema.path('projectName').validate(function (value, respond) {
    // if the project has a modifiedOn value pass validation as project already exists 
    if (this.modifiedOn) {
        console.log('Validation passed: ', this);
        respond(true);
    } else {
        // Otherwise check to see if this user already has a project with the same name
        console.log('Looking for projects called ' + value);
        Project.find({ projectName: value, createdBy: this.createdBy }, function (err, projects) {
            console.log('Number found: ' + projects.length);
            respond(projects.length ? false : true);
        });
    }
}, 'Duplicate projectName');


projectSchema.statics.findByUserID = function (userid, callback) {
    this.find({ createdBy: userid }, '_id projectName', { sort: 'modifiedOn' }, callback);
}


// Build the Project model
var Project = mongoose.model('Project', projectSchema);