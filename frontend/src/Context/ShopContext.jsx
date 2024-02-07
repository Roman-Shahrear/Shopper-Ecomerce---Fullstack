// import React, { createContext, useState, useEffect } from "react";

// export const ShopContext = createContext(null);

// const getDefaultCart = (productsData) => {
//   const products = productsData.data || [];

//   let cart = {};
//   for (const product of products) {
//     if (product && typeof product === 'object' && product.id) {
//       cart[product.id] = 0;
//     }
//   }
//   return cart;
// };

// const fetchProducts = async () => {
//   try {
//     const response = await fetch("http://localhost:4000/api/v1/allproducts");
//     if (!response.ok) {
//       throw new Error(`HTTP error! Status: ${response.status}`);
//     }
//     return response.json();
//   } catch (error) {
//     throw new Error(`Error fetching data: ${error.message}`);
//   }
// };

// const ShopContextProvider = ({ children }) => {
//   const [allProducts, setAllProducts] = useState([]);
//   const [cartItems, setCartItems] = useState(getDefaultCart({ data: allProducts }));
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const fetchData = async () => {
//     try {
//       const data = await fetchProducts();
//       setAllProducts(data.data || []);
//       setCartItems(getDefaultCart(data || []));
//     } catch (error) {
//       setError(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const getTotalCartQuantity = () => {
//     let totalQuantity = 0;
//     for (const item in cartItems) {
//       if (cartItems[item] > 0) {
//         totalQuantity += cartItems[item];
//       }
//     }
//     return totalQuantity;
//   };

//   const getTotalCartAmount = () => {
//     let totalAmount = 0;
//     for (const item in cartItems) {
//       if (cartItems[item] > 0) {
//         let itemInfo = allProducts.find(
//           (product) => product.id === Number(item)
//         );
//         totalAmount += itemInfo ? itemInfo.new_price * cartItems[item] : 0;
//       }
//     }
//     return totalAmount;
//   };

//   const contextValue = {
//     allProducts,
//     cartItems,
//     addToCart: (itemId) => handleAddToCart(itemId),
//     removeFromCart: (itemId) => handleRemoveFromCart(itemId),
//     getTotalCartAmount,
//     getTotalCartQuantity,
//   };

//   const handleAddToCart = (itemId) => {
//     setCartItems((prev) => {
//       const updatedCart = { ...prev, [itemId]: prev[itemId] + 1 };
//       const authToken = localStorage.getItem("auth-token");
//       console.log("authToken:", authToken);

//       if (authToken) {
//         fetch("http://localhost:4000/api/v1/addtocart", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             "Authorization": `Bearer ${localStorage.getItem("auth-token")}`,
//           },
//           body: JSON.stringify({ itemId }),
//         })
//           .then((response) => response.json())
//           .then((data) => console.log(data))
//           .catch((error) => console.error("Error adding to cart:", error));
//       }
//       return updatedCart;
//     });
//   };

//   const handleRemoveFromCart = (itemId) => {
//     setCartItems((prev) => {
//       const updatedCart = { ...prev, [itemId]: Math.max(0, prev[itemId] - 1) };
//       return updatedCart;
//     });
//   };

//   if (loading) {
//     return <p>Loading...</p>;
//   }

//   if (error) {
//     return <p>Error loading data: {error}</p>;
//   }

//   return (
//     <ShopContext.Provider value={contextValue}>
//       {children}
//     </ShopContext.Provider>
//   );
// };

// export default ShopContextProvider;

import React, { createContext, useState, useEffect } from "react";

export const ShopContext = createContext(null);

const getDefaultCart = (productsData) => {
  const products = productsData.data || [];

  let cart = {};
  for (const product of products) {
    if (product && typeof product === "object" && product.id) {
      cart[product.id] = 0;
    }
  }
  return cart;
};

const fetchProducts = async () => {
  try {
    const response = await fetch("http://localhost:4000/api/v1/allproducts");
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    throw new Error(`Error fetching data: ${error.message}`);
  }
};

const ShopContextProvider = ({ children }) => {
  const [allProducts, setAllProducts] = useState([]);
  const [cartItems, setCartItems] = useState(
    getDefaultCart({ data: allProducts })
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const data = await fetchProducts();
      setAllProducts(data.data || []);
      setCartItems(getDefaultCart(data || []));
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
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

  const handleAddToCart = (itemId) => {
    setCartItems((prev) => {
      const updatedCart = { ...prev, [itemId]: prev[itemId] + 1 };
      const authToken = localStorage.getItem("auth-token");
      
      if (authToken) {
        fetch("http://localhost:4000/api/v1/addtocart", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`
          },
          body: JSON.stringify({ itemId }),
        })
          .then((response) => response.json())
          .then((data) => console.log(data))
          .catch((error) =>
            console.error("Error adding to cart:", error.message)
          );
      } else {
        console.error("No authentication token found");
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

  const contextValue = {
    allProducts,
    cartItems,
    addToCart: handleAddToCart,
    removeFromCart: handleRemoveFromCart,
    getTotalCartAmount,
    getTotalCartQuantity,
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error loading data: {error.message}</p>;
  }

  return (
    <ShopContext.Provider value={contextValue}>{children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
