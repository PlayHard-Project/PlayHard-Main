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

    const lineItems = req.body.products.map((product) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: product.name,
          description: product.description,
          images: product.imagePath,
        },
        unit_amount: Math.round((product.price * 10) / 100) + product.price,
      },
      quantity: product.quantity,
    }));

    try {
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

  // This is your Stripe CLI webhook secret for testing your endpoint locally.
  let endpointSecret;

  //   endpointSecret =
  //   "whsec_ee6987fdc0111b98a550260fc1735f36d93d72b56647b3e9593af2b4ac72c71d";

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

        data = event.data.Object;
        eventType = event.type;
      } else {
        data = request.body.data.Object;
        eventType = request.body.type;
      }

      console.log("Webhook data:", data);
      console.log("Webhook eventType:", eventType);

      if (eventType === "checkout.session.completed") {
        stripeGateway.customers
          .retrieve(data.customer)
          .then((customer) => {
            console.log(customer);
            console.log("data: ", data);
          })
          .catch((error) => {
            console.log(error.message);
          });
      }
      // Return a 200 response to acknowledge receipt of the event
      response.send().end();
    }
  );

  /**
   * Endpoint for testing purposes (placeholder for future implementation).
   * @name app.get
   * @method
   * @param {string} '/stripe-api/intent-payment' - The path for testing intent payment.
   * @param {Function} (req, res) - Callback function to handle the route.
   * @returns {void}
   */
  app.get("/stripe-api/intent-payment", (req, res) => {
    res.send("Intent-payment");
  });

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
