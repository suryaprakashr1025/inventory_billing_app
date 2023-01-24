import axios from 'axios'
import React from 'react'
import {useState} from "react"
import { Config } from './Config'
import "./AdminOrderlist.css"
import { useEffect } from 'react'
function AdminOrderlist() {
    const [orderlist,setorderlist] = useState([])
    const fetchData = async() =>{
        try{
            const order = await axios.get(`${Config.api}/orderlist`)
            setorderlist(order.data)
        }catch(error){
            alert("orderlist error")
        }
    }
    useEffect(() =>{
        fetchData()
    },[])
  return (
    <div className="tableitem">
    <table class="table">
        <thead>
            <tr>
                <th scope="col">OrderId</th>
                <th scope="col">Username</th>
                <th scope="col">Productname</th>
                <th scope="col">price</th>
                <th scope="col">Quantity</th>
                <th scope="col">Total Price</th>
            </tr>
        </thead>
        <tbody>

            {orderlist.map(list => {
                return (
                    <tr>
                        <td>{list._id}</td>
                        <td>{list.username}</td>
                        <td>{list.productname}</td>
                        <td>{list.price}</td>
                        <td>{list.Quantity}</td>
                        <td>{list.totalprice}</td>
                    </tr>
                )
            })
            }

        </tbody>
    </table>
</div>
  )
}

export default AdminOrderlist