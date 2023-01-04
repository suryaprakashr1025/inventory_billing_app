import React from 'react'
import "./Login.css"
import { useFormik } from "formik"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Config } from "./Config"
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { BsSearch } from 'react-icons/bs'
function Login() {
    const navigate = useNavigate()
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
                console.log(user)
                localStorage.setItem("inventorybill", user.data.token)
                if (user.data.message === "success") {
                    setDialog(true)
                    login.resetForm()
                    setResponse(user.data.message)
                    setNav(true)
                } else {
                    setDialog(true)
                    setResponse(user.data.message)

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
                <div className="col-lg-4 col-md-6 col-12">
                    <form onSubmit={login.handleSubmit} className={`loginform ${dialog ? "opacity-form" : ""}`}>
                    <div class="mb-3 text-center">
                        <h5 class="py-lg-1 py-3">Login Form</h5>
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


                        <div className='mb-3 text-center form-floating'>
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

                        <div className='class="mb-3 col-lg-6 col-md-6 col-12 py-lg-2 py-3 form-floating'>
                            <input className={`btn btn-primary ${dialog ? "form" : ""}`}
                                disabled={dialog ? "disabled" : ""}
                                type={"submit"}
                                value="submit" />
                        </div>

                        {/* <div className='col-lg-12 text-center form-floating mt-3 link'>
                            <Link to="/register" className={dialog ? "disabled" : ""} onClick={dialog ? (event) => event.preventDefault() : ""}>Register</Link>
                        </div>

                        <div className='col-lg-6 form-floating mt-3 link'>
                            <Link to="/changepassword" className={dialog ? "disabled" : ""} onClick={dialog ? (event) => event.preventDefault() : ""}>ChangePassword</Link>
                        </div>

                        <div className='col-lg-6 form-floating mt-3 link'>
                            <Link to="/forgetpassword" className={dialog ? "disabled" : ""} onClick={dialog ? (event) => event.preventDefault() : ""}>ForgetPassword</Link>
                        </div> */}

                    </form >
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