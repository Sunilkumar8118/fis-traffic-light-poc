import { createStore, combineReducers } from 'redux';
import { trafficLightReducer } from './reducers/trafficLightReducer';

const rootReducer = combineReducers({
  traffic: trafficLightReducer
});

export const store = createStore(rootReducer);