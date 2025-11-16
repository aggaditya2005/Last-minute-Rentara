import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor, GradientBoostingRegressor
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import mean_absolute_error, r2_score, mean_squared_error
import joblib
import json
import os
from datetime import datetime
import warnings
warnings.filterwarnings('ignore')

def download_kaggle_dataset():
    """Download flight price dataset from Kaggle"""
    print("=" * 60)
    print("DOWNLOADING KAGGLE DATASET")
    print("=" * 60)
    
    try:
        # Check if kaggle is installed
        import kaggle
        print("✓ Kaggle API found")
        
        # Download the dataset
        # Popular flight price dataset: "nikhilmittal/flight-fare-prediction-mh"
        dataset_name = "nikhilmittal/flight-fare-prediction-mh"
        
        print(f"\nDownloading dataset: {dataset_name}")
        kaggle.api.dataset_download_files(
            dataset_name,
            path='./data',
            unzip=True
        )
        print("✓ Dataset downloaded successfully!")
        
        return True
        
    except ImportError:
        print("\n⚠ Kaggle API not installed!")
        print("\nTo use Kaggle datasets, follow these steps:")
        print("1. Install kaggle: pip install kaggle")
        print("2. Create Kaggle account at https://www.kaggle.com")
        print("3. Go to https://www.kaggle.com/settings/account")
        print("4. Click 'Create New API Token'")
        print("5. Place kaggle.json in ~/.kaggle/ (Linux/Mac) or C:\\Users\\<username>\\.kaggle\\ (Windows)")
        print("\nAlternatively, download manually from:")
        print("https://www.kaggle.com/datasets/nikhilmittal/flight-fare-prediction-mh")
        print("And extract to ./data/ folder")
        return False
        
    except Exception as e:
        print(f"\n✗ Error downloading dataset: {str(e)}")
        print("\nManual download option:")
        print("https://www.kaggle.com/datasets/nikhilmittal/flight-fare-prediction-mh")
        return False

def load_dataset():
    """Load the dataset from available sources"""
    print("\n" + "=" * 60)
    print("LOADING DATASET")
    print("=" * 60)
    
    # Try different file paths
    possible_paths = [
        './data/Data_Train.xlsx',
        './data/Data_Train.csv',
        './Data_Train.xlsx',
        './Data_Train.csv',
        '../data/Data_Train.xlsx',
        '../data/Data_Train.csv'
    ]
    
    for path in possible_paths:
        if os.path.exists(path):
            print(f"\n✓ Found dataset at: {path}")
            try:
                if path.endswith('.xlsx'):
                    df = pd.read_excel(path)
                else:
                    df = pd.read_csv(path)
                print(f"✓ Loaded {len(df)} records")
                return df
            except Exception as e:
                print(f"✗ Error loading {path}: {str(e)}")
                continue
    
    print("\n✗ No dataset found!")
    print("\nAttempting to download from Kaggle...")
    
    if download_kaggle_dataset():
        # Try loading again after download
        return load_dataset()
    
    return None

def extract_time_features(time_str):
    """Extract hour and minute from time string"""
    try:
        if pd.isna(time_str):
            return 0, 0
        
        # Handle different time formats
        time_str = str(time_str).strip()
        
        # If already in HH:MM format
        if ':' in time_str:
            parts = time_str.split(':')
            hour = int(parts[0])
            minute = int(parts[1].split()[0]) if len(parts) > 1 else 0
            return hour, minute
        
        # Parse as datetime
        time_obj = pd.to_datetime(time_str, errors='coerce')
        if pd.notna(time_obj):
            return time_obj.hour, time_obj.minute
        
        return 0, 0
    except:
        return 0, 0

