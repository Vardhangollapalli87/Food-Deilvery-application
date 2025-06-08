import React, { useContext } from 'react';
import './Cart.css';
import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Cart = () => {

  const {cartItems , food_list,removeFromCart,getTotalCartAmount,deliveryFee,url,token} = useContext(StoreContext);

  let isCartEmpty = false;

  const navigate = useNavigate();


  const handleCheckout = () =>{
    if(token){
      navigate('/order');
    }
    else{
      toast.error('Please login !');
    }
  }

  return (
    <div className='cart'>
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p className='total'>Total</p>
          <p>Remove</p>
        </div>
      </div>
      <br />
      <hr />
      {
        food_list.filter(item => cartItems[item._id] > 0).length === 0 ? (
          <div className="cart-empty">
            {isCartEmpty = true}
            <p>Start adding delicious food to your cart!</p>
          </div>
        ) : (
          food_list.map((item, index) => {
            if (cartItems[item._id] > 0) {
              return (
                <div key={item._id} id={index}>
                  <div className="cart-items-title cart-items-item">
                    <img src={url+"/images/"+item.image} alt="food-image" />
                    <p>{item.name}</p>
                    <p>${item.price}</p>
                    <p>{cartItems[item._id]}</p>
                    <p className='total'>${item.price * cartItems[item._id]}</p>
                    <p>
                      <button
                        className="remove-btn"
                        onClick={() => removeFromCart(item._id)}
                        title="Remove one"
                      >
                        ×
                      </button>
                    </p>
                  </div>
                  <hr />
                </div>
              )
            }
            return null;
          })
        )
      }

      {
        isCartEmpty === true ? <></>:
        <div className="cart-bottom">
          <div className="cart-total">
            <h2>Cart Totals</h2>
            <div>
              <div className="cart-total-details">
                <p>Subtotal</p>
                <p>${getTotalCartAmount()}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <p>Delivery Fee</p>
                <p>+ ${deliveryFee}</p>
              </div>
              <hr />
              <div className='cart-total-details'>
                <b>Total</b>
                <b>${getTotalCartAmount()+deliveryFee}</b>
              </div>
            </div>
            <button onClick={handleCheckout}>PROCEED TO CHECKOUT</button>
          </div>
          <div className="cart-promocode">
            <div>
              <p>If you have a promo code, Enter it here.</p>
              <div className='cart-promocode-input'>
                <input type="text" placeholder='promo code' />
                <button>Submit</button>
              </div>
            </div>
          </div>
        </div>
      } 
    </div>
  )

}

export default Cart
