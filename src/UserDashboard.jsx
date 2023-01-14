import React, { useEffect, useState, useContext } from 'react'
import "./UserDashboard.css"
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import axios from 'axios'
import { Config } from './Config'
import { FcRating } from 'react-icons/fc';
import { Link } from "react-router-dom"
import { UserContext } from './Usercontext'


function UserDashboard() {

  const findName = useContext(UserContext)
  const uname = findName.username
  // console.log(findName.username)

  const [product, setProduct] = useState([])
  const [user, setUser] = useState([])
  const getProducts = async () => {
    try {
      const getData = await axios.get(`${Config.api}/getProducts`)
      setProduct(getData.data)
      //findName.setProduct(getData.data)
      //console.log(getData.data)
      // console.log(findName.setAllProduct(getData.data))
    } catch (error) {
      alert("something went wrong")
    }
  }


  const getuserproduct = async () => {
    try {
      const getUser = await axios.get(`${Config.api}/getusers`)
      const userId = getUser.data.findIndex(user => user.username === uname)
      const uId = getUser.data[userId]._id
  
      const getoneuser = await axios.get(`${Config.api}/getoneuser/${uId}`)
      //console.log(getoneuser.data[0].products)
      setUser(getoneuser.data[0].products)
      findName.setcheckProduct(getoneuser.data[0].products)
 
    } catch (error) {
      alert("getUser error")
    }
  }

  useEffect(() => {
    getProducts()
    getuserproduct()
  })

  return (
    <>


      <nav class="navbar navbar-expand-lg bg-light user">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">Inventory Billing App</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mx-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <a class="nav-link" href="#home">Home</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#products">Products</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#cartitems">MyCart</a>
              </li>

            </ul>

          </div>
        </div>
      </nav>

      {/* Home */}
      <section id="home" className='usersection'>
        <div className='text-center homediv' >
          <label>Hi, {uname}</label>
          <h3>Welcome to our Site</h3>
          <input className='form-control mx-auto' type="text" placeholder='search products' />
          <button className="btn btn-outline-primary my-2">Search</button>
        </div>
      </section>

      {/* Products */}
      <section id="products" className='mx-auto usersection'>
        <div className='container'>
          <h1 className='proh1 mx-auto'>All Products</h1>
          <div className='row'>
            {
              product.map(prod => {
                return (
                  <div className='products col-lg-4 '>
                    <div class="card" >
                      <img src={prod.image} class="card-img-top mx-auto" alt="" />

                      <div class="card-body">
                        <h5 class="card-title text-center">{prod.name}</h5>
                      </div>

                      <ul class="list-group list-group-flush">
                        <li class="list-group-item">Rating: {prod.rating}<FcRating /></li>
                        <li class="list-group-item">Price: {prod.price}</li>
                      </ul>

                      <div className='cardbutton mx-auto py-3'>
                        <Link to={`/userdashboard/productlist/${prod._id}`} type="button" class="btn btn-outline-primary">View Details</Link>
                      </div>

                    </div>
                  </div>
                )
              })
            }

          </div>
        </div>
      </section>

      {/* cartitems */}
      <section id="cartitems" className='mx-auto'>
        <div>
          <h1 className='text-center' style={{ color: "white", fontWeight: "bold" }}>My Cart Items</h1>
        </div>
        <div className='container cartcontainer my-5'>
          <div className='row cartrow'>
            <div className='col-lg-7 detailsbox '>
              {
                user.map(userproduct => {
                  return (
                    <div className='row productbox'>
                      <div className='col-lg-12 '>
                        <h6 className='text-center' style={{ color: "white",fontWeight:"bold" }}>{userproduct.name}</h6>
                        <hr></hr>
                      </div>
                      <div className='col-lg-4'>
                        <img src={userproduct.image} className="img-fluid cartimg mx-auto" />
                      </div>
                      <div className='col-lg-6 text-center'>
                        <h6 style={{ color: "white",fontWeight:"bold" }} >Quantity</h6>
                        <h6 style={{ fontWeight: "bold" }}>{userproduct.Quantity}</h6>
                        <hr></hr>
                        <h6 style={{ color: "white",fontWeight:"bold" }}>Total Price</h6>
                        <h6 style={{ fontWeight: "bold" }}>{userproduct.price}</h6>
                      </div>
                    </div>
                  )
                })
              }
            </div>
            <div className='col-lg-4 bilbox'>
              prakash
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default UserDashboard