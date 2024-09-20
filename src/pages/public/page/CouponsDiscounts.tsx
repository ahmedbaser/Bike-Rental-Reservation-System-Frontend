import { Button } from "antd";
import { Link } from "react-router-dom";
import CouponWheel from "../../../components/CouponWheel";

const CouponsDiscounts = () => {
  return (
    <div className="bg-blue-600 text-white py-16 px-4">
      <h2 className="text-4xl font-bold text-center mb-8">Special Offers</h2>
      <div className="text-center mb-8">
        <p className="text-lg mb-4">
          Use code <strong>BIKE2024</strong> to get 20% off your next rental!
        </p>
        <Link to="/coupons">
          <Button type="primary" size="large">
            View More Coupons
          </Button>
        </Link>
      </div>

      <div className="text-center">
        <CouponWheel />
      </div>

      <div className="mt-8 text-center">
        <h3 className="text-2xl font-semibold mb-4">How to Use Your Coupons</h3>
        <p className="text-lg">
          Enter the coupon code at checkout to enjoy your discount! Make sure to
          apply the code before completing your payment.
        </p>
      </div>
    </div>
  );
};

export default CouponsDiscounts;



