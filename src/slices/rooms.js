import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  rooms: {},
};

const roomsSlice = createSlice({
  name: "rooms",
  initialState,
  reducers: {
    setRooms: (state, { payload }) => {
      state.rooms = payload;
    },
    deleteRoom: (state, { payload }) => {
      let new_state = {};
      for (const [id, room] of Object.entries(state.rooms)) {
        if (id !== payload) new_state[id] = room;
      }
      state.rooms = new_state;
    },
    updateRoom: (state, { payload }) => {
      state.rooms = { ...state.rooms, ...payload };
    },
  },
});

export const { setRooms, deleteRoom, updateRoom } = roomsSlice.actions;

export const roomsSelector = (state) => state.rooms;
export default roomsSlice.reducer;
