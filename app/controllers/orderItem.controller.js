const OrderItem = require("../models/orderItem.model.js");

// Create and Save a new Customer
exports.create = (req, res) => {

};

// Retrieve all Customers from the database.
exports.findAll = (req, res) => {
    OrderItem.getAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving customers."
          });
        else res.send(data);
      });
    };

// Find a single Customer with a customerId
exports.findById = (req, res) => {
    OrderItem.findById(req.params.orderId, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving customers."
      });
    else res.send(data);
  });
};
exports.findByName = (req, res) => {
    OrderItem.findByName(req.params.orderName, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving customers."
      });
    else res.send(data);
  });
};

// Update a Customer identified by the customerId in the request
exports.update = (req, res) => {

    let orderItem = {   order_id : req.body.order_id,
                        order_name:req.body.order_name,
                        buyerId:req.body.buyer_id,
                        priceC: req.body.priceC,
                        priceU: req.body.priceU,
                        quantity: req.body.quantity
                    }
    OrderItem.update(orderItem, )

};

// Delete a Customer with the specified customerId in the request
exports.delete = (req, res) => {

};

// Delete all Customers from the database.
exports.deleteAll = (req, res) => {

};