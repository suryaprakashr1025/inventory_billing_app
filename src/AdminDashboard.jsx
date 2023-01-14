import React, { useEffect, useState } from 'react'
import "./AdminDashboard.css"
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import { Link, Navigate, Outlet, useNavigate } from "react-router-dom"
import Adminuserlist from './Adminuserlist'
import {CgLogOut} from "react-icons/cg";
import Adminproductlist from './Adminproductlist'

function AdminDashboard() {
  const navigate = useNavigate()
  const [userlist, setUserlist] = useState("")
  useEffect(() => {

  })

  const logout = () =>{
    navigate("/")
  }
  return (
    <>
      {/* Navbar */}
 
        <nav class="navbar bg-dark py-2.9 adminnav">
          <div class="container-fluid">
            <label class="navbar-brand ">Inventory Bill App</label>
            <button class="btn btn-outline-success dashbtn " type="submit" onClick={logout}><CgLogOut/>Logout</button>
          </div>
        </nav>
        
      {/* Section */}
      <section id="section1">
        <label className='text-center'>Admin Panel</label>
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
            <li class="nav-item">
              <Link to="/admindashboard/chartlist" class="nav-link link" >ChartList</Link>
            </li>
          </ul>
        </div>
      </section>
      <Outlet />

    </>
  )
}

export default AdminDashboard