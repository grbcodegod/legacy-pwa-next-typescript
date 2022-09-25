import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import config from '../config'

const initialState = {
  items: [],
  item: {
    fullname: '',
    email: '',
    dialcode: '',
    phone: '',
    address: '',
    wallet: '',
    register_referral_code: '',
    password: ''
  }
}

const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getUsers(state, action) {
      state.items = action.payload.data
    },
    getUser(state, action) {
      const user = action.payload
      state.item = state.items.map((one) => one._id === user._id)
    },
    upsertUser(state, action) {
      const user = action.payload.data
      let flag = true
      state.items = state.items.map((one) => {
        if (one._id === user._id) {
          flag = false
          return user
        }
        return one
      })
      if (flag) state.items.push(user)
    },
    deleteUser(state, action) {
      const user = action.payload.data
      state.items = state.items.filter((one) => one._id !== user._id)
    },
    setUser(state, action) {
      state.item = action.payload.data
    }
  }
})

export const reducer = slice.reducer

export const getUsers = () => async (dispatch) => {
  const response = await axios.post(`${config.API_URL}/appuser/get`)
  dispatch(slice.actions.getUsers(response.data))
}

export const getUser = (id) => async (dispatch) => {
  const response = await axios.post('/api/user/:id', { id })
  dispatch(slice.actions.getUser(response.data))
}

export const upsertUser = (user) => async (dispatch) => {
  const response = await axios.post(`${config.API_URL}/appuser/upsert`, {
    user
  })
  dispatch(slice.actions.upsertdUser(response.data))
}
export const updateUser = (user) => async (dispatch) => {
  const response = await axios.post('/api/user', { user })
  dispatch(slice.actions.updateUser(response.data))
}

export const deleteUser = (id) => async (dispatch) => {
  const response = await axios.delete(`/api/user/${id}`)
  dispatch(slice.actions.deleteUser(response.data))
}

export const setUser = (user) => async (dispatch) => {
  dispatch(slice.actions.setUser({ user }))
}

export default slice
