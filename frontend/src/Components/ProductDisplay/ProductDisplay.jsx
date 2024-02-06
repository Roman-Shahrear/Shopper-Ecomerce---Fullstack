// import React, { useContext } from 'react';
// import "./ProductDisplay.css";
// import star_icon from "../Assets/star_icon.png";
// import star_dull_icon from "../Assets/star_dull_icon.png";
// import { ShopContext } from '../../Context/ShopContext';

// const ProductDisplay = ({ product }) => {
//     const { addToCart } = useContext(ShopContext);

//     if (!product) {
//         // Handle the case where product is not defined, e.g., show a loading message or redirect
//         return <p>Loading...</p>;
//     }

//     const renderProductImages = () => {
//         if (product.image) {
//             return (
//                 <>
//                     <div className="productdisplay-img-list">
//                         <img src={product.image} alt={`Product`} />
//                     </div>
//                     <div className="productdisplay-img">
//                         <img className='productdisplay-main-img' src={product.image} alt="Main Product" />
//                     </div>
//                 </>
//             );
//         } else {
//             return <p>No images available</p>;
//         }
//     };

//     const renderProductSizes = () => {
//         console.log('product.sizes:', product.sizes);

//         if (product.sizes && product.sizes.length > 0) {
//             return (
//                 <div className="productdisplay-right-size">
//                     <h1>Select Size</h1>
//                     <div className="productdisplay-right-sizes">
//                         {product.sizes.map((size) => (
//                             <div key={size}>{size}</div>
//                         ))}
//                     </div>
//                 </div>
//             );
//         } else {
//             console.log('No sizes available');
//             return <p>No sizes available</p>;
//         }
//     };

//     return (
//         <div className='productDisplay'>
//             <div className="productdisplay-left">
//                 {renderProductImages()}
//             </div>
//             <div className="productdisplay-right">
//                 <h1>{product.name}</h1>
//                 <div className="productdisplay-right-stars">
//                     {[...Array(5)].map((_, index) => (
//                         <img key={index} src={index < product.rating ? star_icon : star_dull_icon} alt={`Star ${index + 1}`} />
//                     ))}
//                     <p>({product.reviewsCount})</p>
//                 </div>
//                 <div className="productdisplay-right-prices">
//                     <div className="productdisplay-right-price-old">
//                         ${product.old_price}
//                     </div>
//                     <div className="productdisplay-right-price-new">
//                         ${product.new_price}
//                     </div>
//                 </div>
//                 <div className="productdisplay-right-description">
//                     {product.description}
//                 </div>
//                 {renderProductSizes()}
//                 <button className='productdisplay-right-button' onClick={() => { addToCart(product.id) }}>ADD TO CART</button>
//                 <p className='productdisplay-right-category'>
//                     <span>Category: </span>
//                     {product.category ? (
//                         Array.isArray(product.category) ? product.category.join(', ') : product.category
//                     ) : (
//                         'N/A'
//                     )}
//                 </p>
//                 <p className='productdisplay-right-category'>
//                     <span>Tags :</span>
//                     {product.tags && product.tags.length > 0 ? (
//                         product.tags.join(', ')
//                     ) : (
//                         'N/A'
//                     )}
//                 </p>
//             </div>
//         </div>
//     );
// };

// export default ProductDisplay;




import React, { useContext, useState } from 'react';
import "./ProductDisplay.css";
import star_icon from "../Assets/star_icon.png";
import star_dull_icon from "../Assets/star_dull_icon.png";
import { ShopContext } from '../../Context/ShopContext';

const ProductDisplay = ({ product }) => {
    const { addToCart } = useContext(ShopContext);
    const [selectedSize, setSelectedSize] = useState(null);

    if (!product) {
        return <p>Loading...</p>;
    }

    const renderProductImages = () => {
        if (product.image) {
            return (
                <>
                    <div className="productdisplay-img-list">
                        <img src={product.image} alt={`Product`} />
                    </div>
                    <div className="productdisplay-img">
                        <img className='productdisplay-main-img' src={product.image} alt="Main Product" />
                    </div>
                </>
            );
        } else {
            return <p>No images available</p>;
        }
    };

    const renderProductSizes = () => {
        if (product.sizes && product.sizes.length > 0) {
            return (
                <div className="productdisplay-right-size">
                    <h1>Select Size</h1>
                    <div className="productdisplay-right-sizes">
                        {product.sizes.map((size) => (
                            <div
                                key={size}
                                className={`size-item ${selectedSize === size ? 'selected' : ''}`}
                                onClick={() => handleSizeSelect(size)}
                            >
                                {size}
                            </div>
                        ))}
                    </div>
                </div>
            );
        } else {
            return <p>No sizes available</p>;
        }
    };

    const handleSizeSelect = (size) => {
        setSelectedSize(size);
    };

    return (
        <div className='productDisplay'>
            <div className="productdisplay-left">
                {renderProductImages()}
            </div>
            <div className="productdisplay-right">
                <h1>{product.name}</h1>
                <div className="productdisplay-right-stars">
                    {[...Array(5)].map((_, index) => (
                        <img key={index} src={index < product.rating ? star_icon : star_dull_icon} alt={`Star ${index + 1}`} />
                    ))}
                    <p>{product.reviewsCount}</p>
                </div>
                <div className="productdisplay-right-prices">
                    <div className="productdisplay-right-price-old">
                        ${product.old_price}
                    </div>
                    <div className="productdisplay-right-price-new">
                        ${product.new_price}
                    </div>
                </div>
                <div className="productdisplay-right-description">
                    {product.description}
                </div>
                {renderProductSizes()}
                <button
                    className='productdisplay-right-button'
                    onClick={() => {
                        if (selectedSize) {
                            addToCart(product.id, selectedSize);
                            // Reset selectedSize after adding to cart if needed
                            // setSelectedSize(null);
                        } else {
                            alert("Please select a size before adding to cart");
                        }
                    }}
                >
                    ADD TO CART
                </button>
                <p className='productdisplay-right-category'>
                    <span>Category: </span>
                    {product.category ? (
                        Array.isArray(product.category) ? product.category.join(', ') : product.category
                    ) : (
                        'N/A'
                    )}
                </p>
                <p className='productdisplay-right-category'>
                    <span>Tags :</span>
                    {product.tags && product.tags.length > 0 ? (
                        product.tags.join(', ')
                    ) : (
                        'N/A'
                    )}
                </p>
            </div>
        </div>
    );
};

export default ProductDisplay;

