import "./DashBoard.css"
import React, { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import Stack from "@mui/material/Stack";
import AnalyticsIcon from '@mui/icons-material/Analytics';
import DashboardIcon from '@mui/icons-material/Dashboard';

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

type TodaysClients = {
  first_name: string,
  treatment: string,
  duration: string,
  appointment_date: string,
  status: string
}


const DashBoard = () => {
  const [monthlyData, setMonthlyData] = useState<MonthlyData[]>([]);
  const [monthlyCancelled, setMonthlyCancelled] = useState<CancellationData[]>([]);
  const [activeClients, setActiveClients] = useState<ActiveClients | null>(null);
  const [todayAppointments, setTodaysAppointments] = useState<TodaysClients | "No one booked today">();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/analytics/revenue_by_month`)
    .then(response => response.json())
    .then(data => {
      setMonthlyData(data)
      console.log(data)
    });
  }, []);
  

  useEffect(()=> {
    fetch(`${import.meta.env.VITE_API_URL}/analytics/appointments_today`)
    .then(response => response.json())
    .then(data => {
      console.log(data)
      setTodaysAppointments(data)
    })
  }, []);


  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/analytics/cancelled_monthly`)
    .then(response => response.json())
    .then(data => {
      setMonthlyCancelled(data)
      
    });
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
          <div className="titles">
            <h1 className="title">Sanctuary</h1>
            <h2 className="sub-title">Dashboard</h2>
          </div>
          <div className="tabs">
            <Stack direction="row" spacing={2}>
              <a href="http://localhost:5173/dashboard">
                <Button variant="outlined" startIcon={<DashboardIcon/>}>
                  Dashboard 
                </Button>  
              </a>
              <a href="http://localhost:5173/analytics">
                <Button variant="outlined" startIcon={<AnalyticsIcon/>}>
                  Analytics
                </Button>
              </a>
            </Stack>
            </div>
        </div>
      </div>

    <div className="metricCards">
      <div className="metrics">
        <p>Monthly revenue</p>
        {monthlyData.length > 0 && (
          <h1>${Number(monthlyData[monthlyData.length - 1].revenue).toLocaleString()}</h1>
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