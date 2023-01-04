import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Config } from './Config'
import {Link} from "react-router-dom"
import { UserContext } from './Usercontext'



function Adminproductlist() {
  const userData = useContext(UserContext)
  const [product, setProduct] = useState([])

  useEffect(() => {
    fetchData()
  })

  const fetchData = async () => {
    try {
      const productList = await axios.get(`${Config.api}/getproducts`)
      setProduct(productList.data)
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
 
//console.log(product.length)
  return (

    
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

          {product.map(productlist => {
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
 

  )
}

export default Adminproductlist