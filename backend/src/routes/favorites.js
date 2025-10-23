const express = require("express");
const router = express.Router();
const db = require("../db");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

/**
 * Middleware to authenticate requests using JWT.
 */
function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: "No token" });

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch {
    res.status(403).json({ message: "Invalid token" });
  }
}

/**
 * @swagger
 * tags:
 *   name: Favorites
 *   description: User favorite places
 */

/**
 * @swagger
 * /favorites:
 *   get:
 *     summary: Get list of user's favorite places
 *     tags: [Favorites]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of favorite places
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Place'
 *       401:
 *         description: Unauthorized (missing or invalid token)
 *       500:
 *         description: Server error
 */
router.get("/", authMiddleware, async (req, res) => {
  try {
    const result = await db.query(
      `SELECT places.*
       FROM favorites
       JOIN places ON favorites.place_id = places.id
       WHERE favorites.user_id = $1`,
      [req.userId]
    );

    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching favorites with place data:", err);
    res.status(500).json({ message: "Server error fetching favorites" });
  }
});

/**
 * @swagger
 * /favorites:
 *   post:
 *     summary: Add a place to favorites
 *     tags: [Favorites]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Place ID to add to favorites
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - place_id
 *             properties:
 *               place_id:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: Place added to favorites
 *       401:
 *         description: Unauthorized
 */
router.post("/", authMiddleware, async (req, res) => {
  const { place_id } = req.body;
  await db.query(
    "INSERT INTO favorites (user_id, place_id) VALUES ($1, $2) ON CONFLICT DO NOTHING",
    [req.userId, place_id]
  );
  res.json({ message: "Added to favorites" });
});

/**
 * @swagger
 * /favorites/{place_id}:
 *   delete:
 *     summary: Remove a place from favorites
 *     tags: [Favorites]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: place_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the place to remove
 *     responses:
 *       200:
 *         description: Place removed from favorites
 *       401:
 *         description: Unauthorized
 */
router.delete("/:place_id", authMiddleware, async (req, res) => {
  const { place_id } = req.params;
  await db.query("DELETE FROM favorites WHERE user_id = $1 AND place_id = $2", [req.userId, place_id]);
  res.json({ message: "Removed from favorites" });
});

module.exports = router;
