import React, { useContext } from 'react';
import "./CSS/ShopCategory.css";
import { ShopContext } from '../Context/ShopContext';
import dropdown_icon from "../Components/Assets/dropdown_icon.png";
import Item from "../Components/Item/Item";

const ShopCategory = (props) => {
  const { all_product } = useContext(ShopContext);

  // Filter the products based on the specified category
  const filteredProducts = all_product.filter(item => props.category === item.category);

  return (
    <div className='shop-category'> 
      <img className='shopcategory-banner' src={props.banner} alt="Category Banner" />
      <div className="shopcategory-indexsort">
        <p>
          <span className='span'>Showing 1-{filteredProducts.length}</span> out of products
        </p>
        <div className="shopcategory-sort">
          Sort by <img src={dropdown_icon} alt="Dropdown Icon" />
        </div>
      </div>
      <div className="shopcategory-products">
        {filteredProducts.map((item, index) => (
          <Item 
            key={index}
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
