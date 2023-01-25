import axios from 'axios'
import React from 'react'
import { useState } from "react"
import { Config } from './Config'
import "./AdminOrderlist.css"
import { useEffect } from 'react'
import { Rings } from 'react-loader-spinner'

function AdminOrderlist() {
    const [orderlist, setorderlist] = useState([])
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState([])
    const [currectPage, setCurrentpage] = useState()
    const perPage = 5

    const getData = async () => {
        try {
            setLoading(true)
            const order = await axios.get(`${Config.api}/orderlist`)
            setorderlist(order.data)
            setPage(order.data)
            setPage(order.data.slice(0, 5))
            setLoading(false)
        } catch (error) {
            alert("orderlist error")
        }
    }

    const fetchData = async (index) => {
        try {
            const start = perPage * index;
            const end = start + perPage;
            const order = await axios.get(`${Config.api}/orderlist`)
            setPage(order.data.slice(start, end))
            setCurrentpage(index)
        } catch (error) {
            alert("something went wrong")
        }
    }

    useEffect(() => {
        getData()
    }, [])

    const prev = () => {
        if (currectPage !== 0) {
            fetchData(currectPage - 1)
        }
    }

    const next = () => {
        if (currectPage !== Math.ceil(orderlist.length / perPage) - 1) {
            fetchData(currectPage + 1)
        }
    }

    const pagenumbers = Math.ceil(orderlist.length / perPage)
    console.log(pagenumbers)

    return (
        <>
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

                        {loading ? <div class="d-flex justify-content-center rings2" style={{ width: "600%" }}><Rings
                            height="80"
                            width="80"
                            color="black"
                            radius="6"
                            wrapperStyle={{}}
                            wrapperClass=""
                            visible={true}
                            ariaLabel="rings-loading"
                        /> </div> :
                            page.map(list => {
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

            {
                orderlist.length > 5 ?
                    <nav aria-label="Page navigation example" className="navpage mx-auto"  >
                        <div className='paginationdiv'>
                            <ul class="nav justify-content-center pageul my-3">
                                <li class="nav-item">
                                    <a class="nav-link pagelink" onClick={prev}>Prev</a>
                                </li>
                                {
                                    orderlist.length > 5 ?
                                        [...Array(pagenumbers)].map((page, index) => {
                                            return (
                                                <li class="nav-item">
                                                    <a class="nav-link pagelink" onClick={() => fetchData(index)}>{index + 1}</a>
                                                </li>
                                            )
                                        }) : null
                                }
                                <li class="nav-item">
                                    <a class="nav-link pagelink" onClick={next}>Next</a>
                                </li>
                            </ul>
                        </div>
                    </nav> : null
            }

        </>
    )
}

export default AdminOrderlist