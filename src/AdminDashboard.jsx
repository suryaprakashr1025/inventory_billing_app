import React, { useEffect, useState } from 'react'
import "./AdminDashboard.css"
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import { Link, Navigate, Outlet, useNavigate } from "react-router-dom"
import Adminuserlist from './Adminuserlist'
import { CgLogOut } from "react-icons/cg";
import Adminproductlist from './Adminproductlist'

function AdminDashboard() {
  const navigate = useNavigate()
  const [userlist, setUserlist] = useState("")
  useEffect(() => {

  })

  const logout = () => {
    localStorage.removeItem("myreact")
    localStorage.removeItem("name")
    navigate("/")
  }
  return (
    <>
      {/* Navbar */}

      <nav class=" adminnav">
        <div class="container-fluid navalign">
          <label style={{ color: "green" }}>Inventory Bill App</label>
          <a type="submit" onClick={logout}><CgLogOut />Logout</a>
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
              <Link to="/admindashboard/adminorderlist" class="nav-link link" >OrderList</Link>
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