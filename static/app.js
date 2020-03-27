
     var $ = require('jquery');
     const NodeRsa = require('node-rsa');
     const Key = new NodeRsa({b:2048});
     var socket = io();
     let serverKey;     
     
     let publicClientKey = Key.exportKey('public');
    //  console.log(publicClientKey);
     let privateClientKey = Key.exportKey('private');
    //  console.log(privateClientKey);

     socket.emit('greetingToServ',{publicKey:publicClientKey }); //обмен ключами с клиентом
     socket.on('greetingToClient', key =>{ serverKey = key; console.log("Public server key"); console.log(serverKey)});

     
     
     $('form').submit(e => {
         e.preventDefault();
         let encryptor = new NodeRsa(serverKey);
         socket.emit('chat mes', {name: $('#name').val(), msg: encryptor.encrypt($('#message').val(),'base64')}); //Отправка сообщений на сервер
         $('#all_mess').append(`<div class='alert'> <b> ${$('#name').val()} </b> : ${$('#message').val()} </div>`)
         $('#message').val('');
         return false;
     });


     socket.on('chat message', Message => {

        let decryptor = new NodeRsa(privateClientKey);

          $('#all_mess').append(`<div class='alert'> <b>${Message.name} </b> : ${decryptor.decrypt(Message.msg,'utf8')} </div>`);
        });
