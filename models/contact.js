//schema needs to be defined for every document in the collection

const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true
    }, 
    phone: {
        type: String,
        required: true
    }
})

//with below name collection will be stored in database

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;