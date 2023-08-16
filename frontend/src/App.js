import {
Route,
RouterProvider,
createBrowserRouter,
createRoutesFromElements
} from "react-router-dom"

import { Container } from 'react-bootstrap'
import Footer from './components/Footer'
import Header from './components/Header'
//import HomeScreen from './screen/HomeScreen'
import { Outlet } from "react-router-dom"
import React from 'react'

const App = () => {
  return (
    <>
      <Header/>
      <main className='py-3'>
    <Container>
<Outlet/>
    </Container>
    </main>
    <Footer/>
    
    </>
  )
}

export default App
