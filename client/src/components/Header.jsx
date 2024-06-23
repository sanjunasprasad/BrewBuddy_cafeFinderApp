import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../context/AuthContext.jsx';
import { axiosInstance } from "../services/axios/axios.js"
import Swal from "sweetalert2"
import 'sweetalert2/dist/sweetalert2.min.css'


function Header() {

  const { isAuthenticated, user, login, logout } = useAuth();
  const [showLogin, setShowLogin] = useState(true);
  const toggleLoginRegistration = () => {
    setShowLogin(!showLogin);
  };



  //registration
  const initialValues = {
    username: '',
    mobile: '',
    email: '',
    password: ''
  };

  const validationSchema = Yup.object({
    username: Yup.string().required('Please enter your full name'),
    mobile: Yup.string().matches(/^\d{10}$/, 'Please enter a valid 10-digit mobile number').required('Please enter your mobile number'),
    email: Yup.string().email('Invalid email address').required('Please enter your email'),
    password: Yup.string().min(6, 'Password must be at least 6 characters long').required('Please enter a password')
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      // console.log('registration Form values:', values);
      const res = await axiosInstance.post('/userRegister', values);
      // console.log("reg reponse", res.data);

      if (res.status === 200) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Registration successful",
          showConfirmButton: false,
          timer: 1500
        });
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        login(res.data.user);
      }
      resetForm();
    } catch (error) {
      console.error(error.response?.data || error.message);
    } finally {
      setSubmitting(false);
    }
  };




  //login
  const loginInitialValues = {
    email: '',
    password: ''
  };

  const loginValidationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Please enter your email'),
    password: Yup.string().min(6, 'Password must be at least 6 characters long').required('Please enter your password')
  });
  const handleLoginSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      // console.log('Login values:', values);
      const res = await axiosInstance.post('/userLogin', values);
      // console.log("Login response:", res.data);
      if (res.status === 200) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Login successful",
          showConfirmButton: false,
          timer: 1500
        });
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        login(res.data.user);
      }
      resetForm();
    } catch (error) {
      console.error(error.response?.data || error.message);
    } finally {
      setSubmitting(false);
    }
  };

  //logout
  const handleLogout = () => {
    logout();
  };


  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      login(parsedUser);
    }
  }, []);


  return (
    <>
      <div className="container-fluid fixed-top">
        <div className="container topbar bg-primary d-none d-lg-block">
          <div className="d-flex justify-content-between">
            <div className="top-info ps-2">
              <small className="me-3">
                <i className="fas fa-map-marker-alt me-2 text-secondary"></i>
                <a href="#" className="text-white">123 Street, Bengaluru</a>
              </small>
              <small className="me-3">
                <i className="fas fa-envelope me-2 text-secondary"></i>
                <a href="#" className="text-white">BrewBuddy@info.com</a>
              </small>
            </div>
            <div className="top-link pe-2">
              <a href="#" className="text-white">
                <small className="text-white mx-2">Privacy Policy</small>/
              </a>
              <a href="#" className="text-white">
                <small className="text-white mx-2">Terms of Use</small>/
              </a>
              <a href="#" className="text-white">
                <small className="text-white ms-2">Sales and Refunds</small>
              </a>
            </div>
          </div>
        </div>
        <div className="container px-0">
          <nav className="navbar navbar-light bg-white navbar-expand-xl">
            <a href="index.html" className="navbar-brand">
              <h1 className="text-primary display-6">BrewBuddy</h1>
            </a>
            <button
              className="navbar-toggler py-2 px-3"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarCollapse"
            >
              <span className="fa fa-bars text-primary"></span>
            </button>
            <div className="collapse navbar-collapse bg-white" id="navbarCollapse">
              <div className="navbar-nav mx-auto"></div>
              {/* navbar links */}
              <div class="d-flex m-3 me-0">
                <Link to="/" className="nav-item nav-link active">
                  Home
                </Link>

                <Link to="/shop" className="nav-item nav-link active">
                  Shop
                </Link>

                {isAuthenticated ? (
                  <div className="nav-item dropdown">
                    <a href="#" className="nav-link dropdown-toggle active" data-bs-toggle="dropdown">
                      {user && user.userName}
                    </a>
                    <div className="dropdown-menu m-0 bg-secondary rounded-0">
                      <Link to="/cart" className="dropdown-item">
                        Cart
                      </Link>

                      <Link to="/myorders" className="dropdown-item">
                        Orders
                      </Link>

                     
                      <a href="#" class="dropdown-item" onClick={handleLogout}>Logout</a>


                    </div>
                  </div>
                ) : (
                  <a href="shop.html" className="nav-item nav-link active" data-bs-toggle="modal" data-bs-target="#loginModal">
                    Signin
                  </a>
                )}
              </div>

            </div>
          </nav>
        </div>
      </div>
      {/* Navbar End */}

      {/* Login / Registration Modal Start */}
      <div className="modal fade" id="loginModal" tabIndex="-1" aria-labelledby="loginModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="loginModalLabel">{showLogin ? 'Login' : 'Create an Account'}</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              {showLogin ? (
                <Formik
                  initialValues={loginInitialValues}
                  validationSchema={loginValidationSchema}
                  onSubmit={handleLoginSubmit}
                >
                  {({ isSubmitting }) => (
                    <Form>
                      <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <Field type="email" className="form-control" id="email" name="email" />
                        <ErrorMessage name="email" component="div" className="text-danger" />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <Field type="password" className="form-control" id="password" name="password" />
                        <ErrorMessage name="password" component="div" className="text-danger" />
                      </div>
                      <button type="submit" className="btn btn-primary" disabled={isSubmitting}>{isSubmitting ? 'Logging in...' : 'Login'}</button>
                      <p className="mt-3">Don't have an account? <button className="btn btn-link p-0" onClick={toggleLoginRegistration}>Create one</button></p>
                    </Form>
                  )}
                </Formik>
              ) : (
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
                >
                  {({ isSubmitting }) => (
                    <Form >
                      <div className="mb-3">
                        <label htmlFor="username" className="form-label">Full Name</label>
                        <Field type="text" className="form-control" id="username" name="username" />
                        <ErrorMessage name="username" component="div" className="text-danger" />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="mobile" className="form-label">Mobile Number</label>
                        <Field type="text" className="form-control" id="mobile" name="mobile" />
                        <ErrorMessage name="mobile" component="div" className="text-danger" />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <Field type="email" className="form-control" id="email" name="email" />
                        <ErrorMessage name="email" component="div" className="text-danger" />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <Field type="password" className="form-control" id="password" name="password" />
                        <ErrorMessage name="password" component="div" className="text-danger" />
                      </div>
                      <button type="submit" className="btn btn-primary" disabled={isSubmitting}>     {isSubmitting ? 'Submitting...' : 'Register'}</button>
                      <p className="mt-3">Already have an account? <button className="btn btn-link p-0" onClick={toggleLoginRegistration}>Login</button></p>
                    </Form>
                  )}
                </Formik>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Login / Registration Modal End */}
    </>
  );
}

export default Header;
