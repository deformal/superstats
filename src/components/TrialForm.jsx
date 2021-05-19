import React from "react";
import { datafetcher } from "./fetcher.js";
import { useState, useEffect } from "react";
export default function TrialForm() {
  let [state, setState] = useState({
    email: "",
    password: "",
    loggedIn: "",
  });
  useEffect(() => {
    if (state.loggedIn)
      document.getElementById("title").innerText = state.email;
  });

  const messageShow = (message) => {
    document.getElementById("msg").innerText = message;
    setTimeout(() => {
      document.getElementById("msg").innerText = "";
    }, 5000);
  };

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
    if (response.status === 200) {
      setState((prevValues) => {
        return {
          ...prevValues,
          email: response.data.login.email,
          loggedIn: true,
        };
      });
      messageShow(`${response.message}`);
    }
    messageShow(`${response.error}`);
  };

  return (
    <div>
      <h1 id="title">Hello</h1>
      <form onSubmit={submitHandler}>
        <input
          type="text"
          placeholder="Email"
          name="email"
          autoComplete=""
          onChange={changeHandler}
        />
        <br />
        <label htmlFor="password">
          A valid password will be:- minimun 8 characters, Uppsercase,lowercase
          and a number
        </label>
        <br />
        <input
          type="password"
          placeholder="Password"
          name="password"
          autoComplete=""
          onChange={changeHandler}
        />
        <br />
        <button type="submit">Submit</button>
      </form>
      <h6 id="msg">{""}</h6>
    </div>
  );
}
