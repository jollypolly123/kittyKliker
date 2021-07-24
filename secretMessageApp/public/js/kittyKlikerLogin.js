console.log("gottem");
const messageDiv = document.querySelector("#message");
let errorNum = 0;
let boxNum = 0;
var delayInMilliseconds = 3000;
// clownery

function hashing(pwd) {
  var hash = 0, i, chr;
  if (pwd.length === 0) return hash;
  for (i = 0; i < pwd.length; i++) {
    chr   = pwd.charCodeAt(i);
    hash  = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};

function getMessages() {
    const messagesRef = firebase.database().ref()
    messagesRef.on('value', (snapshot) => {
        const messages = snapshot.val();
        validateMessages(messages);
    })

}

function validateMessages(messages){
    const passcodeAttempt = document.querySelector("#passcode").value
    const usernameAttempt = document.querySelector("#username").value
    let found = false;
    for (message in messages) {
        const messageData = messages[message]
        console.log(hashing(passcodeAttempt), usernameAttempt);
        console.log(messageData.passcode, messageData.message);
        if (messageData.passcode == hashing(passcodeAttempt) && messageData.message === usernameAttempt) {
            sessionStorage.setItem("username", messageData.message);
            window.location.href = "kittyKliker.html";
            found = true;
        }
    }
    if (!found) {
        alert("Your password is incorrect! Don't you dare try again >:(");
        errorNum++;
        if (errorNum > 10) {
            alert("You have reached the maximum number of attempts. Go away. You can't try again either.");
            document.getElementById("viewMsg").disabled = true;
            setTimeout(function() {
            document.getElementById("viewMsg").disabled = false;
            }, delayInMilliseconds);
            errorNum = 0;
        }
    }
}
