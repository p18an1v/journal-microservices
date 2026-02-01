import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { isAuthenticated } = useAuth();

  const features = [
    {
      icon: '✍️',
      title: 'Write Freely',
      description: 'Express your thoughts with our intuitive journal editor. No distractions, just you and your words.'
    },
    {
      icon: '🔒',
      title: 'Private & Secure',
      description: 'Your journals are protected with industry-standard encryption. Your thoughts stay yours.'
    },
    {
      icon: '☁️',
      title: 'Cloud Sync',
      description: 'Access your journals from anywhere. All your entries are safely stored in the cloud.'
    },
    {
      icon: '📱',
      title: 'Responsive Design',
      description: 'Write on any device. Our app works beautifully on desktop, tablet, and mobile.'
    }
  ];

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-background">
          <div className="gradient-orb orb-1"></div>
          <div className="gradient-orb orb-2"></div>
          <div className="gradient-orb orb-3"></div>
        </div>
        
        <div className="container hero-content">
          <div className="row align-items-center min-vh-100">
            <div className="col-lg-6">
              <span className="badge badge-new mb-3">
                ✨ Your Personal Space
              </span>
              <h1 className="hero-title">
                Capture Your 
                <span className="gradient-text"> Thoughts</span>,
                <br />
                Shape Your <span className="gradient-text">Story</span>
              </h1>
              <p className="hero-subtitle">
                JournalHub is a beautiful, secure place to document your life's journey. 
                Start writing today and discover the power of reflection.
              </p>
              
              <div className="hero-cta">
                {isAuthenticated() ? (
                  <Link to="/dashboard" className="btn btn-primary btn-lg btn-glow">
                    Go to Dashboard
                    <span className="ms-2">→</span>
                  </Link>
                ) : (
                  <>
                    <Link to="/register" className="btn btn-primary btn-lg btn-glow me-3">
                      Start Writing Free
                      <span className="ms-2">→</span>
                    </Link>
                    <Link to="/login" className="btn btn-outline-light btn-lg">
                      Sign In
                    </Link>
                  </>
                )}
              </div>
              
              <div className="hero-stats mt-5">
                <div className="stat-item">
                  <span className="stat-number">10K+</span>
                  <span className="stat-label">Users</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">50K+</span>
                  <span className="stat-label">Journals</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">99.9%</span>
                  <span className="stat-label">Uptime</span>
                </div>
              </div>
            </div>
            
            <div className="col-lg-6 d-none d-lg-block">
              <div className="hero-illustration">
                <div className="floating-card card-1">
                  <div className="card-icon">📝</div>
                  <div className="card-text">
                    <strong>Today's Reflection</strong>
                    <span>A beautiful day to write...</span>
                  </div>
                </div>
                <div className="floating-card card-2">
                  <div className="card-icon">💡</div>
                  <div className="card-text">
                    <strong>New Ideas</strong>
                    <span>Captured 3 insights today</span>
                  </div>
                </div>
                <div className="floating-card card-3">
                  <div className="card-icon">🎯</div>
                  <div className="card-text">
                    <strong>Goals & Dreams</strong>
                    <span>Tracking progress...</span>
                  </div>
                </div>
                <div className="journal-preview">
                  <div className="preview-header">
                    <span className="preview-dot"></span>
                    <span className="preview-dot"></span>
                    <span className="preview-dot"></span>
                  </div>
                  <div className="preview-content">
                    <div className="preview-line long"></div>
                    <div className="preview-line medium"></div>
                    <div className="preview-line short"></div>
                    <div className="preview-line long"></div>
                    <div className="preview-line medium"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="section-title">Why Choose JournalHub?</h2>
            <p className="section-subtitle">
              Everything you need to make journaling a delightful habit
            </p>
          </div>
          
          <div className="row g-4">
            {features.map((feature, index) => (
              <div className="col-md-6 col-lg-3" key={index}>
                <div className="feature-card">
                  <div className="feature-icon">{feature.icon}</div>
                  <h4 className="feature-title">{feature.title}</h4>
                  <p className="feature-description">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-card">
            <h2>Ready to Start Your Journey?</h2>
            <p>Join thousands of writers who have discovered the joy of journaling.</p>
            {!isAuthenticated() && (
              <Link to="/register" className="btn btn-light btn-lg">
                Create Free Account
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="footer-brand">
                <span className="brand-icon">📓</span>
                <span className="brand-text">JournalHub</span>
              </div>
              <p className="footer-text">
                Your thoughts deserve a beautiful home.
              </p>
            </div>
            <div className="col-md-6 text-md-end">
              <p className="footer-copyright">
                © 2026 JournalHub. Made with ❤️
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
