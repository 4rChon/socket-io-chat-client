import { createSlice } from "@reduxjs/toolkit";
import { routes } from "../API";
import axios from "axios";

const maxMessages = 40;
const requestSize = 10;

export const initialState = {
  messages: [],
  loading: true,
  loadingTop: false,
  loadingBot: false,
  hasErrors: false,
  newMessage: false,
  offset: 0,
};

const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    readMessage: (state) => {
      state.newMessage = false;
    },
    addMessage: (state, { payload }) => {
      state.newMessage = true;
      if (state.offset !== 0) {
        return;
      }
      if (state.messages.length === maxMessages) {
        state.messages = [...state.messages.slice(1), payload];
      } else {
        state.messages = [...state.messages, payload];
      }
    },
    getMessages: (state) => {
      state.loading = true;
    },
    getMessagesTop: (state) => {
      state.loadingTop = true;
      state.loading = true;
    },
    getMessagesBot: (state) => {
      state.loadingBot = true;
      state.loading = true;
    },
    getMessagesSuccess: (state, { payload }) => {
      state.messages = payload;
      state.loading = false;
      state.hasErrors = false;
      state.newMessage = true;
    },
    appendMessagesSuccess: (state, { payload }) => {
      const len = state.messages.length;
      const p_len = payload.length;

      state.messages = [
        ...state.messages.slice(len - (maxMessages - p_len)),
        ...payload,
      ];
      state.offset = Math.max(state.offset - payload.length, 0);
      state.loading = false;
      state.loadingBot = false;
      state.hasErrors = false;
      state.newMessage = false;
    },
    prependMessagesSuccess: (state, { payload }) => {
      const len = state.messages.length;
      const p_len = payload.length;
      state.messages = [
        ...payload,
        ...state.messages.slice(0, maxMessages - p_len),
      ];

      if (len === maxMessages) {
        state.offset += payload.length;
      } else if (len > maxMessages - p_len) {
        state.offset += len + p_len - maxMessages;
      }
      state.loading = false;
      state.hasErrors = false;
      state.newMessage = false;
      state.loadingTop = false;
    },
    getMessagesFailure: (state) => {
      state.loading = false;
      state.loadingTop = false;
      state.loadingBot = false;
      state.hasErrors = true;
    },
    updateOffset: (state, { payload }) => {
      state.offset = payload;
    },
  },
});

export const {
  readMessage,
  addMessage,
  getMessages,
  getMessagesTop,
  getMessagesBot,
  getMessagesSuccess,
  getMessagesFailure,
  appendMessagesSuccess,
  prependMessagesSuccess,
} = messagesSlice.actions;
export const messagesSelector = (state) => state.messages;
export default messagesSlice.reducer;

export function prevMessages(roomId, offset, count) {
  return async (dispatch) => {
    dispatch(getMessagesTop());
    return axios
      .get(routes.GET_MESSAGES_PAGED(roomId, offset + count, requestSize))
      .then((response) => dispatch(prependMessagesSuccess(response.data)))
      .catch((error) => dispatch(getMessagesFailure()));
  };
}

export function nextMessages(roomId, offset) {
  return async (dispatch) => {
    dispatch(getMessagesBot());
    return axios
      .get(
        routes.GET_MESSAGES_PAGED(
          roomId,
          Math.max(offset - requestSize, 0),
          Math.min(requestSize, offset)
        )
      )
      .then((response) => dispatch(appendMessagesSuccess(response.data)))
      .catch((error) => dispatch(getMessagesFailure()));
  };
}

export function fetchMessages(roomId) {
  return async (dispatch) => {
    dispatch(getMessages());
    return axios
      .get(routes.GET_MESSAGES(roomId))
      .then((response) => dispatch(getMessagesSuccess(response.data)))
      .catch((error) => dispatch(getMessagesFailure()));
  };
}
