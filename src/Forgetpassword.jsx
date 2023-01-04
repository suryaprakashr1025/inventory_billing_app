import axios from 'axios'
import { useFormik } from 'formik'
import React from 'react'
import { Config } from './Config'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
function Forgetpassword() {
    const navigate = useNavigate()
    const [check, setCheck] = useState(false)
    const [response, setResponse] = useState("")
    const [dialog, setDialog] = useState(false)
    //const [loading, setLoading] = useState(false)
    const [nav, setNav] = useState(false)
    const forget = useFormik({
        initialValues: {
            username: "",
            email: ""
        },
        validate: (values) => {
            const errors = {}
            if (!values.username) {
                errors.username = "please enter username"
            }
            else if (values.username.length <= 3 || values.username.length >= 15) {
                errors.username = "please enter 4 to 15 characters"
            }
            if (!values.email) {
                errors.email = "please enter email"
            }
            else if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = "please enter valid email"
            }
            return errors;
        },
        onSubmit: async (values) => {
            try {
                const forgetpassword = await axios.post(check ? `${Config.api}/admin/forgetpassword` : `${Config.api}/user/forgetpassword`, values)
                console.log(forgetpassword)

                if (forgetpassword.data.message === "mail sent successfully") {
                    setDialog(true)
                    forget.resetForm()
                    setResponse(forgetpassword.data.message)
                    setNav(true)
                } else {
                    setDialog(true)
                    forget.resetForm()
                    setResponse(forgetpassword.data.message)
                 
                }
            } catch (error) {
                alert(error.response.data.message)
            }
        }
    })

    const checkbox = () => {
        setCheck(!check)
    }

    const navi = () => {
       nav? navigate("/changepassword"):navigate("/forgetpassword")
       setDialog(false)
    }

    return (
        <div className='container'>
            <form onSubmit={forget.handleSubmit} className={dialog ? "opacity-form" : ""}>

                <div className='row'>
                    <div className='col-lg-6 mt-3'>
                        <label>Username</label>
                        <input name="username"
                            type="text"
                            placeholder="Enter your username"
                            value={forget.values.username}
                            onChange={forget.handleChange}
                            onBlur={forget.handleBlur}
                            className={`form-control ${dialog ? "form" : ""}
                        ${forget.errors.username ? "errors-box" : ""}
                        ${forget.touched.username && !forget.errors.username ? "success-box" : ""}
                        `}
                            disabled={dialog ? "disabled" : ""} />
                        {
                            forget.errors.username ? <span style={{ color: "red" }}>{forget.errors.username}</span> : null
                        }
                    </div>
                </div>

                <div className='row'>
                    <div className='col-lg-6 mt-3'>
                        <label>Email</label>
                        <input name="email"
                            type="text"
                            placeholder='Enter your email'
                            value={forget.values.email}
                            onChange={forget.handleChange}
                            onBlur={forget.handleBlur}
                            className={`form-control ${dialog ? "form" : ""}
                        ${forget.errors.email ? "errors-box" : ""}
                        ${forget.touched.username && !forget.errors.email ? "success-box" : ""}
                        `}
                            disabled={dialog ? "disabled" : ""} />
                        {
                            forget.errors.email ? <span style={{ color: "red" }}>{forget.errors.email}</span> : null
                        }
                    </div>
                </div>

                <div className='row'>
                    <div className='col-lg-12 mt-3'>
                        <input className={`form-check-input ${dialog ? "form" : ""}`}
                            type="checkbox" value=""
                            id="flexCheckDefault"
                            checked={check}
                            onChange={checkbox}
                            disabled={dialog ? "disabled" : ""} />
                        <span><label>If you are admin?</label></span>
                    </div>
                    <div className='col-lg-12 mt-3'>
                        <input className={`btn btn-primary ${dialog ? "form" : ""}`}
                        disabled={dialog ? "disabled" : ""}
                        type={"submit"}
                        value="submit" />
                    </div>
                </div>

            </form>
            {
                dialog ? <div className='dialog'>
                    <h1>{response}</h1>
                    <input type="submit" value="Ok" onClick={navi} className="btn btn-primary" />
                </div> : null

            }
            {/* <div>
                correct or incorrect:{check?"true":"false"}
            </div> */}

        </div>
    )
}

export default Forgetpassword