import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import { axiosUserInstance } from '../services/axios/axios';
import Swal from "sweetalert2"
import 'sweetalert2/dist/sweetalert2.min.css'

function Shop() {

  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);
  const [sortBy, setSortBy] = useState('ratingsHigh');

  useEffect(() => {
    fetchProducts(sortBy);
  }, [sortBy]);

  const fetchProducts = async (sortBy) => {
    try {
      const response = await axiosUserInstance.get(`/sort?sortBy=${sortBy}`);
      setProducts(response.data);
    } catch (err) {
      console.error('Error fetching products:', err);
    }
  };



 


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

  // Handle sorting change
  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  // Logic to calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <Header />
      <div className="container-fluid page-header py-5">
        <h1 className="text-center text-white display-6">Shop</h1>
        <ol className="breadcrumb justify-content-center mb-0">
          <li className="breadcrumb-item">
            {' '}
            <Link to="/" className="breadcrumb-link">
              {' '}
              Home
            </Link>
          </li>
          <li className="breadcrumb-item active text-white">Shop</li>
        </ol>
      </div>

      <div className="container-fluid fruite py-5">
        <div className="container py-5">
          <div className="row g-4">
            <div className="col-lg-12">
              <div className="row g-4">
                <div className="col-xl-3">
                  
                </div>
                <div className="col-6"></div>
                <div className="col-xl-3">
                  <div className="bg-light ps-3 py-3 rounded d-flex justify-content-between mb-4">
                    <label htmlFor="fruits">Sort By</label>
                    <select
                      id="fruits"
                      name="sortBy"
                      className="border-0 form-select-sm bg-light me-3"
                      value={sortBy}
                      onChange={handleSortChange}
                    >
                      <option value="priceLow">Ratings (Lowest first)</option>
                      <option value="ratingsHigh">Ratings (Highest first)</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="row g-4">
                <div className="col-lg-3">
                  <div className="row g-4">
              
                    <br />
                    {/* banner */}
                    <div className="col-lg-12">
                      <div className="position-relative">
                        <img
                          src="img/banner-fruits.jpg"
                          className="img-fluid w-100 rounded"
                          alt=""
                        />
                        <div
                          className="position-absolute"
                          style={{ top: '50%', right: '10px', transform: 'translateY(-50%)' }}
                        >
                          <h3 className="text-secondary fw-bold">
                            Organic <br /> Exquisite <br /> Savory
                          </h3>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* productlist */}
                <div className="col-lg-9">
                  <div className="row g-4 justify-content-center">
                    {currentItems.map((product, index) => (
                      <div key={index} className="col-md-6 col-lg-6 col-xl-4">
                        <div className="rounded position-relative fruite-item">
                          <div className="fruite-img">
                            <img
                              src={product.productImages}
                              className="img-fluid w-100 rounded-top"
                              alt=""
                            />
                          </div>
                          <div
                            className="text-white bg-secondary px-3 py-1 rounded position-absolute"
                            style={{ top: '10px', left: '10px' }}
                          >
                            {product.category}
                          </div>
                          <div className="p-4 border border-secondary border-top-0 rounded-bottom">
                            <div className="d-flex justify-content-between flex-lg-wrap">
                              <h4>{product.productName}</h4>
                              <div className="d-flex align-items-center">
                                <i className="fas fa-star text-primary"></i>
                                <span className="ms-1">{product.rating}</span>
                              </div>
                            </div>
                            <p className="text-dark fs-5 fw-bold mb-0">{product.shopName}</p>
                            <p>{product.description}</p>
                            <div className="d-flex justify-content-between flex-lg-wrap">
                              <p>₹ {product.price}</p>
                              <a href="/" className="btn border border-secondary rounded-pill px-3 text-primary" onClick={(event) => handleBuyNow(event, product)}>
                                <i className="fa fa-shopping-bag me-2 text-primary"></i> Buy now
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    <div className="col-12">
                      <div className="pagination d-flex justify-content-center mt-5">
                        <a
                          href="#"
                          className="rounded"
                          onClick={() => paginate(currentPage - 1)}
                        >
                          &laquo;
                        </a>
                        {Array.from(
                          { length: Math.ceil(products.length / itemsPerPage) },
                          (_, index) => (
                            <a
                              key={index}
                              href="#"
                              className={`rounded ${currentPage === index + 1 ? 'active' : ''
                                }`}
                              onClick={() => paginate(index + 1)}
                            >
                              {index + 1}
                            </a>
                          )
                        )}
                        <a
                          href="#"
                          className="rounded"
                          onClick={() => paginate(currentPage + 1)}
                        >
                          &raquo;
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                {/* End*/}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Shop;
