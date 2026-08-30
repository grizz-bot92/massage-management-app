import "./DashBoard.css";
import React, { useEffect, useState } from "react";
import axios from 'axios';
import Button from '@mui/material/Button';
import Stack from "@mui/material/Stack";
import AnalyticsIcon from '@mui/icons-material/Analytics';
import DashboardIcon from '@mui/icons-material/Dashboard';
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
import { Autocomplete } from "@mui/material";
import MenuItem from '@mui/material/MenuItem';

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

type Client = {
  id: string, 
  first_name: string,
  last_name: string,
  status: string
}

type Services = {
  id: string,
  service_key: string,
  treatment: string, 
  price: string, 
  duration: string
}

const DashBoard = () => {
  const [monthlyData, setMonthlyData] = useState<MonthlyData[]>([]);
  const [monthlyCancelled, setMonthlyCancelled] = useState<CancellationData[]>([]);
  const [activeClients, setActiveClients] = useState<ActiveClients | null>(null);
  // const [todayAppointments, setTodaysAppointments] = useState<TodaysClients | "No one booked today">();
  const [service, setService] = useState<Services[]>([]);
  const [selectedService, setSelectedService] = useState<Services | null>(null);
  const [clients, setClients] = useState<Client[]>([]);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [date, setDate] = useState<string>(" ");
  const [time, setTime] = useState<string>(" ");

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/clients`)
    .then(response => response.json())
    .then(data => {
      setClients(data)
    });
  }, []);

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
    });
  }, []);

  // useEffect(()=> {
  //   fetch(`${import.meta.env.VITE_API_URL}/analytics/appointments_today`)
  //   .then(response => response.json())
  //   .then(data => {
  //     setTodaysAppointments(data)
  //   })
  // }, []);


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


  const bookAppointment = async() => {
    if (!selectedClient || !selectedService) return;
    try{
      const result = await axios.post(`${import.meta.env.VITE_API_URL}/appointments`, {
        client_id: selectedClient.id,
        service_id: selectedService.id,
        staff_id: "44d6f516-9592-48fd-806a-263bd52c6181",
        appointment_date: new Date(`${date}T${time}`),
        status: 'confirmed'
      });

      console.log(result);

    }catch(e){
      console.error(e)
    }
  }


  const handleTreatmentChange = (e: SelectChangeEvent<string>) => {
    const selected = service.find(s => s.id === e.target.value);
    setSelectedService(selected || null);
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
        <h1>New client</h1>
          <div className="client-to-add">
            <label className="first-name">
            <Box
              component="form"
              sx={{ '& > :not(style)': { m: 0.5, width: '25ch' } }}
              noValidate
              autoComplete="off"
            >
            <TextField type="text" label="First Name" variant="outlined"/>
            </Box>
            </label>
            <label className="last-name">
              <Box
                component="form"
                sx={{ '& > :not(style)': { m: 0.5, width: '25ch' } }}
                noValidate
                autoComplete="off"
              >
              <TextField type="text" label="Last Name" variant="outlined"/>
              </Box>
            </label>
          </div>
          <Button color="secondary" sx={{ margin: '10px', padding: '10px', gap:'10px'}} variant="contained" endIcon={<ThumbUpAltIcon />}>Add client</Button>
      </div>
      <div className="service">
        <h1>Client list</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt ipsam incidunt debitis perferendis eum optio eligendi neque praesentium dolorum? Est a consectetur libero earum magnam!</p>
      </div>
      <div className="service">
        <h1>Book Appointment</h1>
          <label className="client-name">
            <Box
              component="form"
              sx={{ '& > :not(style)': { m: 0.5, width: '25ch' } }}
              noValidate
              autoComplete="off"
            >
              <Autocomplete
                options={clients}
                getOptionLabel={(option) => option.first_name}
                onChange={(_, value: Client | null) => setSelectedClient(value)}
                renderInput={(params) => <TextField {...params} label="Client" variant="outlined" />}
              />
            </Box>
          </label>
          <Box 
            component="form"
            sx={{ minWidth: 120, margin: '15px'}}
            noValidate
            autoComplete="off"  
            >
            <FormControl fullWidth>
            <InputLabel id="Treatment">Treatment</InputLabel>
            <Select<string>
              id="treatment"
              onChange={handleTreatmentChange} 
              value={selectedService?.id ?? ""}
              label="Treatment"
            >
              {service?.map((s) => (
                <MenuItem key={s.id} value={s.id}>
                  {s.treatment} {s.duration} min
                </MenuItem>
              ))}
            </Select> 
            </FormControl>
          </Box>
          <div className="date-time">
            <div className="date">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker']}>
                  <DatePicker 
                    label="Date"
                    onChange={(value) => setDate(value?.format('YYYY-MM-DD') ?? '')}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </div>
            <div className="time">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['Timepicker']}>
                  <TimePicker 
                    label="Time" 
                    onChange={(value) => setTime(value?.format('HH:mm:ss') ?? '')}
                    />
                </DemoContainer>
              </LocalizationProvider>
            </div>
          </div>
          <Button color="secondary" onClick={bookAppointment} sx={{ margin: '10px', padding: '10px', gap:'10px'}} variant="contained" endIcon={<ThumbUpAltIcon />}>Book Appointment</Button>
      </div>
      
    </div>
      
    </div>
  )
}

export default DashBoard;