const Orders = require("../models/orders.model.js");
const OrderItem = require("../models/orderItem.model.js");
const Item = require("../models/Item.model.js");

// Create and Save a new Customer
exports.create = (req, res) => {
  let order = { order_name:req.body.name, order_date:  Date.now()}
  Orders.create(order, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving customers."
      });
  });
  let count = 0;
  req.body.list.map(e=>{
    let orderItem = {order_id:null, order_name: req.body.name, buyer_id: e}

    Item.findById(e,(err, data) => {
        if (err){
            console.log(err)
        }
        else {
            orderItem.price = data.priceUI
        }
        OrderItem.create(orderItem, (err, data) => {
            count++;
            if (err) console.log(err)
            if(count === req.body.list.length){
              res.status(200).send([])
            }
          });
      });

  })
};

// Retrieve all Customers from the database.
exports.findAll = (req, res) => {
    Orders.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving customers."
      });
    else res.send(data);
  });
};
exports.findTotalCount = (req, res) => {
    Orders.findTotalCount((err, data) => {
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
    Orders.findById(req.params.orderId,(err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving customers."
      });
    else res.send(data);
  });
};

exports.findByName = (req, res) => {
    Orders.findByName(req.params.orderName,(err, data) => {
    if (err)
      res.status(404).send([]);
    else res.send(data);
  });
};

// Update a Customer identified by the customerId in the request
exports.update = (req, res) => {

};

// Delete a Customer with the specified customerId in the request
exports.delete = (req, res) => {

};

// Delete all Customers from the database.
exports.deleteAll = (req, res) => {

};