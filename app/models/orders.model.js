const sql = require("./db.js");

// constructor
const Orders = function(orders) {
  this.order_id = orders.order_id;
  this.order_name = orders.order_name;
  this.order_date = orders.order_date;
};

Orders.create = (newOrders, result) => {
  sql.query("INSERT INTO orders SET ?", newOrders, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created orders: ", { id: res.insertId, ...newOrders });
    result(null, { id: res.insertId, ...newOrders });
  });
};

Orders.findById = (order_id, result) => {
  sql.query(`SELECT * FROM orders WHERE order_id = ${order_id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found orders: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Orders with the id
    result({ kind: "not_found" }, null);
  });
};
Orders.findByName = (order_name, result) => {
  sql.query(`SELECT * FROM orders WHERE order_name = '${order_name}'`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found orders: ", res);
      result(null, res);
      return;
    }

    // not found Orders with the id
    result({ kind: "not_found" }, null);
  });
};

Orders.getAll = result => {
  sql.query("SELECT * FROM orders ORDER BY order_date DESC LIMIT 20", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("orders: ", res);
    result(null, res);
  });
};

Orders.findTotalCount = result => {
  sql.query("SELECT COUNT(*) FROM orders", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("orders: ", res[0]);
    result(null, res[0]);
  });
};

Orders.updateByName = (order_name, orders, result) => {
  sql.query(
    "UPDATE orders SET order_id = ?, order_name = ?, order_date = ? WHERE order_name = ?",
    [ orders.order_id, orders.order_name, orders.order_date, order_name ],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Orders with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated orders: ", { name: order_name, ...orders });
      result(null, { id: order_name, ...orders });
    }
  );
};

Orders.remove = (order_id, result) => {
  sql.query("DELETE FROM orders WHERE order_id = ?", order_id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Orders with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted orders with id: ", id);
    result(null, res);
  });
};

Orders.removeByOrderName = (order_name, result) => {
  sql.query("DELETE FROM orders WHERE order_name = ?", order_name, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Orders with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted orders with id: ", id);
    result(null, res);
  });
};

Orders.removeAll = result => {
  sql.query("DELETE FROM orders", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} orders`);
    result(null, res);
  });
};

module.exports = Orders;
