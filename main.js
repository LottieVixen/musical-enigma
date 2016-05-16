var options, encrypted, pubkey, privkey, text1, text2, text3, text4, text5, button, button1, button2, hidevar,
  user_id,
  pass,
  mykey;
hidevar = false;
user_id = {
  name: 'Charlotte Fields',
  email: 'foxsan48@gmail.com'
};
pass = 'I Love Snow';

function selectElems() {
  console.log('selectElems');
  text1 = document.querySelector('#t1');
  text2 = document.querySelector('#t2');
  text3 = document.querySelector('#t3');
  text4 = document.querySelector('#t4');
  text5 = document.querySelector('#t5');
  text1.value = 'okay';
  b1 = document.querySelector('#b1');
  b2 = document.querySelector('#b2');
  b3 = document.querySelector('#b3');
  b4 = document.querySelector('#b4');
  cb1 = document.querySelector('#cb1');
}

function makeKeys() {
  console.log('makeKeys');
  options = {
    userIds: [user_id], // multiple user IDs
    numBits: 1024, // RSA key size
    passphrase: pass // protects the private key
  };
  openpgp.generateKey(options).then(function(key) {
    mykey = key;
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

function load() {
  console.log('load');
  selectElems();
  makeKeys();

  b1.addEventListener("click",
    (function() {
      console.log('encrypt');
      options = {
        data: text1.value,
        publicKeys: openpgp.key.readArmored(text3.value).keys
      };
      text4.value = "";
      openpgp.encrypt(options).then(function(ciphertext) {
        encrypted = ciphertext.data;
        text4.value = ciphertext.data;
      }).catch(function(error) {
        text4.value = "THERE IS AN ERROR";
      });
    }), false);
  b3.addEventListener('click', (
    function() {
      if (hidevar) {
        hidevar = false;
        text2.style.display = 'none';
        text3.style.display = 'none';
      } else {
        hidevar = true;
        text2.style.display = 'block';
        text3.style.display = 'block';
      }
    }
  ), false)
  b4.addEventListener("click",
    (function() {
      console.log('clicked');
      //text2.style.display = 'none';
      //text3.style.display = 'none';
      var privKeys = openpgp.key.readArmored(text2.value);
      var privKey = privKeys.keys[0];
      var success = privKey.decrypt('I Love Snow');
      options = {
        message: openpgp.message.readArmored(text4.value), // parse armored message
        publicKeys: openpgp.key.readArmored(text3.value).keys, // for verification (optional)
        privateKey: privKey,
        //privateKey: openpgp.decryptKey(text2.value,'I Love Snow')[0],
        passwords: ['I Love Snow'], // for decryption
      };
      openpgp.decrypt(options).then(function(plaintext) {
        text5.value = plaintext.data; // 'Hello, World!
      });

    }), false);
}

document.addEventListener("DOMContentLoaded", load, false);
/* working out how to fit this all in nicely.
function smsOut() {
  var lines = text4.value.split('\n');
  lines.shift();
  lines.shift();
  lines.shift();
  lines.shift();
  text5.value = "";
  time = Math.round(new Date().getTime() / 1000.0).toString().substr(-4);
  var count = 0;
  var i = 0;
  for (i; i < lines.length; i += 1) {
    if ((i % 2) == 0) {
      if (lines[i].substr(0, 3) == "---") {
        break;
      }
      if (lines[i + 1] === undefined) {
        text5.value += (time + ("00" + count)
          .slice(-3) +
          lines[i] +
          '\n\n'
        );
      } else {
        text5.value += (time + ("00" + count)
          .slice(-3) +
          lines[i] +
          ',' +
          lines[i + 1] +
          '\n\n'
        );
        count += 1;
      }
    }
  }
}

function smsIn() {
  text5.value = ["8191000wYwDhNC9AkhhLs8BA/9/W79MUG0mZGyFnL9yYONXQUT+oOj2atBPYNrF+sp+,lHXeMQrJHZnSf6MH+pesuuT0hLhtcdXxPieEsgorl9joHVKkNGemgf4YrGFD",
    "8191001215gXeZh5O0wVR5UiSo4nrhVNXIKy5ItscPyz6aVtBXk3qxuy1LD14wfQ1bS,KjdCg+sN3tI8AfbS15pBwpzj2QXK1S05ziEwUa/9M8y6GPXGIfCr2QGGtDu4",
    "8191002HOkDuOfSVEwnIEqpe5BNqgGUZUe1Kx/f,=wf/F"
  ].join('\n');
  var prepend = ["-----BEGIN PGP MESSAGE-----", "Version: OpenPGP.js v2.3.0", "Comment: http://openpgpjs.org", "", ""].join('\n');
  var append = ["", "-----END PGP MESSAGE-----", ""].join('\n');
  var inbound = [];
  inbound = text5.value.split('\n');
  inbound.sort(function(a, b) {
    return a.substr(0, 7) - b.substr(0, 7);
  })
  for (var i = 0; i < inbound.length; i += 1) {
    inbound[i] = inbound[i].substr(7);
  }
  text5.value = "";
  text5.value += prepend;
  text5.value += inbound.join(',').split(',').join('\n')
  text5.value += append;
}

function SMSdecode() {
  text5.value = ["-----BEGIN PGP MESSAGE-----",
    "Version: OpenPGP.js v2.3.0",
    "Comment: http://openpgpjs.org",
    "",
    "wYwDhNC9AkhhLs8BA/9/W79MUG0mZGyFnL9yYONXQUT+oOj2atBPYNrF+sp+",
    "lHXeMQrJHZnSf6MH+pesuuT0hLhtcdXxPieEsgorl9joHVKkNGemgf4YrGFD",
    "215gXeZh5O0wVR5UiSo4nrhVNXIKy5ItscPyz6aVtBXk3qxuy1LD14wfQ1bS",
    "KjdCg+sN3tI8AfbS15pBwpzj2QXK1S05ziEwUa/9M8y6GPXGIfCr2QGGtDu4",
    "HOkDuOfSVEwnIEqpe5BNqgGUZUe1Kx/f",
    "=wf/F",
    "-----END PGP MESSAGE-----"
  ].join('\n');
}
*/