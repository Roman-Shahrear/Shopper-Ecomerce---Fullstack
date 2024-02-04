import React, { useState, useEffect } from 'react';
import './AddProduct.css';
import upload_area from '../../../assets/upload_area.svg';

const AddProduct = () => {
    const [image, setImage] = useState(null);
    const [productDetails, setProductDetails] = useState({
        name: '',
        image: '',
        category: 'women',
        new_price: '',
        old_price: '',
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const imageHandler = (e) => {
        setImage(e.target.files[0]);
    };

    const changeHandler = (e) => {
        setProductDetails((prevDetails) => ({ ...prevDetails, [e.target.name]: e.target.value }));
    };

    const validateForm = () => {
        if (!productDetails.name || !productDetails.old_price || !productDetails.new_price || !image) {
            setError('Please fill in all fields.');
            return false;
        }

        setError(null);
        return true;
    };

    const addProduct = async () => {
        try {
            setLoading(true);

            if (!validateForm()) {
                return;
            }

            // Step 1: Upload Image
            const formData = new FormData();
            formData.append('product', image);

            const uploadResponse = await fetch('http://localhost:4000/upload', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                },
                body: formData,
            });

            const uploadData = await uploadResponse.json();

            if (uploadResponse.status === 200 && uploadData.success) {
                // Step 2: Add Product
                const addProductResponse = await fetch('http://localhost:4000/api/v1/product/new', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        ...productDetails,
                        image: uploadData.image_url,
                    }),
                });

                const addProductData = await addProductResponse.json();

                if (addProductResponse.status === 200 && addProductData.success) {
                    setProductDetails({
                        name: '',
                        image: '',
                        category: 'women',
                        new_price: '',
                        old_price: '',
                    });
                    setError(null);
                    alert('Product Added');
                } else {
                    setError('Failed to add product. Please try again.');
                }
            } else {
                setError('An error occurred while uploading the image.');
            }
        } catch (error) {
            console.error('Error adding product:', error);
            setError('An unexpected error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        console.log(productDetails);
    }, [productDetails]);

    return (
        <div className='add-product'>
            <div className='addproduct-itemfield'>
                <p>Product title</p>
                <input value={productDetails.name} onChange={changeHandler} type='text' name='name' placeholder='type here' />
            </div>
            <div className='addproduct-price'>
                <div className='addproduct-itemfield'>
                    <p>Price</p>
                    <input value={productDetails.old_price} onChange={changeHandler} type='text' name='old_price' placeholder='type-here' />
                </div>
                <div className='addproduct-itemfield'>
                    <p>Offer Price</p>
                    <input value={productDetails.new_price} onChange={changeHandler} type='text' name='new_price' placeholder='type-here' />
                </div>
            </div>
            <div className='addproduct-itemfield'>
                <p>Product Category</p>
                <select value={productDetails.category} onChange={changeHandler} name='category' className='add-product-selector'>
                    <option value='women'>Women</option>
                    <option value='men'>Men</option>
                    <option value='kid'>Kid</option>
                </select>
            </div>
            <div className='product-itemfield'>
                <label htmlFor='file-input' className='file-input-label'>
                    <img src={image ? URL.createObjectURL(image) : upload_area} className='addproduct-thumnail-img' alt='upload_area' />
                </label>
                <input onChange={imageHandler} type='file' name='image' id='file-input' hidden />
            </div>
            {loading && <p>Loading...</p>}
            {error && <p className='error-message'>{error}</p>}
            <button onClick={addProduct} className='addproduct-btn'>
                ADD
            </button>
        </div>
    );
};

export default AddProduct;
