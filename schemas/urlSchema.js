// require mongoose
var mongoose = require('mongoose');

// Create schema
var UrlSchema = mongoose.Schema({
    longUrl: {
      type: String,
    },
    shortUrl: {
      type: String
    }  
  }, { timestamps: true });

  // export model
  module.exports = mongoose.model('UrlModel', UrlSchema);