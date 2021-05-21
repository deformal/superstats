/* eslint-disable eqeqeq */
import React from "react";
import { datafetcher } from "./fetcher.js";
import { useState, useEffect } from "react";
export default function Login() {
  let [state, setState] = useState({
    email: "",
    password: "",
    loggedIn: false,
  });

  useEffect(() => {
    state.loggedIn
      ? console.log("The user is logged in ")
      : console.log("The user is not logged in");
  });

  const changeHandler = (event) => {
    event.preventDefault();
    let value = event.target.value;
    let name = event.target.name;
    setState((prevValues) => {
      return {
        ...prevValues,
        [name]: value,
      };
    });
  };

  const showMessage = ({ type, message }) => {
    const errorSlot = document.getElementById("error");
    errorSlot.innerText = message;
    errorSlot.className = type;
    errorSlot.style.display = "block";
    setTimeout(() => {
      errorSlot.style.display = "none";
    }, 3000);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    const query = `query Loggerr($email:String! ,$password:String!) {
         login(email:$email,password:$password){
         email
         password
        }
      }`;
    const { email, password } = state;
    const response = await datafetcher(query, { email, password });
    if (response.status == 200) {
      setState((prevValues) => {
        return {
          ...prevValues,
          email: response.data.login.email,
          message: response.message,
          loggedIn: true,
        };
      });
      const message = response.message;
      const type = "success";
      showMessage({ message, type });
    } else {
      const message = response.error;
      const type = "error";
      showMessage({ message, type });
    }
  };
  return (
    <>
      <div className="login">
        <h1 id="title">Signup</h1>
        <form onSubmit={submitHandler}>
          <input
            type="text"
            placeholder="Email"
            name="email"
            autoComplete=""
            onChange={changeHandler}
          />
          <label htmlFor="password">
            A valid password will be minimun 8 characters, Uppsercase,lowercase
            and a number
          </label>
          <input
            type="password"
            placeholder="Password"
            name="password"
            autoComplete=""
            onChange={changeHandler}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
      <h5 id="error" className="">
        {}
      </h5>
    </>
  );
}
