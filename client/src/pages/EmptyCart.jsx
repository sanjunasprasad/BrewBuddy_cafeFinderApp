import React from 'react'
import Footer from '../components/Footer'
import Header from "../components/Header"
import { Link } from 'react-router-dom';



function EmptyCart() {
    return (
        <>
            <Header />



            <div className="container-fluid page-header py-5">
                <h1 className="text-center text-white display-6">Cart</h1>
                <ol className="breadcrumb justify-content-center mb-0">
                    <li className="breadcrumb-item">
                        <Link to="/" className="breadcrumb-link">
                            Home
                        </Link>
                    </li>
                    <li className="breadcrumb-item active text-white">Cart</li>
                </ol>
            </div>

            <div className="container-fluid py-5">
                <div className="container py-5 text-center">
                    <h2>Your cart is empty</h2>
                    <Link to="/" className="btn btn-primary">
                        Shop Now
                    </Link>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default EmptyCart
