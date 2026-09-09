import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DashBoard from './pages/DashBoard';
import Analytics from './pages/Analytics';
import Login from './pages/Login';

const App = () => {
  return (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<DashBoard />} />
      <Route path="/dashboard" element={<DashBoard />} />
      <Route path="/analytics"  element={<Analytics />} />
      <Route path="/login"  element={<Login/>}/>
    </Routes>
  </BrowserRouter>
  )
}

export default App;