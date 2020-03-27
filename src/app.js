
     var $ = require('jquery');
     const NodeRsa = require('node-rsa');
     const Key = new NodeRsa({b:2048});
     var socket = io();
     let serverKey;     

     const Encryptor = require('./Encryptor');

     
     const publicClientKey = Key.exportKey('public');
     const privateClientKey = Key.exportKey('private');


     socket.emit('greetingToServ',{publicKey:publicClientKey }); //обмен ключами с клиентом
     socket.on('greetingToClient', key =>{ serverKey = key; console.log("Public server key"); console.log(serverKey)});

     
     
     $('form').submit(e => {
         e.preventDefault();
         socket.emit('chat mes', {name: $('#name').val(), msg: Encryptor.encrypt($('#message').val(),serverKey)}); //Отправка сообщений на сервер
         $('#all_mess').append(`<div class='alert'> <b> ${$('#name').val()} </b> : ${$('#message').val()} </div>`)
         $('#message').val('');
         return false;
     });


     socket.on('chat message', Message => {
          $('#all_mess').append(`<div class='alert'> <b>${Message.name} </b> : ${Encryptor.decrypt(Message.msg,privateClientKey)} </div>`);
        });
