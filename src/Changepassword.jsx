import { useFormik } from 'formik'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useState } from "react"
import { Config } from './Config'
import Register from './Register'
import "./Changepassword.css"
import { ThreeDots } from 'react-loader-spinner'
function ChangePassword() {
  const navigate = useNavigate()
  const [check, setCheck] = useState(false)
  const [dialog, setDialog] = useState(false)
  const [response, setResponse] = useState("")
  const [nav, setNav] = useState(false)
  const [loading, setLoading] = useState(false)
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
        setLoading(true)
        // const change = await axios.put(check ? `${Config.api}/admin/${changePassword.values.username}` : `${Config.api}/user/${changePassword.values.username}`, values)
        const change = await axios.put(`${Config.api}/user/${changePassword.values.username}`, values)
        console.log(change)
        if (change.data.message === "password changed successfully") {
          setLoading(false)
          setDialog(true)
          setResponse(change.data.message)
          changePassword.resetForm()
          setNav(true)
        } else {
          setLoading(false)
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
    <div className='container change'>
       {
        dialog ? <div className='dialog2'>
          <p>{response}</p>
          <input type="submit" value="Done" className='btn btn-primary mx-auto' onClick={navi} />
        </div> : null
      }
      <div className="col-lg-4 col-md-6 col-12 mx-auto">
        <form onSubmit={changePassword.handleSubmit} className={`changeform ${dialog ? "opacity-form" : ""}`}>
          <div class="mb-3 text-center">
            <h5 class="py-lg-1 py-3" style={{ fontWeight: "bold", fontSize: "21px" }}>Change Password</h5>
          </div>
          <div className='row'>
            <div className='mt-3'>
              <label>Username</label>
              <input
                name="username"
                type="text"
                value={changePassword.values.username}
                onChange={changePassword.handleChange}
                onBlur={changePassword.handleBlur}
                className={`form-control ${dialog ? "form" : ""}
              ${changePassword.errors.username ? "errors-box" : ""}
              ${changePassword.touched.username && !changePassword.errors.username ? "success-box" : ""}`
                }
                disabled={dialog ? "disabled" : ""} />
              {
                changePassword.errors.username ? <span style={{ color: "orange", fontSize: "12px" }}>{changePassword.errors.username}</span> : null
              }
            </div>
          </div>
          <div className='row'>
            <div className='mt-3'>
              <label>Current Password</label>
              <input
                name="currentPassword"
                type="password"
                value={changePassword.values.currentPassword}
                onChange={changePassword.handleChange}
                onBlur={changePassword.handleBlur}
                className={`form-control ${dialog ? "form" : ""}
              ${changePassword.errors.currentPassword ? "errors-box" : ""}
              ${changePassword.touched.currentPassword && !changePassword.errors.currentPassword ? "success-box" : ""}`
                }
                disabled={dialog ? "disabled" : ""} />
              {
                changePassword.errors.currentPassword ? <span style={{ color: "orange", fontSize: "12px" }}>{changePassword.errors.currentPassword}</span> : null
              }
            </div>
          </div>
          <div className='row'>
            <div className='mt-3'>
              <label>New Password</label>
              <input
                name="password"
                type="password"
                value={changePassword.values.password}
                onChange={changePassword.handleChange}
                onBlur={changePassword.handleBlur}
                className={`form-control ${dialog ? "form" : ""}
              ${changePassword.errors.password ? "errors-box" : ""}
              ${changePassword.touched.password && !changePassword.errors.password ? "success-box" : ""}`
                }
                disabled={dialog ? "disabled" : ""} />
              {
                changePassword.errors.password ? <span style={{ color: "orange", fontSize: "12px" }}>{changePassword.errors.password}</span> : null
              }
            </div>
          </div>
          <div className='row'>
            {/* <div className='col-lg-12 mt-3'>
            <input class={`form-check-input ${dialog ? "form" : ""}`}
              disabled={dialog ? "disabled" : ""}
              type="checkbox"
              checked={check}
              onChange={checkbox}
              value=""
              id="flexCheckDefault" />
            <span><label> If your admin?</label></span>
          </div> */}
            <div className='col-lg-12 mt-3 ' style={{ marginTop: "20px", display: "flex", justifyContent: "center" }}>
              <button type="submit"
                className={`btn btn-primary ${dialog ? "form" : ""} changebtn`}
                disabled={dialog ? "disabled" : ""}>
                  {loading ? <div style={{ display: "flex", justifyContent: "center" }}><ThreeDots
                  height="25"
                  width="40"
                  radius="10"
                  color="black"
                  ariaLabel="three-dots-loading"
                  wrapperStyle={{}}
                  wrapperClassName=""
                  visible={true} />
                </div> : "Change Password"}
                  </button> 
            </div>
          </div>
        </form>

      </div>
    </div>
  )
}

export default ChangePassword