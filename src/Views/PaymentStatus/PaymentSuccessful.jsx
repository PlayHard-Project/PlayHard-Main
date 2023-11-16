import React from "react";
import PaymentStatus from "./PaymentStatus";

const PaymentSuccessful = () => {
  return (
    <PaymentStatus
      title="Payment Successful!"
      description="Thank you for your payment! We're pleased to confirm that your transaction was successful. Your order has been processed, and you will receive an email confirmation shortly."
      imageSrc="https://res.cloudinary.com/playhardimages/image/upload/v1700065902/good-payment-image_zwp0tv.png"
      altText="Success Icon"
      isSuccess={true}
    />
  );
};

export default PaymentSuccessful;
