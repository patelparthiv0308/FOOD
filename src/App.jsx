import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Utensils, Flame, Info, Phone, Globe, Mail, MessageCircle } from 'lucide-react';
import './index.css';

function App() {
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" }
  };

  const staggerContainer = {
    animate: { transition: { staggerChildren: 0.2 } }
  };

  useEffect(() => {
    // Initialize global cart UI once React components are in the DOM
    if (window.updateCartUI) {
      window.updateCartUI();
    }
  }, []);

  return (
    <div className="app-container bg-black">
      {/* Premium Floating Navbar */}
      <nav className="navbar navbar-expand-lg fixed-top navbar-dark custom-navbar glass-effect">
        <div className="container">
          <motion.a 
            className="navbar-brand fw-bold d-flex align-items-center" 
            href="#"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <span className="brand-icon me-2">👑</span> Royal Bite
          </motion.a>

          <button className="navbar-toggler border-0" data-bs-toggle="collapse" data-bs-target="#nav">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="nav">
            <ul className="navbar-nav ms-auto align-items-center gap-3">
              <li className="nav-item"><a className="nav-link" href="#home">Home</a></li>
              <li className="nav-item"><a className="nav-link" href="#menu">Menu</a></li>
              <li className="nav-item"><a className="nav-link" href="#about">About</a></li>
              <li className="nav-item"><a className="nav-link" href="#contact">Contact</a></li>
              
              <li className="nav-item dropdown ms-lg-3">
                <a className="nav-link cart-btn position-relative" href="#" id="cartBtn" data-bs-toggle="dropdown">
                  <ShoppingCart size={22} />
                  <span id="cart-count" className="badge bg-warning text-black rounded-pill cart-badge">0</span>
                </a>
                <ul className="dropdown-menu dropdown-menu-end p-4 shadow-2xl glass-dropdown border-secondary" style={{width: '350px'}}>
                  <h6 className="text-white mb-3 fw-bold border-bottom border-secondary pb-2">🛒 Your Royal Cart</h6>
                  <div id="cart-items" style={{maxHeight: '300px', overflowY: 'auto'}}>
                    <p className="text-muted text-center py-3">Your cart is empty</p>
                  </div>
                  <div className="d-flex justify-content-between align-items-center my-3">
                    <h6 id="cart-total" className="text-warning mb-0 fw-bold">Total: ₹0</h6>
                  </div>
                  <button 
                    className="btn btn-warning w-100 fw-bold py-2 rounded-pill shadow-lg"
                    onClick={() => window.checkout && window.checkout()}
                  >
                    Checkout Now
                  </button>
                  <a href="cart.html" className="btn btn-link btn-sm w-100 text-secondary mt-2">View Full Cart</a>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Cinematic Hero Section */}
      <section id="home" className="hero-section d-flex align-items-center">
        <div className="hero-overlay"></div>
        <div className="container text-center text-white position-relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="display-1 fw-black hero-title mb-4">
              <span className="text-gradient">Taste the Magic</span>
              <motion.span 
                className="d-inline-block ms-3"
                animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Flame size={60} color="#ffc107" fill="#ffc107" />
              </motion.span>
            </h1>
            <p className="lead fs-4 mb-5 text-light opacity-80">Fresh Ingredients • Master Chefs • Instant Royal Delivery</p>
            <motion.a 
              href="#menu" 
              className="btn btn-warning btn-lg px-5 py-3 rounded-pill fw-bold royal-btn shadow-2xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Explore Royal Menu
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* Interactive Menu Section */}
      <section id="menu" className="menu-section py-5">
        <div className="container">
          <motion.div 
            className="text-center mb-5"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h6 className="text-warning text-uppercase fw-bold tracking-widest mb-2">Our Specialties</h6>
            <h2 className="display-4 fw-bold text-white mb-4">Curated Culinary Experiences</h2>
            <div className="title-underline mx-auto"></div>
          </motion.div>

          <motion.div 
            className="row g-4"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {[
              { id: 'pizza', name: 'Artisan Pizza', desc: 'Loaded Cheese & Fresh Toppings', img: 'https://media.istockphoto.com/id/519526540/photo/slice-of-hot-pizza.webp?a=1&b=1&s=612x612&w=0&k=20&c=zvbdjsyttIvzgpvFDylpQLP9erEeEiogF0V2ti2k-gU=', link: 'pizza.html' },
              { id: 'burger', name: 'Gourmet Burger', desc: 'Premium Wagyu Beef & Truffle Oil', img: 'https://images.unsplash.com/photo-1606149059549-6042addafc5a?w=600', link: 'burger.html' },
              { id: 'pasta', name: 'Italian Pasta', desc: 'Handcrafted Sauce & Fresh Herbs', img: 'https://images.unsplash.com/photo-1652480191212-13ecee3ec66b?w=600', link: 'pasta.html' }
            ].map((item, idx) => (
              <motion.div className="col-md-4" key={item.id} variants={fadeInUp}>
                <div className="menu-card glass-card h-100 overflow-hidden shadow-2xl">
                  <div className="card-img-wrapper">
                    <img src={item.img} alt={item.name} className="img-fluid menu-img" />
                    <div className="img-overlay"></div>
                  </div>
                  <div className="card-body p-4 text-center">
                    <h4 className="text-warning fw-bold mb-2">{item.name}</h4>
                    <p className="text-light opacity-70 mb-4">{item.desc}</p>
                    <a href={item.link} className="btn btn-outline-warning w-100 rounded-pill py-2 fw-bold">Discover More</a>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Premium About Section */}
      <section id="about" className="about-luxury py-5">
        <div className="container">
          <div className="row align-items-center g-5">
            <motion.div 
              className="col-md-6"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="about-img-frame shadow-2xl">
                <img src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800" className="img-fluid rounded-3" alt="Heritage" />
                <div className="experience-badge bg-warning">
                  <span className="fw-bold fs-2 text-black">15+</span>
                  <small className="d-block text-black">Years Excellence</small>
                </div>
              </div>
            </motion.div>
            <motion.div 
              className="col-md-6 text-white"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h6 className="text-warning text-uppercase fw-bold mb-2">Our Story</h6>
              <h2 className="display-4 fw-bold mb-4">Crafting Experiences <br/>Fit for Royalty</h2>
              <p className="lead text-light opacity-80 mb-5">At Royal Bite, we don't just serve food; we craft experiences. Every dish is a masterpiece, prepared with the finest organic ingredients and a secret blend of spices passed down through generations.</p>
              
              <div className="row g-4">
                {[
                  { icon: '👑', title: 'Royal Taste', sub: 'Authentic Flavors' },
                  { icon: '🌿', title: 'Organic', sub: '100% Fresh' },
                  { icon: '👨‍🍳', title: 'Master Chefs', sub: 'Expert Craftsmen' },
                  { icon: '🚀', title: 'Fast Delivery', sub: 'Fresh to Door' }
                ].map((feature, i) => (
                  <div className="col-6" key={i}>
                    <div className="feature-item d-flex align-items-center p-3 glass-effect rounded-3 border border-secondary border-opacity-25">
                      <span className="fs-3 me-3">{feature.icon}</span>
                      <div>
                        <h6 className="mb-0 fw-bold">{feature.title}</h6>
                        <small className="text-warning">{feature.sub}</small>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Modern Contact Section */}
      <section id="contact" className="contact-section py-5 bg-black">
        <div className="container">
          <div className="row g-5">
            <motion.div 
              className="col-md-5"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="contact-info-card p-5 rounded-4 glass-card shadow-2xl border-secondary">
                <h3 className="text-warning fw-bold mb-4">Connect with Us</h3>
                <div className="mb-4">
                  <div className="d-flex align-items-center mb-3">
                    <div className="icon-circle me-3"><Phone size={20} /></div>
                    <p className="mb-0 text-white">+91 98765 43210</p>
                  </div>
                  <div className="d-flex align-items-center mb-3">
                    <div className="icon-circle me-3"><Utensils size={20} /></div>
                    <p className="mb-0 text-white">contact@royalbite.com</p>
                  </div>
                </div>
                <h5 className="text-white mb-4">Follow the Journey</h5>
                <div className="d-flex gap-3">
                  <a href="#" className="social-pill"><Globe size={20} /></a>
                  <a href="#" className="social-pill"><Mail size={20} /></a>
                  <a href="#" className="social-pill"><MessageCircle size={20} /></a>
                </div>
              </div>
            </motion.div>

            <motion.div 
              className="col-md-7"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <form className="contact-form p-5 rounded-4 glass-card shadow-2xl border-secondary">
                <h3 className="text-white fw-bold mb-4">Send a Message</h3>
                <div className="row g-3">
                  <div className="col-md-6">
                    <input type="text" className="form-control border-secondary py-3" placeholder="Your Name" />
                  </div>
                  <div className="col-md-6">
                    <input type="email" className="form-control border-secondary py-3" placeholder="Email Address" />
                  </div>
                  <div className="col-12">
                    <textarea className="form-control border-secondary py-3" rows="4" placeholder="How can we help you?"></textarea>
                  </div>
                  <div className="col-12 mt-4">
                    <button className="btn btn-warning w-100 py-3 fw-bold royal-btn rounded-pill">Send Royal Message</button>
                  </div>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      <footer className="footer-premium py-4 text-center bg-black border-top border-secondary border-opacity-25">
        <p className="text-light opacity-50 mb-0">© 2026 Royal Bite | Crafted for Connoisseurs</p>
      </footer>
    </div>
  );
}

export default App;
