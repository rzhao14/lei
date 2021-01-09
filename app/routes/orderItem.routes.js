module.exports = app => {
  const OrderItem = require("../controllers/orderItem.controller.js");

  // Create a new item
  app.post("/orderItem", OrderItem.create);

  // Retrieve all items
  app.get("/orderItem", OrderItem.findAll);

  // Retrieve a single item with customerId
  app.get("/orderItem/:customerId", OrderItem.findOne);

  // Update a item with customerId
  app.put("/orderItem/:customerId", OrderItem.update);

  // Delete a item with customerId
  app.delete("/orderItem/:customerId", OrderItem.delete);

  // Create a new item
  app.delete("/orderItem", OrderItem.deleteAll);
};
