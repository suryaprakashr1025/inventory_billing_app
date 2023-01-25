import React, { useEffect, useState } from 'react'
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
  const [user, setUser] = useState()
  const [product, setProduct] = useState()
  const [order, setorder] = useState()
  const [productqty, setProductqty] = useState()
  const [orderqty, setorderqty] = useState()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const users = await axios.get(`${Config.api}/getusers`)
        setUser(users.data.length)

        const products = await axios.get(`${Config.api}/getproducts`)
        setProduct(products.data.length)

        const proqty = products.data.reduce((initialprod, prodvalue) => {
          return initialprod + parseInt(prodvalue.countInStock)
        }, 0)
        //console.log(proqty)
        setProductqty(proqty)

        const orders = await axios.get(`${Config.api}/orderlist`)
        setorder(orders.data.length)
        const orqty = orders.data.reduce((initialorder, ordervalue) => {
          return initialorder + parseInt(ordervalue.Quantity)
        }, 0)
        //console.log(orqty)
        setorderqty(orqty)
      } catch (error) {
        alert("something went wrong")
      }
    }
    fetchData()
  }, [])

  const data = {
    labels: ["Users", "Products", "Orders"],
    datasets: [{
      label: "List",
      data: [`${user}`, `${product}`, `${order}`],
      backgroundColor: '#6BA3EB',
      // borderColor: "red",
      // borderWidth: 1
    },
    {
      label: "qty",
      data: [, `${productqty}`, `${orderqty}`],
      backgroundColor: '#78B831',
      // borderColor: "black",
      // borderWidth: 1
    }
    ]
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