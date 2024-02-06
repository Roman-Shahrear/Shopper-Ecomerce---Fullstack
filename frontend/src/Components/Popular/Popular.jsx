// import React, { useEffect, useState } from 'react';
// import "./Popular.css";
// // import data_product from "../Assets/data";
// import Item from '../Item/Item';

// const Popular = () => {

//   const [popularProducts, setPopularProducts] = useState([]);
  
//   useEffect(()=>{
//     fetch("http://localhost:4000/api/v1/products/popular/inwomen")
//     .then((response)=> response.json())
//     .then((data)=> setPopularProducts(data));
//   })
//   return (
//     <div className='popular'>
//         <h1>POPULAR IN WOMEN</h1>
//         <hr className='popular-hr'/>
//         <div className="popular-item">
//             {popularProducts.map((item, index) => (
//                 <Item 
//                     key={index}
//                     id={item.id}
//                     name={item.name}
//                     image={item.image}
//                     new_price={item.new_price}
//                     old_price={item.old_price}
//                 />
//             ))}
//         </div>
//     </div>
//   );
// }

// export default Popular;


import React, { useEffect, useState } from 'react';
import "./Popular.css";
// import data_product from "../Assets/data";
import Item from '../Item/Item';

const Popular = () => {

  const [popularProducts, setPopularProducts] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/v1/products/popular/inwomen");
        const data = await response.json();
        setPopularProducts(data);
      } catch (error) {
        console.error("Error fetching popular products:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array to run the effect only once

  return (
    <div className='popular'>
      <h1>POPULAR IN WOMEN</h1>
      <hr className='popular-hr'/>
      <div className="popular-item">
        {popularProducts.map((item, index) => (
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
    </div>
  );
}

export default Popular;
