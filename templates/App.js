module.exports = `
import React from 'react'
import RootNavigator from './src/navigation/RootNavigator'

import { Provider } from 'react-redux'

import store from './src/redux/store.js'

const App = () => {
  return (
    <Provider store={store}>
      <RootNavigator />
    </Provider>
  )
}

export default App

`;