import pandas as pd
import os
import json

# Folder where your CSVs are stored
data_folder = "data"

# Convert all CSVs in the data folder to JSON
for file in os.listdir(data_folder):
    if file.endswith(".csv"):
        csv_path = os.path.join(data_folder, file)
        json_path = os.path.join(data_folder, file.replace(".csv", ".json"))

        print(f"🔄 Converting {file} -> {os.path.basename(json_path)} ...")

        # Read and convert
        df = pd.read_csv(csv_path)
        df.to_json(json_path, orient="records", indent=2)

        print(f"✅ Saved {json_path}")

print("🎉 All CSV files converted successfully!")
