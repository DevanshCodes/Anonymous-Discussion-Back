const express = require('express')
const path = require('path')
const posts = require('./models/posts')
const users = require('./models/users')
var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/anonymous-project', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false
})
const connection = mongoose.connection;
connection.once('open', function(){
    console.log('Connected');
})


app.listen(4000, function () {
    console.log('server is now listening on port 4000');
})

app.get('/', function (req, res) {
    res.redirect('https://www.github.com/DevanshCodes')
})

app.get('/:username', async function (req, res) {
    try {
        user = await users.findOne({ username: req.params.username })
        if (user) {
                post = posts.findOne({ username: user })
                let description = post.description
                res.json(description)
        }
    } catch (error) {
        res.redirect('www.google.com')
    }
    
app.post('/:username',async function (req,res){
    let user = req.params.username;
    new_user = new users({
        username: user
    })
    await new_user.save();
    res.json(new_user)
})

})