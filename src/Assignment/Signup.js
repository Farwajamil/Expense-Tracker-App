import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./Signup.css";

function Signup() {
  const navigate = useNavigate();
  const [name, setuserna] = useState("");
  const [password, setuserpass] = useState("");
  const [subform, setsubform] = useState([]);
  const Namehandler = (event) => {
    setuserna(event.target.value);
  };
  const Passwordhandler = (event) => {
    setuserpass(event.target.value);
  };

  async function Formhandler(event) {
    event.preventDefault();
    const obj = {
      name: name,
      password: password,
    };
    setsubform(obj);
    console.log(obj);
    setuserna("");
    setuserpass("");
    let result = await fetch(
      " https://expense-kamran.herokuapp.com/signup",
      {
        method: "POST",
        body: JSON.stringify(obj),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    result = await result.json();
    console.log("result", result);
    if (result) {
      localStorage.setItem("user-info", JSON.stringify(result));
      navigate("/");
    }
  }
  return (
    <div className="signup">
      <form className="styleform" onSubmit={Formhandler}>
        <h1>Registration form</h1>
        <label>Enter Name</label>
        <input
          type="text"
          name="name"
          required
          placeholder="enter name"
          value={name}
          onChange={Namehandler}
        />
      
        <label>Enter Password</label>
        <input
          type="password"
          name="password"
          required
          placeholder="enter password"
          minlength="7"
          value={password}
          onChange={Passwordhandler}
        />
        <button className="action">Submit</button>
        <br />
        <div>
          Already registered {" "}
          <Link to="/" className="lin">
            Login
          </Link>
        </div>
      </form>
    </div>
  );
}
export default Signup;
