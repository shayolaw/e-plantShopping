import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();
  const [totalQuantity, setTotalQuntity] = useState(0)

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    let total = 0;
    cart.forEach(item => {
        let cost = parseFloat(item.cost.replace('$', ''));
       let itemTotal = item.quantity * cost;
       total = total + itemTotal ;
    });
    return total;
  };
  const handleCheckoutShopping = (e) => {
    alert('Functionality to be added for future reference');
  };

  const handleContinueShopping = (e) => {
    onContinueShopping(e)
  };



  const handleIncrement = (item) => {
    let myItem = {...item,quantity:item.quantity+1};
   
    dispatch(updateQuantity(myItem));
    setTotalQuntity(totalQuantity+1)
    
  };

  const handleDecrement = (item) => {
   if(item.quantity === 1){
    dispatch(removeItem(item));
    
   }
   else{
    let myItem = {...item,quantity:item.quantity - 1};
    dispatch(updateQuantity(myItem))
   }
   setTotalQuntity(totalQuantity - 1)
  };

  const handleRemove = (item) => {
    let myItems = cart.find(plant=>plant.name === item.name)
    let q = myItems.quantity
    dispatch(removeItem(item));
    setTotalQuntity(totalQuantity - q)
  };

  // Calculate total cost based on quantity for an item
  const calculateTotalCost = (item) => {
        let cost = parseFloat(item.cost.replace('$', ''));
       let itemTotal = item.quantity * cost;
    return itemTotal;
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
              </div>
              <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={(e) => handleContinueShopping(e)}>Continue Shopping</button>
        <br />
        <button className="get-started-button1">Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;


