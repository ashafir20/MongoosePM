var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    createdOn: { type: Date, default: Date.now },
    modifiedOn: Date,
    lastLogin: Date
});


// Build the User model
mongoose.model('User', userSchema);