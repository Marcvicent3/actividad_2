const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const shortid = require('shortid');

const urlSchema = new Schema({
    urlOriginal: {
        type: String,
        lowercase: true,
        trim: true,
        required: 'The original url is required'
    },
    shorten: {
        type: String
    }
});
//Mongoose Methods
urlSchema.pre('save', async function(next) {
    //Generate a short url
    this.shorten = shortid.generate();
    next();
});

module.exports = mongoose.model('Urls', urlSchema);

