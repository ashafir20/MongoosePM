var mongoose = require('mongoose');
var validator = require('../validation');
var creationInfo = require('../creationInfo');
var modifiedOn = require('../modifiedOn');


var userSchema = new mongoose.Schema({
    name: { type: String, required: true, validate: validator.validateLength },
    email: { type: String, unique: true, required: true, validate: validator.validateEmail },
    createdOn: { type: Date, default: Date.now },
    lastLogin: Date
});

userSchema.plugin(modifiedOn);

// Build the User model
mongoose.model('User', userSchema);