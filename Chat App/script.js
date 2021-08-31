let msgCounter = 0;
const loginSec = document.querySelector('#loginSec');
const chatSec = document.querySelector('#chatSec');
const msgArea = document.querySelector('#msgArea');
const msgDiv = document.querySelector('.msgDiv');
const joinGroupBtn = document.querySelector('#joinGroup');
const logoutBtn = document.querySelector('#logout');
const sendMsgBtn = document.querySelector('#sendMsg');
const timerP = document.querySelector('#timer');
const groupNameP = document.querySelector('#groupNameP');
const groupName = document.querySelector('#groupName');
const myName = document.querySelector('#MyName');

let count = 60;
let timer;

var pusher = new Pusher('8783cde87284422cc978', {
    cluster: 'mt1'
});

const subscribeChannel = function (channelName) {
    Pusher.logToConsole = true;

    var channel = pusher.subscribe(channelName);
    channel.bind('my-event', function (data) {
        let dataObj = JSON.parse(JSON.stringify(data).replaceAll(`\\`, ''));
        if (dataObj.sender !== myName.value) {
            if (msgCounter === 0) {
                msgDiv.innerHTML = '';
            }
            let msgBody =
                `
                <div class="msgBody d-flex flex-row justify-content-start mb-3">
                    <div class="msgContent border d-flex flex-row p-2 justify-content-between">
                     <p class="text-white text-start">${dataObj.sender} : ${dataObj.message}</p>
                     </div>
                </div>
                 `;
            msgDiv.insertAdjacentHTML('beforeend', msgBody);
            msgDiv.scrollTop = msgDiv.scrollHeight;
            msgCounter++;
        }
    });
}

const checkName = function () {
    if (myName.value == null || myName.value.length <= 0) return false;
    return true;
}

const checkGroupName = function () {
    if (groupName.value == null || groupName.value.length <= 0) return false;
    return true;
}

const checkBeforeJoin = function () {
    return (checkName() && checkGroupName());
}


const joinGroup = function () {
    if (checkBeforeJoin()) {
        loginSec.classList.add('d-none');
        chatSec.classList.remove('d-none');
        groupNameP.innerText = groupName.value;
        subscribeChannel(groupName.value);
        timer = setInterval(function () {
            count--;
            timerP.innerText = `You will logout after ${count} sec`
            if (count === 0) {
                clearInterval(timer);
                logout();
            }
        }, 1000);
    } else {
        alert('some Data missing!!');
    }

}

const logout = function () {
    loginSec.classList.remove('d-none');
    chatSec.classList.add('d-none');
    count = 60;
    timerP.innerText = `You will logout after 60 sec`;
    msgDiv.innerHTML =
        `
            <div class="msgBody d-flex flex-row justify-content-center mb-3">
                <div class="msgContent d-flex flex-row p-2 justify-content-center">
                   <p>No Message yet</p>
                </div>
            </div>
            `;
    clearInterval(timer);
    pusher.unsubscribe(groupName.value);
    groupName.value = '';
    myName.value = '';
    msgCounter = 0;
}


const getMD5 = function (body) {
    return CryptoJS.MD5(JSON.stringify(body));
}

const getAuthSignature = function (md5, timeStamp) {
    return CryptoJS.HmacSHA256(`POST\n/apps/1258676/events\nauth_key=8783cde87284422cc978&auth_timestamp=${timeStamp}&auth_version=1.0&body_md5=${md5}`, "4863e6758db3f3075c2c");
}

let sendMessageToServer = async function (message, sender) {
    let body = { data: `{"message":"${message}", "sender":"${sender}"}`, name: "my-event", channel: groupName.value }
    let timeStamp = Date.now() / 1000;
    let md5 = getMD5(body);
    let url = `https://cors.bridged.cc/https://api-mt1.pusher.com/apps/1258676/events?body_md5=${md5}&auth_version=1.0&auth_key=8783cde87284422cc978&auth_timestamp=${timeStamp}&auth_signature=${getAuthSignature(md5, timeStamp)}`;
    let req = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

const addMsg = function () {
    if (msgCounter === 0) {
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

    sendMessageToServer(msgArea.value, myName.value);
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

