import React from 'react'
import './FoodDisplay.css';

import {StoreContext} from '../../context/StoreContext.jsx';
import { useContext } from 'react';
import FoodItem from '../FoodItem/FoodItem.jsx';

const FoodDisplay = ({category}) => {

    const {food_list} = useContext(StoreContext);

  return (
    <div className='food-display' id='food-display'>
        <h2>Top dishes near you</h2>
        <div className="food-display-list">
            {Array.isArray(food_list) && food_list.length > 0 ? (
              food_list.map((item, index) => {
                if (category === 'All' || category === item.category) {
                  return (
                    <FoodItem
                      key={index}
                      id={item._id}
                      name={item.name}
                      description={item.description}
                      price={item.price}
                      image={item.image}
                    />
                  );
                }
                return null;
              })
            ) : (
              <p style={{color:"grey"}}>No items available ...</p>
            )}
        </div>
    </div>
  )
}

export default FoodDisplay
