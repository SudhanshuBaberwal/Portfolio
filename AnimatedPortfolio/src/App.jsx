import React from 'react'
import Navbar from './components/Nav/Navbar'
import Home from './components/Home/Home'
import About from "./components/About/About"
import Projects from './components/Projects/Projects'

const App = () => {
  return (
    <div className='App'>
      <Navbar />
      
      {/* Wrapping components in divs with IDs */}
      <div id="home">
        <Home />
      </div>
      
      <div id="about">
        <About />
      </div>
      
      <div id="projects">
        <Projects />
      </div>
      
    </div>
  )
}

export default App