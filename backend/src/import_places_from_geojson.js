const fs = require("fs");
const path = require("path");
const db = require("./db");

const geojsonPath = path.join(__dirname, "../../dbwProjectOfflineData(1)/Chemnitz.geojson");

const data = JSON.parse(fs.readFileSync(geojsonPath, "utf8"));
const features = data.features;

(async () => {
  for (const item of features) {
    const id = item.id || item.properties["@id"] || "unknown";
    const name = item.properties?.name || "Unknown";
    const category =
      item.properties?.tourism ||
      item.properties?.amenity ||
      item.properties?.art_gallery ||
      "unknown";
    const [lon, lat] = item.geometry?.coordinates || [null, null];

    if (!lat || !lon) continue;

    try {
      await db.query(
        "INSERT INTO places (osm_id, name, category, latitude, longitude) VALUES ($1, $2, $3, $4, $5) ON CONFLICT (osm_id) DO NOTHING",
        [id, name, category, lat, lon]
      );
      console.log(`Inserted: ${name}`);
    } catch (err) {
      console.error("Insert error:", err.message);
    }
  }

  console.log("Import from GeoJSON completed.");
  process.exit();
})();
