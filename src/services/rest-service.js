import axios from "axios";
import { endpoint } from "../consts";

export const routes = {
  INDEX: () => `${endpoint}/`,
  GET_ROOMS: () => `${endpoint}/rooms/`,
  GET_ROOM: (roomId) => `${endpoint}/rooms/${roomId}/`,
  GET_MESSAGES: (roomId) => `${endpoint}/rooms/${roomId}/messages/`,
  GET_MESSAGES_PAGED: (roomId, offset, count) =>
    `${endpoint}/rooms/${roomId}/messages/${offset}/${count}`,
  GET_MESSAGES_COUNT: (roomId) => `${endpoint}/rooms/${roomId}/messageCount`,
};

// export const getRoom = (roomId) => {
//   let room = {};
//   axios
//     .get(routes.GET_ROOM(roomId))
//     .then((response) => (room = response.data))
//     .catch((error) => console.log(error.response.statusText));

//   return room;
// };

// export const getRooms = () => {
//   let rooms = [];
//   axios
//     .get(routes.GET_ROOMS)
//     .then((response) => (rooms = response.data))
//     .catch((error) => console.log(error.response.statusText));
//   return rooms;
// };

export const GET_MessagesPaged = async (roomId, offset, count) => {
  return await axios.get(routes.GET_MESSAGES_PAGED(roomId, offset, count));
};

export const GET_MessagesCount = async (roomId) => {
  return await axios.get(routes.GET_MESSAGES_COUNT(roomId));
};

export default endpoint;
