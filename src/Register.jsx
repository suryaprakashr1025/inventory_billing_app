import axios from 'axios'
import { useFormik } from 'formik'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { Config } from "./Config"
import "./Register.css"
function Register() {
  const navigate = useNavigate()
  const [check, setCheck] = useState(false)
  const [dialog, setDialog] = useState(false)
  const [response, setResponse] = useState("")
  const [loading, setLoading] = useState(false)
  const [nav, setNav] = useState(false)
  const register = useFormik({
    initialValues: {
      username: "",
      email:'',
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
      if(!values.email){
        errors.email = "please enter your email"
      }
      else if(values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)){
        errors.email="please enter valid email"
      }
      if (!values.password) {
        errors.password = "please enter the password"
      }
      else if (values.password.length <= 3 || values.password.length >= 15) {
        errors.password = "please enter the 4 to 15 characters"
      }
      return errors;
    },
    onSubmit: async (values) => {
      try {
        const reg = await axios.post(check ? `${Config.api}/admin/register` : `${Config.api}/user/register`, values)
        console.log(reg)
        if(reg.data.message === "admin created" || reg.data.message === "user created"){
          setDialog(true)
         
          setResponse(reg.data.message)
          register.resetForm()
          setNav(true)
        }else {
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
  const checkbox = () => {
    setCheck(!check)
  }
  const navi = () => {
    nav ? navigate("/") : navigate("/register")
    setDialog(false)
  }
  return (
    <div className='container'>
      <form onSubmit={register.handleSubmit} className={dialog ? "opacity-form" : ""}>
        <div className='row'>
          <div className='col-lg-6 mt-3'>
            <label>Username</label>
            <input
              name="username"
              type="text"
              id="staticEmail2"
              placeholder='Enter the Username'
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
          <div className='col-lg-6 mt-3'>
            <label>Email</label>
            <input
              name="email"
              type="text"
              id="inputEmail"
              placeholder='Enter your Email'
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
          <div className='col-lg-6 mt-3'>
            <label>Password</label>
            <input
              name="password"
              type="password"
              id='inputPassword2'
              placeholder='Enter the Password'
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

        <div className='col-lg-3 mt-3'>
          <input
            class={`form-check-input ${dialog ? "form" : ""}`}
            type="checkbox"
            checked={check}
            onChange={checkbox}
            value=""
            id="flexCheckDefault"
            disabled={dialog ? "disabled" : ""} />
          <span><label class="form-check-label" for="flexCheckDefault">If you are admin?</label></span>
        </div>

        <div className='col-lg-3 mt-3'>
          <input type="submit" value="submit"
            className={`btn btn-primary ${dialog ? "form" : ""}`}
            disabled={dialog ? "disabled" : ""} />
        </div>
      </form>
      {
        dialog ? <div className='dialog'>
          <p>{response}</p>
          <input type="submit" value="ok" className="btn btn-primary" onClick={navi} />
        </div> : ""
      }
    </div>
  )
}

export default Register