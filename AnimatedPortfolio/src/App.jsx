import React, { useState } from "react";
import Navbar from "./components/Nav/Navbar";
import Home from "./components/Home/Home";
import About from "./components/About/About";
import Projects from "./components/Projects/Projects";
import Skills from "./components/skills/Skills";
import Footer from "./components/footer/Footer";
import Contact from "./components/contect/Contact";
import Experience from "./components/exprience/Experience";
import Summary from "./components/summary/Summary";
import Toaster from "react-hot-toast";
import "./App.css";
import Preloader from "./components/preloader/Preloader";
import { Route, Routes } from "react-router-dom";
import AllProjects from "./components/Projects/AllProjects";

const MainLayout = ({ loading, setLoading }) => (
  <div className="App">
    {loading && <Preloader setLoading={setLoading} />}
    <Navbar />

    <div id="home"><Home /></div>
    <div id="about"><About /></div>
    <div id="skills"><Skills /></div>
    <div id="projects"><Projects /></div>
    <div id="experience"><Experience /></div>
    <div id="contact"><Contact /></div>

    <Summary />
    <Footer />
  </div>
);

const App = () => {
  const [loading, setLoading] = useState(true);

  return (
    <>
      <Toaster />

      <Routes>
        <Route path="/" element={<MainLayout loading={loading} setLoading={setLoading} />} />
        <Route path="/all-projects" element={<AllProjects />} />
      </Routes>
    </>
  );
};

export default App;