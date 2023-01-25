import React, { useEffect, useState } from 'react'
import { Config } from './Config'
import axios from 'axios'
import "./Adminuserlist.css"
import { Comment,Rings } from 'react-loader-spinner'
function Adminuserlist() {
    const [user, setUser] = useState([])
    const [page, setPage] = useState([])
    const [currectPage, setCurrentpage] = useState()
    const [popup, setPopup] = useState(false)
    const [deleteid, setDeleteid] = useState("")
    const [message, setMessage] = useState("")
    const [reason, setReason] = useState("")
    const [verify, setVerify] = useState(false)
    const [sent, setSent] = useState(false)
    const [loading, setLoading] = useState(false)
    const perPage = 5

    const getData = async () => {
        try {
            setLoading(true)
            const getData = await axios.get(`${Config.api}/getusers`)
            setUser(getData.data)
            // const start = perPage * 0;
            // const end = start + perPage;
            setPage(getData.data)
            setPage(getData.data.slice(0, 5))
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
            const getData = await axios.get(`${Config.api}/getusers`)
            setPage(getData.data.slice(start, end))
            setCurrentpage(index)
        } catch (error) {
            alert("something went wrong")
        }
    }

    const deleteItem = async (id) => {
        try {
            setSent(true)
            const setreason = await axios.put(`${Config.api}/setreason/${id}`, {
                reason: `${reason}`
            })

            const deletelist = await axios.delete(`${Config.api}/deleteuser/${id}`)
            // resetForm()
            getData()
            setPopup(false)
            setSent(false)
        } catch (error) {
            alert("something went wrong")
        }
    }

    const prev = () => {
        if (currectPage !== 0) {
            fetchData(currectPage - 1)
        }
    }

    const next = () => {
        if (currectPage !== Math.ceil(user.length / perPage) - 1) {
            fetchData(currectPage + 1)
        }
    }

    const confirm = (id) => {
        setPopup(true)
        setMessage("Why are you delete this user ?")
        setDeleteid(id)
    }

    const secondconfirm = () => {
        setVerify(true)
    }

    const cancel = () => {
        setPopup(false)
    }



    const pagenumbers = Math.ceil(user.length / perPage)
    console.log(pagenumbers)

    return (
        <>
            <div className={`tableitem ${popup ? "userdisablepage" : null}`}>
                <table class="table">
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

                        {loading ? <div class="d-flex justify-content-center rings1" style={{width:"370%"}}><Rings
                            height="80"
                            width="80"
                            color="black"
                            radius="6"
                            wrapperStyle={{}}
                            wrapperClass=""
                            visible={true}
                            ariaLabel="rings-loading"
                        /> </div>:
                            page.map(userlist => {
                                return (
                                    <tr>
                                        <td>{userlist._id}</td>
                                        <td>{userlist.username}</td>
                                        <td>{userlist.email}</td>
                                        <td>{userlist.phoneno}</td>
                                        <td><a onClick={() => confirm(userlist._id)}><i class="fa fa-trash" aria-hidden="true"></i></a></td>
                                    </tr>
                                )
                            })
                        }

                    </tbody>
                </table>
            </div>

            {
                user.length > 5 ?

                    <nav aria-label="Page navigation example" className={`navpage mx-auto ${popup ? "userdisablepage" : null}`} >
                        <div className='paginationdiv'>
                            <ul class="nav justify-content-center pageul my-3">
                                <li class="nav-item">
                                    <a class="nav-link pagelink" onClick={prev}>Prev</a>
                                </li>
                                {
                                    user.length > 5 ?
                                        [...Array(pagenumbers)].map((page, index) => {
                                            return (
                                                <li class="nav-item">
                                                    <a class={`nav-link pagelink ${currectPage === index ? "active" : null}`} onClick={() => fetchData(index)}>{index + 1}</a>
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

            {
                popup ?
                    <div className='popup mx-auto'>
                        <label className='popuph5'>{verify ? message : "Are you sure to delete this user?"}</label>
                        {
                            verify ?
                                <div>
                                    <textarea name="reason"
                                        type="text"
                                        className='popuptext'
                                        placeholder='Reason...'
                                        value={reason}
                                        onChange={(e) => setReason(e.target.value)} ></textarea>
                                    <div>{
                                        sent ? <label style={{ fontSize: "14px", color: "orange" }}>Sent mail<Comment
                                            visible={true}
                                            height="50"
                                            width="50"
                                            ariaLabel="comment-loading"
                                            wrapperStyle={{}}
                                            wrapperClass="comment-wrapper"
                                            color="orange"
                                            backgroundColor="transparent"
                                            border="1px solid green"
                                        /></label>
                                            :
                                            <button class="btn btn-primary productbtn popupbtn mx-2" onClick={() => deleteItem(deleteid)}>Done</button>
                                    }
                                    </div>
                                </div> :
                                <div>
                                    <button class="btn btn-primary productbtn popupbtn mx-2" onClick={secondconfirm}>Yes</button>
                                    <button class="btn btn-primary productbtn popupbtn " onClick={cancel}>No</button>
                                </div>
                        }

                    </div> : null
            }
        </>
    )
}

export default Adminuserlist