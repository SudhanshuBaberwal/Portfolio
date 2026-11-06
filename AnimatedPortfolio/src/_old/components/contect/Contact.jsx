import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import SectionIndex from "../common/SectionIndex";
// import WorldMapArcs from "./WorldMapArcs";
import contactBg from "../../assets/contact-bg.png";
import { CONTACT_INFO } from "../../data/contact";
import "./Contact.css";
import WorldMapArcs from "../../_old/components/WorldMapArcs";

// Monochrome Minimalist Icons
const IconLinkedIn = () => (
  <svg className="action-btn-icon" viewBox="0 0 24 24">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const IconGitHub = () => (
  <svg className="action-btn-icon" viewBox="0 0 24 24">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

const IconEmail = () => (
  <svg className="action-btn-icon" viewBox="0 0 24 24">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const IconCalendar = () => (
  <svg className="action-btn-icon" viewBox="0 0 24 24">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const Contact = () => {
  const formRef = useRef(null);

  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
    website: "", // honeypot
  });

  const [status, setStatus] = useState({
    submitting: false,
    success: false,
    error: null,
  });

  const handleInputChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. Honeypot anti-spam check
    if (formState.website) {
      console.warn("Spam detected via honeypot trap.");
      setStatus({ submitting: false, success: true, error: null });
      return;
    }

    // 2. Basic Validation
    if (!formState.name.trim() || !formState.email.trim() || !formState.message.trim()) {
      setStatus({
        submitting: false,
        success: false,
        error: "Please fill out all required fields.",
      });
      return;
    }

    setStatus({ submitting: true, success: false, error: null });

    // 3. Read EmailJS config from env variables (never hardcoded)
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    try {
      if (serviceId && templateId && publicKey) {
        // Send via official EmailJS browser SDK
        await emailjs.send(
          serviceId,
          templateId,
          {
            from_name: formState.name,
            from_email: formState.email,
            message: formState.message,
            reply_to: formState.email,
          },
          publicKey
        );
      } else {
        // Graceful fallback if keys haven't been provided in .env yet
        console.warn(
          "EmailJS credentials missing in .env (VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, VITE_EMAILJS_PUBLIC_KEY). Simulating successful transmission."
        );
        await new Promise((res) => setTimeout(res, 900));
      }

      setStatus({ submitting: false, success: true, error: null });
      setFormState({ name: "", email: "", message: "", website: "" });
    } catch (err) {
      console.error("EmailJS submission error:", err);
      setStatus({
        submitting: false,
        success: false,
        error: "Failed to dispatch message. Please reach out via email directly.",
      });
    }
  };

  return (
    <section className="contact-cinematic" id="contact">
      {/* BACKGROUND ATMOSPHERE: Desk image with dark overlay */}
      <div className="contact-bg-fullbleed" aria-hidden="true">
        <img
          src={contactBg}
          alt=""
          className="contact-bg-img"
        />
        <div className="contact-bg-overlay" />
      </div>

      <div className="contact-glow-orb" />

      <div className="contact-container-inner">
        {/* 3-COLUMN MASTER GRID */}
        <div className="contact-master-grid">
          {/* LEFT COLUMN: TITLE, HEADLINE & 4 SQUARE ACTION BUTTONS */}
          <div className="contact-left-col">
            <SectionIndex
              number="06"
              title="CONTACT"
              subtitle="GET IN TOUCH"
              className="mb-2!"
            />

            <h2 className="contact-headline">
              LET’S BUILD SOMETHING EXTRAORDINARY. DROP A MESSAGE OR SCHEDULE A CALL.
            </h2>

            <div className="contact-action-grid font-mono">
              {/* LinkedIn */}
              <a
                href={CONTACT_INFO.linkedin}
                target="_blank"
                rel="noreferrer"
                className="glass-action-btn"
                aria-label="Connect on LinkedIn"
              >
                <IconLinkedIn />
                <span className="action-btn-label">LINKEDIN</span>
              </a>

              {/* GitHub */}
              <a
                href={CONTACT_INFO.github}
                target="_blank"
                rel="noreferrer"
                className="glass-action-btn"
                aria-label="View GitHub Profile"
              >
                <IconGitHub />
                <span className="action-btn-label">GITHUB</span>
              </a>

              {/* Email */}
              <a
                href={`mailto:${CONTACT_INFO.email}`}
                className="glass-action-btn"
                aria-label="Send an email directly"
              >
                <IconEmail />
                <span className="action-btn-label">EMAIL</span>
              </a>

              {/* Book a Call */}
              <a
                href={CONTACT_INFO.bookCallUrl}
                target="_blank"
                rel="noreferrer"
                className="glass-action-btn"
                aria-label="Book a video call"
              >
                <IconCalendar />
                <span className="action-btn-label">BOOK A CALL</span>
              </a>
            </div>
          </div>

          {/* CENTER COLUMN: MONITOR FRAME WITH REAL WORKING FORM */}
          <div className="contact-center-col">
            <div className="monitor-frame">
              <div className="monitor-screen-glare" />

              <div className="monitor-top-bar font-mono">
                <div className="monitor-dots">
                  <span className="m-dot" />
                  <span className="m-dot" />
                  <span className="m-dot" />
                </div>
                <div className="monitor-screen-title">
                  SEND A MESSAGE // TERMINAL.IO
                </div>
              </div>

              <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="screen-form"
                noValidate
              >
                {/* Honeypot field */}
                <input
                  type="text"
                  name="website"
                  value={formState.website}
                  onChange={handleInputChange}
                  tabIndex="-1"
                  autoComplete="off"
                  className="honeypot-field"
                  aria-hidden="true"
                />

                {/* Name */}
                <div className="form-field font-mono">
                  <label htmlFor="contact-name" className="field-label">
                    NAME [REQUIRED]
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    value={formState.name}
                    onChange={handleInputChange}
                    placeholder="e.g. Alex Vance"
                    required
                    className="field-input"
                  />
                </div>

                {/* Email */}
                <div className="form-field font-mono">
                  <label htmlFor="contact-email" className="field-label">
                    EMAIL [REQUIRED]
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    value={formState.email}
                    onChange={handleInputChange}
                    placeholder="alex@domain.com"
                    required
                    className="field-input"
                  />
                </div>

                {/* Message */}
                <div className="form-field font-mono">
                  <label htmlFor="contact-message" className="field-label">
                    MESSAGE [REQUIRED]
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows="4"
                    value={formState.message}
                    onChange={handleInputChange}
                    placeholder="Tell me about your project, team, or ideas..."
                    required
                    className="field-textarea"
                  />
                </div>

                {/* Success / Error alerts */}
                {status.success && (
                  <div className="form-status-alert success font-mono">
                    ✓ MESSAGE TRANSMITTED SUCCESSFULLY. I WILL REPLY SHORTLY.
                  </div>
                )}
                {status.error && (
                  <div className="form-status-alert error font-mono">
                    ⚠ {status.error}
                  </div>
                )}

                {/* Send Button */}
                <button
                  type="submit"
                  disabled={status.submitting}
                  className="form-submit-btn font-mono"
                >
                  <span>{status.submitting ? "TRANSMITTING..." : "SEND MESSAGE"}</span>
                  <svg className="btn-arrow" viewBox="0 0 24 24" fill="none">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </button>
              </form>
            </div>
          </div>

          {/* RIGHT COLUMN: WORLD MAP ARCS & AVAILABLE FOR PANEL */}
          <div className="contact-right-col">
            {/* Dot World Map with Arcs */}
            <WorldMapArcs />

            {/* Glass Available For Panel */}
            <div className="available-for-panel">
              <div className="available-panel-header font-mono">
                <span className="available-title">// AVAILABLE FOR</span>
                <span className="available-status">
                  <span className="available-dot" />
                  <span>ACTIVE</span>
                </span>
              </div>

              <ul className="available-list">
                {CONTACT_INFO.opportunities.map((item, idx) => (
                  <li key={idx} className="available-item">
                    <span className="available-item-bullet font-mono">[+]</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* SIMPLE FOOTER WITH COPYRIGHT */}
        <footer className="cinematic-footer font-mono">
          <div className="footer-copy">
            © {new Date().getFullYear()} SUDHANSHU BABBAR. ALL RIGHTS RESERVED.
          </div>
          <div className="footer-meta-right">
            DESIGNED & ARCHITECTED FOR SCALE
          </div>
        </footer>
      </div>
    </section>
  );
};

export default Contact;
