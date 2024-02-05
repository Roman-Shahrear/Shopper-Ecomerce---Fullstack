import React, { useContext } from 'react';
import "./CSS/ShopCategory.css";
import dropdown_icon from "../Components/Assets/dropdown_icon.png";
import Item from "../Components/Item/Item";
import { ShopContext } from '../Context/ShopContext';

const ShopCategory = ({ banner, category }) => {
  const { all_product } = useContext(ShopContext);
  
  // Check if all_product is an array before using filter
  if (!Array.isArray(all_product)) {
    console.error("Invalid data structure for all_product");
    return null;
  }

  const filteredProducts = all_product.filter(product => product.category === category);
  
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
