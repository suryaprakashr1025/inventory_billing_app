import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Config } from './Config'
import { Link } from "react-router-dom"
import { UserContext } from './Usercontext'



function Adminproductlist() {
  const userData = useContext(UserContext)
  const [product, setProduct] = useState([])
  const [page, setPage] = useState([])
  const [currentPage, setCurrentpage] = useState()
  const perPage = 5

  useEffect(() => {
    const getData = async () => {
      try {
        const start = perPage * 0;
        const end = start + perPage;
        const getData = await axios.get(`${Config.api}/getproducts`)
        setProduct(getData.data)
        setPage(getData.data.slice(start, end))
      } catch (error) {
        alert("something went wrong")
      }
    }
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
      await axios.delete(`${Config.api}/deleteproduct/${id}`)
      fetchData()
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

  return (
    <>

      <div className='tableitem'>

        <table class="table ">
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

            {
              page.map(productlist => {
                return (
                  <tr>
                    <td>{productlist._id}</td>
                    <td>{productlist.name}</td>
                    <td>{productlist.price}</td>
                    <td>{productlist.countInStock}</td>
                    <td>{productlist.rating}</td>
                    <td>
                      <Link to={`/admindashboard/productlist/${productlist._id}`}  ><i class="fa-solid fa-pen-to-square"></i></Link>

                      <a onClick={() => deleteItem(productlist._id)}>    <i class="fa fa-trash"></i></a>
                    </td>
                  </tr>
                )
              })
            }

            {userData.setEdit(product)}
          </tbody>
        </table>
      </div>
      <nav aria-label="Page navigation example" className='navpage mx-auto '>
      <div className='paginationdiv'>
        <ul class="nav justify-content-center pageul my-3">
          <li class="nav-item">
            <a class="nav-link pagelink" onClick={prev}>Prev</a>
          </li>
          {
            //user.length > 1 ?
            [...Array(Math.ceil(product.length / perPage))].map((page, index) => {
              return (
                <li class="nav-item">
                  <a class="nav-link pagelink" onClick={() => fetchData(index)}>{index + 1}</a>
                </li>
              )
            })
            //: null
          }
          <li class="nav-item">
            <a class="nav-link pagelink" onClick={next}>Next</a>
          </li>
        </ul>
        </div>
      </nav>
    </>
  )
}

export default Adminproductlist