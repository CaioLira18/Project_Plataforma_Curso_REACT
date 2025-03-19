import React, { useState, useEffect } from 'react';
import SingleItem from './SingleItem';
import { Link, useLocation } from 'react-router-dom';

const ItemList = ({ title, itemsArray = [], idPath }) => {
    const location = useLocation();
    const isItemsPage = location.pathname === "/items"; 

    const [showAll, setShowAll] = useState(isItemsPage); 

    useEffect(() => {
        if (isItemsPage) {
            setShowAll(true);
        }
    }, [isItemsPage]);

    const visibleItems = showAll ? itemsArray : itemsArray.slice(0, 4);

    return (
        <div className="item-list">
            <div className="item-list-header">
                <div className="main__texts">
                    <h2>{title} Populares</h2>
                    {}
                    {showAll ? (
                        <a href="/"><button className="main__link"> Voltar Para o Menu</button></a>
                    ) : (
                        <button className="main__link" onClick={() => setShowAll(true)}>Mostrar Tudo</button>
                    )}
                </div>    
            </div>
            <div className="item-list__container">
                {visibleItems.map((currObj, index) => 
                    (<SingleItem 
                        idPath={idPath}
                        {...currObj}
                        key={`${title}-${index}`} 
                    />)
                )}
            </div>      
        </div>
    );
}

export default ItemList;
