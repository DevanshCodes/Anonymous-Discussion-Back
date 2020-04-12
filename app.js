const chats = require('./models/chats')
const app = require('express')();
var port_number = process.env.PORT || 4000;
const server = app.listen(port_number);
const io = require('socket.io')(server);
const mongoose = require('mongoose');
const cors = require('cors');
const mongoURL = 'mongodb://devansh:KGdhpIYEsoHSz0gr@anonymous-project-shard-00-00-e0dq9.mongodb.net:27017,anonymous-project-shard-00-01-e0dq9.mongodb.net:27017,anonymous-project-shard-00-02-e0dq9.mongodb.net:27017/test?ssl=true&replicaSet=Anonymous-Project-shard-0&authSource=admin&retryWrites=true&w=majority';
app.use(cors());


mongoose.connect(mongoURL, {
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

var connectWithRetry = function () {
    return mongoose.connect(mongoURL, function (err) {
        if (err) {
            console.error('Failed to connect to mongo on startup - retrying in 5 sec', err);
            setTimeout(connectWithRetry, 5000);
        }
    });
};

io.sockets.on('connection', function (socket, client) {
    socket.on('connect', () => {
        console.log('New Client is Connected!')
    })
    socket.on('room', function (room) {
        socket.join(room);
        console.log(`${room} joined`)
        async function chatsfun(room) {
            const nchats = await chats.find({ roomno: room })
            if (nchats) {
                return nchats
            } else {
                return [{ username: 'Admin', chat: `welcome to room number ${req.params.roomno}` }]
            }
        }
        async function emit(room) {
            const nchats = await chatsfun(room);
            socket.emit('chats', nchats)
        }

        emit(room)

    })
    socket.on("newMessage", async (data) => {
        try {
            var chat = new chats({
                username: data.username,
                chat: data.chat,
                roomno: data.roomno
            })
            await chat.save();
            io.sockets.in(data.roomno).emit('newChat', data)
        } catch{
            console.log('Error')
        }
    })
})


app.get('/', function (req, res) {
    res.redirect('https://www.github.com/DevanshCodes')
})

app.get('/api/port', async function (req, res) {
    try {
        return res.json(port_number)
    } catch (error) {
        console.log(error);
    }
})

