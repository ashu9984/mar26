var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model
module.exports = mongoose.model('Product', new Schema({
    
    proname: String,
    protype: String,
    proimage: String
   
}));