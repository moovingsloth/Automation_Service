import axios from 'axios';
import { FETCH_USER } from './types';

export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/current_user');

  dispatch({ type: FETCH_USER, payload: res.data });
};

export const handleToken = token => async dispatch => {
  const res = await axios.post('/api/stripe', token);

  dispatch({ type: FETCH_USER, payload: res.data });
};

export const submitSurvey = (values, navigate) => async dispatch => { // history 대신 navigate
  const res = await axios.post('/api/surveys', values);

  navigate('/surveys'); // history.push 대신 navigate 사용
  dispatch({ type: FETCH_USER, payload: res.data });
};
