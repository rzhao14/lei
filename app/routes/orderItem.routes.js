module.exports = app => {
  const OrderItem = require("../controllers/orderItem.controller.js");

  // Create a new item
  app.post("/orderItem", OrderItem.create);

  // Retrieve all items
  app.get("/orderItem", OrderItem.findAll);

  // Retrieve a single item with orderId
  app.get("/orderItem/:orderId", OrderItem.findById);
  app.get("/orderItem/name/:orderName", OrderItem.findByName);

  // Update a item with orderId
  app.put("/orderItem/:orderId", OrderItem.update);

  // Delete a item with orderId
  app.delete("/orderItem/:orderId", OrderItem.delete);

  // Create a new item
  app.delete("/orderItem", OrderItem.deleteAll);
};
