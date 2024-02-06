import React, { useContext, useEffect, useState } from 'react';
import "./CSS/ShopCategory.css";
import dropdown_icon from "../Components/Assets/dropdown_icon.png";
import Item from "../Components/Item/Item";
import { ShopContext } from '../Context/ShopContext';

const ShopCategory = ({ banner, category }) => {
  const { allProducts, loading } = useContext(ShopContext);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    if (!allProducts && !loading) {
      // Fetch data here or handle the absence of data in another way
      fetchProducts();
    } else {
      filterProductsByCategory();
    }
  }, [allProducts, loading, category]);

  const fetchProducts = () => {
    fetch("http://localhost:4000/api/v1/allproducts")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Data from API:", data);
        setFilteredProducts(data.data || []);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        // Handle the error (e.g., show an error message)
      });
  };

  const filterProductsByCategory = () => {
    // Check if allProducts is an array and has the expected structure
    if (!Array.isArray(allProducts) || !allProducts.every(product => product && product.category)) {
      console.error("Invalid data structure for allProducts", allProducts);
      // Handle the invalid data structure (e.g., show an error message)
    } else {
      const filtered = allProducts.filter(product => product.category === category);
      setFilteredProducts(filtered);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className='shop-category'>
      <img className='shopcategory-banner' src={banner} alt="Category Banner" />
      <div className="shopcategory-indexsort">
        <p>
          <span className='span'>Showing 1-{filteredProducts.length}</span> out of products
        </p>
        <div className="shopcategory-sort">
          Sort by <img src={dropdown_icon} alt="Dropdown Icon" />
        </div>
      </div>
      <div className="shopcategory-products">
        {filteredProducts.map((item) => (
          <Item 
            key={item.id}
            id={item.id}
            name={item.name}
            image={item.image}
            new_price={item.new_price}
            old_price={item.old_price}
          />
        ))}
      </div>
      <div className="shopcategory-lodmore">
        Explore More
      </div>
    </div>
  );
}

export default ShopCategory;