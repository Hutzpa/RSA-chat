const NodeRsa = require('node-rsa');
const Key = new NodeRsa({b:2048});

let privatKey = Key.exportKey('private');
let publicKey = Key.exportKey('public');


let KeyPublic = new NodeRsa(publicKey);

console.log(KeyPublic.encrypt("Test data utf8",'utf8'));console.log(" utf8");

console.log(KeyPublic.encrypt("Test data ascii",'ascii'));console.log("ascii ");

console.log(KeyPublic.encrypt("Test data base64",'base64'));console.log("base64 ");

console.log(KeyPublic.encrypt("Test data binary",'binary'));console.log("binary ");

console.log(KeyPublic.encrypt("Test databuffer",'buffer'));console.log("buffer ");

console.log(KeyPublic.encrypt("Test data hex",'hex'));console.log(" hex");

console.log(KeyPublic.encrypt("Test data latin1",'latin1'));console.log("latin1 ");

console.log(KeyPublic.encrypt("Test data latin1 ucs2",'ucs2'));console.log("ucs2 ");

console.log(KeyPublic.encrypt("Test data latin1 utf16le",'utf16le'));console.log("utf16le ");
