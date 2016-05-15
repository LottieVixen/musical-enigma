var encrypted;

var text1 = document.createElement('textarea');
var text2 = document.createElement('textarea');
var text3 = document.createElement('textarea');
var text4 = document.createElement('textarea');
var br = document.createElement('br');
var button = document.createElement('button');
button.innerHTML = "Encrypt! & Decrypt";
document.body.appendChild(text1);
document.body.appendChild(text2);
document.body.appendChild(br);
document.body.appendChild(button);
document.body.appendChild(text3);
document.body.appendChild(text4);

var options = {
  userIds: [{
    name: 'Jon Smith',
    email: 'jon@example.com'
  }], // multiple user IDs
  numBits: 1024, // RSA key size
  passphrase: 'set' // protects the private key
};

openpgp.generateKey(options).then(function(key) {
  var privkey = key.privateKeyArmored;
  var pubkey = key.publicKeyArmored;

  text2.innerHTML = privkey;
  text3.innerHTML = pubkey;
});

document.querySelector('button').onClick = (function() {
  var options
  options = {
    data: text1.innerHTML,
    publicKeys: openpgp.key.readArmored(text3.innerHTML).keys
    //privateKeys: openpgp.key.readArmored(text2.innerHTML).keys,
    //passwords: ['set'],
    //armor: true
  };
  text3.innerHTML = openpgp.key.readArmored(text3.innerHTML).keys;
  openpgp.encrypt(options).then(function(ciphertext) {
    encrypted = ciphertext.data;
    text4.innerHTML = ciphertext.data;
  }).catch(function(error){
    //ERROR	  
  });
});
/*
 * @param {string} - arg one
 * @param {string} - arg two
 * @param {string} - arg three
 * @returns {null} - returns nothing at all!
 */
function test(arg1, arg2, arg3) {

}