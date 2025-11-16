import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './HelpCenter.css';

const HelpCenter = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFAQ, setExpandedFAQ] = useState(null);

  const faqs = [
    {
      id: 1,
      category: 'Booking',
      question: 'How do I book a train ticket?',
      answer: 'To book a train ticket: 1) Go to the Train Booking page, 2) Enter your departure and destination stations, 3) Select your travel date and class, 4) Click "Search Trains", 5) Choose your preferred train from the results, 6) Complete the payment process. You will receive a confirmation email and SMS with your PNR number.'
    },
    {
      id: 2,
      category: 'Booking',
      question: 'Can I book tickets for multiple passengers?',
      answer: 'Yes! When searching for trains, flights, or buses, you can select the number of passengers (up to 6 per booking). All passengers can be added during the booking process. Make sure to have their details ready including name, age, and ID proof.'
    },
    {
      id: 3,
      category: 'Booking',
      question: 'How do I use the city autocomplete feature?',
      answer: 'Simply start typing the city name or airport/station code in the search field. A dropdown will appear showing matching cities with their codes and state names. Click on your desired city to select it. This feature works for flights, trains, and hotels.'
    },
    {
      id: 4,
      category: 'Payment',
      question: 'What payment methods are accepted?',
      answer: 'Rentara accepts multiple payment methods including Credit/Debit Cards (Visa, Mastercard, RuPay), Net Banking from all major banks, UPI (Google Pay, PhonePe, Paytm), Mobile Wallets, and EMI options for bookings above ₹3,000.'
    },
    {
      id: 5,
      category: 'Payment',
      question: 'Is my payment information secure?',
      answer: 'Absolutely! We use 256-bit SSL encryption for all transactions. Your payment information is processed through PCI-DSS compliant payment gateways. We never store your complete card details on our servers.'
    },
    {
      id: 6,
      category: 'Payment',
      question: 'What if my payment fails but money is deducted?',
      answer: 'If payment fails but money is debited from your account, the amount will be automatically refunded within 5-7 business days. Check your email for a failed transaction receipt. If you don\'t receive the refund, contact our support team with your transaction ID.'
    },
    {
      id: 7,
      category: 'Cancellation',
      question: 'How do I cancel my booking?',
      answer: 'To cancel: 1) Login to your account, 2) Go to "My Bookings", 3) Select the booking you want to cancel, 4) Click "Cancel Booking", 5) Confirm cancellation. Refund will be processed according to the cancellation policy. For flights marked as "Non-refundable", cancellation charges may apply.'
    },
    {
      id: 8,
      category: 'Cancellation',
      question: 'What is the cancellation policy?',
      answer: 'Cancellation policies vary by service:\n• Trains: Cancellation allowed up to 4 hours before departure with nominal charges\n• Flights: Depends on airline policy (refundable/non-refundable)\n• Hotels: Free cancellation up to 24-48 hours before check-in (varies by property)\n• Bus: Cancellation allowed up to 6 hours before departure'
    },
    {
      id: 9,
      category: 'Cancellation',
      question: 'When will I receive my refund?',
      answer: 'Refund processing times:\n• Successful cancellations: 5-7 business days\n• Failed bookings: 5-7 business days\n• The refund will be credited to the original payment method\n• You will receive an email confirmation once the refund is initiated'
    },
    {
      id: 10,
      category: 'Account',
      question: 'How do I create an account?',
      answer: 'Click on the "Sign Up" button in the top right corner or hamburger menu. Enter your full name, email address, and create a strong password. Click "Sign Up" to create your account. You\'ll receive a verification email to confirm your account.'
    },
    {
      id: 11,
      category: 'Account',
      question: 'I forgot my password. What should I do?',
      answer: 'Click on "Login", then click "Forgot Password?" below the password field. Enter your registered email address and click "Send Reset Link". Check your email for password reset instructions. The link is valid for 1 hour.'
    },
    {
      id: 12,
      category: 'Account',
      question: 'Can I change my email address?',
      answer: 'Yes! Login to your account, go to Settings > Profile Information, click "Edit" next to your email, enter your new email, verify with OTP, and save changes. You\'ll need to verify the new email address.'
    },
    {
      id: 13,
      category: 'Recommendations',
      question: 'How does the recommendation system work?',
      answer: 'Our smart recommendation system uses machine learning to suggest the best options based on:\n• Your search preferences (budget, dates, destinations)\n• Your booking history\n• Popular choices from travelers like you\n• Real-time pricing and availability\n• Ratings and reviews from verified users'
    },
    {
      id: 14,
      category: 'Recommendations',
      question: 'Why am I seeing these specific recommendations?',
      answer: 'Recommendations are personalized based on multiple factors:\n• Your budget range and travel preferences\n• Similar users\' booking patterns\n• Seasonal trends and popular routes\n• Price-to-value ratio\n• Availability and demand\nThe match percentage shows how well each option fits your preferences.'
    },
    {
      id: 15,
      category: 'Technical',
      question: 'The website is not loading properly. What should I do?',
      answer: 'Try these troubleshooting steps:\n1. Clear your browser cache and cookies\n2. Try a different browser (Chrome, Firefox, Safari)\n3. Check your internet connection\n4. Disable browser extensions temporarily\n5. Update your browser to the latest version\nIf the issue persists, contact our support team.'
    },
    {
      id: 16,
      category: 'Technical',
      question: 'Can I use Rentara on mobile devices?',
      answer: 'Yes! Rentara is fully responsive and works seamlessly on all devices:\n• Mobile phones (iOS and Android)\n• Tablets\n• Desktop computers\n• Laptops\nThe interface automatically adapts to your screen size for the best experience.'
    },
    {
      id: 17,
      category: 'Hotels',
      question: 'How are hotel reviews verified?',
      answer: 'All hotel reviews on Rentara come from verified sources:\n• Reviews are imported from TripAdvisor\n• Only guests who have completed their stay can review\n• Reviews are checked for authenticity\n• Fake or spam reviews are removed\n• Hotels cannot delete negative reviews'
    },
    {
      id: 18,
      category: 'Hotels',
      question: 'What if the hotel doesn\'t match the description?',
      answer: 'If the hotel doesn\'t match the description or photos:\n1. Contact the hotel reception immediately\n2. Take photos/videos as evidence\n3. Contact Rentara support within 24 hours\n4. We will mediate with the hotel\n5. If unresolved, we\'ll help you find alternative accommodation\nYour satisfaction is our priority!'
    }
  ];

  const categories = ['All', 'Booking', 'Payment', 'Cancellation', 'Account', 'Recommendations', 'Technical', 'Hotels'];

  const [activeCategory, setActiveCategory] = useState('All');

  const filteredFAQs = faqs.filter(faq => {
    const matchesCategory = activeCategory === 'All' || faq.category === activeCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleFAQ = (id) => {
    setExpandedFAQ(expandedFAQ === id ? null : id);
  };

  return (
    <div className="help-center-page">
      {/* Header */}
      <div className="help-header">
        <Link to="/introduction" className="back-link">← Back to Home</Link>
        <h1>Help Center</h1>
        <p className="help-subtitle">Find answers to common questions and get support</p>
      </div>

      {/* Search Bar */}
      <div className="help-search-container">
        <div className="help-search-box">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search for help... (e.g., 'how to book', 'refund policy')"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="help-search-input"
          />
          {searchQuery && (
            <button className="clear-search" onClick={() => setSearchQuery('')}>✕</button>
          )}
        </div>
      </div>

      {/* Quick Access Cards */}
      <div className="quick-access-section">
        <h2>Quick Access</h2>
        <div className="quick-access-grid">
          <div className="quick-card">
            <span className="quick-icon">📖</span>
            <h3>Getting Started</h3>
            <p>New to Rentara? Learn how to make your first booking</p>
          </div>
          <div className="quick-card">
            <span className="quick-icon">💳</span>
            <h3>Payment Help</h3>
            <p>Payment methods, refunds, and billing information</p>
          </div>
          <div className="quick-card">
            <span className="quick-icon">🎫</span>
            <h3>Manage Bookings</h3>
            <p>View, modify, or cancel your existing bookings</p>
          </div>
          <div className="quick-card">
            <span className="quick-icon">🤖</span>
            <h3>ML Recommendations</h3>
            <p>How our smart recommendation system works</p>
          </div>
        </div>
      </div>

      {/* Category Filters */}
      <div className="category-filters">
        {categories.map(category => (
          <button
            key={category}
            className={`category-btn ${activeCategory === category ? 'active' : ''}`}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* FAQs */}
      <div className="faqs-section">
        <h2>Frequently Asked Questions</h2>
        {filteredFAQs.length === 0 ? (
          <div className="no-results">
            <p>No results found for "{searchQuery}"</p>
            <button onClick={() => setSearchQuery('')} className="reset-btn">Clear Search</button>
          </div>
        ) : (
          <div className="faqs-list">
            {filteredFAQs.map(faq => (
              <div key={faq.id} className={`faq-item ${expandedFAQ === faq.id ? 'expanded' : ''}`}>
                <div className="faq-question" onClick={() => toggleFAQ(faq.id)}>
                  <div>
                    <span className="faq-category-badge">{faq.category}</span>
                    <h3>{faq.question}</h3>
                  </div>
                  <span className="faq-toggle">{expandedFAQ === faq.id ? '−' : '+'}</span>
                </div>
                {expandedFAQ === faq.id && (
                  <div className="faq-answer">
                    <p>{faq.answer.split('\n').map((line, i) => (
                      <React.Fragment key={i}>
                        {line}
                        {i < faq.answer.split('\n').length - 1 && <br />}
                      </React.Fragment>
                    ))}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Contact Support */}
      <div className="contact-support-section">
        <h2>Still Need Help?</h2>
        <p>Can't find what you're looking for? Our support team is here to help!</p>
        <div className="support-options">
          <Link to="/contact" className="support-option-card">
            <span className="support-icon">📧</span>
            <h3>Email Support</h3>
            <p>Get a response within 24 hours</p>
            <button>Contact Us</button>
          </Link>
          <div className="support-option-card">
            <span className="support-icon">💬</span>
            <h3>Live Chat</h3>
            <p>Chat with us in real-time</p>
            <button>Start Chat</button>
          </div>
          <div className="support-option-card">
            <span className="support-icon">📞</span>
            <h3>Phone Support</h3>
            <p>Call us: 1800-123-4567</p>
            <button>Call Now</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpCenter;