import React from "react";
import Hero from "./components/Hero/Hero";
import "./index.css";

export default function App() {
  return (
    <>
      <Hero />
      <main>
        <section
          id="work"
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "clamp(20px, 2.5vw, 44px)",
            background: "#0b0b0b",
            color: "#fbece3",
            fontFamily: "'Inter Tight', sans-serif",
          }}
        >
          <h2 style={{ fontSize: "clamp(32px, 5vw, 64px)", fontWeight: 500, letterSpacing: "-0.04em" }}>
            Work
          </h2>
        </section>

        <section
          id="about"
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "clamp(20px, 2.5vw, 44px)",
            background: "#111",
            color: "#fbece3",
            fontFamily: "'Inter Tight', sans-serif",
          }}
        >
          <h2 style={{ fontSize: "clamp(32px, 5vw, 64px)", fontWeight: 500, letterSpacing: "-0.04em" }}>
            About
          </h2>
        </section>

        <section
          id="contact"
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "clamp(20px, 2.5vw, 44px)",
            background: "#0b0b0b",
            color: "#fbece3",
            fontFamily: "'Inter Tight', sans-serif",
          }}
        >
          <h2 style={{ fontSize: "clamp(32px, 5vw, 64px)", fontWeight: 500, letterSpacing: "-0.04em" }}>
            Contact
          </h2>
        </section>
      </main>
    </>
  );
}
