import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import QRCode from "qrcode.react";
import cryptoRandomString from "crypto-random-string";
import '../styles/payment.css'

const Payment = () => {
  const { bookingId, seats } = useParams();
  const [passengers, setPassengers] = useState([]);
  const [amount, setAmount] = useState(0);
  const [transactionId, setTransactionId] = useState("");
  const [paymentStatus, setPaymentStatus] = useState(null);

  // Generate a random 16-digit alphanumeric transaction ID
  useEffect(() => {
    setTransactionId(generateRandomTransactionId(16));
  }, []);

  useEffect(() => {
    // Calculate amount based on the number of seats
    setAmount(seats * 100); // Assuming Rs. 100 per seat
  }, [seats]);

  const generateRandomTransactionId = (length) => {
    return cryptoRandomString({ length, type: "alphanumeric" });
  };

  const generateQRCode = () => {
    // Generate a mock UPI URL with the booking ID, amount, and seats
    const upiUrl = `upi://pay?pa=example@upi&pn=Merchant&mc=123456&tid=${transactionId}&tr=${bookingId}&tn=Booking&am=${amount}&cu=INR&url=https://example.com&seats=${seats}`;

    return upiUrl;
  };

  const handlePayment = () => {
    // Simulate payment processing
    setPaymentStatus("success"); // For simplicity, always mark as success
  };

  return (
    <div className="payment-container">
      <h2 className="payment-heading">Payment for Booking ID: {bookingId}</h2>
      <QRCode value={generateQRCode()} className="qr-code" />
      <div className="payment-details">
        <p>
          <strong>Transaction ID:</strong> {transactionId}
        </p>
        <p>
          <strong>Total Amount (INR):</strong> {amount}
        </p>
        <p>
          <strong>Number of Seats:</strong> {seats}
        </p>
        {paymentStatus === "success" && (
          <p className="payment-success">Payment successful! Thank you for booking.</p>
        )}
      </div>
      {paymentStatus !== "success" && (
        <button type="button" onClick={handlePayment} className="payment-button">
          Process Payment
        </button>
      )}
    </div>
  );
};

export default Payment;
