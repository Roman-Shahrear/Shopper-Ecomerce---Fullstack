import React, { createContext, useState, useEffect } from "react";

export const ShopContext = createContext(null);

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
  const [allProducts, setAllProducts] = useState([]);
  const [cartItems, setCartItems] = useState(getDefaultCart({ data: allProducts }));
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        setAllProducts(data.data || []);
        setCartItems(getDefaultCart(data || []));
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

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
        let itemInfo = allProducts.find(
          (product) => product.id === Number(item)
        );
        totalAmount += itemInfo ? itemInfo.new_price * cartItems[item] : 0;
      }
    }
    return totalAmount;
  };

  const contextValue = {
    allProducts,
    cartItems,
    addToCart: (itemId) => handleAddToCart(itemId),
    removeFromCart: (itemId) => handleRemoveFromCart(itemId),
    getTotalCartAmount,
    getTotalCartQuantity,
  };

  const handleAddToCart = (itemId) => {
    setCartItems((prev) => {
      const updatedCart = { ...prev, [itemId]: prev[itemId] + 1 };
      if (localStorage.getItem("auth-token")) {
        fetch("http://localhost:4000/addtocart", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "auth-token": localStorage.getItem("auth-token"),
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ itemId }),
        })
          .then((response) => response.json())
          .then((data) => console.log(data))
          .catch((error) => console.error("Error adding to cart:", error));
      }
      return updatedCart;
    });
  };

  const handleRemoveFromCart = (itemId) => {
    setCartItems((prev) => {
      const updatedCart = { ...prev, [itemId]: Math.max(0, prev[itemId] - 1) };
      return updatedCart;
    });
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error loading data: {error.message}</p>;
  }

  return (
    <ShopContext.Provider value={contextValue}>
      {children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
