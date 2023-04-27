import React, { useState } from 'react'
import CarItem from './CarItem';

function Find(props) {
    // const [results, setResults] = useState([]);
    console.log(props.Find)
    // setResults(props.Find);
    // alert(props.Find)
  return (
    <div className='container'>
      <div className="row">
                {props.Find && props.Find.map((element)=> {
                    return <div className="col-md-4 my-5" key={element.Reg_No}>
                        <CarItem reg_no={element.Reg_No} Name={element.car_Name} model={element.model} image={element.Image} city={element.city_id} reg={props.reg} _name={props._name} mod={props.model} ima={props.image} cit={props.city} />
                    </div>
                })}
        </div>
    </div>
  )
}

export default Find
