import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Searchform(props) {
  const navigate = useNavigate();
  const [results, setResults] = useState([]);
  const [credentials, setCredentials] = useState({
    keyward: "",
    dateFrom: "",
    dateto: "",
  });
  const onChange = (e) => {
    setCredentials({...credentials, [e.target.name]: e.target.value});
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    let url = 'http://localhost:5000/api/car/keyward';
    let data = await fetch(url, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        keyward: credentials.keyward,
        dateFrom: credentials.dateFrom,
        dateto: credentials.dateto
      })
    });
    let json = await data.json();
    setResults(json.results);
    if(json.success){
      props.findFun(json.results);
      navigate('/find',{Find: json.results});
    }
    else{
      alert("Car not availbe")
    }
  }

  return (
    <div className="container mt-4">
      <form onSubmit={handleSubmit} action="/find">
        <div className="row">
          <div className="col-7">
            <input
              type="text"
              className="form-control"
              id="keyward"
              name="keyward"
              onChange={onChange}
              placeholder="Search"
            />
            <label className="form-label" htmlFor="search">
              Find
            </label>
          </div>
          <div className="col">
            <input
              type="date"
              className="form-control"
              id="dateFrom"
              name="dateFrom"
              onChange={onChange}
            />
            <label className="form-label" htmlFor="dateFrom">
              From
            </label>
          </div>
          <div className="col">
            <input
              type="date"
              className="form-control"
              id="dateto"
              name="dateto"
              onChange={onChange}
              placeholder="Last name"
            />
            <label className="form-label" htmlFor="dateto">
              To
            </label>
          </div>
          <div className="col-1">
            {/* <Link to='/find'> */}
            <input
              type="submit"
              className="form-control btn btn-warning"
              placeholder="Last name"
            />
            {/* </Link> */}
          </div>
        </div>
      </form>
    </div>
  );
}

export default Searchform;
