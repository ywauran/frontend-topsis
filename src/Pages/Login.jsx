import React, { useState } from "react";
import { app } from "../config";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = getAuth(app);
  let navigate = useNavigate();
  const handlerLoginSubmit = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        navigate("/pages/add-criteria");
        sessionStorage.setItem(
          "Auth Token",
          userCredential._tokenResponse.refreshToken
        );
        // console.log(`success => ${user}`);
        // ...
        Swal.fire("Welcome");
      })
      .catch((error) => {
        if (error.code === "auth/wrong-password") {
          Swal.fire("Wrong Password", "LALALALA", "error");
        }

        if (error.code === "auth/user-not-found") {
          Swal.fire("Wrong Email", "LALALALA", "error");
        }

        if (error.code === "auth/invalid-email") {
          Swal.fire("Wrong Email", "LALALALA", "error");
        }

        console.log(error.code);

        // ..
      });
    // console.log(email);
    // console.log(password)
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg w-96">
        <h3 className="text-2xl font-bold text-first text-center">Login</h3>
        <form action="">
          <div className="">
            <div>
              <label htmlFor="email" className="label__input">
                Email
              </label>
              <input
                type="text"
                id="email"
                placeholder="harkewauran"
                onChange={(e) => setEmail(e.target.value)}
                className="input"
              />
            </div>
            <div className="mt-4">
              <label htmlFor="password" className="label__input">
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="******"
                onChange={(e) => setPassword(e.target.value)}
                className="input"
              />
            </div>
            <div className="mt-6">
              <button
                onClick={handlerLoginSubmit}
                className="button__primary w-full"
              >
                Masuk
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
