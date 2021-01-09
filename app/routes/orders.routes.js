module.exports = app => {
  const Orders = require("../controllers/orders.controller.js");

  // Create a new item
  app.post("/orders", Orders.create);

  // Retrieve all items
  app.get("/orders", Orders.findAll);

  // Retrieve a single item with customerId
  app.get("/orders/:orderId", Orders.findById);

  // Update a item with customerId
  app.put("/orders/:orderId", Orders.update);

  // Delete a item with customerId
  app.delete("/orders/:orderId", Orders.delete);

  // Create a new item
  app.delete("/orders", Orders.deleteAll);
};
