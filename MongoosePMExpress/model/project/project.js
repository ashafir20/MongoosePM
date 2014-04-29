var mongoose = require('mongoose');

var projectSchema = new mongoose.Schema({
    projectName: String,
    createdOn: { type: Date, default: Date.now },
    modifiedOn: Date,
    createdBy: String,
    contributors: String,
    tasks: String
});


// Build the Project model
mongoose.model('Project', projectSchema);