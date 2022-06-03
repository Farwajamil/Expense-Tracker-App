
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const [name, setname] = useState("");
  const [password, setpassword] = useState("");
  const [formdata, setformdata] = useState([]);
  const entername = (event) => {
    setname(event.target.value);
  };
  const enterpassword = (event) => {
    setpassword(event.target.value);
  };
  async function enterform(event) {
    event.preventDefault();
    const obj = {
      name: name,
      password: password,
    };
    setformdata(obj);
    console.log(obj);
    setname("");
    setpassword("");
    let result = await fetch("https://expense-kamran.herokuapp.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(obj),
    });
    result = await result.json();
    console.log("result", result);
    alert("successfully login");
    if(result)
    {
      localStorage.setItem("user-info", JSON.stringify(result));
      navigate("/header");
    }
  }
  return (
  <div className="front">
      <div className="login">
        <form className="style-login" onSubmit={enterform}>
          <h1>Login page</h1>
          <label>Enter userName</label>
          <input
            type="text"
            name="name"
            required
            placeholder="Enter Name"
            value={name}
            onChange={entername}
          />
          <label>Enter password</label>
          <input
            type="password"
            name="password"
            placeholder="enter password"
            required
            value={password}
            onChange={enterpassword}
          />
          <button className="act">Login</button>
          <br />
          <div>
            Have not registered{" "}
            <Link to="/register" className="link">
              Register
            </Link>
          </div>
        </form>
      </div>
      </div>
  );
}
export default Login;
