import React, { useState, useRef, useEffect } from "react";
import emailjs from "@emailjs/browser";
import { SITE } from "../../data/site.js";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    company: "", // honeypot
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [statusMsg, setStatusMsg] = useState("");
  const lastSubmitTime = useRef(0);

  const isDev = import.meta.env.DEV;
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) {
      errs.name = "Please enter your name.";
    }

    if (!formData.email.trim()) {
      errs.email = "Please enter your email.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = "Please enter a valid email address.";
    }

    if (!formData.message.trim()) {
      errs.message = "Please write a message.";
    } else if (formData.message.trim().length < 10) {
      errs.message = "Message must be at least 10 characters.";
    }

    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check throttle (30 seconds)
    const now = Date.now();
    if (now - lastSubmitTime.current < 30000) {
      const waitSec = Math.ceil((30000 - (now - lastSubmitTime.current)) / 1000);
      setStatus("error");
      setStatusMsg(`Please wait ${waitSec}s before sending another message.`);
      return;
    }

    // Validate fields
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      // Focus first error field for accessibility
      const firstKey = Object.keys(validationErrors)[0];
      const el = document.getElementById(`contact-${firstKey}`);
      if (el) el.focus();
      return;
    }

    // Honeypot check: silently pretend success if filled by a bot
    if (formData.company) {
      setStatus("success");
      setStatusMsg("Thanks. I'll reply soon.");
      setFormData({ name: "", email: "", message: "", company: "" });
      return;
    }

    setStatus("sending");
    setStatusMsg("");

    // Missing env vars check
    const hasKeys = serviceId && templateId && publicKey;

    if (!hasKeys) {
      if (isDev) {
        // Simulate send in DEV
        setTimeout(() => {
          setStatus("success");
          setStatusMsg("DEV: simulated send. Thanks. I'll reply soon.");
          lastSubmitTime.current = Date.now();
          setFormData({ name: "", email: "", message: "", company: "" });
        }, 1000);
        return;
      } else {
        // In PRODUCTION, never fake success
        setStatus("error");
        setStatusMsg("service_unavailable");
        return;
      }
    }

    // Real send with EmailJS
    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: formData.name.trim(),
          reply_to: formData.email.trim(),
          message: formData.message.trim(),
        },
        publicKey
      );

      setStatus("success");
      setStatusMsg("Thanks. I'll reply soon.");
      lastSubmitTime.current = Date.now();
      setFormData({ name: "", email: "", message: "", company: "" });
    } catch (err) {
      console.error("[EmailJS] Send error:", err);
      setStatus("error");
      setStatusMsg("send_failed");
    }
  };

  return (
    <div className="contact__form-wrap">
      {status === "success" ? (
        <div
          className="contact__success-pane"
          role="status"
          aria-live="polite"
        >
          <div className="contact__success-icon" aria-hidden="true">
            ✓
          </div>
          <h3 className="contact__success-title">{statusMsg}</h3>
          <p className="contact__success-sub">
            Your message was sent successfully.
          </p>
          <button
            type="button"
            className="contact__reset-btn"
            onClick={() => setStatus("idle")}
          >
            Send another message
          </button>
        </div>
      ) : (
        <form
          className="contact__form"
          onSubmit={handleSubmit}
          noValidate
          aria-label="Send a message"
        >
          {/* Honeypot field (hidden from real users) */}
          <div
            style={{
              position: "absolute",
              opacity: 0,
              pointerEvents: "none",
              height: 0,
              width: 0,
              overflow: "hidden",
            }}
            aria-hidden="true"
          >
            <label htmlFor="contact-company">Company</label>
            <input
              type="text"
              id="contact-company"
              name="company"
              tabIndex={-1}
              autoComplete="off"
              value={formData.company}
              onChange={handleChange}
            />
          </div>

          {/* Name Field */}
          <div className="contact__field">
            <label htmlFor="contact-name" className="contact__label">
              Name
            </label>
            <input
              type="text"
              id="contact-name"
              name="name"
              className={`contact__input ${errors.name ? "has-error" : ""}`}
              placeholder="Your name"
              value={formData.name}
              onChange={handleChange}
              disabled={status === "sending"}
              aria-required="true"
              aria-invalid={errors.name ? "true" : "false"}
              aria-describedby={errors.name ? "contact-name-error" : undefined}
            />
            {errors.name && (
              <span
                id="contact-name-error"
                className="contact__error-text"
                role="alert"
                aria-live="polite"
              >
                {errors.name}
              </span>
            )}
          </div>

          {/* Email Field */}
          <div className="contact__field">
            <label htmlFor="contact-email" className="contact__label">
              Email
            </label>
            <input
              type="email"
              id="contact-email"
              name="email"
              className={`contact__input ${errors.email ? "has-error" : ""}`}
              placeholder="you@domain.com"
              value={formData.email}
              onChange={handleChange}
              disabled={status === "sending"}
              aria-required="true"
              aria-invalid={errors.email ? "true" : "false"}
              aria-describedby={errors.email ? "contact-email-error" : undefined}
            />
            {errors.email && (
              <span
                id="contact-email-error"
                className="contact__error-text"
                role="alert"
                aria-live="polite"
              >
                {errors.email}
              </span>
            )}
          </div>

          {/* Message Field */}
          <div className="contact__field">
            <label htmlFor="contact-message" className="contact__label">
              Message
            </label>
            <textarea
              id="contact-message"
              name="message"
              rows={4}
              className={`contact__input contact__textarea ${
                errors.message ? "has-error" : ""
              }`}
              placeholder="Tell me about what you're building..."
              value={formData.message}
              onChange={handleChange}
              disabled={status === "sending"}
              aria-required="true"
              aria-invalid={errors.message ? "true" : "false"}
              aria-describedby={
                errors.message ? "contact-message-error" : undefined
              }
            />
            {errors.message && (
              <span
                id="contact-message-error"
                className="contact__error-text"
                role="alert"
                aria-live="polite"
              >
                {errors.message}
              </span>
            )}
          </div>

          {/* Error fallback state */}
          {status === "error" && (
            <div
              className="contact__form-error"
              role="alert"
              aria-live="polite"
            >
              {statusMsg.startsWith("Please wait") ? (
                <span>{statusMsg}</span>
              ) : (
                <span>
                  Couldn't send. Email me directly at{" "}
                  <a
                    href={`mailto:${SITE.email}`}
                    className="contact__error-mailto"
                  >
                    {SITE.email}
                  </a>
                  .
                </span>
              )}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="contact__submit-btn"
            disabled={status === "sending"}
          >
            <span>{status === "sending" ? "Sending…" : "Send message"}</span>
            <span className="contact__submit-arrow" aria-hidden="true">
              ↗
            </span>
          </button>
        </form>
      )}
    </div>
  );
}
