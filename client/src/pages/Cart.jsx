import React, { useState, useEffect } from 'react'
import { Link,  } from 'react-router-dom';
import Footer from '../components/Footer'
import Header from "../components/Header"
import { axiosUserInstance } from '../services/axios/axios';
import EmptyCart from './EmptyCart';
import Swal from "sweetalert2"
import 'sweetalert2/dist/sweetalert2.min.css'



function Cart() {
  
    const user = JSON.parse(localStorage.getItem("user"));
    // console.log("logged in user",user)
    const userId = user._id;
    const [cartData, setCartData] = useState([]);
    const [subtotal, setSubtotal] = useState(0);
    const [totalItems, setTotalItems] = useState(0);
    useEffect(() => {
        const fetchCartData = async () => {
            try {

                const response = await axiosUserInstance.get(`/order/fetchCart/${userId}`);
                // console.log(response)
                setCartData(response.data.cart);
            } catch (error) {
                console.error('Error fetching cart data:', error);
            }
        };
        fetchCartData();
    }, []);


    useEffect(() => {
        let newSubtotal = 0;
        let newTotalItems = 0;

        cartData.forEach(item => {
            newSubtotal += item.product.price * item.quantity;
            newTotalItems += item.quantity;
        });

        setSubtotal(newSubtotal);
        setTotalItems(newTotalItems);
    }, [cartData]);

    const handleIncreaseQuantity = (index) => {
        const updatedCart = [...cartData];
        updatedCart[index].quantity++;
        handleUpdateCart(updatedCart);
    };

    const handleDecreaseQuantity = (index) => {
        const updatedCart = [...cartData];
        if (updatedCart[index].quantity > 1) {
            updatedCart[index].quantity--;
            handleUpdateCart(updatedCart);
        }
    };

    const handleDeleteItem = (index) => {
        const updatedCart = [...cartData];
        updatedCart.splice(index, 1);
        handleUpdateCart(updatedCart);
    };

    const handleUpdateCart = async (updatedCart) => {
        try {
            const user = JSON.parse(localStorage.getItem("user"));
            const userId = user._id;
            const response = await axiosUserInstance.post(`/order/updateCart/${userId}`, { cart: updatedCart });
            //    console.log("updatedddddd",response)
            setCartData(updatedCart);
        } catch (error) {
            console.error('Error updating cart:', error);
        }
    };


    //place order
    const handlePlaceOrder = async (e) => {
        e.preventDefault();
        // console.log("userid in handle order", userId);
        // console.log("cart data", cartData);
        const amount = subtotal;
        const currency = "INR";
        const body = {
            userId, 
            items: cartData, 
            amount,
            currency,
            paymentMethod: "Razor pay",
            receipt: "Brew Buddy",
        };
        
        try {
            const response = await axiosUserInstance.post('/order/createOrder', body);
            console.log("order response from mongo:", response.data);
            const orderId = response.data.id;
            //  console.log("order id",orderId)
            var options = {
                key: "rzp_test_O9K7l3TCg65Dt6",
                amount: amount * 100, 
                currency,
                name: "Brew Buddy",
                description: "Test Transaction",
                image: " ",
                order_id: orderId,
                handler: async function (response) {
                    const validateRes = await fetch(
                        "http://localhost:8000/order/validate",
                        {
                            method: "POST",
                            body: JSON.stringify(response),
                            headers: {
                                "Content-Type": "application/json",
                            },
                        }
                    );
                    const jsonRes = await validateRes.json();
                    console.log(jsonRes);
                    setCartData([]);
                    Swal.fire({
                        title: "Super!",
                        html: `Your order has been placed successfully!<br><strong>Order ID:</strong> ${orderId}`,
                        icon: "success"
                    });
                },
                prefill: {
                    name: "testcustomer",
                    email: "testcustomer@example.com",
                    contact: "0000000000", 
                },
                notes: {
                    address: "Razorpay Corporate Office",
                },
                theme: {
                    color: "#3399cc",
                },
            };
            var rzp1 = new window.Razorpay(options);
            rzp1.on("payment.failed", function (response) {
                alert(response.error.code);
                alert(response.error.description);
                alert(response.error.source);
                alert(response.error.step);
                alert(response.error.reason);
                alert(response.error.metadata.order_id);
                alert(response.error.metadata.payment_id);
            });
            rzp1.open();
        } catch (error) {
            console.error('Error placing order:', error);
        }
    };
    



    if (cartData.length === 0) {
        return (
            <>
                <EmptyCart />
            </>
        );
    }


    return (
        <>
            <Header />
            {/* heading */}
            <div className="container-fluid page-header py-5">
                <h1 className="text-center text-white display-6">Cart</h1>
                <ol className="breadcrumb justify-content-center mb-0">
                    <li className="breadcrumb-item"> <Link to="/" className="breadcrumb-link"> Home</Link></li>
                    <li className="breadcrumb-item active text-white">Cart</li>
                </ol>
            </div>


            {/* cart */}
            <div className="container-fluid py-5">
                <div className="container py-5">
                    <div className="table-responsive">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Products</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">Quantity</th>
                                    <th scope="col">Total</th>
                                    <th scope="col">Handle</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cartData.map((item, index) => (
                                    <tr key={item.product._id}>
                                        <td>
                                            <div className="d-flex align-items-center">
                                                <img
                                                    src={item.product.productimages[0]} // Assuming productimages is an array of image URLs
                                                    className="img-fluid me-5 rounded-circle"
                                                    style={{ width: '80px', height: '80px' }}
                                                    alt={item.product.productname}
                                                />
                                            </div>
                                        </td>
                                        <td>
                                            <p className="mb-0 mt-4">{item.product.productname}</p>
                                        </td>
                                        <td>
                                            <p className="mb-0 mt-4">{item.product.price} ₹</p>
                                        </td>
                                        <td>
                                            <div className="input-group quantity mt-4" style={{ width: '100px' }}>
                                                <div className="input-group-btn">
                                                    <button className="btn btn-sm btn-minus rounded-circle bg-light border" onClick={() => handleDecreaseQuantity(index)}>
                                                        <i className="fa fa-minus"></i>
                                                    </button>
                                                </div>
                                                <input
                                                    type="text"
                                                    className="form-control form-control-sm text-center border-0"
                                                    value={item.quantity}
                                                />
                                                <div className="input-group-btn">
                                                    <button className="btn btn-sm btn-plus rounded-circle bg-light border" onClick={() => handleIncreaseQuantity(index)}>
                                                        <i className="fa fa-plus"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <p className="mb-0 mt-4">{(item.product.price * item.quantity).toFixed(2)} </p>
                                        </td>
                                        <td>
                                            <button className="btn btn-md rounded-circle bg-light border mt-4" onClick={() => handleDeleteItem(index)}>
                                                <i className="fa fa-times text-danger"></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* User address section */}
                    <div className="row">
                        <div className="col-md-4">
                            <div className="bg-light rounded p-4">
                                <div className="form-check mb-4">
                                    <input className="form-check-input"
                                        type="radio"
                                        name="deliveryAddressOption"
                                        id="deliveryAddressOption"
                                    />
                                    <label className="form-check-label" htmlFor="deliveryAddressOption">
                                        Delivery Address
                                    </label>
                                </div>
                                <p> Name : {user.userName}</p>
                                <p> Email :{user.email}</p>
                                <p> Mobile : {user.phoneNo}</p>
                                <p>Address :</p>
                                <p>IndiraNagar</p>
                                <p>Bangalore</p>
                                <p>Karnataka</p>
                            </div>
                        </div>



                        {/* cart total section */}
                        <div className="col-md-4">
                            <div className="bg-light rounded">
                                <div className="p-4">
                                    <h1 className="display-6 mb-4">
                                        Cart <span className="fw-normal">Total</span>
                                    </h1>
                                    <div className="d-flex justify-content-between mb-4">
                                        <h5 className="mb-0 me-4">Subtotal ({totalItems} items):</h5>
                                        <p className="mb-0"> ₹ {subtotal.toFixed(2)}</p>
                                    </div>
                                    <div className="d-flex justify-content-between mb-4">
                                        <h5 className="mb-0 me-4">Delivery charge:</h5>
                                        <p className="mb-0">Free</p>
                                    </div>
                                    <div className="py-4 mb-4 border-top border-bottom d-flex justify-content-between">
                                        <h5 className="mb-0 ps-4 me-4">Total</h5>
                                        <p className="mb-0 pe-4">₹ {subtotal.toFixed(2)}</p>
                                    </div>
                                    {/* Payment mode options */}
                                    <div className="py-4 mb-4 border-bottom">
                                        <h5 className="mb-3">Select Payment Method:</h5>

                                        <div className="form-check text-start mb-3">
                                            <input type="radio"
                                                className="form-check-input bg-primary border-0"
                                                id="paymentOption2"
                                                name="paymentOption"
                                                value="Razor Pay"

                                            />
                                            <label className="form-check-label" htmlFor="paymentOption2">Razor Pay</label>
                                        </div>

                                    </div>
                                    {/* Place Order button */}
                                    <button
                                        className="btn border-secondary rounded-pill px-4 py-3 text-primary text-uppercase mb-4 ms-4"
                                        type="button"
                                        onClick={handlePlaceOrder}
                                    >
                                        Place Order
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Cart
