const app = require('express')();
const express = require('express');
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const NodeRsa = require('node-rsa');
const Key = new NodeRsa({b:2048});

const Encryptor = require('./src/Encryptor.js');


app.use("/static",express.static("./static/"));
app.get('/',(req,res) => res.sendFile(__dirname + '/static/client.html'));
http.listen(3000,() => console.log('Listening 3000')) ;

const privateServerKey = Key.exportKey('private');
const publicServerKey = Key.exportKey('public');

let users = [];

io.on('connection', socket =>{
    console.log(`${socket.client.id} has been connected`) //лог подключения
    socket.on('greetingToServ', loggedUsers => {  //Обмен ключами между клиентом и сервером
        users.push({
            id:socket.client.id,
            publicKey:loggedUsers.publicKey,
        });
        socket.emit('greetingToClient', publicServerKey);
        // console.log('Пользователи');
        // console.log(users);
    });

    socket.on('chat mes', Message =>{
        let decMes = Encryptor.decrypt(Message.msg,privateServerKey);
        users.forEach(item => {
            socket.broadcast.to(item.id).emit('chat message',{name:Message.name, msg: Encryptor.encrypt(decMes,item.publicKey) });
        });        
    });


    socket.on('disconnect',() =>{
        console.log(`${socket.client.id} disconnected`);
        users.splice(users.indexOf(users.find(item => item.id === socket.client.id)),1);
        // console.log(users);
    } ); //лог отключения
});