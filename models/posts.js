const mongoose = require ('mongoose');
const schema = mongoose.Schema;

const PostSchema = new schema({
    username: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    pinned: {
        type: Boolean,
        default: false,
    }
})

module.exports = mongoose.model('post',PostSchema);