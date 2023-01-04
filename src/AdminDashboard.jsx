import React, { useEffect, useState } from 'react'
import "./AdminDashboard.css"
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import { Link, Outlet, useNavigate } from "react-router-dom"
import Adminuserlist from './Adminuserlist'
import Adminproductlist from './Adminproductlist'

function AdminDashboard() {
  const [userlist, setUserlist] = useState("")
  useEffect(()=>{
    
  })
  return (
    <>
      {/* Navbar */}
      <nav class="navbar navbar-expand-lg" id="navbar">
        <div class="container-fluid">
          <b class="bold">Inventory Bill App</b>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <a class="nav-link nav1" href="#home">Logout</a>
              </li>
              <li class="nav-item">
                <a class="nav-link nav1" href="#about"><i class="fa-solid fa-cart-shopping"></i> Cart</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Section */}
      <section id="section">
        <h5 className='text-center'>Admin Panel</h5>
        <div className=' listitem'>
          <ul class="nav justify-content-center list my-3">
            <li class="nav-item">
              <Link to="/admindashboard/userlist" class="nav-link link" >UserList</Link>
            </li>
            <li class="nav-item">
              <Link to="/admindashboard/productlist" class="nav-link link" >ProductList</Link>
            </li>
            <li class="nav-item">
              <Link to="/admindashboard/addproduct" class="nav-link link" >AddProduct</Link>
            </li>
            <li class="nav-item">
              <a class="nav-link link" href="#">OrderList</a>
            </li>
          </ul>
        </div>
      </section>
<Outlet/>

    </>
  )
}

export default AdminDashboard