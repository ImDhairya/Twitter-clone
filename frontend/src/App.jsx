import {useState} from "react";
import {Routes, Route} from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import Feed from "./components/Feed";
import Profile from "./components/Profile";
import {Toaster} from "react-hot-toast";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={<Home />}
        >
          <Route
            path="/"
            element={<Feed />}
          />

          <Route
            path="/profile/:id"
            element={<Profile />}
          />
        </Route>
        <Route
          path="/login"
          element={<Login />}
        />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
