import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import "./index.css";
import {Provider} from "react-redux";
import {store} from "./redux/store.js";
import {PersistGate} from "redux-persist/integration/react";
// import persistStore from "redux-persist";
import persistStore from "redux-persist/es/persistStore.js";
let persistor = persistStore(store);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate
          loading={null}
          persistor={persistor}
        >
          <App />
        </PersistGate>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
