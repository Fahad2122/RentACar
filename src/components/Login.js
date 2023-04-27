import React, { useState } from "react";
import logo from "../cLogo2.png"

export default function Login(props) {

  const [credentials, setCredentials] = useState({email: "", password: ""});
  const onChange = (e) => {
    setCredentials({...credentials, [e.target.name]: e.target.value});
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    let url = 'http://localhost:5000/api/user/login';
    const data = await fetch(url, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({email: credentials.email, password: credentials.password})
    });
    const json = await data.json();
    console.log(json);
    if(json.success){
      props.logFun(json.user_id);
      alert("Login successfull")
    }
    else{
      alert("Invalid Credentials")
    }
  }

  return (
    <section className="vh-100" style={{ backgroundColor: "#ffff99" }}>
      <div className="container py-5">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-13 col-md-8 col-lg-6 col-xl-5">
            <div
              className="card shadow-2-strong"
              style={{ borderRadius: "1rem" }}
            >
              <div className="card-body p-5 text-center container">
              <img src={logo} className="rounded mx-auto d-block container" alt="Logo"/>
              
                <h3 className="mb-5">Login</h3>
                <form onSubmit={handleSubmit}>
                <div className="form-outline mb-4">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={credentials.email}
                    onChange={onChange}
                    className="form-control form-control-lg"
                  />
                  <label className="form-label" htmlFor="email">
                    Email
                  </label>
                </div>

                <div className="form-outline mb-4">
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={credentials.password}
                    onChange={onChange}
                    className="form-control form-control-lg"
                  />
                  <label className="form-label" htmlFor="password">
                    Password
                  </label>
                </div>

                <div className="form-check d-flex justify-content-start mb-4">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="form1Example3"
                  />
                  <label className="form-check-label" htmlFor="form1Example3">
                    {" "}
                    Remember password{" "}
                  </label>
                </div>

                <button
                  className="btn btn-warning btn-lg btn-block"
                  type="submit"
                >
                  Login
                </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
