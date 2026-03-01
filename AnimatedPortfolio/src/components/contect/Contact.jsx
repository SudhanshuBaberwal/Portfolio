import React, { useRef, useState } from "react";
import "./Contact.css";
// import Reveal from "../Reveal"; // Uncomment if you are using your Reveal component
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import axios from "axios";
import toast from "react-hot-toast";

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const containerRef = useRef();
  const [loading , setLoading] = useState(false)

  // Basic state to hold form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setLoading(true)
      const email = formData.email;
      const name = formData.name;
      const subject = formData.subject;
      const message = formData.message;
  
      const result = await axios.post(
        "http://localhost:3000/api/send-email",
        { name, email, subject, message },
        { withCredentials: true },
      );
  
      toast.success(
        `Thanks for reaching out, ${formData.name}! I will get back to you soon.`,
      );
      setLoading(false)
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      setLoading(false)
      toast.error("Something Missing")
      console.log(error)
    }
  };

  useGSAP(
    () => {
      // Animate the contact info cards (left side)
      gsap.fromTo(
        ".info-box",
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".contact-content",
            start: "top 85%",
          },
        },
      );

      // Animate the contact form (right side)
      gsap.fromTo(
        ".contact-form-container",
        { x: 50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".contact-content",
            start: "top 85%",
          },
        },
      );
    },
    { scope: containerRef },
  );

  return (
    <section id="contact" className="contact-section" ref={containerRef}>
      {/* Background Orbs */}
      <div className="bg-orb orb-5"></div>

      <div className="contact-header-container">
        <h2 className="section-header">
          LET'S <span className="highlight">TALK</span>
        </h2>
        <p className="contact-subtitle">
          Have a project in mind or looking for a skilled MERN developer? Let's
          build something great together.
        </p>
      </div>

      <div className="contact-content">
        {/* LEFT SIDE: Contact Info */}
        <div className="contact-info">
          {/* 1. EMAIL ME BOX */}
          <div className="info-box">
            <div className="info-icon">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
            </div>
            <div className="info-text">
              <h3>Email Me</h3>
              <a href="mailto:sudhanshu@example.com?subject=Reaching%20out%20from%20your%20portfolio&body=Hi%20Sudhanshu,%0D%0A%0D%0AI%20was%20looking%20at%20your%20portfolio%20and%20wanted%20to%20connect%20with%20you%20regarding...">
                sudhanshu@example.com
              </a>
            </div>
          </div>

          {/* 2. LOCATION BOX */}
          <div className="info-box">
            <div className="info-icon">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
            </div>
            <div className="info-text">
              <h3>Location</h3>
              <a
                href="https://www.google.com/maps/search/?api=1&query=Hubballi,+Karnataka,+India"
                target="_blank"
                rel="noreferrer"
                aria-label="Open location in Google Maps"
              >
                Hubballi, Karnataka, India
              </a>
            </div>
          </div>

          {/* 3. SOCIAL PROFILES BOX (Hover Reveal) */}
          <div className="info-box social-hover-box">
            <div className="info-icon">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </div>
            <div className="info-text social-text-container">
              {/* This whole block hides on hover */}
              <div className="visible-content">
                <h3>Social Profiles</h3>
                <p>Hover to connect ✨</p>
              </div>

              {/* This block appears on hover */}
              <div className="hidden-socials">
                {/* LinkedIn */}
                <a
                  href="https://linkedin.com/in/sudhanshubaberwal"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>

                {/* Instagram */}
                <a
                  href="https://instagram.com/sudhanshubaberwal272"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect
                      x="2"
                      y="2"
                      width="20"
                      height="20"
                      rx="5"
                      ry="5"
                    ></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: Contact Form */}
        <div className="contact-form-container">
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="input-group">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <textarea
                name="message"
                placeholder="Your Message..."
                rows="5"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <button type="submit" className="submit-btn">
              {loading ? "Sending...." : "Send Message"}
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