def extract_duration_minutes(duration_str):
    """Convert duration string to minutes"""
    try:
        if pd.isna(duration_str):
            return 120  # Default 2 hours
        
        duration_str = str(duration_str).strip()
        total_minutes = 0
        
        # Handle formats like "2h 30m" or "2h" or "30m"
        if 'h' in duration_str:
            hours_part = duration_str.split('h')[0].strip()
            total_minutes += int(hours_part) * 60
            
            if 'm' in duration_str:
                minutes_part = duration_str.split('h')[1].replace('m', '').strip()
                if minutes_part:
                    total_minutes += int(minutes_part)
        elif 'm' in duration_str:
            minutes_part = duration_str.replace('m', '').strip()
            total_minutes = int(minutes_part)
        else:
            # Try to parse as number
            total_minutes = int(float(duration_str))
        
        return total_minutes if total_minutes > 0 else 120
    except:
        return 120

def prepare_features(df):
    """Comprehensive feature engineering"""
    print("\n" + "=" * 60)
    print("FEATURE ENGINEERING")
    print("=" * 60)
    
    data = df.copy()
    print(f"\nOriginal shape: {data.shape}")
    print(f"Columns: {list(data.columns)}")
    
    # 1. Handle Date of Journey
    if 'Date_of_Journey' in data.columns:
        print("\n✓ Processing journey date...")
        data['Journey_Date'] = pd.to_datetime(data['Date_of_Journey'], format='%d/%m/%Y', errors='coerce')
        data['Journey_day'] = data['Journey_Date'].dt.day
        data['Journey_month'] = data['Journey_Date'].dt.month
        data['Journey_year'] = data['Journey_Date'].dt.year
        data['Journey_dayofweek'] = data['Journey_Date'].dt.dayofweek
        data['Journey_is_weekend'] = data['Journey_dayofweek'].isin([5, 6]).astype(int)
        data.drop(['Date_of_Journey', 'Journey_Date'], axis=1, inplace=True, errors='ignore')
    
    # 2. Handle Departure Time
    if 'Dep_Time' in data.columns:
        print("✓ Processing departure time...")
        data[['Dep_hour', 'Dep_min']] = data['Dep_Time'].apply(
            lambda x: pd.Series(extract_time_features(x))
        )
        
        # Time of day categories
        data['Dep_time_of_day'] = pd.cut(
            data['Dep_hour'],
            bins=[0, 6, 12, 18, 24],
            labels=['Night', 'Morning', 'Afternoon', 'Evening'],
            include_lowest=True
        )
        data.drop('Dep_Time', axis=1, inplace=True, errors='ignore')
    
    # 3. Handle Arrival Time
    if 'Arrival_Time' in data.columns:
        print("✓ Processing arrival time...")
        data[['Arrival_hour', 'Arrival_min']] = data['Arrival_Time'].apply(
            lambda x: pd.Series(extract_time_features(x))
        )
        data.drop('Arrival_Time', axis=1, inplace=True, errors='ignore')
    
    # 4. Handle Duration
    if 'Duration' in data.columns:
        print("✓ Processing flight duration...")
        data['Duration'] = data['Duration'].apply(extract_duration_minutes)
        data['Duration_hours'] = data['Duration'] / 60
        data['Is_long_flight'] = (data['Duration'] > 180).astype(int)
    
    # 5. Handle Total Stops
    if 'Total_Stops' in data.columns:
        print("✓ Processing stops...")
        stop_mapping = {
            'non-stop': 0,
            '1 stop': 1,
            '2 stops': 2,
            '3 stops': 3,
            '4 stops': 4
        }
        data['Total_Stops'] = data['Total_Stops'].map(stop_mapping).fillna(0).astype(int)
    
    # 6. Create interaction features
    if 'Airline' in data.columns and 'Total_Stops' in data.columns:
        print("✓ Creating interaction features...")
        data['Airline_Stops'] = data['Airline'].astype(str) + '_' + data['Total_Stops'].astype(str)
    
    if 'Source' in data.columns and 'Destination' in data.columns:
        data['Route_Combined'] = data['Source'].astype(str) + '_' + data['Destination'].astype(str)
    
    # 7. Drop unnecessary columns
    cols_to_drop = ['Route', 'Additional_Info']
    for col in cols_to_drop:
        if col in data.columns:
            data.drop(col, axis=1, inplace=True)
    
    # 8. Handle missing values
    print("\n✓ Handling missing values...")
    print(f"Missing values before:\n{data.isnull().sum()[data.isnull().sum() > 0]}")
    data.dropna(subset=['Price'], inplace=True)
    data.fillna(method='ffill', inplace=True)
    data.fillna(0, inplace=True)
    
    print(f"\nFinal shape: {data.shape}")
    print(f"Final columns: {list(data.columns)}")
    
    return data

