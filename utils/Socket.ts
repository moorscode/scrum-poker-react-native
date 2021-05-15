import io from 'socket.io-client';

let ENDPOINT = "ws://scrum.jipmoors.nl/pokers";
if ( __DEV__ ) {
    ENDPOINT = "ws://192.168.1.17:3000/pokers";
}

const socket = io(ENDPOINT, {autoConnect: true, upgrade: true});
socket.connect();

export default socket;
