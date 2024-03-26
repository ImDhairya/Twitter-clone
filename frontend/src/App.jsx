import {useState} from "react";
import {Routes, Route} from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import Feed from "./components/Feed";
import Profile from "./components/Profile";

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
            path="/profile"
            element={<Profile />}
          />
        </Route>
        <Route
          path="/login"
          element={<Login />}
        />
      </Routes>
    </>
  );
}

export default App;
