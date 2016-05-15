var options, encrypted;
//make body, I know this is wrong but let me get away with it for now
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
document.body.appendChild(br);
document.body.appendChild(text3);
document.body.appendChild(text4);
//test//
function load() {
button.addEventListener("click",
(function() {
  openpgp.encrypt(options).then(function(ciphertext) {
    encrypted = ciphertext.data;
    text4.value = ciphertext.data;
  }).catch(function(error){
    text4.value = "THERE IS AN ERROR";  
  });
})
,false);
}
document.addEventListener("DOMContentLoaded", load, false);

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

  localStorage.privkey = text2.value = privkey;
  localStorage.pubkey = text3.value = pubkey;
});
  var options
  options = {
    data: 'okay',
    publicKeys: openpgp.key.readArmored(pubkey).keys
  };
/*
  document.getElementById('button').onClick = (function() {
  openpgp.encrypt(options).then(function(ciphertext) {
    encrypted = ciphertext.data;
    text4.value = ciphertext.data;
  }).catch(function(error){
    text4.value = "THERE IS AN ERROR";  
  });
});
*/