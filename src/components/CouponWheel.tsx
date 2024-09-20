import React, { useState } from 'react';
import { Modal, Button } from 'antd';

const CouponWheel: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [couponCode, setCouponCode] = useState<string | null>(null);

  const handleSpin = () => {
    const codes = ['10% OFF', '20% OFF', '30% OFF'];
    const randomCode = codes[Math.floor(Math.random() * codes.length)];
    setCouponCode(randomCode);
    setIsModalVisible(true);
  };

  const handleCopyCode = () => {
    if (couponCode) {
      navigator.clipboard.writeText(couponCode);
      alert('Coupon code copied to clipboard!');
    }
  };

  return (
    <div className="flex flex-col items-center">
      <Button onClick={handleSpin} type="primary" size="large">
        Spin the Wheel for Discounts
      </Button>
      <Modal
        title="Congratulations!"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={[
          <Button key="copy" type="primary" onClick={handleCopyCode}>
            Copy Code
          </Button>,
        ]}
      >
        <p>Your discount code is: <strong>{couponCode}</strong></p>
        <p>Use this code at checkout to redeem your discount!</p>
      </Modal>
    </div>
  );
};

export default CouponWheel;



