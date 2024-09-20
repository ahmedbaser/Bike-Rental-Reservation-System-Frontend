import React from 'react';
import { Card, Col, Row, Button, message } from 'antd';

interface Coupon {
  id: number;
  code: string;
  description: string;
  discount: string;
  expiryDate: string;
}

const CouponsPage: React.FC = () => {
  const coupons: Coupon[] = [
    {
      id: 1,
      code: 'BIKE2024',
      description: '20% off on your next bike rental with offer.',
      discount: '20% OFF',
      expiryDate: 'Expires on: Dec 31, 2024',
    },
    {
      id: 2,
      code: 'SUMMER10',
      description: '10% discount on rentals during summer.',
      discount: '10% OFF',
      expiryDate: 'Expires on: Sep 31, 2024',
    },
    {
      id: 3,
      code: 'WHEEL15',
      description: 'Save 15% on rentals with this exclusive offer.',
      discount: '15% OFF',
      expiryDate: 'Expires on: Nov 30, 2024',
    },
  ];

  const handleCopyCode = (couponCode: string) => {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(couponCode)
        .then(() => {
          message.success('Coupon code copied to clipboard!');
        })
        .catch((err) => {
          message.error('Failed to copy the coupon code.');
          console.error('Clipboard error:', err);
        });
    } else {
      const textArea = document.createElement('textarea');
      textArea.value = couponCode;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
        message.success('Coupon code copied to clipboard!');
      } catch (err) {
        message.error('Failed to copy the coupon code.');
        console.error('Fallback clipboard error:', err);
      }
      document.body.removeChild(textArea);
    }
  };

  return (
    <div className="p-8 bg-gray-100">
      <h2 className="text-3xl font-bold text-center mb-8">Available Coupons</h2>
      <Row gutter={[16, 16]} justify="center">
        {coupons.map((coupon) => (
          <Col key={coupon.id} xs={24} sm={12} md={8} lg={6}>
            <Card
              title={coupon.code}
              bordered={false}
              style={{ borderRadius: '8px' }}
              className="shadow-md"
            >
              <p>{coupon.description}</p>
              <p>
                <strong>{coupon.discount}</strong>
              </p>
              <p className="text-gray-600">{coupon.expiryDate}</p>
              <Button className='mt-3'
                type="primary"
                onClick={() => handleCopyCode(coupon.code)}
              >
                Copy Code
              </Button>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default CouponsPage;
