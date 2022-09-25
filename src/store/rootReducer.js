import { combineReducers } from '@reduxjs/toolkit'
import { reducer as roleReducer } from '../slices/role'
import { reducer as userReducer } from '../slices/user'

const rootReducer = combineReducers({
  role: roleReducer,
  user: userReducer
})

export default rootReducer
