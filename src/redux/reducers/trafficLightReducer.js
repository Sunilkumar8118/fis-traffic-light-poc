import {CHANGE_LIGHT} from '../actions/trafficLightAction'

const initialState = {
  light: 'red'
};

const nextLight = {
  red: 'green',
  green: 'yellow',
  yellow: 'red'
};

export const trafficLightReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_LIGHT:
      return { ...state, light: nextLight[state.light] };
    default:
      return state;
  }
};