import React, { useState } from 'react'

function CarView(props) {

  let price = props.price
  const imageName = require('./RentImages'+props.image)

  const [credentials, setCredentials] = useState({
    date_From: {},
    date_to: {}
  });
  const onChange = (e) => {
    setCredentials({...credentials, [e.target.name]: e.target.value});
  }

  const handleSubmit = async (e) => {
    let day1 = new Date(credentials.date_to)
    let day2 = new Date(credentials.date_From);
    const diffTime = Math.abs(day1 - day2);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const newPrice = price *diffDays;
    document.getElementById('price').innerHTML = diffDays + ' Day  ' + newPrice
    e.preventDefault();
    let url = 'http://localhost:5000/api/order/ordercar';
    const data = await fetch(url, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        Reg_No: props.reg,
        user_id: props.user_id,
        date_From: credentials.date_From,
        date_to: credentials.date_to,
        price: newPrice
      })
    });
    const json = await data.json();
    console.log(json);
    if(json.success){
      alert("Car Booked Your Total is:  " + newPrice + "  Kindly pay at our office")
    }
    else{
      alert("Car Already Booked on these dates")
    }
  }
  

  return (
    <div className='container mt-5'>
      <div className="row">
      <div className="col-8">
        <img src={imageName} className='p-5 img-fluid'alt="Image not loaded" />
      </div>
      <div className="col pt-5 bg-warning">
        <h3>{props._name}</h3>
        <h6>{props.model}</h6>
        <h4 className='mt-3 mb-5' id='price' style={{color: 'red'}}>1 Day {price}</h4>
        <form onSubmit={handleSubmit} >
        <div className="row">
        <div className="col">
            <input
              type="date"
              className="form-control"
              id="dateFrom"
              name="date_From"
              onChange={onChange}
              placeholder="Last name"
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
              name="date_to"
              onChange={onChange}
              placeholder="Last name"
            />
            <label className="form-label" htmlFor="dateto">
              To
            </label>
            </div>
            </div>
            <div className="row">
              <div className="col"></div>
              <div className="col">
            <input
              type="submit"
              className="form-control btn btn-dark my-5"
            />
            </div>
            <div className="col"></div>
            </div>
            </form>
      </div>
      </div>
     </div>
  )
}

export default CarView
