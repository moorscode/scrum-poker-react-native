import io from 'socket.io-client';

// const ENDPOINT = "ws://scrum.jipmoors.nl/pokers";
const ENDPOINT = "ws://192.168.1.17:3000/pokers";

const socket = io(ENDPOINT, {autoConnect: true, upgrade: true, transports: ['websocket']});
socket.connect();

export default socket;
