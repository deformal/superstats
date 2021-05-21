/* eslint-disable eqeqeq */
import React from "react";
import { datafetcher } from "./fetcher.js";
import { useState, useEffect } from "react";
import Modals from "./Modals";
export default function Login() {
  let [state, setState] = useState({
    email: "",
    password: "",
    loggedIn: false,
    showError: false,
    message: "",
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
          loggedIn: true,
        };
      });
    } else {
      setState((prevValues) => {
        return {
          ...prevValues,
          showError: true,
          message: response.error,
        };
      });
    }
  };
  return (
    <div className="login">
      <h1 id="title">Login</h1>
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
      {state.showError ? <Modals message={state.message} /> : ""}
    </div>
  );
}
