import { combineReducers } from "redux";
import clientReducer from "./client";
import usersReducer from "./users";
import roomsReducer from "./rooms";
import pagesReducer from "./pages";
import messagesReducer from "./messages";

const rootReducer = combineReducers({
  client: clientReducer,
  users: usersReducer,
  rooms: roomsReducer,
  pages: pagesReducer,
  messages: messagesReducer,
});

export default rootReducer;
export { clientSelector } from "./client";
export { usersSelector } from "./users";
export { roomsSelector } from "./rooms";
export { pagesSelector } from "./pages";
export { messagesSelector } from "./messages";
