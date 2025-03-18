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
import NotifyProvider from "./components/common/notify/NotifyProvider.jsx";

const store = configureStore();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <MantineProvider theme={themeConfig}>
        <NotifyProvider>
          <App />
        </NotifyProvider>
      </MantineProvider>
    </Provider>
  </React.StrictMode>
);
