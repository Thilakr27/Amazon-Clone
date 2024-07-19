import React from "react";
import ReactDOM from "react-dom/client";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick.css";
import "./index.css";
import { Provider } from "react-redux";
import firebaseConfig from "./firebase.config";
import { initializeApp } from "firebase/app";

import App from "./App";
import { store } from "./redux/Store";

// Initialize Firebase
initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
