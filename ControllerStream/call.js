let videoElement;
let peer;

window.onload =function (){
    console.log("initialized")
    videoElement = document.getElementById("video_element")
    peer = new Peer("controller", {
        host: '192.168.43.103', //can be any server api
        port: 9002,
        path: '/videostream'
    })
    recieveConnection()
}

let receivingStream;
function recieveConnection(){
    peer.on('call', (call) => {
        navigator.getUserMedia({
            audio:true,
            video: true
        }, (stream) => {
            
            receivingStream = stream
            call.answer(stream);
            call.on('stream', (sendingStream) => {
                videoElement.srcObject = sendingStream;
            })
        })
    })
}

const database = firebase.database();
let validPress = false;

const updateDB = (commandValue) =>{
    database.ref().set({
        command: commandValue
    });
    validPress = true;
}

document.addEventListener('keypress', (event) => {
    switch (event.key){
        case 'w': 
            updateDB('w')
            break;
        case 's': 
            updateDB('s')
            break;
        case 'a': 
            updateDB('a')
            break;
        case 'd': 
            updateDB('d')
            break;
    }
}, false);

document.addEventListener('keyup', (event) => {
    if(validPress) updateDB('h')
}, false);


