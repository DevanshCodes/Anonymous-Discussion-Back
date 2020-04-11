const mongoose = require ('mongoose');
const schema = mongoose.Schema;

const ChatSchema = new schema({
    username: {
        type: String,
        required: true,
    },
    chat: {
        type: String,
    },
    roomno:{
        type: String,
        required: true,
    }
})

module.exports = mongoose.model('chats',ChatSchema);