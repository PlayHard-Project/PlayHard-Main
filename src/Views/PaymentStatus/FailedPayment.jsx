import React from "react";
import PaymentStatus from "./PaymentStatus";

const FailedPayment = () => {
  return (
    <PaymentStatus
      title="Something Went Wrong!"
      description="We apologize for the inconvenience, but an error occurred while processing your order request"
      imageSrc="https://res.cloudinary.com/playhardimages/image/upload/v1700065770/wrong-payment-image_mztknp.png"
      altText="Failure Icon"
    />
  );
};

export default FailedPayment;
