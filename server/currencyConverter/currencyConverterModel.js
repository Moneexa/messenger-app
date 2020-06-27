var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var currencyConverterSchema = new Schema({
	'date' : String,
	'from' : String,
	'to' : String,
	'inputAmount' : String,
	'output' : Number
});

module.exports = mongoose.model('currencyConverter', currencyConverterSchema);
