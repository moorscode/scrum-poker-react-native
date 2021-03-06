import io from 'socket.io-client';

let ENDPOINT = "https://scrum.jipmoors.nl/pokers";
if ( __DEV__ ) {
    ENDPOINT = "ws://192.168.1.17:3000/pokers";
}

const socket = io(ENDPOINT, {autoConnect: true, reconnection: true, upgrade: true});
socket.connect();

export default socket;
