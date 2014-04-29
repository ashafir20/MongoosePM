var mongoose = require('mongoose');

var projectSchema = new mongoose.Schema({
    projectName: String,
    createdOn: { type: Date, default: Date.now },
    modifiedOn: Date,
    createdBy: String,
    contributors: String,
    tasks: String
});


projectSchema.statics.findByUserID = function (userid, callback) {
    this.find(
    { createdBy: userid },
    '_id projectName',
    {sort: 'modifiedOn'},
    callback);
}


// Build the Project model
mongoose.model('Project', projectSchema);