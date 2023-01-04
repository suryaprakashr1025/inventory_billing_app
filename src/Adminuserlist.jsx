import React, { useEffect, useState } from 'react'
import { Config } from './Config'
import axios from 'axios'
function Adminuserlist() {
    const [user, setUser] = useState([])

    useEffect(() => {
        fetchData()
    })
    const fetchData = async () => {
        try {
            const getData = await axios.get(`${Config.api}/getusers`)
            setUser(getData.data)
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
//console.log(user.length)
    return (
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

                    {user.map(userlist => {
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
    )
}

export default Adminuserlist