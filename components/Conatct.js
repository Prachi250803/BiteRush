const Contact = () => {
  return (
    <div className="Contact">
      <div className="Heading">
        <h1>Get in Touch With RushBite!</h1>
        <h3>We're here to help you.Drop us a message or reach out anytime.</h3>
      </div>
      <div className="contact-card">
        <p>Name</p>
        <input type="text" />
        <p>Email Address</p>
        <input type="email" />
        <p>Phone Number (optional)</p>
        <input type="tel" />
        <p>Subject</p>
        <input type="text" />
        <p>Message</p>
        <textarea />
      </div>
      <button className="Send">Send Message</button>
      <div className="contact-details">
        <div className="phone-email">
          <div className="phone-details">
            <h4>Phone Support</h4>
            <p>+1(800)123-Food</p>
          </div>
          <div className="email">
            <h4> Email </h4>
            <p> Support@rushbite.com</p>
          </div>
        </div>
        <div className="office-address">
          <h4>Office Address</h4>
          <p>RushBite, Near wipro circle <br/> Hinjewadi Phase 1  , Pune</p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
