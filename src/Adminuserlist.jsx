import React, { useEffect, useState } from 'react'
import { Config } from './Config'
import axios from 'axios'
import "./Adminuserlist.css"
function Adminuserlist() {
    const [user, setUser] = useState([])
    const [page, setPage] = useState([])
    const [currectPage, setCurrentpage] = useState()
    const perPage = 5

    useEffect(() => {
        const getData = async () => {
            try {
                const start = perPage * 0;
                const end = start + perPage;
                const getData = await axios.get(`${Config.api}/getusers`)
                setUser(getData.data)
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
            const getData = await axios.get(`${Config.api}/getusers`)
            setPage(getData.data.slice(start, end))
            setCurrentpage(index)
        } catch (error) {
            alert("something went wrong")
        }
    }

    const deleteItem = async (id) => {
        try {
            const deletelist = await axios.delete(`${Config.api}/deleteuser/${id}`)
            fetchData()
        } catch (error) {
            alert("something went wrong")
        }
    }

    const prev = () =>{
        if(currectPage !== 0){
            fetchData(currectPage - 1)
        }
    }

    const next = () =>{
       if(currectPage !== Math.ceil(user.length/perPage)-1){
            fetchData(currectPage + 1)
       }
}

    
    return (
        <>
            <div className='tableitem'>
                <table class="table ">
                    <thead>
                        <tr>
                            <th scope="col">UserId</th>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Phone</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>

                        {page.map(userlist => {
                            return (
                                <tr>
                                    <td>{userlist._id}</td>
                                    <td>{userlist.username}</td>
                                    <td>{userlist.email}</td>
                                    <td>{userlist.phoneno}</td>
                                    <td><a onClick={() => deleteItem(userlist._id)}><i class="fa fa-trash" aria-hidden="true"></i></a></td>
                                </tr>
                            )
                        })
                        }

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
                        [...Array(Math.ceil(user.length / perPage))].map((page, index) => {
                            return (
                                <li class="nav-item">
                                    <a class={`nav-link pagelink ${currectPage === index ? "active" :null}`} onClick={() => fetchData(index)}>{index + 1}</a>
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

export default Adminuserlist