const mongoose = require('mongoose');
const SchemaBroma = new mongoose.Schema({
    "id":Number,
    "setup":String,
    "punchline":String
});
const Broma = mongoose.model('bromas',SchemaBroma);
module.exports = Broma;