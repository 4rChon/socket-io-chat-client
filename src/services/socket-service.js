import socketIOClient from "socket.io-client";
import endpoint from "./rest-service";
const socket = socketIOClient(endpoint, { secure: true });
export default socket;
