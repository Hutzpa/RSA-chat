const NodeRsa = require('node-rsa');

function encrypt(string, key) {
    const _encrypt = new NodeRsa(key);
    return _encrypt.encrypt(string,'base64');
}

function decrypt(string,key){
    let decrypte = new NodeRsa(key);
    return decrypte.decrypt(string,'utf8');
}


module.exports.encrypt = encrypt;
module.exports.decrypt = decrypt;