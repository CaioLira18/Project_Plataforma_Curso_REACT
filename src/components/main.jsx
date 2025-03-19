import React from "react";

import {useLocation } from "react-router-dom";
import ItemList from "./ItemList";
import { itemsArray } from "../assets/database/itemsArray";

const Main = ({ type }) => {
    const location = useLocation();
    const isHome = location.pathname === "/" || location.pathname === "";

    return (
        <div className="main">
            {/* Item List de items  */}
            {type === "items" || type === undefined ? (
                <ItemList 
                    title="Cursos" 
                    items={itemsArray.length} 
                    itemsArray={itemsArray} 
                    path='/items' 
                    idPath="/Items"
                />
            ) : <></>}
        </div>
    );
};

export default Main;
