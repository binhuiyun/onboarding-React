import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import store from "./redux/store";
import { jwtDecode } from "jwt-decode";
import { Provider } from "react-redux";

import { setCurrentUser } from "./redux/userSlice.js";

// if (localStorage.getItem("token")) {
//   store.dispatch(setCurrentUser(jwtDecode(localStorage.getItem("token"))));
//  console.log("token found");


  
// }

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
