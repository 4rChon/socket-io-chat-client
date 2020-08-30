import { createSlice } from "@reduxjs/toolkit";
import { GET_MessagesPaged, GET_MessagesCount } from "../services/rest-service";

const maxMessages = 100;
const requestSize = 20;

export const initialState = {
  messages: [],
  loading: true,
  hasErrors: false,
  newMessage: false,
  offset: 0,
  maxRoomMessages: 0,
};

const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    setMaxRoomMessages: (state, { payload }) => {
      state.maxRoomMessages = payload.messageCount;
    },
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
    getMessagesSuccess: (state, { payload }) => {
      state.offset = 0;
      state.messages = payload;
      state.loading = false;
      state.hasErrors = false;
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
      state.hasErrors = false;
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
    },
    getMessagesFailure: (state) => {
      state.loading = false;
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
  getMessagesSuccess,
  getMessagesFailure,
  setMaxRoomMessages,
  appendMessagesSuccess,
  prependMessagesSuccess,
} = messagesSlice.actions;
export const messagesSelector = (state) => state.messages;
export default messagesSlice.reducer;

export function prevMessages(roomId, offset, count) {
  return async (dispatch) => {
    const countResponse = await GET_MessagesCount(roomId);
    if (countResponse.data.messageCount <= offset + count) {
      return;
    }
    await dispatch(getMessages());
    try {
      const response = await GET_MessagesPaged(
        roomId,
        offset + count,
        requestSize
      );
      return dispatch(prependMessagesSuccess(response.data));
    } catch (err) {
      return dispatch(getMessagesFailure());
    }
  };
}

export function nextMessages(roomId, offset) {
  return async (dispatch) => {
    if (offset === 0) {
      return;
    }
    const countResponse = await GET_MessagesCount(roomId);
    await dispatch(setMaxRoomMessages(countResponse.data));
    await dispatch(getMessages());
    try {
      const response = await GET_MessagesPaged(
        roomId,
        Math.max(offset - requestSize, 0),
        Math.min(requestSize, offset)
      );
      return dispatch(appendMessagesSuccess(response.data));
    } catch (err) {
      return dispatch(getMessagesFailure());
    }
  };
}

export function fetchMessages(roomId, count = maxMessages) {
  return async (dispatch) => {
    try {
      const countResponse = await GET_MessagesCount(roomId);
      await dispatch(setMaxRoomMessages(countResponse.data));
      await dispatch(getMessages());
      try {
        const response = await GET_MessagesPaged(roomId, 0, count);
        return dispatch(getMessagesSuccess(response.data));
      } catch (error) {
        return dispatch(getMessagesFailure());
      }
    } catch (err) {
      return dispatch(setMaxRoomMessages({ messageCount: 0 }));
    }
  };
}
