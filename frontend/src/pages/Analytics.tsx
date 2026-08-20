import React, { useEffect, useState } from "react";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import "./Analytics.css";


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

type TopService = {
  treatment: string,
  duration: string, 
  count: string
}

type ServiceRevenue = {
  treatment: string,
  duration: string,
  sum: string
}


const Analytics = () => {
  const [totalRevenue, setTotalRevenue] = useState<Revenue>();
  const [cancellationPercent, setCancellationPercent] = useState<Cancelled[]>([]);
  const [retentionRate, setRetentionRate] = useState<RetentionRate[]>([]);
  const [revenueLost, setRevenueLost] = useState<RevenueLost>();
  const [topClients, setTopClients] = useState<TopClients[]>([]);
  const [topMonth, setTopMonth] = useState<TopMonth[]>([]);
  const [topService, setTopService] = useState<TopService[]>([]);
  const [gainedRevenue, setGainedRevenue] = useState<ServiceRevenue[]>([]);
  const [lostRevenue, setLostRevenue] = useState<ServiceRevenue[]>([]);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);



  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/analytics/revenue_by_month`)
    .then(response => response.json())
    .then(data => {
      setTopMonth(data);
      console.log(data)
    });
  }, []);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/analytics/lost_by_service`)
    .then(response => response.json())
    .then(data => {
      setLostRevenue(data);
      console.log(data)
    });
  }, []);

  
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/analytics/revenue_by_service`)
    .then(response => response.json())
    .then(data => {
      setGainedRevenue(data);
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


  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/analytics/treatment_count`)
    .then(response =>response.json())
    .then(data => {
      setTopService(data)
    });
  }, [])

  return(
    <div>
      <div className="main">
        <div className="header-top">
          <div className="titles">
            <h1 className="title">Sanctuary</h1>
            <h2 className="sub-title">Analytics</h2>
          </div>
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
        <Paper sx={{ width: '100%', overflow: 'hidden'}}>
          <TableContainer sx={{ maxHeight: 440}}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow sx={{ '&:hover': { backgroundColor: '#FAF5F8' },  '&:last-child td': { border: 0 }, '&:hover': { backgroundColor: '#FAF5F8' } }}>
                  <TableCell sx={{backgroundColor: '#3D1F4E', color: '#F2D4E8', fontWeight: 'bold'}}>Month</TableCell>
                  <TableCell sx={{backgroundColor: '#3D1F4E', color: '#F2D4E8', fontWeight: 'bold'}}>Revenue</TableCell>
                  <TableCell sx={{backgroundColor: '#3D1F4E', color: '#F2D4E8', fontWeight: 'bold'}}>Appointments</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {topMonth.map((month, index) => (
                  <TableRow key={index} sx={{ '&:hover': { backgroundColor: '#FAF5F8' } }}>
                     <TableCell sx={{ fontFamily: 'your-font', color: '#2A1535' }}>{month.month}</TableCell> 
                     <TableCell sx={{ fontFamily: 'your-font', color: '#2A1535' }}>{Number(month.revenue).toLocaleString()}</TableCell> 
                     <TableCell sx={{ fontFamily: 'Inter', color: '#2A1535' }}>{month.appointments}</TableCell> 
                  </TableRow>
                  )  
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
        
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
        <h1>Top Service</h1>
        {topService.map((service) => (
          <div className="service-revenue">
            <p className="service-info">{service.treatment} {service.duration} min</p>
            <p className="num-bookings">{Number(service.count).toLocaleString()} bookings</p>
          </div>
        )
        )}
      </div>
      <div className="service">
        <h1>Revenue gained vs lost</h1>
        {gainedRevenue.map((gained, index) => (
          <div className="top-services" key={`${gained.treatment}-${gained.duration}-${index}`}>
            <p className="service-info">{gained.treatment} {gained.duration} min</p>
            <p>
              Gained: ${Number(gained.sum).toLocaleString()}<br />
              Lost: ${Number(
                lostRevenue.find(
                  (lost) => lost.treatment === gained.treatment && lost.duration === gained.duration
                )?.sum ?? 0
              ).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
      
    </div>
  )
}


export default Analytics;