import React from "react";
import ReactDOM from "react-dom/client";
import { MantineProvider } from "@mantine/core";

import { Provider } from "react-redux";
import "@mantine/core/styles.css";

import App from "./App.jsx";
import "./index.css";
import "./assets/fonts/font.css";
import themeConfig from "./themeConfig";
import configureStore from "./redux/configureStore";

const store = configureStore();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <MantineProvider theme={themeConfig}>
        <App />
      </MantineProvider>
    </Provider>
  </React.StrictMode>
);
