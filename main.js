var options, encrypted, pubkey, privkey;
//make body, I know this is wrong but let me get away with it for now
var text1 = document.createElement('textarea');
var text2 = document.createElement('textarea');
var text3 = document.createElement('textarea');
var text4 = document.createElement('textarea');
var text5 = document.createElement('textarea');
var br = document.createElement('br');
var button = document.createElement('button');
var button1 = document.createElement('button');
button.innerHTML = "Encrypt! & Decrypt";
button1.innerHTML = "Failing thing";
text1.value = 'okay';
document.body.appendChild(text1);
document.body.appendChild(text2);
document.body.appendChild(br);
document.body.appendChild(button);
document.body.appendChild(button1);
document.body.appendChild(br);
document.body.appendChild(text3);
document.body.appendChild(text4);
document.body.appendChild(text5);
function makeKeys() {
  options = {
    userIds: [{
      name: 'Jon Smith',
      email: 'jon@example.com'
    }], // multiple user IDs
    numBits: 1024, // RSA key size
    passphrase: 'set' // protects the private key
  };
  openpgp.generateKey(options).then(function(key) {
    privkey = key.privateKeyArmored;
    pubkey = key.publicKeyArmored;

    localStorage.privkey = text2.value = privkey;
    localStorage.pubkey = text3.value = pubkey;
  });
  
options = {
	data: text1.value,
	publicKeys: openpgp.key.readArmored(pubkey).keys
	};
}
function button1f() {
    openpgp.encrypt(options).then(function(ciphertext) {
  	  encrypted = ciphertext.data;
  	  text5.value = ciphertext.data;
  	  }).catch(function(error){
  		  text5.value = "THERE IS AN ERROR";  
  	});
  }
function load() {
  makeKeys();

  button.addEventListener("click",
    (function() {
      text4.value = "";
      openpgp.encrypt(options).then(function(ciphertext) {
        encrypted = ciphertext.data;
        text4.value = ciphertext.data;
      }).catch(function(error) {
        text4.value = "THERE IS AN ERROR";
      });
    }), false);
  //*/
  //* STILL FAILS
   button1.onclick = button1f;
  //*/
}

document.addEventListener("DOMContentLoaded", load, false);