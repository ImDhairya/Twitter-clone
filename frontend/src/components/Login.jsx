import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";

function Login() {
  const [logged, setLogged] = useState(false);

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
              className=" flex flex-col"
            >
              {logged ? (
                <div className=" flex flex-col">
                  <input
                    className=" border-2 rounded-xl px-2 text-sm p-1 w-[300px] border-black"
                    type="text"
                    placeholder="Email"
                  />
                  <input
                    type="text"
                    className=" my-2 border-2 rounded-xl px-2 text-sm p-1 w-[300px] border-black"
                    placeholder="Password"
                  />
                  <button className=" my-2 border-2 bg-blue-500 text-white py-1.5 rounded-xl px-2 text-sm p-1 w-[300px] border-blue-500">
                    Login
                  </button>
                </div>
              ) : (
                <div className=" flex flex-col">
                  <input
                    type="text"
                    className=" my-2 border-2 rounded-xl px-2 text-sm p-1 w-[300px] border-black"
                    placeholder="Name"
                  />
                  <input
                    type="text"
                    className=" my-1 border-2 rounded-xl px-2 text-sm p-1 w-[300px] border-black"
                    placeholder="Username"
                  />
                  <input
                    type="text"
                    className=" my-1 border-2 rounded-xl px-2 text-sm p-1 w-[300px] border-black"
                    placeholder="Email"
                  />
                  <input
                    type="text"
                    className=" my-1 border-2 rounded-xl px-2 text-sm p-1 w-[300px] border-black"
                    placeholder="Password"
                  />
                  <button className=" my-2 border-2 bg-blue-500 text-white py-1.5 rounded-xl px-2 text-sm p-1 w-[300px] border-blue-500">
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
