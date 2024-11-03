module.exports = `
import { createSlice } from '@reduxjs/toolkit'

import { MMKV } from 'react-native-mmkv'

const storage = new MMKV()
const isLogged = storage.getBoolean('isLogged')

const initialState = {
  isLogged: isLogged || false
}

const slice = createSlice({
  name: 'slice',
  initialState,
  reducers: {
    login: state => {
      state.isLogged = true

      storage.set('isLogged', state.isLogged)
    },
    logout: state => {
      state.isLogged = false

      storage.set('isLogged', state.isLogged)
    }
  }
})

export const { login, logout } = slice.actions

export default slice.reducer

`;