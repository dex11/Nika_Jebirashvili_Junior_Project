let videoElement;

let peer;

window.onload = function(){
    peer = new Peer("car", {
        host: '192.168.43.103',
        port: 9002,
        path: '/videostream'
    })
    sendConnection()
}

let sendingStream;
function sendConnection(){
    navigator.getUserMedia({
        audio:true,
        video: true
    }, (stream) => {
        console.log("should be sending signal")
        sendingStream = stream;
        const call = peer.call("controller", stream)
        call.on('stream', (receivingStream) =>{
            console.log("should be receiving signal")
        })
    });
}

