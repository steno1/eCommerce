import { Container } from 'react-bootstrap'
import Footer from './components/Footer'
import Header from './components/Header'
import HomeScreen from './screen/HomeScreen'
import React from 'react'

const App = () => {
  return (
    <>
      <Header/>
      <main className='py-3'>
    <Container>
<HomeScreen/>
    </Container>
    </main>
    <Footer/>
    
    </>
  )
}

export default App
