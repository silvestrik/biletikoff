import React from 'react'
import Search from './page/Search'
//redux
import { Provider } from 'react-redux'
import store from './redux/store'
import Header from './component/template/Header'
import Footer from './component/template/Footer'

function App() {
  return (
    <Provider store = { store }>   
    <Header/>    
          <Search/>
    <Footer/>      
    </Provider>    
  )
}

export default App;
