import React, { useEffect, useState, useContext } from 'react'
import "./UserDashboard.css"
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import axios from 'axios'
import { Config } from './Config'
import { FcRating } from 'react-icons/fc';
import { Link } from "react-router-dom"
import { UserContext } from './Usercontext'
import { jsPDF } from 'jspdf'
import logo from "./logo.svg"
function UserDashboard() {

  const findName = useContext(UserContext)
  const uname = findName.username

  const [product, setProduct] = useState([])
  const [user, setUser] = useState([])
  const [priceValue, setPriceValue] = useState(0)
  const [table, setTable] = useState(false)
  const [popup, setPopup] = useState(false)
  const [productid, setProductid] = useState("")

  const getProducts = async () => {
    try {
      const getData = await axios.get(`${Config.api}/getProducts`)
      setProduct(getData.data)
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
      setUser(getoneuser.data[0].products)

      findName.setcheckProduct(getoneuser.data[0].products)

      const result = user.reduce((i, c) => {
        return i + c.price
      }, 0)
      setPriceValue(result)

    } catch (error) {
      alert("getUser error")
    }
  }

  const receipt = () => {
    setTable(true)
    const doc = new jsPDF("p", "pt", "a4")
    doc.html(document.querySelector("#download"), {
      callback: function (pdf) {
        let result = doc.internal.getNumberOfPages()

        for (let i = result; i > 1; i--) {
          pdf.deletePage(i)
        }

        pdf.save("Receipt.pdf");
      }
    }
    )
    setTable(false)
  }

  useEffect(() => {
    getProducts()
    getuserproduct()
  })

  const remove = (proid) => {

    setPopup(true)
    setProductid(proid)
    // console.log(proid)
  }

  const yes = async () => {
    try {
      const getUser = await axios.get(`${Config.api}/getusers`)
      const userId = getUser.data.findIndex(user => user.username === uname)
      const uId = getUser.data[userId]._id
      // console.log(uId)
      const removeCart = await axios.put(`${Config.api}/userdeleteproduct/${uId}`, { id: productid })
      // console.log(removeCart.data)
      setPopup(false)
    } catch (error) {
      alert("delete from cart error")
    }
  }

  const no = () => {
    setPopup(false)
  }

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
      <section id="home" className={`usersection ${popup ? "popupbox" : null}`}>
        <div className='text-center homediv' >
          <label>Hi, {uname}</label>
          <h3>Welcome to our Site</h3>
          <input className='form-control mx-auto' type="text" placeholder='search products' />
          <button className="btn btn-outline-primary my-2">Search</button>
        </div>
      </section>

      {/* Products */}
      <section id="products" className={`mx-auto usersection  ${popup ? "popupbox" : null}`}>
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
      <section id="cartitems" className="mx-auto" >
        <div>
          <h1 className='text-center' style={{ color: "white", fontWeight: "bold" }}>My Cart Items</h1>
        </div>
        {
          user.length > 0 ?

            <div className={`container cartcontainer my-5 ${popup ? "popupbox" : null}`}>
              <div className='row cartrow'>
                <div className='col-lg-7 detailsbox '>
                  {
                    user.map(userproduct => {
                      return (
                        <div className='row productbox'>
                          <div className='col-lg-12 '>
                            <h6 className='text-center' style={{ color: "white", fontWeight: "bold" }}>{userproduct.name}</h6>
                            <hr></hr>
                          </div>
                          <div className='col-lg-4'>
                            <img src={userproduct.image} className="img-fluid cartimg mx-auto" />
                          </div>
                          <div className='col-lg-6 text-center'>
                            <h6 style={{ color: "white", fontWeight: "bold" }} >Quantity</h6>
                            <h6 style={{ fontWeight: "bold" }}>{userproduct.Quantity}</h6>
                            <hr></hr>
                            <h6 style={{ color: "white", fontWeight: "bold" }}>Total Price</h6>
                            <h6 style={{ fontWeight: "bold" }}>Rs.{userproduct.price}</h6>
                          </div>
                          <div className='col-lg-12 text-center my-3'>
                            <button className='btn btn-outline-dark remove' onClick={() => remove(userproduct.id)}
                              style={{ width: "fit-content", fontWeight: "bold" }}>Remove</button>
                          </div>
                        </div>
                      )
                    })
                  }
                </div>
                <div className='col-lg-4 bilbox'>
                  <div className='row '>


                    <div className='col-lg-12'>
                      <h6 className='text-center my-2' style={{ color: "white", fontWeight: "bold" }}>Price Details</h6>
                      <hr />
                    </div>
                    <div className='col-lg-6 col-md-6 col-6'>
                      <h6 className='text-center' style={{ color: "white", fontWeight: "bold" }}>ProductName</h6>
                      <hr />
                    </div>
                    <div className='col-lg-6 col-md-6 col-6'>
                      <h6 className='text-center' style={{ color: "white", fontWeight: "bold" }}>Price</h6>
                      <hr />
                    </div>
                  </div>

                  {
                    user.map(prodnameprice => {
                      return (
                        <div className='row'>

                          <div className='col-lg-6 col-md-6 col-6'>
                            <h6 className='text-center' style={{ fontSize: "12px", fontWeight: "bold" }}>{prodnameprice.name}</h6>
                          </div>

                          <div className='col-lg-6 col-md-6 col-6'>
                            <h6 className='text-center' style={{ fontSize: "12px", fontWeight: "bold" }}>Rs.{prodnameprice.price}</h6>
                          </div>

                        </div>
                      )
                    })
                  }
                  <hr />
                  <div className='row'>

                    <div className='col-lg-6 col-md-6 col-6'>
                      <h6 className='text-center' style={{ color: "white", fontWeight: "bold" }}>Total</h6>
                    </div>

                    <div className='col-lg-6 col-md-6 col-6'>
                      <h6 className='text-center' style={{ color: "white", fontWeight: "bold" }}>Rs.{priceValue}</h6>
                    </div>

                  </div>
                  <hr />
                  <div className='col-lg-12 text-center my-2'>
                    <button className='btn btn-outline-success download'
                      style={{ color: "black", fontWeight: "bold", border: "1px solid black"}}
                      onClick={receipt}>
                      Receipt
                    </button>
                  </div>
                </div>

              </div>
            </div> : <h3 className='text-center my-3' style={{ fontWeight: "bold" }}>No Cart Items</h3>
        }
        {
          popup ? <div className='mx-auto text-center py-2 popupalign'
            style={{
              width: "60%",
              borderRadius: "25px"
            }}>

            <label>Would you like to remove products from cart?</label>

            <div style={{ display: "flex", justifyContent: "center", gap: "5px" }} className="col-lg-12 py-2 ">

              <button className="btn btn-outline-dark popupbtn" onClick={yes}
                style={{
                  width: "fit-content",
                  border: "1px solid black",
                  
                }} >Yes</button>

              <button  className="btn btn-outline-dark popupbtn" onClick={no}
                style={{
                  width: "fit-content",
                  border: "1px solid black",
                }} > No</button>

            </div>
          </div> : null
        }
      </section>


      <div className='container' id="download" hidden>
        <h1 className='text-center' style={{ fontSize: "20px", fontWeight: "bold", color: "rgb(10, 50, 100)" }}>Inventory Billing App</h1>
        <h4 className='text-center' style={{ fontSize: "16px", fontWeight: "bold", color: "rgb(10, 50, 100)" }}>Hi {uname} This is your price details</h4>
        <table class="table table-bordered border-dark">
          <thead>
            <tr style={{ color: "white", fontSize: "13px" }}>
              <th scope="col">Product Name</th>
              <th scope="col">Price</th>
              <th scope="col">Quantity</th>
              <th scope="col">Total Price</th>
            </tr>
          </thead>
          <tbody>
            {
              user.map(prod => {
                return (
                  <tr className='pdftr' style={{ fontWeight: "bold" }}>
                    <td className='pdftd'>{prod.name}</td>
                    <td className='pdftd'>{prod.price / prod.Quantity}</td>
                    <td className='pdftd'>{prod.Quantity}</td>
                    <td className='pdftd'>{prod.price}</td>
                  </tr>
                )
              })
            }
          </tbody>
          <tfoot>
            <tr style={{ color: "white", fontSize: "13px" }}>
              <th colSpan={3}>Total</th>
              <th>{priceValue}</th>
            </tr>
          </tfoot>
        </table>
      </div>
    </>
  )
}

export default UserDashboard