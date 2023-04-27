import React, { useState } from 'react';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Home from './components/Home';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from './components/Signup';
import Cars from './components/Cars';
import CarView from './components/CarView';
import Find from './components/Find';

function App() {

  const [reg, setReg] = useState('');
  const [name, setName] = useState('');
  const [model, setModel] = useState();
  const [image, setImage] = useState('');
  const [price, setPrice] = useState();
  const [city, setCity] = useState();

  const [find, setFind] = useState([]);
  const findFun = (value)=>{
    setFind(value);
  }

  const [log, setLog] = useState([]);
  const logFun = (value)=>{
    setLog(value);
  }

  const Reg_Function = (value) => {
    setReg(value);
  }
  const Name_Function = (value) => {
    setName(value);
  }
  const model_Function = (value) => {
    setModel(value);
  }
  const image_Function = (value) => {
    setImage(value);
  }
  const price_Function = (value) => {
    setPrice(value);
  }
  const city_Function = (value) => {
    setCity(value);
    console.log(name);
  }
  return (
    <>
      <BrowserRouter>
      <Navbar/>
      <Routes>

        <Route path="/" element={<Home key='cars' link="car/cars" findFun={findFun} reg={Reg_Function} _name={Name_Function} model={model_Function}  image={image_Function} price={price_Function} city={city_Function} />} />

        <Route exact path="/carview" element={<CarView key="Hello" user_id={log} reg={reg} _name={name} model={model} image={image} price={price} city={city}/>}/>

        <Route exact path='/cityKarachi' element={<Cars key='/cityKarachi' city="Karachi" link="car/city" city_id={1}/>}/>
        <Route exact path='/cityLahore' element={<Cars key='/cityLahore' city="Lahore" link="car/city" city_id={2}/>}/>
        <Route exact path='/cityGujranwala' element={<Cars key='/cityGujranwala' city="Gujranwala" link="car/city" city_id={3}/>}/>
        <Route exact path='/cityPeshawar' element={<Cars key='/cityPeshawar' city="Peshawar" link="car/city" city_id={4}/>}/>

        <Route path="/find" element={<Find key="/find" Find={find}/>} />

        <Route path="/login" element={<Login logFun={logFun}/>} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
