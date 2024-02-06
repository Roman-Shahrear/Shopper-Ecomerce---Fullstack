import React, { useEffect, useState } from "react";
import "./ListProduct.css";
import cross_icon from "../../../assets/cross_icon.png";

const ListProduct = () => {
  const [allproducts, setAllProducts] = useState([]);

  const fetchInfo = async () => {
    const response = await fetch("http://localhost:4000/api/v1/allproducts");
    const data = await response.json();
    setAllProducts(data.data);  // Set directly to the array
  };

  useEffect(() => {
    fetchInfo();
  },[]);

  //For Remove product
  const removeProduct = async (id) => {
    await fetch(`http://localhost:4000/api/v1/product/${id}`, {
      method: "DELETE",
      headers: {
        ACCEPT: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    });
    await fetchInfo();
  };
  return (
    <div className="list-product">
      <h1>All Products List</h1>
      <div className="listproduct-format-main">
        <p>Products</p>
        <p className="text-decoration">Title</p>
        <p id="old-price" className="text-decoration">
          Old Price
        </p>
        <p className="text-decoration">New Price</p>
        <p className="text-decoration">Category</p>
        <p className="text-decoration">Remove</p>
      </div>
      <div className="listproduct-allproducts">
        <hr />
        {allproducts.map((product) => (
          <React.Fragment key={product.id}>
            <div className="listproduct-format-main listproduct-format">
              <img
                src={product.image}
                alt=""
                className="listproduct-product-icon"
              />
              <p className="text-decoration">{product.name}</p>
              <p className="text-decoration2">${product.old_price}</p>
              <p className="text-decoration2">${product.new_price}</p>
              <p className="text-decoration2">{product.category}</p>
              <img
                onClick={() => {
                  removeProduct(product.id);
                }}
                src={cross_icon}
                alt=""
                className="listproduct-remove-icon"
              />
            </div>
            <hr />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default ListProduct;
