import axios from 'axios'
import { useFormik } from 'formik'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useState, useRef } from 'react'
import { Config } from "./Config"
import "./Register.css"
import Confetti from "react-confetti";

function Register() {

  const navigate = useNavigate()
  const [check, setCheck] = useState(false)
  const [dialog, setDialog] = useState(false)
  const [response, setResponse] = useState("")
  const [loading, setLoading] = useState(false)
  const [nav, setNav] = useState(false)
  const [celebrate, setCelebrate] = useState(false)
  const confetiRef = useRef(null);
  const register = useFormik({
    initialValues: {
      username: "",
      email: '',
      phoneno: "",
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
      if (!values.email) {
        errors.email = "please enter your email"
      }
      else if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = "please enter valid email"
      }
      let nan = isNaN(values.phoneno)
      if (!values.phoneno) {
        errors.phoneno = "Please enter your phoneno"
      }

      else if (nan) {
        errors.phoneno = "Please enter only numbers"
      }

      else if (values.phoneno.length !== 10) {
        errors.phoneno = "Please enter 10 numbers"
      }
      if (!values.password) {
        errors.password = "Please enter the password"
      }
      else if (values.password.length <= 3 || values.password.length >= 15) {
        errors.password = "Please enter the 4 to 15 characters"
      }
      return errors;
    },

    onSubmit: async (values) => {
      try {
        // const reg = await axios.post(check ? `${Config.api}/admin/register` : `${Config.api}/user/register`, values)
        const reg = await axios.post(`${Config.api}/user/register`, values)
        console.log(reg)
        if (reg.data.message === "admin created" || reg.data.message === "user created") {
          setDialog(true)
          setCelebrate(true)
          setResponse(reg.data.message)
          register.resetForm()
          setNav(true)
        } else {
          setDialog(true)
          register.resetForm()
          setResponse(reg.data.message)
        }

      } catch (error) {
        // console.log(error.response.data.message)
        console.log(error)
      }
    }

  })

  // const checkbox = () => {
  //   setCheck(!check)
  // }

  const navi = () => {
    nav ? navigate("/") : navigate("/register")
    setDialog(false)
    setCelebrate(false)
  }

  return (
    <>
      <div className='container register'>
        {
          celebrate? <div className="regcel">
            <Confetti numberOfPieces={120} width={1200} height={610} className="cel" /> 
            {/* // https://codesandbox.io/examples/package/react-confetti */}
          </div>: null
        }
         <div className='regpop'>
            {
              dialog ? <div className='dialog' ref={confetiRef}>
                <p className='mx-auto'>{response}</p>
                <input type="submit" value="Done" className="btn btn-primary mx-auto dialogbtn" onClick={navi} />
                <Confetti numberOfPieces={120} width={1200} height={610} className="cel1" /> 
              </div> : ""
            }
          </div>
        <div className="col-lg-4 col-md-6 col-12 mx-auto">
         
          <form onSubmit={register.handleSubmit} className={`registerform ${dialog ? "opacity-form" : ""}`}>
            <div class="mb-3 text-center">
              <h5 class="py-lg-1 py-3" style={{ fontWeight: "bold", fontSize: "21px" }}>Register Form</h5>
            </div>
            <div className='row'>
              <div className='mt-3'>
                <label>Username</label>
                <input
                  name="username"
                  type="text"
                  id="staticEmail2"
                  onChange={register.handleChange}
                  onBlur={register.handleBlur}
                  value={register.values.username}
                  class={`form-control 
            ${dialog ? "form" : ""}
            ${register.errors.username ? "error-box" : ""}
            ${register.touched.username && !register.errors.username ? "success-box" : ""}`
                  }
                  disabled={dialog ? "disabled" : ""} />
                {
                  register.errors.username ? <span style={{ color: "red" }}>{register.errors.username}</span> : null
                }
              </div>
            </div>

            <div className='row'>
              <div className='mt-3'>
                <label>Email</label>
                <input
                  name="email"
                  type="text"
                  id="inputEmail"
                  onChange={register.handleChange}
                  onBlur={register.handleBlur}
                  value={register.values.email}
                  className={`form-control ${dialog ? "form" : ""}
              ${register.errors.email ? "error-box" : ""}
              ${register.touched.email && !register.errors.email ? "success-box" : ""} `}
                  disabled={dialog ? "disabled" : ""}
                />
                {
                  register.errors.email ? <span style={{ color: "red" }}>{register.errors.email}</span> : null
                }
              </div>
            </div>

            <div className='row'>
              <div className=' mt-3'>
                <label>phone No</label>
                <input
                  name="phoneno"
                  type="text"
                  id='inputPassword2'
                  onChange={register.handleChange}
                  onBlur={register.handleBlur}
                  value={register.values.phoneno}
                  className={`form-control ${dialog ? "form" : ""}
          ${register.errors.phoneno ? "errpr-box" : ""}
          ${register.touched.phoneno && !register.errors.phoneno ? "success-box" : ""}`
                  }
                  disabled={dialog ? "disabled" : ""} />
                {
                  register.errors.phoneno ? <span style={{ color: "red" }}>{register.errors.phoneno}</span> : null
                }
              </div>
            </div>

            <div className='row'>
              <div className='mt-3'>
                <label>Password</label>
                <input
                  name="password"
                  type="password"
                  id='inputPassword2'
                  onChange={register.handleChange}
                  onBlur={register.handleBlur}
                  value={register.values.password}
                  className={`form-control ${dialog ? "form" : ""}
          ${register.errors.password ? "errpr-box" : ""}
          ${register.touched.password && !register.errors.password ? "success-box" : ""}`
                  }
                  disabled={dialog ? "disabled" : ""} />
                {
                  register.errors.password ? <span style={{ color: "red" }}>{register.errors.password}</span> : null
                }
              </div>
            </div>

            {/* <div className='col-lg-3 mt-3'>
          <input
            class={`form-check-input ${dialog ? "form" : ""}`}
            type="checkbox"
            checked={check}
            onChange={checkbox}
            value=""
            id="flexCheckDefault"
            disabled={dialog ? "disabled" : ""} />
          <span><label class="form-check-label" for="flexCheckDefault">If you are admin?</label></span>
        </div> */}

            <div className='col-lg-12 mt-3' style={{ marginTop: "20px", display: "flex", justifyContent: "center" }}>
              <input type="submit" value="Register"
                className={`btn btn-primary ${dialog ? "form" : ""} regbtn`}
                disabled={dialog ? "disabled" : ""} />
            </div>

          </form>

        </div>
      </div>
    </>
  )
}

export default Register