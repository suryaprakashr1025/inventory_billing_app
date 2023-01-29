import axios from 'axios'
import { useFormik } from 'formik'
import React from 'react'
import { Config } from './Config'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import "./Forgetpassword.css"
import { ThreeDots } from 'react-loader-spinner'
function Forgetpassword() {
    const navigate = useNavigate()
    const [check, setCheck] = useState(false)
    const [response, setResponse] = useState("")
    const [dialog, setDialog] = useState(false)
    const [loading, setLoading] = useState(false)
    const [nav, setNav] = useState(false)
    const forget = useFormik({
        initialValues: {
            username: "",
            email: ""
        },
        validate: (values) => {
            const errors = {}
            if (!values.username) {
                errors.username = "Please enter username"
            }
            else if (values.username.length <= 3 || values.username.length >= 15) {
                errors.username = "Please enter 4 to 15 characters"
            }
            if (!values.email) {
                errors.email = "Please enter email"
            }
            else if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = "Please enter valid email"
            }
            return errors;
        },
        onSubmit: async (values) => {
            try {
                setLoading(true)
                // const forgetpassword = await axios.post(check ? `${Config.api}/admin/forgetpassword` : `${Config.api}/user/forgetpassword`, values)
                const forgetpassword = await axios.post(`${Config.api}/user/forgetpassword`, values)
                console.log(forgetpassword)

                if (forgetpassword.data.message === "mail sent successfully") {
                    setLoading(false)
                    setDialog(true)
                    forget.resetForm()
                    setResponse(forgetpassword.data.message)
                    setNav(true)
                } else {
                    setLoading(false)
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
        <div className='container forget'>
              {
                dialog ? <div className='dialog3'>
                    <p className='mx-auto'>{response}</p>
                    <input type="submit" value="Done" onClick={navi} className="btn btn-primary mx-auto" />
                </div> : null

            }
             <div className="col-lg-4 col-md-6 col-12 mx-auto">
            <form onSubmit={forget.handleSubmit} className={`forgetform ${dialog ? "opacity-form" : ""}`}>
            <div class="mb-3 text-center">
                            <h5 class="py-lg-1 py-3" style={{ fontWeight: "bold", fontSize: "21px" }}>Forget Password</h5>
                        </div>
                <div className='row'>
                    <div className='mt-3'>
                        <label>Username</label>
                        <input name="username"
                            type="text"
                            value={forget.values.username}
                            onChange={forget.handleChange}
                            onBlur={forget.handleBlur}
                            className={`form-control ${dialog ? "form" : ""}
                        ${forget.errors.username ? "errors-box" : ""}
                        ${forget.touched.username && !forget.errors.username ? "success-box" : ""}
                        `}
                            disabled={dialog ? "disabled" : ""} />
                        {
                            forget.errors.username ? <span className='errortext'>{forget.errors.username}</span> : null
                        }
                    </div>
                </div>

                <div className='row'>
                    <div className='mt-3'>
                        <label>Email</label>
                        <input name="email"
                            type="text"
                            value={forget.values.email}
                            onChange={forget.handleChange}
                            onBlur={forget.handleBlur}
                            className={`form-control ${dialog ? "form" : ""}
                        ${forget.errors.email ? "errors-box" : ""}
                        ${forget.touched.username && !forget.errors.email ? "success-box" : ""}
                        `}
                            disabled={dialog ? "disabled" : ""} />
                        {
                            forget.errors.email ? <span className='errortext'>{forget.errors.email}</span> : null
                        }
                    </div>
                </div>

                <div className='row'>
                    {/* <div className='mt-3'>
                        <input className={`form-check-input ${dialog ? "form" : ""}`}
                            type="checkbox" value=""
                            id="flexCheckDefault"
                            checked={check}
                            onChange={checkbox}
                            disabled={dialog ? "disabled" : ""} />
                        <span><label>If you are admin?</label></span>
                    </div> */}
                    <div className='col-lg-12 mt-3' style={{marginTop:"20px",display:"flex",justifyContent:"center"}}>
                        <button className={`btn btn-primary ${dialog ? "form" : ""} forgetbtn`}
                        disabled={dialog ? "disabled" : ""}
                        type={"submit"}
                        value="submit" > {loading ? <div style={{ display: "flex", justifyContent: "center" }}><ThreeDots
                        height="25"
                        width="40"
                        radius="10"
                        color="white"
                        ariaLabel="three-dots-loading"
                        wrapperStyle={{}}
                        wrapperClassName=""
                        visible={true} />
                      </div> : "Change Password"} </button>
                    </div>
                </div>

            </form>
          
            {/* <div>
                correct or incorrect:{check?"true":"false"}
            </div> */}
</div>
        </div>
    )
}

export default Forgetpassword