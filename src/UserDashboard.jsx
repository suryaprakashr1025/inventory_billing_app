import React, { useEffect, useState, useContext } from 'react'
import "./UserDashboard.css"
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import axios from 'axios'
import { Config } from './Config'
import { FcRating } from 'react-icons/fc';
import { FaTimes } from 'react-icons/fa';
import { Link, useNavigate } from "react-router-dom"
import { UserContext } from './Usercontext'
import { jsPDF } from 'jspdf'
import { InfinitySpin, Vortex, ColorRing } from 'react-loader-spinner'


function UserDashboard() {
  const navigate = useNavigate()
  const findName = useContext(UserContext)

  const [product, setProduct] = useState([])
  const [user, setUser] = useState([])
  const [priceValue, setPriceValue] = useState(0)
  const [table, setTable] = useState(true)
  const [popup, setPopup] = useState(false)
  const [productid, setProductid] = useState("")
  const [productName, setProductName] = useState("")
  const [touched, setTouched] = useState(false)
  const [loading, setLoading] = useState(false)
  const [loading1, setLoading1] = useState(false)
  const [collapse, setCollapse] = useState(true)
  const [producttrue, setProducttrue] = useState(false)
  const [orderid, setOrderid] = useState("")
  const [list ,setList] = useState(false)
  const getProducts = async () => {
    try {
      setLoading(true)
      const getData = await axios.get(`${Config.api}/getProducts`)
      setProduct(getData.data)
      setLoading(false)
    } catch (error) {
      alert("something went wrong")
    }
  }

  const getuserproduct = async () => {
    try {
      const getUser = await axios.get(`${Config.api}/getusers`)
      const userId = getUser.data.findIndex(user => user.username === localStorage.getItem("name"))
      const uId = getUser.data[userId]._id

      const getoneuser = await axios.get(`${Config.api}/getoneuser/${uId}`)
      // console.log(!getoneuser.data[0].products)
      if (!getoneuser.data[0].products) {
        setProducttrue(false)
      } else {
        findName.setcheckProduct(getoneuser.data[0].products)
        setUser(getoneuser.data[0].products)
        // console.log(getoneuser.data[0].products)
        const result = getoneuser.data[0].products.reduce((i, c) => {
          return i + c.price
        }, 0)

        setPriceValue(result)
      }

    } catch (error) {
      alert("getUser error")
    }
  }

  const receipt = () => {
    setTable(false)

    const doc = new jsPDF("p", "pt", "a4")
    doc.html(document.querySelector("#download"), {
      callback: function (pdf) {

        let result = doc.internal.getNumberOfPages()

        for (let i = result; i > 1; i--) {
          pdf.deletePage(i)
        }

        pdf.save("Receipt.pdf");
        setTable(true)
      }
    }
    )

  }

  useEffect(() => {
    getProducts()
    getuserproduct()
  }, [])

  const remove = (proid, orderid) => {
    setLoading1(true)
    setPopup(true)
    setProductid(proid)
    setOrderid(orderid)
    setLoading1(false)
  }

  const yes = async () => {
    try {

      setLoading1(true)
      const getUser = await axios.get(`${Config.api}/getusers`)
      const userId = getUser.data.findIndex(user => user.username === localStorage.getItem("name"))
      const uId = getUser.data[userId]._id

      const findproductid = getUser.data[userId].products.findIndex(product => product.id === productid)
      console.log(getUser.data[userId].products[findproductid].Quantity)

      const qtylen = await axios.get(`${Config.api}/getoneproduct/${productid}`)
      console.log(qtylen.data.countInStock)

      const stack = parseInt(getUser.data[userId].products[findproductid].Quantity) + parseInt(qtylen.data.countInStock)
      console.log(stack)

      const changeqty = await axios.put(`${Config.api}/changequantity/${productid}`, {
        countInStock: stack
      })

      const removeCart = await axios.put(`${Config.api}/userdeleteproduct/${uId}`, { id: productid })

      const deleteOrder = await axios.delete(`${Config.api}/deleteorder/${orderid}`)

      getuserproduct()
      setPopup(false)
      setLoading1(false)

    } catch (error) {
      alert("delete from cart error")
    }
  }

  const no = () => {
    setPopup(false)
  }

  const search = (e) => {

    setProductName(e.toLowerCase())
    console.log(e.length)
    if(e.length === productName.length){
      setList(false)
      console.log(list)
    }
  }


  const handleClick = () => {
    setCollapse(false)
  }
  const handleclose = () => {
    setCollapse(true)
  }
  const logout = () => {
    localStorage.removeItem("inventorybill")
    localStorage.removeItem("name")
    navigate("/")
  }
  return (
    <>
      {/* navbar */}
      <nav class="navbar navbar-expand-lg bg-light user ">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">Inventory Billing App</a>
          {
            collapse ? <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation" onClick={handleClick}>
              <span class="navbar-toggler-icon"></span>
            </button> :
              <button class="navbar-toggler close" type="button" onClick={handleclose}>
                <span><FaTimes /></span>
              </button>
          }

          <div class={`${collapse ? "collapse" : ""} navbar-collapse navcoll`} id="navbarNavDropdown">
            <ul class="navbar-nav">
              <li class="nav-item">
                <a class="nav-link" aria-current="page" href="#home" onClick={handleclose}>Home</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#products" onClick={handleclose}>Products</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#cartitems" onClick={handleclose}>Cart</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#" onClick={logout}>Logout</a>
              </li>


            </ul>
          </div>
        </div>
      </nav>

      {/* popup */}
      {
        popup ? <div className='mx-auto text-center py-2 popupalign'
          style={{
            width: "60%",
            borderRadius: "25px"
          }}>

          <label>
            Would you like to remove product from cart?</label>

          <div style={{ display: "flex", justifyContent: "center", gap: "5px" }} className="col-lg-12 py-2 ">

            <button className="btn btn-outline-dark popupbtn" onClick={yes}
              style={{
                width: "fit-content",
                border: "1px solid black",
                fontWeight: "bold"
              }}>{loading1 ? <ColorRing
                visible={true}
                height="30"
                width="50"
                ariaLabel="blocks-loading"
                wrapperStyle={{}}
                wrapperClass="blocks-wrapper"
                colors={['white', 'white', 'white', 'white', 'white']}
              /> : "Yes"}</button>

            <button className="btn btn-outline-dark popupbtn" onClick={no}
              style={{
                width: "fit-content",
                border: "1px solid black",
                fontWeight: "bold"
              }}> No</button>

          </div>
        </div> : null
      }


      {/* Home */}
      <section id="home" className={` usersection ${popup ? "popupbox" : null}`}>
        <div className='text-center homediv ' >
          <label className="homelabel">Hi, {localStorage.getItem("name")}</label>
          <h3 className="homehead">Welcome to our Site</h3>
          <input type="text"
            placeholder='search products'
            value={productName}
            onBlur={() => setTouched(true)}
            onChange={(e) => { setProductName(e.target.value) }}
            className="form-control mx-auto homesearch" />
          {
            !isNaN(productName) && touched && productName.length !== 0 ? <span style={{ color: "red" }}>Please enter string only</span> : null
          }
          {/* search */}
          {
            productName.length > 0?

              <ul id="myUL" >
                <li className='myli' value={productName} onChange={(e) => setProductName(e.target.value.toLowerCase())}>

                  {
                    product.filter(p => p.name.toLowerCase().includes(productName))
                      .map(pro =>
                        <a className='mya' onClick={() => search(pro.name)}>{pro.name}</a>
                      )
                    }

                </li>
              </ul>
              : null
          }

        </div>
      </section>

      {/* Products */}
      <section id="products" className={`mx-auto usersection  ${popup ? "popupbox" : null}`}>
        {
          loading ? <InfinitySpin
            width='200'
            color="#c4aead "
          /> :
            <div className='container'>
              <h1 className={`${loading ? "loadingpro" : "proh1"} mx-auto`}>All Products</h1>
              <div className='row'>
                {
                  product.filter(p => p.name.toLowerCase().includes(productName)).map(prod => {
                    return (
                      <div className='products col-lg-4 '>
                        <div class="card" >
                          <img src={prod.image} class="card-img-top mx-auto" alt="" />

                          <div class="card-body">
                            <h5 class="card-title text-center">{prod.name}</h5>
                          </div>

                          <ul class="list-group list-group-flush">
                            <li class="list-group-item">Rating: {prod.rating}<FcRating /></li>
                            <li class="list-group-item">Price: Rs.{prod.price}</li>
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
        }
      </section>

      {/* cartitems */}
      <section id="cartitems" className="mx-auto" >
        {

          loading ? <div className='cartload'><Vortex
            visible={true}
            height="80"
            width="80"
            ariaLabel="vortex-loading"
            wrapperStyle={{}}
            wrapperClass="vortex-wrapper"
            colors={['red', 'green', 'blue', 'yellow', 'orange', 'purple']}
          />
          </div> :
            <div>
              <div>
                <h1 className='text-center carthead' style={{ color: "white", fontWeight: "bold" }}>My Cart Items</h1>
              </div>
              {
                user.length > 0 || producttrue ?

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
                                <div className='col-lg-6 text-center cartqtyprice'>
                                  <h6 style={{ color: "white", fontWeight: "bold" }} >Quantity</h6>
                                  <h6 style={{ fontWeight: "bold" }}>{userproduct.Quantity}</h6>
                                  <hr></hr>
                                  <h6 style={{ color: "white", fontWeight: "bold" }}>Total Price</h6>
                                  <h6 style={{ fontWeight: "bold" }}>Rs.{userproduct.price}</h6>
                                </div>
                                <div className='col-lg-12 text-center my-3'>
                                  <button className='btn btn-outline-dark remove' onClick={() => remove(userproduct.id, userproduct.orderId)}
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
                                  <h6 className='text-center' style={{ fontSize: "12px", fontWeight: "bold" }}>Rs. {prodnameprice.price}</h6>
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
                            <h6 className='text-center' style={{ color: "white", fontWeight: "bold" }}>Rs. {priceValue}</h6>
                          </div>

                        </div>
                        <hr />
                        <div className='col-lg-12 text-center my-2'>
                          <button className='btn btn-outline-success download'
                            style={{ color: "black", fontWeight: "bold", border: "1px solid black" }}
                            onClick={receipt}>
                            Receipt
                          </button>
                        </div>
                      </div>

                    </div>
                  </div> : <h3 className='text-center my-3' style={{ fontWeight: "bold" }}>No Cart Items</h3>
              }


            </div>
        }
      </section>

      {/* download receipt */}
      <div className={`container ${table ? "hide" : null}`} id="download">
        <h1 className='text-center' style={{ fontSize: "20px", fontWeight: "bold", color: "rgb(10, 50, 100)" }}>Inventory Billing App</h1>
        <h4 className='text-center' style={{ fontSize: "16px", fontWeight: "bold", color: "rgb(10, 50, 100)" }}>Hi {localStorage.getItem("name")}, this is your price details</h4>
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
                    <td className='pdftd'>Rs.{prod.price}</td>
                  </tr>
                )
              })
            }
          </tbody>
          <tfoot>
            <tr style={{ color: "white", fontSize: "13px" }}>
              <th colSpan={3}>Total</th>
              <th>Rs.{priceValue}</th>
            </tr>
          </tfoot>
        </table>
      </div>

    </>
  )
}

export default UserDashboard