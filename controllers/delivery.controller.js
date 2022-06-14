const db = require("../db");

const colms = ["title", "count", "distance"];
const terms = ["=", "LIKE", ">", "<"];

class DeliveryController {
  async getDeliveries(req, res) {
    const { page, size, colm, term, data } = req.query;
    // Провека на валидност
    if (colm && term && data && page > 0 && size > 0) {
      if (
        colms.includes(colm) &&
        terms.includes(term) &&
        (typeof data === "string" || typeof data === "number")
      ) {
        if (
          (colm === "title" && term !== "LIKE") ||
          ((colm === "count" || colm === "distance") && term === "LIKE") ||
          ((colm === "count" || colm === "distance") && isNaN(Number(data)))
        ) {
          res.status(400).json("Не корректные параметри");
        } else {
          const value = term === "LIKE" ? `'%${data}%'` : data;
          try {
            const rowCounts = await db.query(
              `SELECT COUNT(*) FROM delivery WHERE ${colm} ${term} ${value}`
            );
            const { rows } = await db.query(
              `SELECT * FROM delivery WHERE ${colm} ${term} ${value} LIMIT ${size} OFFSET ((${page} - 1) * ${size})`
            );
            const counts = rowCounts.rows[0];
            res.status(200).json({ counts, rows });
          } catch (error) {
            res.status(500).json(error);
          }
        }
      } else {
        res.status(400).json("Не корректные параметри");
      }
    } else {
      try {
        if (page > 0 && size > 0) {
          const rowCount = await db.query(`SELECT COUNT(*) FROM delivery`);
          const { rows } = await db.query(
            `SELECT * FROM delivery LIMIT ${size} OFFSET ((${page} - 1) * ${size})`
          );
          const counts = rowCount.rows[0];
          res.status(200).json({ counts, rows });
        } else {
          res.status(400).json("Не корректные параметри");
        }
      } catch (error) {
        res.status(500).json(error);
      }
    }
  }
}

module.exports = new DeliveryController();
