import React from 'react'
import { useFormik } from 'formik'
import { Config } from './Config'
import { useState, useRef } from 'react'
import axios from 'axios'
import Confetti from "react-confetti";
import "./Adminaddproduct.css"

function Adminaddproduct() {
    const [add, setAdd] = useState(false)
    const [message, setMessage] = useState("")
    const [height, setHeight] = useState(null);
    const [width, setWidth] = useState(null);
    const [celebrate, setCelebrate] = useState(false)
    const confetiRef = useRef(null);
    const addProduct = useFormik({

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
            } else if (values.name.length < 5 || values.name.length > 15) {
                errors.name = "Please Enter the 5 to 15 Characters"
            }

            if (!values.image) {
                errors.image = "Please Enter Image Link"
            } else if (values.image.length < 8 || values.image.length > 15) {
                errors.image = "Please Enter the 8 to 15 Characters"
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
                const addList = await axios.post(`${Config.api}/addproduct`, values)
                if (addList.data.message === "Product Added Successfully") {
                    setAdd(true)
                    addProduct.resetForm()
                    setMessage(addList.data.message)
                    setCelebrate(true)
                    setHeight(630);
                    setWidth(1250);
                } else {
                    setAdd(true)
                    addProduct.resetForm()
                    setMessage("Product is not added")
                }
            } catch (error) {
                alert("something went wrong")
            }

        }

    })

    const done = () => {
        setCelebrate(false)
        setAdd(false)
    }
    return (
        <>

            <div className='container add '>
                <form onSubmit={addProduct.handleSubmit} className={`form-group addform ${add ? "opacity-add" : null}`}>

                    <div className='row addrow'>

                        <div className='col-lg-6 mb-3'>
                            <div class="form-group">
                                <label className="form-label">Name</label>
                                <input type="text"
                                    name="name"
                                    value={addProduct.values.name}
                                    onChange={addProduct.handleChange}
                                    onBlur={addProduct.handleBlur}
                                    className={`form-control
                                    ${addProduct.errors.name ? "errors-box" : ""}
                                    ${addProduct.touched.name && !addProduct.errors.name ? "success-box" : ""}`}
                                    disabled={add ? "disabled" : ""}
                                />
                                {
                                    addProduct.errors.name ? <span style={{ color: "red" }}>{addProduct.errors.name}</span> : null
                                }
                            </div>
                        </div>

                        <div className='col-lg-6 mb-3'>
                            <div class="form-group">
                                <label className='form-label'>Image Url</label>
                                <input type="text"
                                    name="image"
                                    value={addProduct.values.image}
                                    onChange={addProduct.handleChange}
                                    onBlur={addProduct.handleBlur}
                                    className={`form-control
                                ${addProduct.errors.image ? "errors-box" : ""}
                                ${addProduct.touched.image && !addProduct.errors.image ? "success-box" : ""}`}
                                    disabled={add ? "disabled" : ""} />
                                {
                                    addProduct.errors.image ? <span style={{ color: "red" }}>{addProduct.errors.image}</span> : null
                                }
                            </div>
                        </div>

                        <div className='col-lg-6 mb-3'>
                            <div class="form-group">
                                <label className='form-label'>Price</label>
                                <input type="text"
                                    name="price"
                                    value={addProduct.values.price}
                                    onChange={addProduct.handleChange}
                                    onBlur={addProduct.handleBlur}
                                    className={`form-control
                                ${addProduct.errors.price ? "errors-box" : ""}
                                ${addProduct.touched.price && !addProduct.errors.price ? "success-box" : ""}`}
                                    disabled={add ? "disabled" : ""} />
                                {
                                    addProduct.errors.price ? <span style={{ color: "red" }}>{addProduct.errors.price}</span> : null
                                }
                            </div>
                        </div>

                        <div className='col-lg-6 mb-3'>
                            <div class="form-group">
                                <label className='form-label'>Quantity</label>
                                <input type="text"
                                    name="countInStock"
                                    value={addProduct.values.countInStock}
                                    onChange={addProduct.handleChange}
                                    onBlur={addProduct.handleBlur}
                                    className={`form-control
                                ${addProduct.errors.countInStock ? "errors-box" : ""}
                                ${addProduct.touched.countInStock && !addProduct.errors.countInStock ? "success-box" : ""}`}
                                    disabled={add ? "disabled" : ""} />
                                {
                                    addProduct.errors.countInStock ? <span style={{ color: "red" }}>{addProduct.errors.countInStock}</span> : null
                                }
                            </div>
                        </div>

                        <div className='col-lg-6 mb-3'>
                            <div class="form-group">
                                <label className='form-label'>Rating</label>
                                <select type="number"
                                    name="rating"
                                    value={addProduct.values.rating}
                                    onChange={addProduct.handleChange}
                                    onBlur={addProduct.handleBlur}
                                    disabled={add ? "disabled" : ""}
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
                                    value={addProduct.values.category}
                                    onChange={addProduct.handleChange}
                                    onBlur={addProduct.handleBlur}
                                    className={`form-control
                                ${addProduct.errors.category ? "errors-box" : ""}
                                ${addProduct.touched.category && !addProduct.errors.category ? "success-box" : ""}`}
                                    disabled={add ? "disabled" : ""} />
                                {
                                    addProduct.errors.category ? <span style={{ color: "red" }}>{addProduct.errors.category}</span> : null
                                }
                            </div>
                        </div>

                        <div className='col-lg-12 mb-3'>
                            <div class="form-group">
                                <label className='form-label'>Description</label>
                                <textarea type="text"
                                    name="description"
                                    value={addProduct.values.description}
                                    onChange={addProduct.handleChange}
                                    onBlur={addProduct.handleBlur}
                                    className={`form-control
                                ${addProduct.errors.description ? "errors-box" : ""}
                                ${addProduct.touched.description && !addProduct.errors.description ? "success-box" : ""}`}
                                    disabled={add ? "disabled" : ""}>
                                </textarea>
                                {
                                    addProduct.errors.description ? <span style={{ color: "red" }}>{addProduct.errors.description}</span> : null
                                }
                            </div>
                        </div>

                    </div>

                    <div class="d-grid  col-4 mx-auto my-2">
                        <input class="btn btn-primary addbtn"
                            type="Submit"
                            value="Submit"
                            disabled={add ? "disabled" : ""} />
                    </div>

                </form>
                {
                    celebrate ? <Confetti numberOfPieces={150} width={width} height={height} /> : null
                    // https://codesandbox.io/examples/package/react-confetti
               }

            </div>

            {
                add ?
                    <div className='celebrate mx-auto' ref={confetiRef}>
                        <h5>{message}</h5>
                        <hr className='horizontal' />
                        <button class="btn btn-primary celebratebtn" onClick={done}>Done</button>
                    </div> : null
            }


        </>
    )
}

export default Adminaddproduct