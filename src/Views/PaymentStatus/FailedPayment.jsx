import React from "react";
import PaymentStatus from "./PaymentStatus";
import BuyCartManagement from "../../Utilities/BuyCartManagement";

const FailedPayment = () => {
  const buyManager = new BuyCartManagement();
  buyManager.revertPurchase();

  return (
    <PaymentStatus
      title="Something Went Wrong!"
      description="We apologize for the inconvenience, but an error occurred while processing your order request"
      imageSrc="https://res.cloudinary.com/playhardimages/image/upload/v1700065770/wrong-payment-image_mztknp.png"
      altText="Failure Icon"
      isSuccess={false}
    />
  );
};

export default FailedPayment;
