const path = require('path')
const chats = require('./models/chats')
const users = require('./models/users')
const app = require('express')();
const server = app.listen(4000);
const io = require('socket.io')(server);
const mongoose = require('mongoose');
const cors = require('cors');
app.use(cors());


mongoose.connect('mongodb://devansh:KGdhpIYEsoHSz0gr@anonymous-project-shard-00-00-e0dq9.mongodb.net:27017,anonymous-project-shard-00-01-e0dq9.mongodb.net:27017,anonymous-project-shard-00-02-e0dq9.mongodb.net:27017/test?ssl=true&replicaSet=Anonymous-Project-shard-0&authSource=admin&retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(() => {
    console.log('MongoDB is connected')
}).catch(err => {
    console.log('MongoDB connection unsuccessful, retry after 5 seconds.')
    setTimeout(connectWithRetry, 5000)
})

var db = mongoose.connection

io.on('connection', function (socket) {
    console.log("connected");
    socket.on("newMessage", async (data) => {
        try {
            var chat = new chats({
                username: data.username,
                chat: data.chat
            })
            await chat.save();
            console.log(data);
        } catch{
            console.log('Error')
        }
    })
})


app.get('/', function (req, res) {
    res.redirect('https://www.github.com/DevanshCodes')
})

app.get('/api/chats', async function (req, res) {
    try {
        await chats.find((err, chats) => {
            if (err) {
                console.log(err)
            } else {
                res.json(chats);
            }
        })
    } catch (error) {
        console.log(error);
    }
})

app.post('/:username', async function (req, res) {
    let user = req.params.username;
    new_user = new users({
        username: user
    })
    await new_user.save();
    res.json(new_user)
})

