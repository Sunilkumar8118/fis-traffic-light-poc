import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeLight } from '../../redux/actions/trafficLightAction';
import './TrafficLight.css';

const TrafficLight = () => {
  const dispatch = useDispatch();
  const light = useSelector(state => state.traffic.light);

  useEffect(() => {
    const timer = setInterval(() => {
      dispatch(changeLight());
    }, 1000);

    return () => clearInterval(timer);
  }, [dispatch]);

  return (
    <div className="traffic-container">
      <div className={`light ${light === 'red' ? 'active red' : ''}`}></div>
      <div className={`light ${light === 'yellow' ? 'active yellow' : ''}`}></div>
      <div className={`light ${light === 'green' ? 'active green' : ''}`}></div>
    </div>
  );
};

export default TrafficLight;
