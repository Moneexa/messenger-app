var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var userSchema = new Schema({
	'userName' : String,

});

module.exports = mongoose.model('User', userSchema);
