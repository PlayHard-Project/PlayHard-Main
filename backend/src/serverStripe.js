const { Order } = require("./models/orderSchema");
const { Invoice } = require("./html_templates/invoice.js");

/**
 * Configuration function to implement Stripe server functionality in an Express application.
 * @module configureAppImplementingStripeServer
 * @param {Object} app - Express application instance.
 * @returns {void}
 */
const configureAppImplementingStripeServer = (app) => {
  const express = require("express");
  const stripe = require("stripe");
  const cors = require("cors");
  const sendMail = require("./sendEmail");

  /**
   * Initialize the Stripe gateway with the provided secret key.
   * @type {Object}
   */
  const stripeGateway = stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2020-08-27",
  });

  app.use(express.static("public"));
  app.use(express.json());
  app.use(cors());

  const fetchProductDetails = async (productId) => {
    try {
      const response = await fetch(
        `https://backend-fullapirest-test.onrender.com/api/products/${productId}`
      );
      const product = await response.json();
      return product;
    } catch (error) {
      console.error(
        `Error fetching product details for product ID ${productId}:`,
        error
      );
      throw error;
    }
  };

  /**
   * Endpoint to create a payment session for Stripe Checkout.
   * @name app.post
   * @method
   * @param {string} '/stripe-api/intent-payment' - The path for creating a payment session.
   * @param {Function} async (req, res) - Async callback function to handle the route.
   * @returns {void}
   */
  app.post("/stripe-api/intent-payment", async (req, res) => {
    const customer = await stripeGateway.customers.create({
      metadata: {
        userId: req.body.userId,
        products: JSON.stringify(req.body.products),
      },
    });

    try {
      const lineItems = await Promise.all(
        req.body.products.map(async (productFromBody) => {
          const product = await fetchProductDetails(productFromBody.id);
          return {
            price_data: {
              currency: "usd",
              product_data: {
                name: product.name,
                description: product.description,
                images: product.imagePath,
              },
              unit_amount:
                (product.price + (product.price * 10) / 100).toFixed(2) * 100,
            },
            quantity: productFromBody.quantity,
          };
        })
      );

      console.log("customer: " + customer.id);
      const session = await stripeGateway.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        customer: customer.id,
        line_items: lineItems,
        success_url: "https://play-hard-main.vercel.app/success-payment-status",
        cancel_url: "https://play-hard-main.vercel.app/fail-payment-status",
        billing_address_collection: "required",
      });
      res.json({ id: session.id });
    } catch (error) {
      console.error("Error creating payment session:", error);
      res.status(500).json({ error: "Error creating payment session" });
    }
  });

  const createOrder = async (customer, data) => {
    const items = JSON.parse(customer.metadata.products);
    const newOrder = new Order({
      userId: customer.metadata.userId,
      customerId: data.customer,
      paymentIntentId: data.payment_intent,
      products: items,
      subtotal: data.amount_subtotal / 100,
      total: data.amount_total / 100,
      payment_status: data.payment_status,
      shippingAddress: {
        avenue1: data.customer_details.address.line1,
        avenue2: data.customer_details.address.line2,
        city: data.customer_details.address.city,
        country: data.customer_details.address.country,
      },
      userInformation: {
        name: data.customer_details.name,
        email: data.customer_details.email,
      },
    });

    try {
      const respuesta = await fetch("https://backend-fullapirest.onrender.com/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (respuesta.ok) {
        const saveOrder = await respuesta.json();
        console.log("Orden procesada:", saveOrder);

        const myInvoice = new Invoice();
        const htmlFile = await myInvoice.generateHTML();
        try {
          await sendMail(
            saveOrder.userInformation.email,
            "Confirmación de Orden",
            htmlFile
          );
        } catch (error) {
          console.error(
            "Error sending the email:",
            error.message
          );
        }
      } else {
        console.error("Error when creating the order:", respuesta.statusText);
      }
    } catch (error) {
      console.error("Error when making the request:", error.message);
    }
  };

  let endpointSecret;

  app.post(
    "/stripe-api/webhook",
    express.raw({ type: "application/json" }),
    (request, response) => {
      const sig = request.headers["stripe-signature"];

      let data;
      let eventType;

      if (endpointSecret) {
        let event;

        try {
          event = stripe.webhooks.constructEvent(
            request.body,
            sig,
            endpointSecret
          );
          console.log("Webhook verified.");
        } catch (err) {
          console.log(`Webhook Error: ${err.message}`);
          response.status(400).send(`Webhook Error: ${err.message}`);
          return;
        }

        data = event.data ? event.data.object : null;
        eventType = event.type;
      } else {
        data = request.body.data ? request.body.data.object : null;
        eventType = request.body.type;
      }

      console.log("Webhook data:", data);
      console.log("Webhook eventType:", eventType);

      if (eventType === "checkout.session.completed") {
        const customerId = data?.customer;
        if (customerId) {
          stripeGateway.customers
            .retrieve(customerId)
            .then((customer) => {
              createOrder(customer, data);
            })
            .catch((error) => {
              console.log(error.message);
            });
        } else {
          console.log("Customer ID not found in webhook data");
        }
      } else {
        console.log(`Unhandled event type: ${eventType}`);
      }

      // Return a 200 response to acknowledge receipt of the event
      response.send().end();
    }
  );

  /**
   * Log a success message upon successful connection to the Stripe server.
   * @name console.log
   * @method
   * @param {string} '-> Successfully connected to Stripe server.' - The success message.
   * @returns {void}
   */
  console.log("-> Successfully connected to Stripe server.");
};

/**
 * Export the configuration function for implementing Stripe server functionality.
 * @name module.exports
 * @method
 * @type {Function}
 * @param {Object} configureAppImplementingStripeServer - Configuration function.
 * @returns {void}
 */
module.exports = configureAppImplementingStripeServer;
