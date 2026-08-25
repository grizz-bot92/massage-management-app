import "./DashBoard.css"
import React, { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import Stack from "@mui/material/Stack";
import AnalyticsIcon from '@mui/icons-material/Analytics';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import Select from '@mui/material/Select';
import type { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from "@mui/material/InputLabel";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import  { AdapterDayjs }from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import { Margin } from "@mui/icons-material";


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

type Services = {
  id: number,
  treatment: string,
  price: string,
  duration: string
}


const DashBoard = () => {
  const [monthlyData, setMonthlyData] = useState<MonthlyData[]>([]);
  const [monthlyCancelled, setMonthlyCancelled] = useState<CancellationData[]>([]);
  const [activeClients, setActiveClients] = useState<ActiveClients | null>(null);
  const [todayAppointments, setTodaysAppointments] = useState<TodaysClients | "No one booked today">();
  const [service, setService] = useState<Services[]>([]);
  const [selectedService, setSelectedService] = useState("");

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/analytics/revenue_by_month`)
    .then(response => response.json())
    .then(data => {
      setMonthlyData(data)
    });
  }, []);
  
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/services`)
    .then(response => response.json())
    .then(data => {
      setService(data)
      console.log(data)
    });
    
  }, []);

  useEffect(()=> {
    fetch(`${import.meta.env.VITE_API_URL}/analytics/appointments_today`)
    .then(response => response.json())
    .then(data => {
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

  const handleTreatmentChange = (e: SelectChangeEvent) => {
    setSelectedService(e.target.value as string);
  }

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
        <form className="booking-form">
          <label className="book-appt">
           Book appointment
          </label>
          <label className="client-name">
            <Box
              component="form"
              sx={{ '& > :not(style)': { m: 0.5, width: '25ch' } }}
              noValidate
              autoComplete="off"
            >
            <TextField id="outlined-basic" label="Client" variant="outlined" />
            </Box>
          </label>
          <Box sx={{ minWidth: 120, margin: '15px'}}>
            <FormControl fullWidth>
            <InputLabel id="Treatment">Treatment</InputLabel>
            <Select
              id="treatment"
              onChange={handleTreatmentChange} 
              value={selectedService}
              label="Treatment"
            >
              {service?.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.treatment} {s.duration} min
                </option>
              ))}
            </Select> 
            </FormControl>
          </Box>
          <div className="date-time">
            <div className="date">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker']}>
                  <DatePicker label="Date"/>
                </DemoContainer>
              </LocalizationProvider>
            </div>
            <div className="time">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['Timepicker']}>
                  <TimePicker label="Time" />
                </DemoContainer>
              </LocalizationProvider>
            </div>
          </div>
          <Button color="secondary" sx={{ margin: '10px', padding: '10px', gap:'10px'}} variant="contained" endIcon={<ThumbUpAltIcon />}>Book Appointment</Button>
        </form>
      </div>
      
    </div>
      
    </div>
  )
}

export default DashBoard;