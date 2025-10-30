import pandas as pd
import kagglehub
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import OneHotEncoder
# --- CHANGE 1: Import Random Forest Regressor ---
from sklearn.ensemble import RandomForestRegressor 
from sklearn.metrics import r2_score, mean_absolute_error 
import joblib
import os
import sys

# Define the directory where this script resides for relative pathing
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# --- 1. Download the dataset from Kaggle (Logic remains unchanged) ---
try:
    path = kagglehub.dataset_download("shubhambathwal/flight-price-prediction")
    print("✅ Dataset downloaded to cache at:", path)
except Exception as e:
    print(f"❌ ERROR: Kaggle download failed. Ensure kaggle.json is set up. Error: {e}", file=sys.stderr)
    sys.exit(1)

# --- 2. Find and load the main CSV file (Logic remains unchanged) ---
csv_path = None
TARGET_FILE = "Clean_Dataset.csv" 
for root, _, files in os.walk(path):
    if TARGET_FILE in files:
        csv_path = os.path.join(root, TARGET_FILE)
        break
if not csv_path:
    print(f"❌ ERROR: Could not find the required file {TARGET_FILE}.", file=sys.stderr)
    sys.exit(1)

df = pd.read_csv(csv_path)
print(f"📄 Loaded dataset from: {csv_path}")

# --- 3. Clean & Preprocess Data (Logic remains unchanged) ---
COLUMNS_TO_DROP = ["arrival_time", "flight", "date_of_journey", "route", "duration", "days_left", "Unnamed: 0"]
df.drop(columns=COLUMNS_TO_DROP, inplace=True, errors="ignore")
KEY_COLUMNS = ['airline', 'source_city', 'destination_city', 'departure_time', 'stops', 'class', 'price']
df.dropna(subset=KEY_COLUMNS, inplace=True)

# --- 4. One-Hot Encode Categorical Features (Logic remains unchanged) ---
categorical_cols = ["airline", "departure_time", "source_city", "destination_city", "stops", "class"]
df_encoded = pd.get_dummies(df, columns=categorical_cols, drop_first=True)

# --- 5. Split Data and Train Model ---
X = df_encoded.drop(columns=["price"])
y = df_encoded["price"]

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# --- CHANGE 2: Use Random Forest Regressor ---
# We use a smaller n_estimators for speed, a higher value improves accuracy further
model = RandomForestRegressor(n_estimators=50, random_state=42, n_jobs=-1) 
model.fit(X_train, y_train)

# --- 6. Evaluate Model (Includes MAE) ---
y_pred = model.predict(X_test)
r2 = r2_score(y_test, y_pred)
mae = mean_absolute_error(y_test, y_pred)

print("\n📊 Model Evaluation (Random Forest):")
print(f"R² Score: {r2:.4f} (Closer to 1.0 is better)")
print(f"Mean Absolute Error (MAE): ₹{mae:.2f}")

# --- 7. Save Model and Feature Columns List (Logic remains unchanged) ---
MODEL_FILE = os.path.join(BASE_DIR, 'flight_price_model.pkl')
FEATURES_FILE = os.path.join(BASE_DIR, 'feature_columns.pkl')

joblib.dump(model, MODEL_FILE)
print(f"\n💾 Model saved as: {MODEL_FILE}")

joblib.dump(X_train.columns.tolist(), FEATURES_FILE)
print(f"💾 Feature Columns saved as: {FEATURES_FILE}")

print("🎉 Training complete. Restart Node.js server to use the enhanced model.")