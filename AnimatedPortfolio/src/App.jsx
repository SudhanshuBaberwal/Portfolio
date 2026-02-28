import React from "react";
import Navbar from "./components/Nav/Navbar";
import Home from "./components/Home/Home";
import About from "./components/About/About";
import Projects from "./components/Projects/Projects";
import Skills from "./components/skills/Skills";
import Footer from "./components/footer/Footer";
import Contact from "./components/contect/Contact";
import Experience from "./components/exprience/Experience";
import Summary from "./components/summary/Summary";

const App = () => {
  return (
    <div className="App">
      <Navbar />

      {/* Wrapping components in divs with IDs */}
      <div id="home">
        <Home />
      </div>

      <div id="about">
        <About />
      </div>
      <div id="skills">
        <Skills />
      </div>
      <div id="projects">
        <Projects />
      </div>
      <div id="experience">
        <Experience />
      </div>
      <div id="contact">
        <Contact />
      </div>
      <Summary />
      <Footer />
    </div>
  );
};

export default App;
