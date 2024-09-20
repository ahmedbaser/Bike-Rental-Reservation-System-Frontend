import { Modal, Button } from 'antd';

const CouponModal = ({ visible, onClose, couponCode }) => {
  return (
    <Modal title="Your Coupon Code" visible={visible} onCancel={onClose} footer={null}>
      <p>Coupon Code: {couponCode}</p>
      <Button onClick={() => navigator.clipboard.writeText(couponCode)}>Copy</Button>
    </Modal>
  );
};

export default CouponModal;