module.exports = app => {
  const Item = require("../controllers/item.controller.js");

  // Create a new item
  app.post("/item", Item.create);

  // Retrieve all items
  app.get("/item", Item.findAll);

  // Retrieve a single item with customerId
  app.get("/item/:customerId", Item.findOne);

  // Update a item with customerId
  app.put("/item/:customerId", Item.update);

  // Delete a item with customerId
  app.delete("/item/:customerId", Item.delete);

  // Create a new item
  app.delete("/item", Item.deleteAll);
};
