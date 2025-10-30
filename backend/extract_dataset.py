import zipfile
import os

def extract_zip(file_name, target_folder="data"):
    """Extract any .zip file into backend/data folder."""
    os.makedirs(target_folder, exist_ok=True)
    file_path = os.path.join(os.getcwd(), file_name)
    
    if not os.path.exists(file_path):
        print(f"❌ File not found: {file_path}")
        return
    
    with zipfile.ZipFile(file_path, 'r') as zip_ref:
        zip_ref.extractall(target_folder)
    print(f"✅ {file_name} extracted successfully to {target_folder}/")

# Example usage:
if __name__ == "__main__":
    extract_zip("flight-price-prediction.zip")
    # You can also extract more by calling again:
    # extract_zip("trip-advisor-hotel-reviews.zip")
