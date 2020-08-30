import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useDispatch } from "react-redux";

import { deleteRoom, updateRoom, setRooms } from "./slices/rooms";
import { updateUser, addUser, deleteUser, setUsers } from "./slices/users";
import { setId, setNick, setRoomId } from "./slices/client";
import { addMessage, fetchMessages } from "./slices/messages";

import { Response, Request, RequestType } from "./enums";
import { ChatPage, UserPage, RoomPage } from "./pages";

import socket from "./socket";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    socket.on(Response.SET_ROOM, (id) => {
      dispatch(setRoomId(id));
      dispatch(fetchMessages(id, 30));
    });

    return () => {
      socket.removeListener(Response.SET_ROOM);
    };
  }, [dispatch]);

  useEffect(() => {
    socket.on(Response.GET_USERS, (userList) => dispatch(setUsers(userList)));
    socket.on(Response.ADD_USER, (user) => dispatch(addUser(user)));
    socket.on(Response.DELETE_USER, (id) => dispatch(deleteUser(id)));
    socket.on(Response.UPDATE_USER, (user) => dispatch(updateUser(user)));

    socket.on(Response.GET_ROOMS, (roomSet) => dispatch(setRooms(roomSet)));
    socket.on(Response.UPDATE_ROOM, (room) => dispatch(updateRoom(room)));
    socket.on(Response.DELETE_ROOM, (id) => dispatch(deleteRoom(id)));

    socket.on(Response.SET_ID, (id) => dispatch(setId(id)));
    socket.on(Response.SET_NICK, (nick) => dispatch(setNick(nick)));

    socket.on(Response.MESSAGE, (data) => {
      dispatch(addMessage(data));
    });

    socket.emit(RequestType.GET, Request.GET_USERS);
    socket.emit(RequestType.GET, Request.GET_ROOMS);

    return () => {
      socket.disconnect();
    };
  }, [dispatch]);
  return (
    <div className="page-root">
      <Router>
        <Switch>
          <Route exact path="/" component={ChatPage} />
          <Route exact path="/users" component={UserPage} />
          <Route exact path="/rooms" component={RoomPage} />
          <Redirect to="/" />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
