// controllers/paymentController.js
const paypal = require("paypal-rest-sdk");
const paymentService = require("../services/paymentService");

paypal.configure({
  mode: "sandbox",
  client_id:
    "AQ6VkaZwcTK8iaDgLcU3TeBWoxheOd-xGZ-wxKZE2KOiBLGeLGnhxE2UIf3m0lUjwkKbvTcd6_f8FDz_",
  client_secret:
    "ELkS4n8FsVnZ6yZLksrWc05kui9Au-UGQjw1oSepoLwA4yUd48y_Is9ssA7D7QWV9qWXzhqdEAwGKVvg",
});

let createPayment = async (req, res) => {
  try {
    const paymentData = {
      intent: "sale",
      payer: {
        payment_method: "paypal",
      },
      redirect_urls: {
        return_url: "http://localhost:3000",
        cancel_url: "http://localhost:3000/cancel",
      },
      transactions: [
        {
          amount: {
            total: "30.00",
            currency: "USD",
          },
          description: "Mua sản phẩm ABC",
        },
      ],
    };

    const payment = await paymentService.createPayment(paymentData);
    const approvalUrl = paymentService.getApprovalUrl(payment);

    res.json({ approvalUrl });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  createPayment: createPayment,
};
