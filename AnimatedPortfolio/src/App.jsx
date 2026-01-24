import React from 'react'
import Navbar from './components/Nav/Navbar'
import Home from './components/Home/Home'
import About from "./components/About/About"
import Projects from './components/Projects/Projects'

const App = () => {
  return (
    <div className='App'>
      <Navbar />
      <Home />
      <About />
      <Projects />
    </div>
  )
}

export default App
