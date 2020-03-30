const mongoose = require ('mongoose');
const schema = mongoose.Schema;

const users = new schema ({
    username: {
        type: String,
        required: true,
    }
})

module.exports = mongoose.model('users', users);