import { useEffect, useState } from "react";

type Revenue = {
  total_revenue: string
}


const Analytics = () => {
  const [totalRevenue, setTotalRevenue] = useState<Revenue>();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/analytics/revenue`)
    .then(response => response.json())
    .then(data => {
      setTotalRevenue(data)
      console.log(data)
    });
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
        {totalRevenue && <h1>{totalRevenue.total_revenue}</h1>}
      </div>
      <div className="metrics">
        <p>This months appointments</p>
      </div>
      <div className="metrics">
        <p>No-show rate</p>

      </div>
      <div className="metrics">
        <p>Active clients</p>
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


export default Analytics;