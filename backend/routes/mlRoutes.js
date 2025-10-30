import express from "express";
import { spawn } from "child_process";
import path from "path";

const router = express.Router();
const __dirname = path.resolve();

// POST /api/ai/predict - Endpoint for flight price prediction
router.post("/predict", (req, res) => {
  const { airline, source, destination, departure_time, stops, class: seatClass } = req.body;

  // Check for missing parameters (CRITICAL: Must match the Python script's expected inputs)
  if (!airline || !source || !destination || !departure_time || !stops || !seatClass) {
    return res.status(400).json({
      success: false,
      message: "Missing parameters. Required: airline, source, destination, departure_time, stops, class."
    });
  }

  // Path to your Python prediction script
  const pythonScriptPath = path.join(__dirname, "backend", "ml", "predict_flight_price.py");

  // Arguments to pass to Python
  const args = [
    pythonScriptPath,
    airline,
    source,
    destination,
    departure_time,
    stops,
    seatClass
  ];

  // Try starting the Python process
  // NOTE: If 'python' fails, you must change this to 'py' (Windows) or 'python3' (Linux/Mac)
  const python = spawn("python", args);

  let predictionData = "";
  let errorData = "";

  // CRITICAL: Listener to capture Node.js failing to find the 'python' command itself
  python.on('error', (err) => {
    errorData = `Error: Node failed to execute Python. Check your PATH. Details: ${err.code} / ${err.message}`;
    console.error("--- PYTHON SPAWN FAILED ---");
    console.error(errorData);
    return res.status(500).json({
      success: false,
      message: "Node failed to find the Python executable (spawn ENOENT).",
      error_details: errorData
    });
  });

  // Capture standard output from Python (where the prediction number is printed)
  python.stdout.on("data", (data) => {
    predictionData += data.toString();
  });

  // Capture standard error from Python (if the script crashes)
  python.stderr.on("data", (data) => {
    errorData += data.toString();
    console.error("--- PYTHON SCRIPT ERROR ---");
    console.error(errorData);
  });

  // Handle process exit
  python.on("close", (code) => {
    if (code === 0) {
      // Success: return the captured prediction data
      const price = parseFloat(predictionData.trim());
      if (isNaN(price)) {
        return res.status(500).json({
          success: false,
          message: "Prediction succeeded but returned invalid data.",
          error_details: `Raw Output: ${predictionData}`
        });
      }
      res.json({
        success: true,
        predicted_price: price
      });
    } else {
      // Failure: return the error captured from stderr or general process crash
      res.status(500).json({
        success: false,
        message: "Prediction script failed (Process exited with non-zero code).",
        error_details: errorData || `Process exited with code ${code}. Check server console.`
      });
    }
  });
});

export default router;