const sql = require("./db.js");

// constructor
const Item = function(item) {
  this.buyer_id = item.buyer_id;
  this.oem_id = item.oem_id;
  this.factory_id = item.factory_id;
  this.x = item.x;
  this.y = item.y;
  this.description = item.description;
  this.priceC = item.priceC;
  this.priceU = item.priceU;
  this.priceU = item.priceU;
  this.last_update = item.last_update;


};

Item.create = (newItem, result) => {
  sql.query("INSERT INTO item SET ?", newItem, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created item: ", { id: res.insertId, ...newItem });
    result(null, { id: res.insertId, ...newItem });
  });
};

Item.findById = (buyer_id, result) => {
  sql.query(`SELECT * FROM item WHERE buyer_id = ${buyer_id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found item: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Item with the id
    result({ kind: "not_found" }, null);
  });
};

Item.getAll = result => {
  sql.query("SELECT * FROM item", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("items: ", res);
    result(null, res);
  });
};

Item.updateById = (id, item, result) => {
  sql.query(
    "UPDATE items SET buyer_id = ?, oem_id = ?, factory_id = ?, x = ?, y = ? , z = ?, description = ?, image_url = ?, priceC = ?, priceU = ? last_update = ? WHERE buyer_id = ?",
    [ item.buyer_id, item.oem_id, item.factory_id, item.x, item.y, item.z, item.description, item.image_url, item.priceC, item.priceU, item.last_update, buyer_id ],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Item with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated item: ", { id: id, ...item });
      result(null, { id: id, ...item });
    }
  );
};

Item.remove = (buyer_id, result) => {
  sql.query("DELETE FROM item WHERE buyer_id = ?", buyer_id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Item with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted item with id: ", id);
    result(null, res);
  });
};

Item.removeAll = result => {
  sql.query("DELETE FROM item", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} items`);
    result(null, res);
  });
};

module.exports = Item;
