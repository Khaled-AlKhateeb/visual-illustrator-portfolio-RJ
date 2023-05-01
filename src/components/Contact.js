function Contact() {
  return (
    <div className="contact-main-container">
      <h2 className="contact-title">Send a Message</h2>
      <form
        className="contact-form"
        action="https://formspree.io/f/moqzrvlk"
        method="POST"
        target="_blank"
      >
        <input className="form-input" type="text" name="name" placeholder="Your Name" />
        <input className="form-input" type="email" name="email" placeholder="Your Email" />
        <textarea className="form-input textarea" name="message" placeholder="Your Message"></textarea>
        <button className="form-input contact-btn" type="submit">Send</button>
      </form>
    </div >
  )
}

export default Contact;