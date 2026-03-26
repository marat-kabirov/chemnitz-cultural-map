const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const db = require("./db");

const authRoutes = require("./routes/auth");
const placesRouter = require("./routes/places");
const favoritesRoutes = require("./routes/favorites");

const { swaggerUi, swaggerSpec } = require("./swagger");

dotenv.config();
const app = express();

app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

// TEMP: init DB schema
const fs = require("fs");
const path = require("path");
app.get("/init-db", async (req, res) => {
  try {
    const sql = fs.readFileSync(path.join(__dirname, "init.sql"), "utf8");
    await db.query(sql);
    res.send("✅ DB initialized!");
  } catch (err) {
    console.error(err);
    res.status(500).send("❌ Error: " + err.message);
  }
});

db.query("SELECT NOW()")
  .then((res) => console.log("✅ DB connected:", res.rows[0]))
  .catch((err) => console.error("❌ DB connection error:", err));

// ** Добавляем маршрут для отдачи JSON Swagger спецификации **
app.get("/api-docs.json", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerSpec);
});

// Маршрут для Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api", authRoutes);
app.use("/api/places", placesRouter);
app.use("/api/favorites", favoritesRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Server listening on http://localhost:${PORT}`);
  console.log(`📚 Swagger docs available at http://localhost:${PORT}/api-docs`);
  console.log(`📚 Swagger JSON available at http://localhost:${PORT}/api-docs.json`);
});
