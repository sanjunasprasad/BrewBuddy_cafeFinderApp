import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import Header from '../components/Header'
import Footer from "../components/Footer"
import { axiosUserInstance } from '../services/axios/axios';
import { useParams } from 'react-router-dom';
import Shopcategory from '../components/Shopcategory';




function Shopdetail() {
  const { shopName } = useParams();
  const [shopDetails, setShopDetails] = useState({});
  useEffect(() => {
    const fetchShopDetails = async () => {
      try {
        const response = await axiosUserInstance.get(`/shopdetail/${shopName}`);
        // console.log("Shop Details:", response.data);
        setShopDetails(response.data);
      } catch (error) {
        console.error('Error fetching shop details:', error);
      }
    };

    fetchShopDetails();
  }, [shopName]);
  return (
    <>
      <Header />
      {/* heading */}
      <div className="container-fluid page-header py-5">
        <h1 className="text-center text-white display-6">Shop Detail</h1>
        <ol className="breadcrumb justify-content-center mb-0">
          <li className="breadcrumb-item"> <Link to="/" className="breadcrumb-link"> Home</Link></li>
          <li className="breadcrumb-item active text-white">Shop Detail</li>
        </ol>
      </div>


      <div className="container-fluid py-5 mt-5">
        <div className="container py-5">
          <div className="row g-4 mb-5">
            <div className="col-lg-8 col-xl-9">
              <div className="row g-4">
                <div className="col-lg-6">
                  <div className="border rounded">
                    <a href="#"><img src={shopDetails.shopImages} className="img-fluid rounded" alt="Image" /></a>
                  </div>
                </div>
                <div className="col-lg-6">
                  <h4 className="fw-bold mb-3">{shopDetails.name}</h4>
                  <div className="d-flex mb-4">
                    <i className="fa fa-star text-secondary"></i>
                    <i className="fa fa-star text-secondary"></i>
                    <i className="fa fa-star text-secondary"></i>
                    <i className="fa fa-star text-secondary"></i>
                    <i className="fa fa-star"></i>
                  </div>
                  <p className="mb-4">{shopDetails.aboutus}</p>
                  <p className="mb-3">Address: </p>
                  <p className="mb-4">{shopDetails.address}</p>
                </div>
              </div>
            </div>
            <Shopcategory shopName={shopName} />
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}

export default Shopdetail
