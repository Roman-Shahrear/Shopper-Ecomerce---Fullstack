import React, { createContext, useState, useEffect } from "react";

export const ShopContext = createContext(null);
// Validate the structure of products in getDefaultCart function
const getDefaultCart = (productsData) => {
  const products = productsData.data || [];

  let cart = {};
  for (const product of products) {
    if (product && typeof product === 'object' && product.id) {
      cart[product.id] = 0;
    }
  }
  return cart;
};

const ShopContextProvider = ({ children }) => {
  const [all_product, setAll_product] = useState([]);
  const [cartItems, setCartItem] = useState(getDefaultCart(all_product));

  useEffect(() => {
    fetch("http://localhost:4000/api/v1/allproducts")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Data from API:", data);
        setAll_product(data.data || []);
        setCartItem(getDefaultCart(data.data || []));
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  

  const addToCart = (itemId) => {
    setCartItem((prev) => {
      const updatedCart = { ...prev, [itemId]: prev[itemId] + 1 };
      return updatedCart;
    });
  };

  const removeFromCart = (itemId) => {
    setCartItem((prev) => {
      const updatedCart = { ...prev, [itemId]: prev[itemId] - 1 };
      return updatedCart;
    });
  };

  const getTotalCartQuantity = () => {
    let totalQuantity = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        totalQuantity += cartItems[item];
      }
    }
    return totalQuantity;
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = all_product.find(
          (product) => product.id === Number(item)
        );
        totalAmount += itemInfo ? itemInfo.new_price * cartItems[item] : 0;
      }
    }
    return totalAmount;
  };

  const contextValue = {
    all_product,
    cartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    getTotalCartQuantity,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