def train_model(df):
    """Train the flight price prediction model"""
    print("\n" + "=" * 60)
    print("MODEL TRAINING")
    print("=" * 60)
    
    # Prepare features
    df = prepare_features(df)
    
    # Separate features and target
    X = df.drop('Price', axis=1)
    y = df['Price']
    
    print(f"\n✓ Features shape: {X.shape}")
    print(f"✓ Target shape: {y.shape}")
    print(f"✓ Price range: ₹{y.min():.2f} - ₹{y.max():.2f}")
    print(f"✓ Average price: ₹{y.mean():.2f}")
    
    # Encode categorical variables
    print("\n✓ Encoding categorical features...")
    categorical_cols = X.select_dtypes(include=['object', 'category']).columns
    label_encoders = {}
    
    for col in categorical_cols:
        le = LabelEncoder()
        X[col] = le.fit_transform(X[col].astype(str))
        label_encoders[col] = le
        print(f"   - {col}: {len(le.classes_)} unique values")
    
    # Split data
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42
    )
    
    print(f"\n✓ Training set: {X_train.shape[0]} samples")
    print(f"✓ Test set: {X_test.shape[0]} samples")
    
    # Train Random Forest
    print("\n⏳ Training Random Forest model...")
    rf_model = RandomForestRegressor(
        n_estimators=200,
        max_depth=20,
        min_samples_split=5,
        min_samples_leaf=2,
        max_features='sqrt',
        random_state=42,
        n_jobs=-1,
        verbose=0
    )
    
    rf_model.fit(X_train, y_train)
    
    # Evaluate
    train_pred = rf_model.predict(X_train)
    test_pred = rf_model.predict(X_test)
    
    train_r2 = r2_score(y_train, train_pred)
    test_r2 = r2_score(y_test, test_pred)
    train_mae = mean_absolute_error(y_train, train_pred)
    test_mae = mean_absolute_error(y_test, test_pred)
    test_rmse = np.sqrt(mean_squared_error(y_test, test_pred))
    
    print("\n" + "=" * 60)
    print("MODEL PERFORMANCE")
    print("=" * 60)
    print(f"\n📊 Training Metrics:")
    print(f"   R² Score: {train_r2:.4f}")
    print(f"   MAE: ₹{train_mae:.2f}")
    
    print(f"\n📊 Testing Metrics:")
    print(f"   R² Score: {test_r2:.4f}")
    print(f"   MAE: ₹{test_mae:.2f}")
    print(f"   RMSE: ₹{test_rmse:.2f}")
    
    # Feature importance
    feature_importance = pd.DataFrame({
        'feature': X.columns,
        'importance': rf_model.feature_importances_
    }).sort_values('importance', ascending=False)
    
    print(f"\n🎯 Top 10 Important Features:")
    for idx, row in feature_importance.head(10).iterrows():
        print(f"   {row['feature']}: {row['importance']:.4f}")
    
    # Save model
    print("\n💾 Saving model and artifacts...")
    os.makedirs('models', exist_ok=True)
    
    joblib.dump(rf_model, 'models/flight_price_model.pkl')
    joblib.dump(label_encoders, 'models/label_encoders.pkl')
    
    model_info = {
        'feature_names': X.columns.tolist(),
        'categorical_features': list(categorical_cols),
        'train_r2': float(train_r2),
        'test_r2': float(test_r2),
        'test_mae': float(test_mae),
        'test_rmse': float(test_rmse),
        'training_date': datetime.now().isoformat(),
        'training_samples': int(len(X_train)),
        'feature_importance': feature_importance.to_dict('records')
    }
    
    with open('models/model_info.json', 'w') as f:
        json.dump(model_info, f, indent=2)
    
    print("✓ Model saved to models/flight_price_model.pkl")
    print("✓ Encoders saved to models/label_encoders.pkl")
    print("✓ Model info saved to models/model_info.json")
    
    return rf_model, label_encoders, model_info

