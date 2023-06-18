// services/paymentService.js
const paypal = require("paypal-rest-sdk");

let createPayment = (paymentData) => {
  return new Promise((resolve, reject) => {
    paypal.payment.create(paymentData, (error, payment) => {
      if (error) {
        reject(error);
      } else {
        resolve(payment);
      }
    });
  });
};

let getApprovalUrl = (payment) => {
    return payment.links.find((link) => link.rel === "approval_url").href;
};

module.exports = {
  createPayment: createPayment,
  getApprovalUrl: getApprovalUrl,
};
