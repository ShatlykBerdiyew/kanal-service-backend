const db = require("../db");

class DeliveryController {
  async createDelivery(req, res) {}
  async getDeliveries(req, res) {
    const { page, size, colm, term, data } = req.query;
    if (colm && term && data) {
      try {
        if (term === "LIKE") {
          const rowCount = await db.query(
            `SELECT COUNT(*) FROM delivery WHERE ${colm} ${term} '%${data}%'`
          );
          const { rows } = await db.query(
            `SELECT * FROM delivery WHERE ${colm} ${term} '%${data}%' LIMIT ${size} OFFSET ((${page} - 1) * ${size})`
          );
          const counts = rowCount.rows[0];
          res.status(200).json({ counts, rows });
        } else {
          const rowCounts = await db.query(
            `SELECT COUNT(*) FROM delivery WHERE ${colm} ${term} ${data}`
          );
          const { rows } = await db.query(
            `SELECT * FROM delivery WHERE ${colm} ${term} ${data} LIMIT ${size} OFFSET ((${page} - 1) * ${size})`
          );
          const counts = rowCounts.rows[0];
          res.status(200).json({ counts, rows });
        }
      } catch (error) {
        res.status(500).json(error);
      }
    } else {
      try {
        const rowCount = await db.query(`SELECT COUNT(*) FROM delivery`);
        const { rows } = await db.query(
          `SELECT * FROM delivery LIMIT ${size} OFFSET ((${page} - 1) * ${size})`
        );
        const counts = rowCount.rows[0];
        res.status(200).json({ counts, rows });
      } catch (error) {
        res.status(200).json(error);
      }
    }
  }
  async getOneDelivery(req, res) {}
  async updateDelivery(req, res) {}
  async deleteDelivery(req, res) {}
}

module.exports = new DeliveryController();
// LIMIT $2 OFFSET (($1 - 1) * $2)
