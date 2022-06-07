// app/js/column.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var ColumnSH   = new Schema({
    name: String,
    text: String,
    fullText: String
});

module.exports = mongoose.model('Column', ColumnSH);
