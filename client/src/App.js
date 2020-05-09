import React from 'react'
import Search from './page/Search'
//redux
import { Provider } from 'react-redux'
import store from './redux/store'

function App() {
  return (
    <Provider store = { store }>       
          <Search/>
    </Provider>    
  )
}

export default App;
