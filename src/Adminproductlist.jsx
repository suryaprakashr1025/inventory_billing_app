import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Config } from './Config'
import { Link } from "react-router-dom"
import { UserContext } from './Usercontext'
import { Rings } from 'react-loader-spinner'
import "./Adminproductlist.css"


function Adminproductlist() {
  const userData = useContext(UserContext)
  const [product, setProduct] = useState([])
  const [page, setPage] = useState([])
  const [currentPage, setCurrentpage] = useState()
  const [confirm, setConfirm] = useState(false)
  const [message, setMessage] = useState('')
  const [paramsid, setParamsId] = useState("")
  const [loading, setLoading] = useState(false)
  const perPage = 5

  const getData = async () => {
    try {
      setLoading(true)
      const start = perPage * 0;
      const end = start + perPage;
      const getData = await axios.get(`${Config.api}/getproducts`)
      setProduct(getData.data)
      setPage(getData.data.slice(start, end))
      setLoading(false)
    } catch (error) {
      alert("something went wrong")
    }
  }
  useEffect(() => {
    getData()
  }, [])

  const fetchData = async (index) => {
    try {
      const start = perPage * index;
      const end = start + perPage;
      const productList = await axios.get(`${Config.api}/getproducts`)
      setPage(productList.data.slice(start, end))
      setCurrentpage(index)
    } catch (error) {
      alert("something went wrong")
    }
  }

  const deleteItem = async (id) => {
    try {
      setConfirm(false)
      await axios.delete(`${Config.api}/deleteproduct/${id}`)
      getData()
      setConfirm(false)
    } catch (error) {
      alert("something went wrong")
    }
  }

  const prev = () => {
    if (currentPage !== 0) {
      fetchData(currentPage - 1)
    }
  }

  const next = () => {
    if (currentPage !== (Math.ceil(product.length / perPage)) - 1) {
      fetchData(currentPage + 1)
    }
  }
  console.log(product.length)

  const confirmDelete = (id) => {
    setConfirm(true)
    setMessage("Are you sure you want to delete ?")
    setParamsId(id)
  }

  const no = () => {
    setConfirm(false)
  }

  return (
    <>


      <div className={`tableitem ${confirm ? "disablepage" : null}`} >

        <table class="table">
          <thead>
            <tr>
              <th scope="col">ProductId</th>
              <th scope="col">Name</th>
              <th scope="col">Price</th>
              <th scope="col">Quantity</th>
              <th scope="col">Rating</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>

            {loading ? <div class="d-flex justify-content-center rings" style={{ width: "465%" }}><Rings
              height="80"
              width="80"
              color="black"
              radius="6"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
              ariaLabel="rings-loading"
            /> </div> :
              page.map(productlist => {
                return (
                  <tr>
                    <td>{productlist._id}</td>
                    <td>{productlist.name}</td>
                    <td>{productlist.price}</td>
                    <td>{productlist.countInStock}</td>
                    <td>{productlist.rating}</td>
                    <td>
                      <Link to={`/admindashboard/productlist/${productlist._id}`}><i class="fa-solid fa-pen-to-square"></i></Link>

                      <a onClick={() => confirmDelete(productlist._id)}>    <i class="fa fa-trash"></i></a>
                    </td>
                  </tr>
                )
              })
            }

            {userData.setEdit(product)}
          </tbody>
        </table>
      </div>

      {product.length > 5 ?
        <nav aria-label="Page navigation example" className={`navpage mx-auto ${confirm ? "disablepage" : null}`}>
          <div className='paginationdiv'>
            <ul class="nav justify-content-center pageul my-3">
              <li class="nav-item">
                <a class="nav-link pagelink" onClick={prev}>Prev</a>
              </li>
              {
                product.length > 5 ?
                  [...Array(Math.ceil(product.length / perPage))].map((page, index) => {
                    return (
                      <li class="nav-item">
                        <a class="nav-link pagelink" onClick={() => fetchData(index)}>{index + 1}</a>
                      </li>
                    )
                  })
                  : null
              }
              <li class="nav-item">
                <a class="nav-link pagelink" onClick={next}>Next</a>
              </li>
            </ul>
          </div>
        </nav> : null
      }

      {
        confirm ?
          <div className='productpopup mx-auto '>
            <h5>{message}</h5>
            <button class="btn btn-primary productbtn mx-3" onClick={() => deleteItem(paramsid)}>Yes</button>
            <button class="btn btn-primary productbtn mx-3" onClick={() => no()}>No</button>
          </div> : null
      }
    </>
  )
}

export default Adminproductlist