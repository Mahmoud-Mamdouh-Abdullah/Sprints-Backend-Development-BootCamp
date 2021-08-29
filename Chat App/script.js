const loginSec = document.querySelector('#loginSec');
const chatSec = document.querySelector('#chatSec');
const msgArea = document.querySelector('#msgArea');
const joinGroupBtn = document.querySelector('#joinGroup');
const logoutBtn = document.querySelector('#logout');
const sendMsgBtn = document.querySelector('#sendMsg');


const joinGroup = function() {
    loginSec.classList.add('d-none');
    chatSec.classList.remove('d-none');
}


const logout = function() {
    loginSec.classList.remove('d-none');
    chatSec.classList.add('d-none');
}

const sendMsg = function() {
    console.log(msgArea.value, msgArea.value.length);
    if(msgArea.value == null || msgArea.value.length === 0) {
        alert('Enter your message first');
        msgArea.value = '';
        return;
    }
    msgArea.value = '';
}

joinGroupBtn.addEventListener('click', joinGroup);

logoutBtn.addEventListener('click', logout);

sendMsgBtn.addEventListener('click', sendMsg);

msgArea.addEventListener('keyup', (e) => {
    if(e.keyCode === 13) {
        msgArea.value = msgArea.value.replace(/[\r\n\v]+/g, '');
        sendMsg();
    }
});