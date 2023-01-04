import { useFormik } from 'formik'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useState } from "react"
import { Config } from './Config'
import Register from './Register'
function ChangePassword() {
  const navigate = useNavigate()
  const [check, setCheck] = useState(false)
  const [dialog, setDialog] = useState(false)
  const [response, setResponse] = useState("")
  const [nav, setNav] = useState(false)
  const changePassword = useFormik({
    initialValues: {
      username: "",
      currentPassword: "",
      password: ""
    },
    validate: (values) => {
      const errors = {}

      if (!values.username) {
        errors.username = "please enter your username"
      }
      else if (values.username.length <= 3 || values.username.length >= 15) {
        errors.username = "please enter 4 to 15 characters"
      }

      if (!values.currentPassword) {
        errors.currentPassword = "please enter your currentpassword"
      }
      else if (values.currentPassword.length <= 3 || values.currentPassword.length >= 15) {
        errors.currentPassword = "please enter 4 to 15 charactes"
      }

      if (!values.password) {
        errors.password = 'please enter your newpassword'
      }
      else if (values.password.length <= 3 || values.password.length >= 15) {
        errors.password = "please enter 4 to 15 characters"
      }

      return errors;
    },
    onSubmit: async (values) => {
      try {
        const change = await axios.put(check ? `${Config.api}/admin/${changePassword.values.username}` : `${Config.api}/user/${changePassword.values.username}`, values)
        console.log(change)
        if(change.data.message === "password changed successfully"){
          setDialog(true)
          setResponse(change.data.message)
          changePassword.resetForm()
          setNav(true)
        }else{
          setDialog(true)
          setResponse(change.data.message)
          changePassword.resetForm()
        }
        
      } catch (error) {
        alert("something went wrong")
      }
    }
  })

  const checkbox = () => {
    setCheck(!check)
  }

  const navi = () => {
    nav ? navigate("/") : navigate("/changepassword")
    setDialog(false)
  }

  return (
    <div className='container'>
      <form onSubmit={changePassword.handleSubmit} className={dialog?"opacity-form":""}>
        <div className='row'>
          <div className='col-lg-6 mt-3'>
            <label>Username</label>
            <input
              name="username"
              type="text"
              placeholder='Username'
              value={changePassword.values.username}
              onChange={changePassword.handleChange}
              onBlur={changePassword.handleBlur}
              className={`form-control ${dialog ? "form" : ""}
              ${changePassword.errors.username ? "errors-box" : ""}
              ${changePassword.touched.username && !changePassword.errors.username ? "success-box" : ""}`
              }
              disabled={dialog ? "disabled" : ""} />
            {
              changePassword.errors.username ? <span style={{ color: "red" }}>{changePassword.errors.username}</span> : null
            }
          </div>
        </div>
        <div className='row'>
          <div className='col-lg-6 mt-3'>
            <label>Current Password</label>
            <input
              name="currentPassword"
              type="password"
              placeholder='Current Password'
              value={changePassword.values.currentPassword}
              onChange={changePassword.handleChange}
              onBlur={changePassword.handleBlur}
              className={`form-control ${dialog ? "form" : ""}
              ${changePassword.errors.currentPassword ? "error-box" : ""}
              ${changePassword.touched.currentPassword && !changePassword.errors.currentPassword ? "success-box" : ""}`
              }
              disabled={dialog ? "disabled" : ""} />
            {
              changePassword.errors.currentPassword ? <span style={{ color: "red" }}>{changePassword.errors.currentPassword}</span> : null
            }
          </div>
        </div>
        <div className='row'>
          <div className='col-lg-6 mt-3'>
            <label>New Password</label>
            <input
              name="password"
              type="password"
              placeholder='New Password'
              value={changePassword.values.password}
              onChange={changePassword.handleChange}
              onBlur={changePassword.handleBlur}
              className={`form-control ${dialog ? "form" : ""}
              ${changePassword.errors.password ? "errors-box" : ""}
              ${changePassword.touched.password && !changePassword.errors.password ? "success-box" : ""}`
              }
              disabled={dialog ? "disabled" : ""} />
            {
              changePassword.errors.password ? <span style={{ color: "red" }}>{changePassword.errors.password}</span> : null
            }
          </div>
        </div>
        <div className='row'>
          <div className='col-lg-12 mt-3'>
            <input class={`form-check-input ${dialog ? "form" : ""}`}
              disabled={dialog ? "disabled" : ""}
              type="checkbox"
              checked={check}
              onChange={checkbox}
              value=""
              id="flexCheckDefault" />
            <span><label> If your admin?</label></span>
          </div>
          <div className='col-lg-12 mt-3'>
            <input type="submit"
              value="Submit"
              className={`btn btn-primary ${dialog ? "form" : ""}`}
              disabled={dialog ? "disabled" : ""} />
          </div>
        </div>
      </form>
      {
        dialog ? <div className='dialog'>
          <p>{response}</p>
          <input type="submit" value="Ok" className='btn btn-primary' onClick={navi} />
        </div> : null
      }
    </div>
  )
}

export default ChangePassword