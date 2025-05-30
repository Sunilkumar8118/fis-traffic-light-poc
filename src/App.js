import './App.css';
import TrafficLight from './components/TrafficLight/TrafficLight';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserTable from './components/UserTable/UserTable';
import UserDetailsPage from './components/UserTable/UserDetailsPage';
import SideNav from './components/SideNav';
import ProfilePage from './components/UserTable/ProfilePage';
import ThemeToggle from './components/ThemeToggle';

function App() {
  return (
    <Router>
      <SideNav />
      <ThemeToggle />
      <div style={{ marginLeft: 240, padding: '1rem' }}>
      <Routes>
        <Route path="/" element={<UserTable />} />
        <Route path="/user/:id" element={<UserDetailsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
      </div>
    </Router>
  );
}

export default App;
