const OrderItem = require("../models/orderItem.model.js");
const Item = require("../models/item.model.js");
const Orders = require("../models/orders.model.js");

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
                        buyer_id:req.body.buyer_id,
                        box_brand: req.body.box_brand,
                        price: req.body.price,
                        quantity: req.body.quantity,
                        comment: req.body.comment
                    }
                    console.log(req.body)
    OrderItem.updateByName(req.body.order_name, req.body.buyer_id, orderItem, (err, data) => {
       if (err){
         res.status(500).send({
           message:
             err.message || "Some error occurred while udpating order item."
         });}
     });

    let item = {    buyer_id : req.body.buyer_id,
                    oem_id:req.body.oem_id,
                    factory_id:req.body.factory_id,
                    x: req.body.x,
                    y: req.body.y,
                    z: req.body.z,
                    unit: req.body.unit,
                    description: req.body.description,
                    image_url: req.body.image_url,
                    priceCI: req.body.priceCI,
                    priceUI: req.body.priceUI,
                    hs: req.body.hs,
                    vunit: req.body.vunit,
                    commentI: req.body.commentI,
                    last_update: new Date().getTime()
                }
    Item.updateById(req.body.buyer_id, item, (err, data) => {
       if (err){
         res.status(500).send({
           message:
             err.message || "Some error occurred while retrieving customers."
         });}
     });

    let orders = {  order_id : req.body.order_id,
                    order_name:req.body.order_name,
                    order_date:new Date().getTime()
                }
    Orders.updateByName(req.body.order_name, orders, (err, data) => {
       if (err){
         res.status(500).send({
           message:
             err.message || "Some error occurred while retrieving customers."
         });}
        else res.send(data);
     });

};

// Delete a Customer with the specified customerId in the request
exports.delete = (req, res) => {

};

// Delete all Customers from the database.
exports.deleteAll = (req, res) => {

};