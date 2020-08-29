import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  users: [],
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers: (state, { payload }) => {
      state.users = payload;
    },
    addUser: (state, { payload }) => {
      state.users = [...state.users, payload];
    },
    deleteUser: (state, { payload }) => {
      state.users = state.users.filter((u) => u.id !== payload);
    },
    updateUser: (state, { payload }) => {
      state.users = state.users.map((u) => (u.id === payload.id ? payload : u));
    },
  },
});

export const { setUsers, addUser, deleteUser, updateUser } = usersSlice.actions;

export const usersSelector = (state) => state.users;
export default usersSlice.reducer;
