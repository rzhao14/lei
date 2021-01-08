module.exports = app => {
  const item = require("../controllers/item.controller.js");

  // Create a new item
  app.post("/item", item.create);

  // Retrieve all items
  app.get("/item", item.findAll);

  // Retrieve a single item with customerId
  app.get("/item/:customerId", item.findOne);

  // Update a item with customerId
  app.put("/item/:customerId", item.update);

  // Delete a item with customerId
  app.delete("/item/:customerId", item.delete);

  // Create a new item
  app.delete("/item", item.deleteAll);
};
