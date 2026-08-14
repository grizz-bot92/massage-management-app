import "./DashBoard.css"
import React, { useEffect, useState } from "react";

type MonthlyData = {
  month: string,
  revenue: string,
  appointments: string
}

type NoShowData = {
  no_show_rate: string,
  no_shows: string,
  total: string
}


const DashBoard = () => {
  const [monthlyData, setMonthlyData] = useState<MonthlyData[]>([]);
  const [noShowData, setNoShowData] = useState<NoShowData[]>([]);
  

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/analytics/revenue_by_month`)
    .then(response => response.json())
    .then(data => {
      setMonthlyData(data.rows)
    })

  }, []);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/analytics/no_show_rate`)
    .then(response => response.json())
    .then(data => {
      setNoShowData(data)
      console.log(data)
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
        {monthlyData.length > 0 && (
          <h1>${monthlyData[monthlyData.length - 1].revenue}</h1>
        )}
      </div>
      <div className="metrics">
        <p>This months appointments</p>
        {monthlyData.length > 0 && (
          <h1>{monthlyData[monthlyData.length - 1].appointments}</h1>
        )}
      </div>
      <div className="metrics">
        <p>No-show rate</p>
        {noShowData.length > 0 && (
          <h1>{noShowData[noShowData.length - 1].no_show_rate}</h1>
        )}
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