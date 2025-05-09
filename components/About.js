import {Link} from 'react-router-dom'

const About = () => {
    return (
      <div className="AboutUs">
        <section className="hero">
          <h1>About RushBite</h1>
          <p>"Fueling your cravings, faster!"</p>
        </section>
  
        <section className="content">
          <h2>Who We Are</h2>
          <p>
            RushBite is a dynamic food delivery platform connecting foodies with their favorite local restaurants.
            Whether it's a midnight snack or a family dinner, we make it happen — fast, fresh, and flawless.
          </p>
  
          <h2>Our Mission</h2>
          <p>
            We’re here to revolutionize the food delivery game. Our mission is simple: get good food to good people,
            as quickly and reliably as possible.
          </p>
  
          <h2>Why Choose RushBite?</h2>
          <ul>
            <li>⚡ Lightning-Fast Delivery</li>
            <li>📍 Real-Time Tracking</li>
            <li>🍽️ Curated Menus from Top Restaurants</li>
            <li>📞 24/7 Customer Support</li>
          </ul>
  
          <div className="actions">
           <Link to="/" className='Link'> <button>Order Now </button> </Link>
           <Link to="/contact" className='Link'> <button className='secondary'>Contact us</button></Link>
          </div>
        </section>
      </div>
    );
  };
  
  export default About;
  