module.exports = app => {
  const Item = require("../controllers/item.controller.js");

  // Create a new item
  app.post("/item", Item.create);

  // Retrieve all items
  app.get("/item", Item.findAll);

  // Retrieve a single item with customerId
  app.get("/item/:buyerId", Item.findOne);

  // Update a item with buyerId
  app.put("/item/:buyerId", Item.update);

  // Delete a item with buyerId
  app.delete("/item/:buyerId", Item.delete);

  // Create a new item
  app.delete("/item", Item.deleteAll);
};
