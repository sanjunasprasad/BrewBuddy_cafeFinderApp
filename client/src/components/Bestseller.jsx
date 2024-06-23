import React, { useEffect, useState } from 'react';
import { Link ,useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { axiosUserInstance } from '../services/axios/axios';
import Swal from "sweetalert2"
import 'sweetalert2/dist/sweetalert2.min.css'

function Bestseller() {


    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();
    const [bestsellers, setBestsellers] = useState([]);

    useEffect(() => {
        const fetchBestsellers = async () => {
            try {
                const response = await axiosUserInstance.get('/getbestSeller');
                // console.log("Bestsellers:", response.data);
                setBestsellers(response.data.slice(0, 9));
            } catch (error) {
                console.error('Error fetching bestsellers:', error);
            }
        };

        fetchBestsellers();
    }, []);


    //handle navigate to cart
const handleBuyNow = (event,product) => {
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
        const addToCart= async () => {
            try {
                const user = JSON.parse(localStorage.getItem("user"));
                const userId = user._id; 
                // console.log("00000",userId)
                // console.log("productid",product._id)
                const response = await axiosUserInstance.post('/order/addToCart',{ productId: product._id ,userId});
                // console.log("add to cart", response.data);
                if( response.status === 200){
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
                <div className="text-center mx-auto mb-5" style={{ maxWidth: '700px' }}>
                    <h1 className="display-4">Popular Products</h1>
                    <p>Exploring BrewBuddy's top picks and fan favorites – discover your next caffeinated delight!</p>
                </div>
                <div className="row g-4">
                    {bestsellers.map((product, index) => (
                        <div className="col-lg-6 col-xl-4" key={index}>
                            <div className="p-4 rounded bg-light">
                                <div className="row align-items-center">
                                    <div className="col-6">
                                        <img src={product.productImages[0]} className="img-fluid rounded-circle w-100" alt={product.productName} />
                                    </div>
                                    <div className="col-6">
                                        <a href="#" className="h5">{product.productName}</a>
                                        {/* <p>{product.shopName}</p> */}
                                        <p>
                                            <Link to={`/shopdetail/${product.shopName}`}>{product.shopName}</Link>
                                        </p>
                                        <div className="d-flex my-3">
                                            {[...Array(5)].map((_, i) => (
                                                <i key={i} className={`fas fa-star ${i < product.rate ? 'text-primary' : ''}`}></i>
                                            ))}
                                        </div>
                                        <h4 className="mb-3">₹ {product.price}</h4>
                                        <a href="/" className="btn border border-secondary rounded-pill px-3 text-primary" onClick={(event) => handleBuyNow(event, product)}>
                                            <i className="fa fa-shopping-bag me-2 text-primary"></i> Buy now
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Bestseller;
