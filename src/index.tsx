import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ConfigProvider, theme } from "antd";
import { BrowserRouter } from "react-router-dom";
import "antd/dist/reset.css";
import MessageProvider from "contexts/MessageContext";
import AuthProvider from "contexts/AuthContext";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ConfigProvider
        theme={{
          algorithm: theme.defaultAlgorithm,
          token: {
            colorPrimary: "#0EA5E9",
          },
        }}
      >
        <AuthProvider>
          <MessageProvider>
            <App />
          </MessageProvider>
        </AuthProvider>
      </ConfigProvider>
    </BrowserRouter>
  </React.StrictMode>
);
