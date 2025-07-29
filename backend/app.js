// Import the 'fs/promises' module to handle file operations asynchronously
import fs from "node:fs/promises";

// Import required middleware and libraries
import bodyParser from "body-parser";
import express from "express";
import { resolve } from "node:path"; // (not used here but can be used for path resolution)

const app = express();

// Parse incoming JSON requests and attach to req.body
app.use(bodyParser.json());

// Serve static files from the "public" directory
app.use(express.static("public"));

// Enable CORS for all routes
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // Allow requests from any origin
  res.setHeader("Access-Control-Allow-Methods", "GET, POST"); // Allow GET and POST methods
  res.setHeader("Access-Control-Allow-Headers", "Content-Type"); // Allow these headers
  next(); // Continue to the next middleware
});

// Handle GET requests to /meals
app.get("/meals", async (req, res) => {
  // Read the meals data from a JSON file
  const meals = await fs.readFile("./data/available-meals.json", "utf8");
  // Send the meals as a JSON response
  res.json(JSON.parse(meals));
});

// Handle POST requests to /orders
app.post("/orders", async (req, res) => {
  // Extract the 'order' object from the incoming request
  const orderData = req.body.order;

  // Simulate a delay (e.g. for database processing)
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Validate presence of items
  if (
    orderData === null ||
    orderData.items === null ||
    orderData.items.length === 0
  ) {
    return res.status(400).json({ message: "Missing data." });
  }

  // Validate customer fields
  if (
    orderData.customer.email === null ||
    !orderData.customer.email.includes("@") ||
    orderData.customer.name === null ||
    orderData.customer.name.trim() === "" ||
    orderData.customer.street === null ||
    orderData.customer.street.trim() === "" ||
    orderData.customer["postal-code"] === null ||
    orderData.customer["postal-code"].trim() === "" ||
    orderData.customer.city === null ||
    orderData.customer.city.trim() === ""
  ) {
    return res.status(400).json({
      message:
        "Missing data: Email, name, street, postal code or city is missing.",
    });
  }

  // Create new order object with a random ID
  const newOrder = {
    ...orderData,
    id: (Math.random() * 1000).toString(),
  };

  // Read current orders from file
  const orders = await fs.readFile("./data/orders.json", "utf8");
  const allOrders = JSON.parse(orders);

  // Add the new order and save it
  allOrders.push(newOrder);
  await fs.writeFile("./data/orders.json", JSON.stringify(allOrders));

  // Send a success response
  res.status(201).json({ message: "Order created!" });
});

// Catch-all handler for unsupported routes or methods
app.use((req, res) => {
  // Handle preflight OPTIONS requests (CORS)
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  // If no route matched, return 404
  res.status(404).json({ message: "Not found" });
});

// Start the Express server on port 3000
app.listen(3000);
