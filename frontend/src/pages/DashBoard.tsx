import "./DashBoard.css"
import React, { useEffect, useState } from "react";

type MonthlyData = {
  month: string,
  revenue: string,
  appointments: string
}

type CancellationData = {
  cancelled_percent: string,
  cancellations: string,
  total: string
}

type ActiveClients = {
  active_clients: string
}


const DashBoard = () => {
  const [monthlyData, setMonthlyData] = useState<MonthlyData[]>([]);
  const [monthlyCancelled, setMonthlyCancelled] = useState<CancellationData[]>([]);
  const [activeClients, setActiveClients] = useState<ActiveClients | null>(null);
  

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/analytics/revenue_by_month`)
    .then(response => response.json())
    .then(data => {
      setMonthlyData(data.rows)
    })

  }, []);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/analytics/cancelled_monthly`)
    .then(response => response.json())
    .then(data => {
      setMonthlyCancelled(data)
      console.log(data)
    })
  }, []);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/analytics/active_clients`)
    .then(response => response.json())
    .then(data => setActiveClients(data));
  },[]);


  return(
    <div>
      <div className="main">
        <div className="header-top">
          <h1 className="title">Sanctuary</h1>
          <h2>Dashboard</h2>
          <div className="tabs">
            <p>Dashboard</p>
            <p>Analytics</p>
          </div>
        </div>
      </div>

    <div className="metricCards">
      <div className="metrics">
        <p>Monthly revenue</p>
        {monthlyData.length > 0 && (
          <h1>${monthlyData[monthlyData.length - 1].revenue}</h1>
        )}
      </div>
      <div className="metrics">
        <p>Monthly appointments</p>
        {monthlyData.length > 0 && (
          <h1>{monthlyData[monthlyData.length - 1].appointments}</h1>
        )}
      </div>
      <div className="metrics">
        <p>Monthly cancelled percent</p>
        {monthlyCancelled.length > 0 && (
          <h1>{monthlyCancelled[monthlyCancelled.length - 1].cancelled_percent}%</h1>
        )}
      </div>
      <div className="metrics">
        <p>Active clients</p>
        {activeClients && <h1>{activeClients.active_clients}</h1>}
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