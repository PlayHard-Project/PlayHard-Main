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
  
  app.use("/api/Stripe");
  
  /**
   * Root endpoint that sends a welcome message.
   * @name app.get
   * @method
   * @param {string} '/' - The root path.
   * @param {Function} (req, res) - Callback function to handle the route.
   * @returns {void}
   */
  app.get("/", (req, res) => {
    res.send("Welcome to Full API Rest Playhard E-commerce");
  });

  /**
   * Endpoint to create a payment session for Stripe Checkout.
   * @name app.post
   * @method
   * @param {string} '/stripe-api/intent-payment' - The path for creating a payment session.
   * @param {Function} async (req, res) - Async callback function to handle the route.
   * @returns {void}
   */
  app.post("/stripe-api/intent-payment", async (req, res) => {
    const { products } = req.body;

    const lineItems = products.map((product) => ({
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
        line_items: lineItems,
        success_url: "https://play-hard-main.vercel.app/success-payment-status",
        cancel_url: "https://play-hard-main.vercel.app/fail-payment-status",
        billing_address_collection: "required",
      });
      res.json({ id: session.id });

     
      // This is your Stripe CLI webhook secret for testing your endpoint locally.
      const endpointSecret =
        "whsec_ee6987fdc0111b98a550260fc1735f36d93d72b56647b3e9593af2b4ac72c71d";

      app.post(
        "/webhook",
        express.raw({ type: "application/json" }),
        (request, response) => {
          const sig = request.headers["stripe-signature"];

          let event;

          try {
            event = stripe.webhooks.constructEvent(
              request.body,
              sig,
              endpointSecret
            );
            console.log("Webhook verified.")
          } catch (err) {
            console.log(`Webhook Error: ${err.message}`);
            response.status(400).send(`Webhook Error: ${err.message}`);
            return;
          }

          // Return a 200 response to acknowledge receipt of the event
          response.send().end();
        }
      );
    } catch (error) {
      console.error("Error creating payment session:", error);
      res.status(500).json({ error: "Error creating payment session" });
    }
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
