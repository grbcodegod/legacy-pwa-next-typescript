import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  items: [],
  item: {}
};

const slice = createSlice({
  name: 'role',
  initialState,
  reducers: {
    getRoles(state, action) {
      state.items = action.payload.data;
    },
    getRole(state, action) {
      const role = action.payload;
      state.item = state.items.map((one) => one._id === role._id);
    },
    addRole(state, action) {
      const role = action.payload.data;
      state.items.push(role);
    },
    updateRole(state, action) {
      const role = action.payload.data;
      state.items = state.items.map((one) => {
        if (one._id === role._id) return role;
        return one;
      });
    },
    deleteRole(state, action) {
      const role = action.payload.data;
      state.items = state.items.filter((one) => one._id !== role._id);
    }
  }
});

export const reducer = slice.reducer;

export const getRoles = () => async (dispatch) => {
  const response = await axios.get('/api/role');
  dispatch(slice.actions.getRoles(response.data));
};

export const getRole = (id) => async (dispatch) => {
  const response = await axios.get('/api/role/:id', {
    params: {
      id
    }
  });
  dispatch(slice.actions.getRole(response.data));
};

export const addRole = (role) => async (dispatch) => {
  const response = await axios.post('/api/role/add', {
    role
  });
  dispatch(slice.actions.addRole(response.data));
};
export const updateRole = (role) => async (dispatch) => {
  const response = await axios.post('/api/role', { role });
  dispatch(slice.actions.updateRole(response.data));
};

export const deleteRole = (id) => async (dispatch) => {
  const response = await axios.delete(`/api/role/${id}`);
  dispatch(slice.actions.deleteRole(response.data));
};

export default slice;
