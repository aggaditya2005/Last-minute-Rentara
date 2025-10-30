import sys
import joblib
import pandas as pd
import numpy as np
import os

# Define the base path (where this script lives)
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, 'flight_price_model.pkl')
FEATURES_PATH = os.path.join(BASE_DIR, 'feature_columns.pkl')

try:
    # 1. Load the trained model and feature list
    model = joblib.load(MODEL_PATH)
    feature_cols = joblib.load(FEATURES_PATH)

    # 2. Get input arguments from the Node.js process (sys.argv[1] is Airline, etc.)
    # We expect 6 arguments: airline, source, destination, departure_time, stops, class
    if len(sys.argv) < 7:
        raise ValueError("Missing input arguments for prediction.")

    input_data = {
        'airline': sys.argv[1],
        'source_city': sys.argv[2],
        'destination_city': sys.argv[3],
        'departure_time': sys.argv[4],
        'stops': sys.argv[5],
        'class': sys.argv[6]
    }

    # 3. Create a DataFrame from the input and one-hot encode it
    input_df = pd.DataFrame([input_data])
    
    # Define all categorical features used during training
    categorical_cols = ["airline", "departure_time", "source_city", "destination_city", "stops", "class"]
    
    # Perform One-Hot Encoding
    input_encoded = pd.get_dummies(input_df, columns=categorical_cols, drop_first=True)

    # 4. Reindex the input to match the training feature columns list
    # This ensures columns are in the correct order, filling missing columns with 0
    final_input = input_encoded.reindex(columns=feature_cols, fill_value=0)

    # 5. Predict the price
    prediction = model.predict(final_input)[0]
    
    # Print the prediction to standard output (Node.js will capture this)
    print(round(prediction, 2))

except Exception as e:
    # Print errors to standard error
    print(f"Prediction Execution Error: {e}", file=sys.stderr)
    sys.exit(1)