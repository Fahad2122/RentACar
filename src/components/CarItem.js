import React from 'react'
import { Link } from 'react-router-dom';

function CarItem(props) {
  const imageName = require('./RentImages'+props.image)
  const clickHandler = ()=>{
    let id = document.getElementById(props.reg_no).innerHTML;
    props.reg(id);
    id = document.getElementById(props.Name).innerHTML;
    props._name(id);
    id = document.getElementById(props.model).innerHTML;
    props.mod(id);
    id = document.getElementById(props.image).innerHTML;
    props.ima(id);
    id = document.getElementById(props.price).innerHTML;
    props.pri(id);
    // id = document.getElementById(props.city).innerHTML;
    // console.log(props.city);
    props.cit(id);
  }
  return (
    <div>
      <Link to="/carview" onClick={clickHandler} style={{textDecoration: 'none'}}><div className="card bg-warning" >
        <img src={imageName} className="card-img-top" alt="..."/>
        <p id={props.image} style={{display: 'none'}}>{props.image}</p>
        <p id={props.reg_no} style={{display: 'none'}}>{props.reg_no}</p>
        <p id={props.price} style={{display: 'none'}}>{props.price}</p>
        <div className="card-body">
            <h4 className="card-title" style={{color: 'red'}} id={props.Name} value={props.Name}>{props.Name}</h4>
            <h6 id={props.model} style={{color: 'white'}}>{props.model}</h6>
            {/* <p className="card-text">{props.overview}</p> */}
            {/* <a href={`https://image.tmdb.org/t/p/w500/${props.path}`} className="btn btn-danger" target='_blank' rel="noreferrer">Watch Online</a> */}
        </div>
    </div></Link>
    </div>
  )
}

export default CarItem