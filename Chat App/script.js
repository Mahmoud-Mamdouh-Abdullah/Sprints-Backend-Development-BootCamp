let msgCounter = 0;
const loginSec = document.querySelector('#loginSec');
const chatSec = document.querySelector('#chatSec');
const msgArea = document.querySelector('#msgArea');
const msgDiv = document.querySelector('.msgDiv');
const joinGroupBtn = document.querySelector('#joinGroup');
const logoutBtn = document.querySelector('#logout');
const sendMsgBtn = document.querySelector('#sendMsg');
const timerP = document.querySelector('#timer');

let count = 60;
let timer;

const joinGroup = function () {
    loginSec.classList.add('d-none');
    chatSec.classList.remove('d-none');
    timer = setInterval(function () {
        count--;
        timerP.innerText = `You will logout after ${count} sec`
        if (count === 0) {
            clearInterval(timer);
            logout();
        }
    }, 1000);
}

const logout = function () {
    loginSec.classList.remove('d-none');
    chatSec.classList.add('d-none');
    count = 60;
    timerP.innerText = `You will logout after 60 sec`;
    clearInterval(timer);
}

const addMsg = function () {
    if(msgCounter === 0) {
        msgDiv.innerHTML = '';
    }
    let msgBody = 
        `
        <div class="msgBody d-flex flex-row justify-content-end mb-3">
            <div class="msgContent border d-flex flex-row p-2 justify-content-between">
                <p class="text-white text-start">You : ${msgArea.value}</p>
            </div>
        </div>
        `;
    msgDiv.insertAdjacentHTML('beforeend', msgBody);
    msgDiv.scrollTop = msgDiv.scrollHeight;
    msgCounter++;
}

const sendMsg = function () {
    console.log(msgArea.value, msgArea.value.length);
    if (msgArea.value == null || msgArea.value.length === 0) {
        alert('Enter your message first');
        msgArea.value = '';
        return;
    }
    addMsg();
    msgArea.value = '';
    count = 60;
    timerP.innerText = `You will logout after 60 sec`;
}

joinGroupBtn.addEventListener('click', joinGroup);

logoutBtn.addEventListener('click', logout);

sendMsgBtn.addEventListener('click', sendMsg);

msgArea.addEventListener('keyup', (e) => {
    if (e.keyCode === 13) {
        msgArea.value = msgArea.value.replace(/[\r\n\v]+/g, '');
        sendMsg();
    }
});

