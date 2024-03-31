import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import {USER_API_END_POINT} from "../utils/constant";
import toast from "react-hot-toast";
import {useDispatch} from "react-redux";
import {getUser} from "../redux/userSlice";

function Login() {
  const [logged, setLogged] = useState(false);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (logged) {
      try {
        const res = await axios.post(
          `${USER_API_END_POINT}login`,
          {
            email,
            password,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        // console.log(res);
        dispatch(getUser(res?.data?.user));
        if (res.data.success) {
          navigate("/");
          setLogged(true);
          toast.success(res.data.message);
        }
      } catch (error) {
        toast.success(error.response.data.message);
        console.log(error);
      }
    } else {
      //signup
      try {
        const res = await axios.post(
          `${USER_API_END_POINT}register`,
          {
            name,
            email,
            username,
            password,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        if (res.data.success) {
          // navigate("/login");
          toast.success(res.data.message);
        }
      } catch (error) {
        toast.success(error.response.data.message);
        console.log(error);
      }
    }
  };
  function handleLogged() {
    setLogged(!logged);
  }

  return (
    <div className=" flex justify-center items-center h-screen">
      <div className=" flex justify-center items-center content-between ">
        <div>
          <img
            className=" h-[650px] w-[650px] "
            src="https://img.freepik.com/free-vector/twitter-new-2023-x-logo-white-background-vector_1017-45422.jpg?size=338&ext=jpg&ga=GA1.1.2082370165.1711238400&semt=ais"
            alt=""
          />
        </div>
        <div className=" ">
          <h1 className=" text-5xl font-medium">Happening now.</h1>
          <h3 className=" font-bold  my-2"> {logged ? "Login" : "Signup"}</h3>
          <div className=" flex flex-col">
            <form
              action=""
              onSubmit={handleSubmit}
              className=" flex flex-col"
            >
              {logged ? (
                <div className=" flex flex-col">
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className=" border-2 rounded-xl px-2 text-sm p-1 w-[300px] border-black"
                    type="text"
                    placeholder="Email"
                  />
                  <input
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    className=" my-2 border-2 rounded-xl px-2 text-sm p-1 w-[300px] border-black"
                    placeholder="Password"
                  />
                  <button
                    type="submit"
                    className=" my-2 border-2 bg-blue-500 text-white py-1.5 rounded-xl px-2 text-sm p-1 w-[300px] border-blue-500"
                  >
                    Login
                  </button>
                </div>
              ) : (
                <div className=" flex flex-col">
                  <input
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    className=" my-2 border-2 rounded-xl px-2 text-sm p-1 w-[300px] border-black"
                    placeholder="Name"
                  />
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className=" my-1 border-2 rounded-xl px-2 text-sm p-1 w-[300px] border-black"
                    placeholder="Username"
                  />
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className=" my-1 border-2 rounded-xl px-2 text-sm p-1 w-[300px] border-black"
                    placeholder="Email"
                  />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className=" my-1 border-2 rounded-xl px-2 text-sm p-1 w-[300px] border-black"
                    placeholder="Password"
                  />
                  <button
                    type="submit"
                    className=" my-2 border-2 bg-blue-500 text-white py-1.5 rounded-xl px-2 text-sm p-1 w-[300px] border-blue-500"
                  >
                    Create Account
                  </button>
                </div>
              )}
            </form>
            <div>
              {logged ? "Do not have an account?" : "Already have an account?"}{" "}
              <Link
                onClick={handleLogged}
                className=" text-blue-700 font-semibold"
              >
                {" "}
                {logged ? "Signup" : "Login"}{" "}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
