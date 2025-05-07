import './App.css';
import TrafficLight from './components/TrafficLight/TrafficLight';
import UserTable from './components/UserTable/UserTable';

function App() {
  return (
    <div className="App">
      <h1 style={{ textAlign: 'center' }}>User Data</h1>
      <UserTable />
      {/* <TrafficLight /> */}
    </div>
  );
}

export default App;
