import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Productlist from '../components/Productlist'
import Banner from "../components/Banner"
import Bestseller from '../components/Bestseller'


function Home() {
  return (
    <>
      <Header />
      {/* <!-- Modal Search Start --> */}
      <div className="modal fade" id="searchModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-fullscreen">
          <div className="modal-content rounded-0">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Search by keyword</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body d-flex align-items-center">
              <div className="input-group w-75 mx-auto d-flex">
                <input type="search" className="form-control p-3" placeholder="keywords" aria-describedby="search-icon-1" />
                <span id="search-icon-1" className="input-group-text p-3"><i className="fa fa-search"></i></span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- main banner--> */}
      <div className="container-fluid py-5 mb-5 hero-header">
        <div className="container py-5">
          <div className="row g-5 align-items-center">
            <div className="col-md-12 col-lg-7">
              <h4 className="mb-3 text-secondary">Café cravings? </h4>
              <h1 className="mb-5 display-3 text-primary">Discover your perfect brewscape with BrewBuddy!</h1>

            </div>
            <div className="col-md-12 col-lg-5">
              <div id="carouselId" className="carousel slide position-relative" data-bs-ride="carousel">
                <div className="carousel-inner" role="listbox">
                  <div className="carousel-item active rounded">
                    <img src="img/banner1.jpg" className="img-fluid w-100 h-100 bg-secondary rounded" alt="First slide" />
                    <a href="#" className="btn px-4 py-2 text-white rounded">Cafés</a>
                  </div>
                  <div className="carousel-item rounded">
                    <img src="img/banner3.jpg" className="img-fluid w-100 h-100 rounded" alt="Second slide" />
                    <a href="#" className="btn px-4 py-2 text-white rounded">Cuisines</a>
                  </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselId" data-bs-slide="prev">
                  <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselId" data-bs-slide="next">
                  <span className="carousel-control-next-icon" aria-hidden="true"></span>
                  <span className="visually-hidden">Next</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>




      <Productlist />

      <Banner />


      <Bestseller />

      <Footer />

    </>
  )
}

export default Home
