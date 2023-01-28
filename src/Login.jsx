import React from 'react'
import "./Login.css"
import { useFormik } from "formik"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Config } from "./Config"
import { useState, useContext } from 'react'
import { UserContext } from './Usercontext'
import { Link } from "react-router-dom"

function Login() {
    const navigate = useNavigate()
    const findName = useContext(UserContext)
    const [check, setCheck] = useState(false)
    const [response, setResponse] = useState("")
    const [dialog, setDialog] = useState(false)
    const [nav, setNav] = useState(false)

    const login = useFormik({
        initialValues: {
            username: "",
            password: ""
        },

        validate: (values) => {
            const errors = {}

            if (!values.username) {
                errors.username = "please enter the username"
            }
            else if (values.username.length <= 3 || values.username.length >= 15) {
                errors.username = "please enter the 4 to 15 characters"
            }
            // const validPassword = new RegExp('^(?=.*?[A-Za-z])(?=.*?[0-9]).{6,}$')
            if (!values.password) {
                errors.password = "please enter the password"
            }
            else if (values.password.length <= 3 || values.password.length >= 15) {
                errors.password = "please enter the 4 to 15 password"
            }
            return errors;
        },

        onSubmit: async (values) => {
            try {
                const user = await axios.post(check ? `${Config.api}/admin/login` : `${Config.api}/user/login`, values)

                localStorage.setItem("inventorybill", user.data.token)

                if (user.data.message === "success") {
                    setDialog(true)
                    login.resetForm()
                    setResponse(user.data.message)
                    setNav(true)
                    localStorage.setItem("name", values.username)
                } else {
                    setDialog(true)
                    setResponse(user.data.message)

                }
            } catch (error) {
                //lert(error.response.data.message)
                alert("something went wrong")
            }
        }
    })

    const checkbox = () => {
        setCheck(!check)
    }

    const navi = () => {
        if (nav === true) {
            const dashboard = check ? navigate("/admindashboard/userlist") : navigate("/userdashboard")
        } else {
            navigate("/")
        }
        setDialog(false)
    }


    return (
        <>
            <div className='container login'>


                <div className="col-lg-4 col-md-6 col-12 mx-auto">


                    <form onSubmit={login.handleSubmit} className={`loginform ${dialog ? "opacity-form" : ""}`}>

                        <div class="mb-3 text-center">
                            <h5 class="py-lg-1 py-3" style={{ fontWeight: "bold", fontSize: "21px" }}>Login Form</h5>
                        </div>

                        <div class="mb-3">
                            <label class="form-label">Username</label>
                            <input
                                name="username"
                                type={"text"}
                                id="staticEmail2"
                                onChange={login.handleChange}
                                onBlur={login.handleBlur}
                                value={login.values.username}
                                class={`form-control ${dialog ? "form" : ""}
                            ${login.errors.username ? "errors-box" : ""}
                            ${login.touched.username && !login.errors.username ? "success-box" : ""}`
                                }
                                disabled={dialog ? "disabled" : ""} />
                            {
                                login.errors.username ? <span style={{ color: "red" }}>{login.errors.username}</span> : null
                            }
                        </div>

                        <div className="mb-3">
                            <label class="form-label">Password</label>
                            <input
                                name="password"
                                type="password"
                                id="inputPassword2"
                                onBlur={login.handleBlur}
                                onChange={login.handleChange}
                                value={login.values.password}
                                class={`form-control ${dialog ? "form" : ""}
                            ${login.errors.password ? "errors-box" : ""}
                            ${login.touched.password && !login.errors.password ? "success-box" : ""}`
                                }
                                disabled={dialog ? "disabled" : ""} />
                            {
                                login.errors.password ? <span style={{ color: "red" }}>{login.errors.password}</span> : null
                            }
                        </div>

                        <div className='text-center form-floating'>
                            <input class={`form-check-input ${dialog ? "form" : ""}`}
                                type="checkbox"
                                checked={check}
                                onChange={checkbox}
                                value="" id="flexCheckDefault"
                                disabled={dialog ? "disabled" : ""} />
                            <span>
                                <label class="form-check-label mx-2" for="flexCheckDefault">If you are admin?</label>
                            </span>
                        </div>

                        <div className='col-lg-12 text-center form-floating mt-2 mb-2 link'>
                            <div className='col-lg-4 text-center form-floating mt-3 '>
                                <Link to="/register" className={`link1 ${dialog ? "disabled" : ""}`} onClick={dialog ? (event) => event.preventDefault() : ""}>R</Link>
                                <label className='r'>Register Here</label>                              
                            </div>

                            <div className='col-lg-4 form-floating mt-3'>
                                <Link to="/changepassword" className={`link2 ${dialog ? "disabled" : ""}`} onClick={dialog ? (event) => event.preventDefault() : ""}>C</Link>
                                <label className='c'>Change Password</label>                            
                            </div>

                            <div className='col-lg-4 form-floating mt-3'>
                                <Link to="/forgetpassword" className={`link3 ${dialog ? "disabled" : ""}`} onClick={dialog ? (event) => event.preventDefault() : ""}>F</Link>
                                <label className='f'>Forget Password</label>
                            </div>
                        </div>

                        <div className="col-lg-12" style={{marginTop:"20px",display:"flex",justifyContent:"center"}}>
                        {/* mb-3 col-lg-6 col-md-6 col-12 py-lg-2 py-3 form-floating mx-auto my-1 */}
                            <input className={`btn btn-primary ${dialog ? "form" : ""} col-lg-12 logbtn`}
                                disabled={dialog ? "disabled" : ""}
                                type={"submit"}
                                value="Login" />
                        </div>
                        
                        <div className='col-lg-12 text-center form-floating mt-2 mb-2 linkres'>
                            <div className='col-lg-4 text-center form-floating mt-3 '>
                                <Link to="/register" className={`linkreg ${dialog ? "disabled" : ""}`} onClick={dialog ? (event) => event.preventDefault() : ""}>Register</Link>
                            </div>

                            <div className='col-lg-4 form-floating mt-3'>
                                <Link to="/changepassword" className={`linkchange ${dialog ? "disabled" : ""}`} onClick={dialog ? (event) => event.preventDefault() : ""}>Change Password</Link>
                            </div>

                            <div className='col-lg-4 form-floating mt-3'>
                                <Link to="/forgetpassword" className={`linkfor ${dialog ? "disabled" : ""}`} onClick={dialog ? (event) => event.preventDefault() : ""}>Forget Password</Link>
                            </div>
                        </div>
                    </form >
                    <div className='adminhover'>
                        <h6 style={{color:"black"}}>Admin</h6>
                        <hr/>
                        <h6 style={{color:"white"}}>Username:  suryaprakash</h6>
                        <h6 style={{color:"white"}}>Password: surya123</h6>
                        <h6>Please Click the checkbox</h6>
                    </div>
                </div>

            </div >
            {
                dialog ? <div className='dialog'>
                    < p > {response}</p >
                    <input type="submit" className='btn btn-primary' value="Ok" onClick={navi} />
                </div > : null
            }

        </>
    )
}

export default Login