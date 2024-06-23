import React ,{useState ,  useEffect}from 'react'
import { Link } from 'react-router-dom';
import Header from "../components/Header.jsx"
import Footer from "../components/Footer.jsx"
import { axiosUserInstance } from '../services/axios/axios';



function UserOrders() {

  const [orders, setOrders] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user._id;
  // console.log("userid",userId)
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        
        const response = await axiosUserInstance.get(`/order/getMyOrders/${userId}`);
        console.log("response order,",response.data)
        setOrders(response.data); 
      } catch (error) {
        console.error('Error fetching user orders:', error);
      }
    };

    fetchOrders();
  }, [userId]);




  return (  
    <>
      <Header />
      <div className="container-fluid page-header py-5">
        <h1 className="text-center text-white display-6">My Orders</h1>
        <ol className="breadcrumb justify-content-center mb-0">
          <li className="breadcrumb-item"> <Link to="/" className="breadcrumb-link"> Home</Link></li>
          <li className="breadcrumb-item active text-white">My Orders</li>
        </ol>
      </div>


      {/* user order */}
      <div className="container-fluid py-5">
        <div className="container py-5">
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">OrderID</th>
                  <th scope="col">Products</th>
                  <th scope="col">Name</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Total</th>
                  <th scope="col">Payment Method</th>
                  <th scope="col">Date Of Order</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(order => (
                  <tr key={order._id}>
                    <td>
                      <p className="mb-0 mt-4">{order._id}</p>
                    </td>
                    <td>
                      <div className="d-flex align-items-center">
                        <img
                          src={order.items[0].product.productimages} 
                          className="img-fluid me-5 rounded-circle"
                          style={{ width: '80px', height: '80px' }}
                          alt=""
                        />
                      </div>
                    </td>
                    <td>
                      <p className="mb-0 mt-4">{order.items[0].product.productname}</p>
                    </td>
                    <td>
                      <p className="mb-0 mt-4">{order.items[0].quantity}</p>
                    </td>
                    <td>
                      <p className="mb-0 mt-4">₹{order.totalAmount.toFixed(2)}</p>
                    </td>
                    <td>
                      <p className="mb-0 mt-4">{order.paymentMethod}</p>
                    </td>
                    <td>
                      <p className="mb-0 mt-4">{new Date(order.created_at).toLocaleDateString()}</p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default UserOrders
