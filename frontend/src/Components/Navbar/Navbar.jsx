import React, { useState, useContext, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import logo from '../Assets/logo.png';
import cart_icon from '../Assets/cart_icon.png';
import { ShopContext } from "../../Context/ShopContext";
import nav_dropd from "../Assets/nav_dropdown.png";

const Navbar = () => {
  const [menu, setMenu] = useState('shop');
  const { getTotalCartQuantity } = useContext(ShopContext);
  const menuRef = useRef();

  const dropdown_toggle = (e) => {
    menuRef.current.classList.toggle("nav-menu-visable");
    e.target.classList.toggle("open");
  }

  const handleMenuClick = (selectMenu) => {
    setMenu(selectMenu);
  };

  return (
    <div className='navbar'>
      <div className="nav-logo">
        <img src={logo} alt="logo" />
        <p>SHOPPER</p>
      </div>
      <img className='nav-dropdown' onClick={dropdown_toggle} src={nav_dropd} alt="" />
      <ul ref={menuRef} className="nav-menu">
        <li onClick={() => handleMenuClick('shop')}>
          <Link style={{textDecoration: "none"}} to="/">Shop</Link>{menu === 'shop' ? <hr /> : <></>}
        </li>
        <li onClick={() => handleMenuClick('mens')}>
          <Link style={{textDecoration: "none"}} to="/mens">Men</Link>{menu === 'mens' ? <hr /> : <></>}
        </li>
        <li onClick={() => handleMenuClick('womens')}>
          <Link style={{textDecoration: "none"}} to="/womens">Women</Link>{menu === 'womens' ? <hr /> : <></>}
        </li>
        <li onClick={() => handleMenuClick('kids')}>
          <Link style={{textDecoration: "none"}} to="/kids">Kids</Link>{menu === 'kids' ? <hr /> : <></>}
        </li>
      </ul>
      <div className="nav-login-cart">
        <Link style={{textDecoration: "none"}} to="/login"><button>Login</button></Link>
        <Link style={{textDecoration: "none"}} to="/cart"><img src={cart_icon} alt="cart_icon" /></Link>
        <div className="nav-cart-count">{getTotalCartQuantity()}</div>
      </div>
    </div>
  );
};

export default Navbar;
