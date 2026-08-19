import { useEffect, useState } from "react";
import "./Analytics.css"

type Revenue = {
  total_revenue: string
}

type Cancelled = {
  cancelled_percent: string,
  total: string
}

type RetentionRate = {
  total_clients: string,
  returned_clients: string,
  retention_rate: string
}

type RevenueLost = {
  revenue_lost: string
}

type TopClients = {
  name: string, 
  count_status: string
}

type TopMonth = {
  month: string,
  revenue: string
  appointments: string
}


const Analytics = () => {
  const [totalRevenue, setTotalRevenue] = useState<Revenue>();
  const [cancellationPercent, setCancellationPercent] = useState<Cancelled[]>([]);
  const [retentionRate, setRetentionRate] = useState<RetentionRate[]>([]);
  const [revenueLost, setRevenueLost] = useState<RevenueLost>();
  const [topClients, setTopClients] = useState<TopClients[]>([]);
  const [topMonth, setTopMonth] = useState<TopMonth[]>([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/analytics/revenue_by_month`)
    .then(response => response.json())
    .then(data => {
      setTopMonth(data);
      console.log(data)
    });
  }, []);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/analytics/revenue`)
    .then(response => response.json())
    .then(data => {
      setTotalRevenue(data)  
    });
  }, []);

  useEffect(()=> {
    fetch(`${import.meta.env.VITE_API_URL}/analytics/cancellation_percent`)
    .then(response => response.json())
    .then(data => {
      setCancellationPercent(data)
    });
  }, []);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/analytics/retention_rate`)
    .then(response => response.json())
    .then(data => {
      setRetentionRate(data)
    });
  }, []);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/analytics/revenue_lost`)
    .then(response => response.json())
    .then(data => {
      setRevenueLost(data)
  });
  }, []);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/analytics/top_visits`)
    .then(response => response.json())
    .then(data => {
      setTopClients(data)
    })
  }, []);

  return(
    <div>
      <div className="main">
        <div className="header-top">
          <h1 className="title">Sanctuary</h1>
          <h2>Analytics</h2>
          <div className="tabs">
            <p>Dashboard</p>
            <p>Analytics</p>
          </div>
        </div>
      </div>

    <div className="metricCards">
      <div className="metrics">
        <p>Total Revenue</p>
        {totalRevenue && <h1>${Number(totalRevenue.total_revenue).toLocaleString()}</h1>}
      </div>
      <div className="metrics">
        <p>Cancellation Percentage</p>
        {cancellationPercent.length > 0 && <h1>{cancellationPercent[cancellationPercent.length - 1].cancelled_percent}%</h1>}
      </div>
      <div className="metrics">
        <p>Retention Rate</p>
        {retentionRate.length > 0 && <h1>{retentionRate[retentionRate.length - 1].retention_rate}%</h1>}
      </div>
      <div className="metrics">
        <p>Revenue Lost</p>
        {revenueLost && <h1>${Number(revenueLost.revenue_lost).toLocaleString()}</h1>}
      </div>
    </div>

    <div className="serviceCards">
      <div className="service">
        <h1>Top Monthly Revenue</h1>
        {topMonth.map((month) => (
          <div className="monthList" key={month.month}>
            <p className="monthName">{new Date(month.month).toLocaleString('en-US', { month: 'long', year: 'numeric'})}</p>
            <p>${month.revenue}</p>
          </div>
        )  
      )}
      </div>
      <div className="service">
        <h1>Top clients by visit</h1>
        {topClients.map((client) => (
          <div className="clientList">
            <p className="clientName">{client.name}</p>
            <p>{client.count_status} visits</p>
          </div>  
        )
      )}
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


export default Analytics;