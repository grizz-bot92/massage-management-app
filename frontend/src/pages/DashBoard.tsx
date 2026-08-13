import "./DashBoard.css"
import React, { useEffect, useState } from "react";




const DashBoard = () => {
  // const [monthlyRevenue, setMonthlyRevenue] = useState("");
  const [totalRevenue, setTotalRevenue] = useState("");
  
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/revenue`)
    .then(response => response.json())
    .then(data => {
      setTotalRevenue(data.totalRevenue)
    })
  }, []);


  return(
    <div>
      <div className="main">
        <div className="header-top">
          <h1 className="title">Sanctuary</h1>
          <div className="tabs">
            <p>Dashboard</p>
            <p>Analytics</p>
          </div>
        </div>
      </div>

    <div className="metricCards">
      <div className="metrics">
        <p>This month revenue</p>
        <h1>{totalRevenue}</h1>
      </div>
      <div className="metrics">
        <p>Appointments</p>
        <h1>38</h1>
      </div>
      <div className="metrics">
        <p>No-show rate</p>
        <h1>6%</h1>
      </div>
      <div className="metrics">
        <p>Active clients</p>
        <h1>24</h1>
      </div>
    </div>

    <div className="serviceCards">
      <div className="service">
        <h1>Today's schedule</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt ipsam incidunt debitis perferendis eum optio eligendi neque praesentium dolorum? Est a consectetur libero earum magnam!</p>
      </div>
      <div className="service">
        <h1>Top services this month</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt ipsam incidunt debitis perferendis eum optio eligendi neque praesentium dolorum? Est a consectetur libero earum magnam!</p>
      </div>
      <div className="service">
        <h1>Client list</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt ipsam incidunt debitis perferendis eum optio eligendi neque praesentium dolorum? Est a consectetur libero earum magnam!</p>
      </div>
      <div className="service">
        <h1>Book appointment</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt ipsam incidunt debitis perferendis eum optio eligendi neque praesentium dolorum? Est a consectetur libero earum magnam!</p>
      </div>
    </div>
      
    </div>
  )
}

export default DashBoard;