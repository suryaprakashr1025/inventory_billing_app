import axios from 'axios'
import React, { useEffect, useContext, useRef } from 'react'
import { useState } from 'react'
import { Config } from './Config'
import { useNavigate, useParams } from 'react-router-dom'
import "./viewuserproduct.css"
import { UserContext } from './Usercontext'
import Confetti from 'react-confetti'
import { ThreeDots, Rings } from 'react-loader-spinner'
function Viewuserproduct() {

    const findName = useContext(UserContext)
    const uname = findName.username
    const checkproduct = [...findName.checkProduct]

    const [getProduct, setGetProduct] = useState([])
    const [options, setOptions] = useState(0)
    const [qty, setQty] = useState(1)
    const [btndisabled, setBtnDisabled] = useState(false)
    const [check, setCheck] = useState("")
    const [celebrate, setCelebrate] = useState(false)
    const [loading, setLoading] = useState(false)
    const [loading1, setLoading1] = useState(false)
    const navigate = useNavigate()
    const { getproduct } = useParams()
    const confetiRef = useRef(null)

    const checkpro = checkproduct.some(prodid => {
        return prodid.id === getproduct
    })
    // console.log(checkpro)

    const getData = async () => {
        try {
            setLoading(true)
            const product = await axios.get(`${Config.api}/getoneproduct/${getproduct}`)
            setGetProduct([product.data])
            setOptions(product.data.countInStock)
            setCheck(checkpro)
            setLoading(false)
        } catch (error) {
            alert("something went wrong")
        }
    }

    useEffect(() => {
        getData()
    }, [])

    const back = () => {
        navigate("/userdashboard")
    }
    const opt = []
    for (let i = 1; i <= options; i++) {
        opt.push(i)
    }

    const addtocart = async () => {
        try {
            setLoading1(true)
            const stack = options - qty
            const change = stack.toString()
            // console.log(change)
            // console.log(typeof change)
            const changeqty = await axios.put(`${Config.api}/changequantity/${getproduct}`, {
                countInStock: stack
            })
            const getUser = await axios.get(`${Config.api}/getusers`)
            const userId = getUser.data.findIndex(user => user.username === localStorage.getItem("name"))
            const uId = getUser.data[userId]._id

            const reviewsList = await axios.put(`${Config.api}/usergetproduct/${uId}`, {
                id: getProduct[0]._id,
                name: getProduct[0].name,
                image: getProduct[0].image,
                price: getProduct[0].price * qty,
                Quantity: qty
            })


            setBtnDisabled(true)
            setLoading1(false)
            setCelebrate(true)
            
            const order = await axios.post(`${Config.api}/orderproduct`, {
                username: localStorage.getItem("name"),
                productname: getProduct[0].name,
                price: getProduct[0].price,
                Quantity: qty,
                totalprice: getProduct[0].price * qty
            })
            console.log(order)
        } catch (error) {
            alert("this is update error")
        }
    }

    const done = () => {
        setCelebrate(false)
        navigate("/userdashboard")
    }

    return (
        <>

            <div className={loading ? "loading" : "box"}>
                {

                    loading ?
                        <ThreeDots
                            height="80"
                            width="80"
                            radius="9"
                            color="black"
                            ariaLabel="three-dots-loading"
                            wrapperStyle={{}}
                            wrapperClassName=""
                            visible={loading ? true : false}
                        /> :
                        <div className={`container-fluid viewproduct ${celebrate ? "celebratedisabled" : null}`}>

                            <div className='row'>

                                <div className='col-lg-12 text-center viewname'>
                                    {
                                        getProduct.map(prod => {
                                            return (
                                                <label style={{ fontWeight: "bold", fontSize: "28px", color: "white" }}>
                                                    {prod.name}
                                                </label>
                                            )
                                        })
                                    }
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
                                                        {
                                                            options > 0 ?

                                                                <select className='selectqty' value={qty} onChange={(e) => setQty(e.target.value)}>
                                                                    {
                                                                        opt.map((qty, index) => {
                                                                            return (<option>{index + 1}</option>)
                                                                        })
                                                                    }
                                                                </select> : <h6 style={{ fontSize: "14px" }}>Out of Stock</h6>
                                                        }
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

                                <div className='col-lg-12'>
                                    <div className='row'>
                                        <div className='col-lg-6'>

                                        </div>
                                        <div className='col-lg-6'>
                                            <div className='row viewbutton'>
                                                <div className='col-lg-6'>
                                                    <input type="button"
                                                        value={check || btndisabled ? "Added To Cart" : "Add To Cart"}
                                                        className="btn btn-primary mx-auto inputbtn"
                                                        onClick={addtocart}
                                                        disabled={check || btndisabled || options === 0 ? "disabled" : null} />
                                                </div>

                                                <div className="col-lg-6">
                                                    <input type="button" value="Back" onClick={back} className="btn btn-primary mx-auto inputbtn" />
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>

                            </div>

                        </div>
                }
            </div>

            {loading1 ? <div className="popuploading mx-auto text-center"><label className='text-center'>Please Wait...</label><Rings
                height="50"
                width="50"
                color="white"
                radius="6"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                ariaLabel="rings-loading"
            />
            </div> :
                celebrate ? <div className='col-lg-6 text-center mx-auto celebratediv' ref={confetiRef}>
                    <label>Added to Cart Successfully</label>
                    <button className='btn btn-outline-dark mx-auto my-2' onClick={done} style={{ display: "block" }}>Done</button>
                    {
                        celebrate ? <Confetti numberOfPieces={150} height={300} width={1080} className="confetti" /> : null
                    }
                </div> : null
            }
        </>
    )
}

export default Viewuserproduct