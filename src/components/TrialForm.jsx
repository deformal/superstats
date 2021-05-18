import React from "react";
import { datafetcher } from "../fetcher";
import { useState } from "react";
export default function TrialForm() {
  let [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
  });
  function changeHandler(event) {
    event.preventDefault();
    let value = event.target.value;
    let name = event.target.name;
    setUserDetails((prevValues) => {
      return {
        ...prevValues,
        [name]: value,
      };
    });
  }

  async function submitHandler(event) {
    event.preventDefault();
    const query = `query Signuper($email:String! ,$pass: String!) {
         signup(email:$email,password:$pass){
         email
         password
        }
      }`;
    const response = await datafetcher(query, userDetails);
    const body = JSON.stringify(response);
    const result = await JSON.parse(body);
    if (result.data) console.log(result.data);
    console.log(result.errors[0].message); //errors path
  }

  return (
    <div>
      <form onSubmit={submitHandler}>
        <input
          type="text"
          placeholder="Email"
          name="email"
          onChange={changeHandler}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          onChange={changeHandler}
        />
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
