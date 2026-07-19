import { useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import { FaClock, FaEnvelope, FaHeadset, FaMapMarkerAlt, FaPaperPlane, FaPhoneAlt } from 'react-icons/fa'

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target
    setSubmitted(false)
    setFormData((currentData) => ({ ...currentData, [name]: value }))
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitted(true)
    setFormData({ name: '', email: '', message: '' })
  }

  return (
    <div className="contact-page">
      <section className="page-hero contact-hero">
        <div>
          <span className="eyebrow"><FaHeadset /> We&apos;re here to help</span>
          <h1>Questions, feedback or just want to say hello?</h1>
          <p>Send us a message and our friendly support team will get back to you within one business day.</p>
        </div>
        <div className="contact-visual">
          <img src="/images/generated/contact-support.png" alt="ShopEase customer support specialist" />
          <div className="support-bubble"><FaClock /><strong>Usually replies in</strong><span>under 4 hours</span></div>
        </div>
      </section>

      <section className="contact-content">
        <div className="contact-info">
          <span className="eyebrow">Contact details</span>
          <h2>Talk to a real person.</h2>
          <p>Whether you need help choosing a product, tracking an order or arranging a return, we&apos;ll point you in the right direction.</p>
          <div className="contact-details">
            <a href="mailto:hello@shopease.in"><span><FaEnvelope /></span><div><small>Email us</small><strong>hello@shopease.in</strong></div></a>
            <a href="tel:+911234567890"><span><FaPhoneAlt /></span><div><small>Call us</small><strong>+91 123 456 7890</strong></div></a>
            <div><span><FaMapMarkerAlt /></span><div><small>Visit us</small><strong>Indore, Madhya Pradesh, India</strong></div></div>
          </div>
          <div className="support-hours"><FaClock /><div><strong>Support hours</strong><p>Monday–Sunday, 9:00 AM–8:00 PM IST</p></div></div>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <span className="eyebrow">Send a message</span>
          <h2>How can we help?</h2>
          <div className="form-group">
            <label htmlFor="name">Your name</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} placeholder="Enter your full name" required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="you@example.com" required />
          </div>
          <div className="form-group">
            <label htmlFor="message">Your message</label>
            <textarea id="message" name="message" value={formData.message} onChange={handleChange} placeholder="Tell us what you need help with..." required rows={5} />
          </div>
          {submitted && <p className="form-success">Thanks! Your message has been received.</p>}
          <button type="submit" className="submit-btn">Send message <FaPaperPlane /></button>
        </form>
      </section>
    </div>
  )
}

export default Contact
