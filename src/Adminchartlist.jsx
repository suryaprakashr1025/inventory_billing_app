import React, { useEffect,useState } from 'react'
import { Chart as chartjs, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js"
import { Bar } from "react-chartjs-2"
import "./Adminchartlist.css"
import axios from 'axios'
import { Config } from './Config'

chartjs.register(
  BarElement, 
  CategoryScale, 
  LinearScale, 
  Tooltip, 
  Legend 
)

function Adminchartlist() {
  const [user,setUser] = useState()
  const [product,setProduct] = useState()
useEffect(()=>{
  const fetchData = async() =>{
    try{
      const users = await axios.get(`${Config.api}/getusers`)
      setUser(users.data.length)
      const products = await axios.get(`${Config.api}/getproducts`)
      setProduct(products.data.length)
    }catch(error){
      alert("something went wrong")
    }
  }
  fetchData()
},[])
const data = {
  labels:["Users","Products","Orders"],
  datasets:[{
    label:"List",
    data:[`${user}`,`${product}`,9],
    backgroundColor:'grey',
    borderColor:"black",
    borderWidth:1
  }]
}
const options = {
  maintainAspectRatio: false
}
  return (
    <div className='text-center chart mx-auto my-12'>

      <Bar
        data={data}
        options={options}
      ></Bar>

 
    </div>
  )
}

export default Adminchartlist