import React from 'react'
import  Cars from './Cars'
import Searchform from './Searchform'
// import TopImage from './TopImage'

export default function Home(props) {
  return (
    <div className='container'>
        <Searchform findFun={props.findFun}/>
        <Cars link={props.link} city_id={props.city_id} reg={props.reg} _name={props._name} model={props.model} image={props.image} price={props.price} city={props.city}/>
      {/* <TopImage /> */}
      {/* <Cars link={props.link} name={props.name} watchFunction={props.watchFunction} descFunction={props.descFunction} progressFunction={props.progressFunction} /> */}
    </div>
  )
}
