import React from "react";
import CarsContext from "./carsContext";

const carsState = (props) => {

    return(
        <CarsContext.provider value={state}>
            {props.children}
        </CarsContext.provider>
    )
}

export default carsState;