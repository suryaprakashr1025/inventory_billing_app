import React, { useEffect } from 'react'
import { Form, useFormik } from 'formik'
import { Config } from './Config'
import axios from 'axios'
import "./Admineditproduct.css"
import { useContext,useState} from 'react'
import { UserContext } from "./Usercontext"
import {useNavigate, useParams } from 'react-router-dom'



function Admineditproduct() {
    const [dis, setdis] = useState(false)
    const [message, setMessage] = useState("")
    const navigate = useNavigate()
    const userData = useContext(UserContext)

    const { editproductparams } = useParams()
    //console.log(editproductparams)

    const product = userData.edit
    //console.log(product)

    const index = product.findIndex((pid) => { return pid._id === editproductparams })
    //console.log(index)

    const getProduct = userData.edit[index]
    //console.log(getProduct)

    const editProduct = useFormik({
        initialValues: {
            name: "",
            image: "",
            price: "",
            countInStock: "",
            rating: "",
            reviews: "",
            category: "",
            description: ""
        },
        validate: (values) => {
            const errors = {}

            if (!values.name) {
                errors.name = "Please Enter Product Name"
            } else if (values.name.length < 5 ) {
                errors.name = "Please Enter the 5 to 15 Characters"
            }

            if (!values.image) {
                errors.image = "Please Enter Image Link"
            } 

            if (!values.price) {
                errors.price = "Please Enter Price"
            } else if (!parseInt(values.price)) {
                errors.price = "Please Enter Only Numbers"
            }

            if (!values.countInStock) {
                errors.countInStock = "Please Enter Quantity"
            } else if (!parseInt(values.countInStock)) {
                errors.countInStock = "Please Enter Only Numbers"
            }

            if (!values.category) {
                errors.category = "Please Enter Category"
            } else if (values.category.length < 5 || values.category.length > 15) {
                errors.category = "Please Enter the 5 to 15 Characters"
            }

            if (!values.description) {
                errors.description = "Please Enter Description"
            }

            return errors;

        },
        onSubmit: async (values) => {

            try {
                const updatelist = await axios.put(`${Config.api}/editproducts/${editproductparams}`, values)
                console.log(updatelist)
                if(updatelist.data.message === "Product Updated Successfully"){
                    setdis(true)
                    setMessage(updatelist.data.message)
                }else{
                    setdis(true)
                    setMessage("Product is not Updated")
                }
            } catch (error) {
                alert("something went wrong")
            }

        }
    })

    useEffect(() => {
        editProduct.setValues(getProduct)
    }, [])

    const done = () => {
        navigate("/admindashboard/productlist")
    }
const back = ()=>{
    navigate("/admindashboard/productlist")
}
    return (
        <>
            <div className='container edit'>
                <form onSubmit={editProduct.handleSubmit} className="form-group editform">

                    <nav class="navbar navbar-expand-lg bg-dark ">
                        <div class="container editnav ">
                            <a class="navbar-brand editlink mx-auto">Update Product</a>
                            <a class="navbar-brand editlink1 ms-left back" onClick={back}>Back</a>
                        </div>
                    </nav>

                    <div className='row editrow'>

                        <div className='col-lg-6 mb-3'>
                            <div class="form-group">
                                <label className="form-label">Name</label>
                                <input type="text"
                                    name="name"
                                    value={editProduct.values.name}
                                    onChange={editProduct.handleChange}
                                    onBlur={editProduct.handleBlur}
                                    className={`form-control
                                    ${editProduct.errors.name ? "errors-box" : ""}
                                    ${editProduct.touched.name && !editProduct.errors.name ? "success-box" : ""}`}
                                    disabled={dis ? "disabled" : ""}
                                />
                                {
                                    editProduct.errors.name ? <span style={{ color: "red" }}>{editProduct.errors.name}</span> : null
                                }
                            </div>
                        </div>

                        <div className='col-lg-6 mb-3'>
                            <div class="form-group">
                                <label className='form-label'>Image Url</label>
                                <input type="text"
                                    name="image"
                                    value={editProduct.values.image}
                                    onChange={editProduct.handleChange}
                                    onBlur={editProduct.handleBlur}
                                    className={`form-control
                                    ${editProduct.errors.image ? "errors-box" : ""}
                                    ${editProduct.touched.image && !editProduct.errors.image ? "success-box" : ""}`}
                                        disabled={dis ? "disabled" : ""} />
                                    {
                                        editProduct.errors.image ? <span style={{ color: "red" }}>{editProduct.errors.image}</span> : null
                                    }
                            </div>
                        </div>

                        <div className='col-lg-6 mb-3'>
                            <div class="form-group">
                                <label className='form-label'>Price</label>
                                <input type="number"
                                    name="price"
                                    value={editProduct.values.price}
                                    onChange={editProduct.handleChange}
                                    onBlur={editProduct.handleBlur}
                                    className={`form-control
                                    ${editProduct.errors.price ? "errors-box" : ""}
                                    ${editProduct.touched.price && !editProduct.errors.price ? "success-box" : ""}`}
                                        disabled={dis ? "disabled" : ""} />
                                    {
                                        editProduct.errors.price ? <span style={{ color: "red" }}>{editProduct.errors.price}</span> : null
                                    }
                            </div>
                        </div>

                        <div className='col-lg-6 mb-3'>
                            <div class="form-group">
                                <label className='form-label'>Quantity</label>
                                <input type="number"
                                    name="countInStock"
                                    value={editProduct.values.countInStock}
                                    onChange={editProduct.handleChange}
                                    onBlur={editProduct.handleBlur}
                                    className={`form-control
                                    ${editProduct.errors.countInStock ? "errors-box" : ""}
                                    ${editProduct.touched.countInStock && !editProduct.errors.countInStock ? "success-box" : ""}`}
                                        disabled={dis ? "disabled" : ""} />
                                    {
                                        editProduct.errors.countInStock ? <span style={{ color: "red" }}>{editProduct.errors.countInStock}</span> : null
                                    }
                            </div>
                        </div>

                        <div className='col-lg-6 mb-3'>
                            <div class="form-group">
                                <label className='form-label'>Rating</label>
                                <select type="number"
                                    name="rating"
                                    value={editProduct.values.rating}
                                    onChange={editProduct.handleChange}
                                    onBlur={editProduct.handleBlur}
                                    disabled={dis ? "disabled" : ""}
                                    className="form-control">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </select>
                            </div>
                        </div>

                        <div className='col-lg-6 mb-3'>
                            <div class="form-group">
                                <label className='form-label'>Category</label>
                                <input type="text"
                                    name="category"
                                    value={editProduct.values.category}
                                    onChange={editProduct.handleChange}
                                    onBlur={editProduct.handleBlur}
                                    className={`form-control
                                    ${editProduct.errors.category ? "errors-box" : ""}
                                    ${editProduct.touched.category && !editProduct.errors.category ? "success-box" : ""}`}
                                        disabled={dis ? "disabled" : ""} />
                                    {
                                        editProduct.errors.category ? <span style={{ color: "red" }}>{editProduct.errors.category}</span> : null
                                    }
                            </div>
                        </div>

                        <div className='col-lg-12 mb-3'>
                            <div class="form-group">
                                <label className='form-label'>Description</label>
                                <textarea type="text"
                                    name="description"
                                    value={editProduct.values.description}
                                    onChange={editProduct.handleChange}
                                    onBlur={editProduct.handleBlur}
                                    className={`form-control
                                    ${editProduct.errors.description ? "errors-box" : ""}
                                    ${editProduct.touched.description && !editProduct.errors.description ? "success-box" : ""}`}
                                        disabled={dis ? "disabled" : ""}>
                                    </textarea>
                                    {
                                        editProduct.errors.description ? <span style={{ color: "red" }}>{editProduct.errors.description}</span> : null
                                    }
                            </div>
                        </div>

                    </div>

                    <div class="d-grid  col-4 mx-auto my-2">
                        <input class="btn btn-primary editbtn" type="submit" value="Update"  disabled={dis ? "disabled" : ""} />
                    </div>

                </form>
                
            </div>
            {
                dis ?
                    <div className='celebrate mx-auto'>
                        <h5>{message}</h5>
                        <hr className='horizontal' />
                        <button class="btn btn-primary celebratebtn" onClick={done}>Done</button>
                    </div> : null
            }
        </>
    )
}

export default Admineditproduct