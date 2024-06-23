import React from 'react'

export default function Banner() {
  return (
    <div className="container-fluid service py-5">
    <div className="container py-5">
      <div className="row g-4 justify-content-center">
        <div className="col-md-6 col-lg-4">
          <a href="#">
            <div className="service-item bg-secondary rounded border border-secondary">
              <img src="img/bb1.jpg" className="img-fluid rounded-top w-100" alt="" />
              <div className="px-4 rounded-bottom">
                <div className="service-content bg-primary text-center p-4 rounded">
                  <h5 className="text-white">Best Quality</h5>
                  <h3 className="mb-0">With great deals</h3>
                </div>
              </div>
            </div>
          </a>
        </div>
        <div className="col-md-6 col-lg-4">
          <a href="#">
            <div className="service-item bg-dark rounded border border-dark">
              <img src="img/bb2.jpg" className="img-fluid rounded-top w-100" alt="" />
              <div className="px-4 rounded-bottom">
                <div className="service-content bg-light text-center p-4 rounded">
                  <h5 className="text-primary">Delicious cuisines</h5>
                  <h3 className="mb-0">With premium ingrediants</h3>
                </div>
              </div>
            </div>
          </a>
        </div>
        <div className="col-md-6 col-lg-4">
          <a href="#">
            <div className="service-item bg-primary rounded border border-primary">
              <img src="img/bb3.jpg" className="img-fluid rounded-top w-100" alt="" />
              <div className="px-4 rounded-bottom">
                <div className="service-content bg-secondary text-center p-4 rounded">
                  <h5 className="text-white">Premium Cafes</h5>
                  <h3 className="mb-0">At near your home</h3>
                </div>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>
  )
}
