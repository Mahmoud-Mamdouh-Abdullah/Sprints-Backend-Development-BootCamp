const loginSec = document.querySelector('#loginSec');
const chatSec = document.querySelector('#chatSec');

const joinGroup = function() {
    loginSec.classList.add('d-none');
    chatSec.classList.remove('d-none');
}


const logout = function() {
    loginSec.classList.remove('d-none');
    chatSec.classList.add('d-none');
}

const sendMsg = function() {
    console.log("send");
}