import React from "react";
import { render } from "react-dom";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

import App from "./App";
import rootReducer from "./slices";
import "./index.css";
import "./components/Chat/chat.css";
import "./components/Tabs/tabs.css";
import "./components/Buttons/buttons.css";
import "./pages/pages.css";

const store = configureStore({ reducer: rootReducer });

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
