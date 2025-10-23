const express = require("express");
const router = express.Router();
const db = require("../db");

/**
 * @swagger
 * tags:
 *   name: Places
 *   description: Public endpoints for cultural places
 */

/**
 * @swagger
 * /places:
 *   get:
 *     summary: Get list of all cultural places
 *     tags: [Places]
 *     responses:
 *       200:
 *         description: A list of places
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Place'
 *       500:
 *         description: Internal server error
 */
router.get("/", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM places ORDER BY name ASC");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * @swagger
 * /places/{id}:
 *   get:
 *     summary: Get details of a place by ID
 *     tags: [Places]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the place
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Place details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Place'
 *       404:
 *         description: Place not found
 *       500:
 *         description: Internal server error
 */
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const result = await db.query("SELECT * FROM places WHERE id = $1", [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Place not found" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
