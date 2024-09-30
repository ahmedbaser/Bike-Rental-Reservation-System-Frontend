import { Modal, Button } from 'antd';

interface CouponModalProps {
  visible: boolean;
  onClose: () => void;
  couponCode: string;
}

const CouponModal: React.FC<CouponModalProps> = ({ visible, onClose, couponCode }) => {
  return (
    <Modal title="Your Coupon Code" visible={visible} onCancel={onClose} footer={null}>
      <p>Coupon Code: {couponCode}</p>
      <Button onClick={() => navigator.clipboard.writeText(couponCode)}>Copy</Button>
    </Modal>
  );
};

export default CouponModal;
