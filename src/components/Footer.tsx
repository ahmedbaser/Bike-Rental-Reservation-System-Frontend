import React from 'react';
import { Layout, Row, Col } from 'antd';
import { FacebookOutlined, TwitterOutlined, InstagramOutlined, LinkedinOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Footer } = Layout;

const AppFooter: React.FC = () => {
  return (
    <Footer className="footer bg-blue-600 text-white py-6">
      <div className="max-w-6xl mx-auto px-4">
        <Row className="footer-content flex flex-col md:flex-row justify-between items-center">
          {/* Social Media Icons */}
          <Col xs={24} md={8} className="mb-4 md:mb-0 md:pl-12">
            <h3 className="text-lg font-semibold mb-2">Follow Us</h3>
            <div className="flex justify-center md:justify-start space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <FacebookOutlined style={{ fontSize: '24px', color: '#FFFFFF' }} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <TwitterOutlined style={{ fontSize: '24px', color: '#FFFFFF' }} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <InstagramOutlined style={{ fontSize: '24px', color: '#FFFFFF' }} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <LinkedinOutlined style={{ fontSize: '24px', color: '#FFFFFF' }} />
              </a>
            </div>
          </Col>

          {/* Website Links */}
          <Col xs={24} md={8} className="footer-links text-center md:text-right md:pr-12">
            <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
            <ul className="list-none space-y-2">
              <li>
                <Link to="/privacy-policy">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/terms-of-service">Terms of Service</Link>
              </li>
              <li>
                <Link to="/contact-us">Contact Us</Link>
              </li>
            </ul>
          </Col>
        </Row>

        <div className="text-center mt-8">
          <p className="text-sm text-white">Your Company. All Rights Reserved.</p>
        </div>
      </div>
    </Footer>
  );
};

export default AppFooter;























