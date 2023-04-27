import React, { useEffect, useState } from 'react'
import CarItem from './CarItem'
// import InfiniteScroll from 'react-infinite-scroll-component';

function Cars(props) {

    const [results, setResults] = useState([]);

    const getCars = async () => {
        let url = `http://localhost:5000/api/${props.link}`;
        // props.progressFunction(10);
        let data = await fetch(url, {
          method: 'POST',
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify({city: props.city_id})
        });
        // console.log(data)
        // props.progressFunction(30);
        let parsedData = await data.json();
        // props.progressFunction(70);
        setResults(parsedData.results);
        // props.progressFunction(100);
    }
    useEffect(() => {
        getCars();
        //eslint-disable-next-line
      }, []);
  return (
    <div>
      <div>
        <br/>
        <br/>
        <h1 className="text-center my-3">Rent A Car {props.city}</h1>
        {/* {loading && <Spinner/>} */}
        {/* <InfiniteScroll */}
           {/* dataLength={results.length} */}
           {/* next={fetchMoreData} */}
           {/* hasMore={page!==results.total_pages} */}
        {/* //    hasMore={results.length !== totalResults} */}
        {/* //    loader={results.length===totalResults?"":<Spinner/>} */}
            {/* loader={page!==results.total_pages?<Spinner/>:''} */}
        {/* > */}
        <div className="container">
        
            <div className="row">
                {results && results.map((element)=> {
                    return <div className="col-md-3 my-2" key={element.Reg_No}>
                        <CarItem reg_no={element.Reg_No} Name={element.car_Name} model={element.model} image={element.Image} price={element.Price} city={element.city_id} reg={props.reg} _name={props._name} mod={props.model} ima={props.image} pri={props.price} cit={props.city} />
                    </div>
                })}
            </div>
        </div>
        {/* </InfiniteScroll> */}
    </div>
    </div>
  )
}

export default Cars