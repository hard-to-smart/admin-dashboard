import { io } from 'socket.io-client';

const socket = io('http://localhost:8080'); // Match the URL where your server is running

export default socket;