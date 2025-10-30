import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import Flight from "../models/Flight.js";

dotenv.config({ path: "./backend/.env" });

// ✅ Dynamically resolve the project root
const __dirname = path.resolve();

// Possible data directories
const possiblePaths = [
  path.join(__dirname, "backend", "data"),
  path.join(__dirname, "data")
];

// Find the directory where JSON files actually exist
let dataDir = null;
for (const p of possiblePaths) {
  if (fs.existsSync(p)) {
    dataDir = p;
    break;
  }
}

if (!dataDir) {
  console.error("❌ No data directory found. Please place your JSON files in either:");
  console.error("  - backend/data  OR");
  console.error("  - data/");
  process.exit(1);
}

console.log(`✅ Using data folder: ${dataDir}`);

// ✅ Auto-load all JSON files in data folder
const jsonFiles = fs.readdirSync(dataDir).filter(f => f.endsWith(".json"));

if (jsonFiles.length === 0) {
  console.error("❌ No JSON files found in:", dataDir);
  process.exit(1);
}

// ✅ Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(async () => {
  console.log("✅ MongoDB Connected");

  for (const file of jsonFiles) {
    const filePath = path.join(dataDir, file);
    const rawData = fs.readFileSync(filePath);
    const jsonData = JSON.parse(rawData);

    console.log(`📦 Importing ${file} (${jsonData.length} records)`);

    try {
      await Flight.insertMany(jsonData);
      console.log(`✅ Successfully imported ${file}`);
    } catch (error) {
      console.error(`❌ Error importing ${file}:`, error.message);
    }
  }

  mongoose.connection.close();
  console.log("🏁 Import complete.");
}).catch(err => {
  console.error("❌ MongoDB connection failed:", err.message);
  process.exit(1);
});