def test_prediction(model, encoders, model_info):
    """Test the model with sample data"""
    print("\n" + "=" * 60)
    print("TESTING SAMPLE PREDICTIONS")
    print("=" * 60)
    
    test_cases = [
        {
            'name': 'Delhi to Mumbai - Non-stop',
            'data': {
                'Airline': 'IndiGo',
                'Source': 'Delhi',
                'Destination': 'Mumbai',
                'Total_Stops': 0,
                'Journey_day': 15,
                'Journey_month': 12,
                'Journey_year': 2025,
                'Journey_dayofweek': 0,
                'Journey_is_weekend': 0,
                'Dep_hour': 10,
                'Dep_min': 30,
                'Arrival_hour': 13,
                'Arrival_min': 15,
                'Duration': 165,
                'Duration_hours': 2.75,
                'Is_long_flight': 0,
                'Dep_time_of_day': 'Morning'
            }
        },
        {
            'name': 'Bangalore to Delhi - 1 Stop',
            'data': {
                'Airline': 'Air India',
                'Source': 'Banglore',
                'Destination': 'Delhi',
                'Total_Stops': 1,
                'Journey_day': 20,
                'Journey_month': 12,
                'Journey_year': 2025,
                'Journey_dayofweek': 5,
                'Journey_is_weekend': 1,
                'Dep_hour': 18,
                'Dep_min': 0,
                'Arrival_hour': 22,
                'Arrival_min': 30,
                'Duration': 270,
                'Duration_hours': 4.5,
                'Is_long_flight': 1,
                'Dep_time_of_day': 'Evening'
            }
        }
    ]
    
    for test_case in test_cases:
        print(f"\n🧪 Test: {test_case['name']}")
        
        sample_df = pd.DataFrame([test_case['data']])
        
        # Add any missing columns with default values
        for col in model_info['feature_names']:
            if col not in sample_df.columns:
                sample_df[col] = 0
        
        # Encode categorical features
        for col in model_info['categorical_features']:
            if col in sample_df.columns and col in encoders:
                try:
                    sample_df[col] = encoders[col].transform(sample_df[col].astype(str))
                except:
                    sample_df[col] = 0
        
        # Reorder columns
        sample_df = sample_df[model_info['feature_names']]
        
        # Predict
        prediction = model.predict(sample_df)[0]
        print(f"   Predicted Price: ₹{prediction:,.2f}")

if __name__ == "__main__":
    print("\n" + "=" * 60)
    print("FLIGHT PRICE PREDICTION - MODEL TRAINING")
    print("=" * 60)
    
    # Load dataset
    df = load_dataset()
    
    if df is None:
        print("\n❌ Failed to load dataset. Exiting...")
        exit(1)
    
    # Train model
    model, encoders, info = train_model(df)
    
    # Test predictions
    test_prediction(model, encoders, info)
    
    print("\n" + "=" * 60)
    print("✅ TRAINING COMPLETED SUCCESSFULLY!")
    print("=" * 60)
    print("\nNext steps:")
    print("1. Check the models/ directory for saved files")
    print("2. Update your prediction service to use these models")
    print("3. Test the API endpoints")
    print("=" * 60 + "\n")