"use client";

import { useState } from "react";
import styles from "./ContactForm.module.css";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1200);
  }

  if (submitted) {
    return (
      <div className={styles.success}>
        <div className={styles.successIcon}>✓</div>
        <h3 className={styles.successTitle}>Message Received</h3>
        <p className={styles.successText}>
          Thank you for reaching out. One of our agents will be in touch within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="firstName">
            First Name
          </label>
          <input id="firstName" type="text" className={styles.input} placeholder="Alexandra" required />
        </div>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="lastName">
            Last Name
          </label>
          <input id="lastName" type="text" className={styles.input} placeholder="Seo" required />
        </div>
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="email">
          Email Address
        </label>
        <input id="email" type="email" className={styles.input} placeholder="you@example.com" required />
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="phone">
          Phone Number
        </label>
        <input id="phone" type="tel" className={styles.input} placeholder="(305) 000-0000" />
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="interest">
          I&apos;m interested in
        </label>
        <select id="interest" className={styles.select}>
          <option value="">Select an option</option>
          <option value="buying">Buying a Property</option>
          <option value="selling">Selling a Property</option>
          <option value="investing">Investment Opportunities</option>
          <option value="renting">Renting</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="budget">
          Budget Range
        </label>
        <select id="budget" className={styles.select}>
          <option value="">Select budget</option>
          <option value="under-1m">Under $1M</option>
          <option value="1-3m">$1M – $3M</option>
          <option value="3-7m">$3M – $7M</option>
          <option value="7m-plus">$7M+</option>
        </select>
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="message">
          Message
        </label>
        <textarea
          id="message"
          rows={5}
          className={styles.textarea}
          placeholder="Tell us about your ideal property, timeline, or any questions you have..."
        />
      </div>

      <button type="submit" className={styles.submitBtn} disabled={loading}>
        {loading ? "Sending…" : "Send Message"}
      </button>
    </form>
  );
}
