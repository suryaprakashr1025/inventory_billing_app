import axios from 'axios'
import React, { useEffect, useContext, useRef } from 'react'
import { useState } from 'react'
import { Config } from './Config'
import { useNavigate, useParams } from 'react-router-dom'
import "./viewuserproduct.css"
import { UserContext } from './Usercontext'
import Confetti from 'react-confetti'
function Viewuserproduct() {

    const findName = useContext(UserContext)
    const uname = findName.username
    const checkproduct = [...findName.checkProduct]

    const [getProduct, setGetProduct] = useState([])
    const [options, setOptions] = useState(0)
    const [qty, setQty] = useState(1)
    const [btndisabled, setBtnDisabled] = useState(false)
    const [check, setCheck] = useState("")
    const [celebrate,setCelebrate] = useState(false)
    const navigate = useNavigate()
    const { getproduct } = useParams()
    const confetiRef = useRef(null)

    const checkpro = checkproduct.some(prodid => {
        return prodid.id === getproduct
    })
    // console.log(checkpro)

    const getData = async () => {
        try {
            const product = await axios.get(`${Config.api}/getoneproduct/${getproduct}`)
            setGetProduct([product.data])
            setOptions(product.data.countInStock)
            setCheck(checkpro)
        } catch (error) {
            alert("something went wrong")
        }
    }

    useEffect(() => {
        getData()
    })

    const back = () => {
        navigate("/userdashboard")
    }
    const opt = []
    for (let i = 1; i <= options; i++) {
        opt.push(i)
    }

    const addtocart = async () => {
        try {

            const getUser = await axios.get(`${Config.api}/getusers`)
            const userId = getUser.data.findIndex(user => user.username === uname)
            const uId = getUser.data[userId]._id

            const reviewsList = await axios.put(`${Config.api}/usergetproduct/${uId}`, {
                id: getProduct[0]._id,
                name: getProduct[0].name,
                image: getProduct[0].image,
                price: getProduct[0].price * qty,
                Quantity: qty
            })

            setBtnDisabled(true)
            setCelebrate(true)
        } catch (error) {
            alert("this is update error")
        }
    }
    
    const done = () =>{
        setCelebrate(false)
        navigate("/userdashboard")
    }

    return (
        <>
            <div className="box" >
                <div className={`container viewproduct ${celebrate ? "celebratedisabled":null}`}>
                    <div className='row'>

                        <div className='col-lg-12 viewname'>
                            {
                                getProduct.map(prod => {
                                    return (
                                        <h6>{prod.name}</h6>
                                    )
                                })
                            }
                            <a onClick={back}><h6 className='viewback'>Back</h6></a>
                        </div>

                        <div className='col-lg-4 viewimgbtn'>
                            {
                                getProduct.map(prod => {
                                    return (
                                        <img src={prod.image} className="img-fluid mx-auto" />
                                    )
                                })
                            }
                        </div>

                        <div className='col-lg-8 viewpqdsize'>

                            {
                                getProduct.map(prod => {
                                    return (
                                        <div className='row my-4 pqd'>

                                            <div className='col-lg-12 pricequantity'>
                                                <h4>Price</h4>
                                                <h6>Rs. {prod.price * qty}</h6>
                                                <hr />
                                                <h4>Quantity</h4>
                                                {/* <h6>{prod.countInStock}</h6> */}

                                                <select className='selectqty' value={qty} onChange={(e) => setQty(e.target.value)}>
                                                    {
                                                        opt.map((qty, index) => {
                                                            return (<option>{index + 1}</option>)
                                                        })
                                                    }


                                                </select>

                                            </div>

                                            <div className='col-lg-12 viewheadpara my-4 '>
                                                <h3>Description</h3>
                                                <p>{prod.description}</p>
                                            </div>

                                        </div>
                                    )
                                })
                            }

                        </div>

                        <div className='col-lg-12 viewbutton mx-auto'>
                            <input type="button" value={check || btndisabled ? "Added To Cart" : "Add To Cart"} className="btn btn-primary mx-auto inputbtn" onClick={addtocart} disabled={check || btndisabled ? "disabled" : null} />
                        </div>
                    </div>
                </div>
                {
                    celebrate ? <Confetti numberOfPieces={150} height={575} width={1080} style={{marginTop:"25px",marginLeft:"140px"}}/> : null
                }
                 
            </div>
            {
                celebrate ? <div className='col-lg-6 text-center mx-auto celebratediv' ref={confetiRef}>
                    <label>Added to Cart Successfully</label>
                    <button className='btn btn-outline-dark mx-auto my-2' onClick={done} style={{display:"block"}}>Done</button>
                </div>:null
            }
        </>
    )
}

export default Viewuserproduct