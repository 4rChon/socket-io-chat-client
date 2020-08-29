import socketIOClient from "socket.io-client";
import endpoint from "./API";
const socket = socketIOClient(endpoint, { secure: true });
export default socket;
