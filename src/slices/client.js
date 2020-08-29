import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  id: "",
  nick: "",
  roomId: "",
};

const clientSlice = createSlice({
  name: "client",
  initialState,
  reducers: {
    setNick: (state, { payload }) => {
      state.nick = payload;
    },
    setRoomId: (state, { payload }) => {
      state.roomId = payload;
    },
    setId: (state, { payload }) => {
      state.id = payload;
    },
  },
});

export const { setId, setNick, setRoomId } = clientSlice.actions;
export const clientSelector = (state) => state.client;
export default clientSlice.reducer;
