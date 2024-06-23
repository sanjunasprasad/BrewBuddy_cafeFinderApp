import React, { useState, useEffect } from 'react';
import {  useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { axiosUserInstance } from '../services/axios/axios';
import Swal from "sweetalert2"
import 'sweetalert2/dist/sweetalert2.min.css'


function YourComponent({ shopName }) {


    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();
    const [products, setProducts] = useState([]); // State to store all products
    const [activeTab, setActiveTab] = useState('tab-1'); // State to manage active tab

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axiosUserInstance.get(`/getfromShop/${shopName}`);
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, [shopName]);

    const getFilteredProducts = () => {
        switch (activeTab) {
            case 'tab-2':
                return products.filter(product => product.category === 'Coffee');
            case 'tab-3':
                return products.filter(product => product.category === 'Drinks');
            case 'tab-4':
                return products.filter(product => product.category === 'Pastries');
            case 'tab-1':
            default:
                return products.slice(0, 12);
        }
    };

    const filteredProducts = getFilteredProducts();

    //handle navigate to cart
    const handleBuyNow = (event, product) => {
        event.preventDefault();
        // console.log("item to be added",product)
        if (!isAuthenticated) {
            Swal.fire({
                text: "Log in or sign up to place your order now.",
                customClass: {
                    confirmButton: 'btn btn-warning'
                }
            });

        } else {
            const addToCart = async () => {
                try {
                    const user = JSON.parse(localStorage.getItem("user"));
                    const userId = user._id;
                    // console.log("00000",userId)
                    // console.log("productid",product._id)
                    const response = await axiosUserInstance.post('/order/addToCart', { productId: product._id, userId });
                    // console.log("add to cart", response.data);
                    if (response.status === 200) {
                        navigate('/cart');
                    }

                } catch (err) {
                    console.error('Error fetching products:', err);
                }
            };
            addToCart();
        }
    };


    return (
        <div className="container-fluid py-5">
            <div className="container py-5">
                <div className="tab-class text-center">
                    <div className="row g-4">
                        <div className="col-lg-4 text-start">
                            <h1>Our Products</h1>
                        </div>
                        <div className="col-lg-8 text-end">
                            <ul className="nav nav-pills d-inline-flex text-center mb-5">
                                <li className="nav-item">
                                    <a
                                        className={`d-flex m-2 py-2 bg-light rounded-pill ${activeTab === 'tab-1' ? 'active' : ''}`}
                                        data-bs-toggle="pill"
                                        href="#tab-1"
                                        onClick={() => setActiveTab('tab-1')}
                                    >
                                        <span className="text-dark" style={{ width: '130px' }}>Collections</span>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a
                                        className={`d-flex py-2 m-2 bg-light rounded-pill ${activeTab === 'tab-2' ? 'active' : ''}`}
                                        data-bs-toggle="pill"
                                        href="#tab-2"
                                        onClick={() => setActiveTab('tab-2')}
                                    >
                                        <span className="text-dark" style={{ width: '130px' }}>Coffees</span>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a
                                        className={`d-flex m-2 py-2 bg-light rounded-pill ${activeTab === 'tab-3' ? 'active' : ''}`}
                                        data-bs-toggle="pill"
                                        href="#tab-3"
                                        onClick={() => setActiveTab('tab-3')}
                                    >
                                        <span className="text-dark" style={{ width: '130px' }}>Drinks</span>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a
                                        className={`d-flex m-2 py-2 bg-light rounded-pill ${activeTab === 'tab-4' ? 'active' : ''}`}
                                        data-bs-toggle="pill"
                                        href="#tab-4"
                                        onClick={() => setActiveTab('tab-4')}
                                    >
                                        <span className="text-dark" style={{ width: '130px' }}>Pastries</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="tab-content">
                        <div className="tab-pane fade show p-0 active">
                            {filteredProducts.length === 0 ? (
                                <div className="text-center mt-5">
                                    <h5>No products to show</h5>
                                </div>
                            ) : (
                                <div className="row g-4">
                                    {filteredProducts.map(product => (
                                        <div key={product._id} className="col-md-6 col-lg-4 col-xl-3">
                                            <div className="rounded position-relative fruite-item">
                                                <div className="fruite-img">
                                                    {product.productImages && product.productImages.length > 0 &&
                                                        <img src={product.productImages[0]} className="img-fluid w-100 rounded-top" alt={product.productname} />
                                                    }
                                                </div>
                                                <div className="text-white bg-secondary px-3 py-1 rounded position-absolute" style={{ top: '10px', left: '10px' }}>{product.category}</div>
                                                <div className="p-4 border border-secondary border-top-0 rounded-bottom">
                                                    <h4>{product.productName}</h4>
                                                    <p>
                                                        {product.shopName}
                                                    </p>
                                                    <div className="d-flex justify-content-between flex-lg-wrap align-items-center">
                                                        <div className="d-flex my-3 align-items-center">
                                                            <i className="fas fa-star text-primary"></i>
                                                            <span className="ms-2">{product.rating.toFixed(1)}</span>
                                                        </div>
                                                        <p>₹ {product.price} for one </p>

                                                        <a href="/" className="btn border border-secondary rounded-pill px-3 text-primary" onClick={(event) => handleBuyNow(event, product)}>
                                                            <i className="fa fa-shopping-bag me-2 text-primary"></i> Buy now
                                                        </a>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default YourComponent;
