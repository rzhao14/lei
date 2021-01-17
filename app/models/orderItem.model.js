const sql = require("./db.js");

// constructor
const OrderItem = function(orderItem) {
  this.order_id = orderItem.order_id;
  this.order_name = orderItem.order_name;
  this.buyer_id = orderItem.buyer_id;
  this.Box_brand = orderItem.Box_brand;
  this.price = orderItem.price;
  this.quantity = orderItem.quantity;
  this.comments = orderItem.comments;
};

OrderItem.create = (newOrderItem, result) => {
  sql.query("INSERT INTO order_item SET ?", newOrderItem, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created order_item: ", { id: res.insertId, ...newOrderItem });
    result(null, { id: res.insertId, ...newOrderItem });
  });
};

OrderItem.findById = (order_id, result) => {
  sql.query(`SELECT * FROM order_item INNER JOIN item ON order_item.buyer_id=item.buyer_id WHERE order_id = ${order_id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found order_item: ", res);
      result(null, res);
      return;
    }

    // not found OrderItem with the id
    result({ kind: "not_found" }, null);
  });
};
OrderItem.findByName = (order_name, result) => {
  sql.query(`SELECT * FROM item right JOIN order_item ON order_item.buyer_id=item.buyer_id WHERE order_name = '${order_name}'`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found order_item: ", res);
      result(null, res);
      return;
    }

    // not found OrderItem with the id
    result({ kind: "not_found" }, null);
  });
};


OrderItem.getAll = result => {
  sql.query("SELECT * FROM order_item", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("order_item: ", res);
    result(null, res);
  });
};

OrderItem.updateById = (order_id, order_item, result) => {
  sql.query(
    "UPDATE order_item SET order_id = ?, order_name = ?, buyer_id = ?, priceC = ?, priceU = ?, quantity = ? WHERE order_id = ?",
    [ order_item.order_id , order_item.order_name , order_item.buyer_id , order_item.priceC , order_item.priceU , order_item.quantity , order_id ],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found OrderItem with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated order_item: ", { id: id, ...order_item });
      result(null, { id: id, ...order_item });
    }
  );
};

OrderItem.remove = (order_id, result) => {
  sql.query("DELETE FROM order_item WHERE order_id = ?", order_id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found OrderItem with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted orderItem with id: ", id);
    result(null, res);
  });
};

OrderItem.removeByOrderName = (order_name, result) => {
  sql.query("DELETE FROM order_item WHERE order_name = ?", order_name, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found OrderItem with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted order_item with id: ", id);
    result(null, res);
  });
};

OrderItem.removeAll = result => {
  sql.query("DELETE FROM order_item", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} orderItem`);
    result(null, res);
  });
};

module.exports = OrderItem;
