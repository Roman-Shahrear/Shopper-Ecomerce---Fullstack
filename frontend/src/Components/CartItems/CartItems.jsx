import React, { useContext } from "react";
import "./CartItems.css";
import { ShopContext } from "../../Context/ShopContext";
import remove_icon from "../Assets/cart_cross_icon.png";

const CartItems = () => {
  const { all_product, cartItems, removeFromCart, getTotalCartAmount } = useContext(ShopContext);

  return (
    <div className="cartItems">
      <div className="cartitems-format-main">
        <p>Products</p>
        <p className="text-decoration">Title</p>
        <p className="text-decoration1">Price</p>
        <p className="text-decoration2">Quantity</p>
        <p className="text-decoration3">Total</p>
        <p className="text-decoration4">Remove</p>
      </div>
      <hr />
      {all_product.map((e) => {
        if (cartItems[e.id] > 0) {
          return (
            <div className="cartitems-format cartitems-format-main">
              <img src={e.image} alt={e.name} className="carticon-product-icon" />
              <p className="textdecoration-p">{e.name}</p>
              <p className="textdecoration-p1">${e.new_price}</p>
              <button className="cartitems-quantity">{cartItems[e.id]}</button>
              <p className="textdecoration-p2">${e.new_price * cartItems[e.id]}</p>
              <img
                className="carticon-remove-icon"
                src={remove_icon}
                alt={`Remove ${e.name}`}
                onClick={() => removeFromCart(e.id)}
              />
              <hr />
            </div>
          );
        }
        return null;
      })}
      <div className="cartitems-down">
        <div className="cartitems-total">
          <h1>Cart Totals</h1>
          <div>
            <div className="cartitems-total-item">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <p>Shipping Fee</p>
              <p>Free</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <h3>Total</h3>
              <h3>${getTotalCartAmount()}</h3>
            </div>
          </div>
          <button>PROCEED TO CHECHOUT</button>
        </div>
        <div className="cartitems-promocode">
          <p>If you have a promo code, Enter it here</p>
          <div className="cartitems-promobox">
            <input type="text" placeholder="promo code" />
            <button>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
