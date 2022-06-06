import React, { useState, useEffect } from "react";
import "./Home.css";
import axios from "axios";
function Logout() {
  const [name, setitem] = useState("");
  const [amount, setamount] = useState("");
  const [amountType, settype] = useState("earning");
  const [val, setval] = useState();
  const [transid, settrans] = useState();
  const [fil, setfil] = useState("");
  const [isupdate, setisupdate] = useState(false);

  function addItem(event) {
    setitem(event.target.value);
  }
  function addAmount(event) {
    setamount(event.target.value);
  }
  let user = JSON.parse(localStorage.getItem("user-info"));
  console.log(user);
  const token = user[0].token;
  useEffect(() => {
    getUser();
  }, []);
  function getUser() {
    axios
      .get("https://expense-kamran.herokuapp.com/budget/get", {
        headers: {
          authorization: `${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response.data);
        setval(response.data);
        console.log(val);
      })
      .catch((err) => {
        console.log("UnAuthorized");
        console.log(err);
      });
  }
  async function accept(event) {
    event.preventDefault();
    const obj = {
      id: Math.random().toString,
      name: name,
      amount: amount,
      amountType: amountType,
    };
    if (name !== "" && amount > 0) {
      console.log(obj);
         let user = JSON.parse(localStorage.getItem("user-info"));
    console.log(user);
    const token = user[0].token;
    axios
      .post(
        "https://expense-kamran.herokuapp.com/budget/create",
        {
          name: name,
          amount: amount,
          amountType: amountType,
        },
        {
          headers: {
            authorization: `${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log(response);
        alert(response.data);
        getUser();
        console.log(token);
      })
      .catch((err) => {
        console.log("UnAuthorized");
        console.log(err);
      });
      setitem("");
      setamount("");
    } else {
      alert("plz enter positive amount");
    }
  }
  function handleadd(trans) {
    setisupdate(true);
    settrans(trans._id);
    setitem(trans.name);
    setamount(trans.amount);
    settype(trans.amountType);
  }
  const handleCancel = () => {
    getUser();
    setisupdate(false);
    setitem("");
    setamount("");
    settype("");
  };
  const update = (event) => {
    event.preventDefault();
    axios
      .patch(
        `https://expense-kamran.herokuapp.com/budget/update/${transid}`,
        {
          name,
          amount,
          amountType,
        },
        {
          headers: {
            authorization: `${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log(response);
        getUser();
        handleCancel();
        alert("Budget Updated Successfully");
      })
      .catch((err) => {
        console.log("UnAuthorized");
        console.log(err);
      });
  };
  const del = (trans) => {
    axios
      .delete(`https://expense-kamran.herokuapp.com/budget/delete/${trans}`, {
        headers: {
          authorization: `${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        getUser();
        alert("!----value is ssuccessfully delated ");
        console.log(response.data);
        console.log("DeleteBudget Response sent");
      })
      .catch((err) => {
        console.log("UnAuthorized");
        console.log(err);
      });
  };
  async function filterexpense() {
    await axios
      .get("https://expense-kamran.herokuapp.com/budget/get", {
        headers: {
          authorization: `${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response.data);
        let filterdata = [];
        filterdata = response.data.UserBudget.filter(
          (userBudget) => userBudget.amountType === "expense"
        );
        setval({
          UserBudget: filterdata,
        });
      });
  }
  async function filterearning() {
    await axios
      .get("https://expense-kamran.herokuapp.com/budget/get", {
        headers: {
          authorization: `${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response.data);
        let filterdata = [];
        filterdata = response.data.UserBudget.filter(
          (userBudget) => userBudget.amountType === "earning"
        );
        setval({
          UserBudget: filterdata,
        });
      });
  }
  function filtervalue() {
    getUser();
  }
  return (
    <React.Fragment>
      <form onSubmit={isupdate ? update : accept}>
        <div className="main">
          <h3 className="text-center text-white">
            Balance : ${val ? val.TotalBudget : ""}
          </h3>
          <h4 className="text-center text-success">
            Earning : ${val ? val.TotalEarnings : ""}
          </h4>
          <h4 className="text-center text-danger">
            Expense : ${val ? val.TotalExpense : ""}
          </h4>
          <h3 className="text-white">Add transaction</h3>
          <label className="text-white">Title</label>
          <input type="text" required value={name} onChange={addItem} />
          <br />
          <label className="text-white">Amount</label>
          <input type="number" required value={amount} onChange={addAmount} />
        </div>
        <div className="btradio1">
          <input
            type="radio"
            id="earning"
            name="amountType"
            value="earning"
            checked={amountType === "earning"}
            onChange={(event) => settype(event.target.value)}
          />
          <label htmlFor="earning">Earning</label>
        </div>
        <div className="btradio2">
          <input
            type="radio"
            id="expense"
            name="amountType"
            value="expense"
            checked={amountType === "expense"}
            onChange={(event) => settype(event.target.value)}
          />
          <label htmlFor="expense">Expense</label>
        </div>
        {isupdate ? (
          <div class="container ">
            <div class="col-md-12 text-center">
              <button
                className={`btn1 btn btn-success btn-lg active mr-1 `}
                onClick={update}
              >
                Update Transaction
              </button>
              <br />
              <button
                className={`btn1 btn btn-danger btn-lg active `}
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <button className="Button">Add</button>
        )}
      </form>
      <div>
        <ul className="list">
          <h1 className="text-center py-4 font-bold text-large text-white">
            History
          </h1>
          <div className={`btradio1 text-white $`}>
            <input
              type="radio"
              id="all"
              name="type"
              value="all"
              checked={fil === "all"}
              onChange={filtervalue}
            />
            <label htmlFor="earning">All</label>
          </div>
          <div className="btradio1">
            <input
              type="radio"
              id="earning"
              name="type"
              value="earning"
              checked={fil === "earning"}
              onChange={filterearning}
            />
            <label htmlFor="earning">Earning</label>
          </div>
          <div className="btradio2">
            <input
              type="radio"
              id="expense"
              name="type"
              value="expense"
              checked={fil === "expense"}
              onChange={filterexpense}
            />
            <label htmlFor="expense">Expense</label>
          </div>
          {val
            ? val.UserBudget.map((add, id) => (
                <li key={id}>
                  <span
                    className={`expense-item bg-white font-bold text-large margin-bottom-10px  ${
                      add.amountType === "earning"
                        ? "income-border"
                        : "expense-border"
                    }`}
                  >
                    {" "}
                    {add.name}
                    <span> {add.amount}</span>
                    <span> {add.amountType}</span>
                    <span>
                      {" "}
                      <button className="btn btn-success active" onClick={() => handleadd(add)}> update</button>
                      <button className="btn btn-danger active" onClick={() => del(add._id)}>Delete</button>
                    </span>
                  </span>
                </li>
              ))
            : ""}
        </ul>
      </div>
    </React.Fragment>
  );
}
export default Logout;
