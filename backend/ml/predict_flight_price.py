#!/usr/bin/env python3
"""
Flight Price Prediction Script
Enhanced heuristic version with realistic pricing based on multiple factors.
Modified to output structured JSON and handle arguments robustly.
"""

import sys
import warnings
import json 
import random 

warnings.filterwarnings('ignore')

def calculate_distance_factor(source, destination):
    """
    Calculate approximate distance-based pricing between cities.
    Returns a base price based on the route.
    """
    # Major Indian city coordinates (approx) for distance calculation
    city_coords = {
        'Delhi': (28.7041, 77.1025),
        'Mumbai': (19.0760, 72.8777),
        'Bangalore': (12.9716, 77.5946),
        'Kolkata': (22.5726, 88.3639),
        'Chennai': (13.0827, 80.2707),
        'Hyderabad': (17.3850, 78.4867),
        'Pune': (18.5204, 73.8567),
        'Ahmedabad': (23.0225, 72.5714),
        'Jaipur': (26.9124, 75.7873),
        'Goa': (15.2993, 74.1240),
        'Kochi': (9.9312, 76.2673),
        'Chandigarh': (30.7333, 76.7794),
        'Lucknow': (26.8467, 80.9462),
        'Indore': (22.7196, 75.8577),
        'Bhopal': (23.2599, 77.4126),
    }
    
    # Detailed route pricing (INR)
    route_prices = {
        # Delhi routes
        ('Delhi', 'Mumbai'): 4500,
        ('Delhi', 'Bangalore'): 5500,
        ('Delhi', 'Kolkata'): 4200,
        ('Delhi', 'Chennai'): 5800,
        ('Delhi', 'Hyderabad'): 5200,
        ('Delhi', 'Pune'): 4800,
        ('Delhi', 'Ahmedabad'): 3800,
        ('Delhi', 'Jaipur'): 2500,
        ('Delhi', 'Goa'): 5200,
        ('Delhi', 'Kochi'): 6200,
        ('Delhi', 'Chandigarh'): 2200,
        ('Delhi', 'Lucknow'): 2800,
        
        # Mumbai routes
        ('Mumbai', 'Delhi'): 4500,
        ('Mumbai', 'Bangalore'): 4200,
        ('Mumbai', 'Kolkata'): 5200,
        ('Mumbai', 'Chennai'): 4800,
        ('Mumbai', 'Hyderabad'): 3800,
        ('Mumbai', 'Pune'): 2200,
        ('Mumbai', 'Ahmedabad'): 2500,
        ('Mumbai', 'Goa'): 2800,
        ('Mumbai', 'Kochi'): 4500,
        ('Mumbai', 'Jaipur'): 4200,
        
        # Bangalore routes
        ('Bangalore', 'Delhi'): 5500,
        ('Bangalore', 'Mumbai'): 4200,
        ('Bangalore', 'Kolkata'): 5800,
        ('Bangalore', 'Chennai'): 2800,
        ('Bangalore', 'Hyderabad'): 2500,
        ('Bangalore', 'Pune'): 3800,
        ('Bangalore', 'Goa'): 2800,
        ('Bangalore', 'Kochi'): 2200,
        
        # Chennai routes
        ('Chennai', 'Delhi'): 5800,
        ('Chennai', 'Mumbai'): 4800,
        ('Chennai', 'Bangalore'): 2800,
        ('Chennai', 'Kolkata'): 4500,
        ('Chennai', 'Hyderabad'): 2500,
        ('Chennai', 'Kochi'): 2200,
        
        # Kolkata routes
        ('Kolkata', 'Delhi'): 4200,
        ('Kolkata', 'Mumbai'): 5200,
        ('Kolkata', 'Bangalore'): 5800,
        ('Kolkata', 'Chennai'): 4500,
        ('Kolkata', 'Hyderabad'): 4800,
        
        # Other important routes
        ('Hyderabad', 'Delhi'): 5200,
        ('Hyderabad', 'Mumbai'): 3800,
        ('Hyderabad', 'Bangalore'): 2500,
        ('Hyderabad', 'Chennai'): 2500,
        ('Hyderabad', 'Kolkata'): 4800,
        
        ('Pune', 'Delhi'): 4800,
        ('Pune', 'Bangalore'): 3800,
        ('Pune', 'Mumbai'): 2200,
        
        ('Goa', 'Delhi'): 5200,
        ('Goa', 'Mumbai'): 2800,
        ('Goa', 'Bangalore'): 2800,
        
        ('Kochi', 'Delhi'): 6200,
        ('Kochi', 'Mumbai'): 4500,
        ('Kochi', 'Bangalore'): 2200,
        ('Kochi', 'Chennai'): 2200,
    }
    
    # Try to get exact route price
    route_key = (source, destination)
    if route_key in route_prices:
        return route_prices[route_key]
    
    # If route not found, try reverse direction
    reverse_key = (destination, source)
    if reverse_key in route_prices:
        return route_prices[reverse_key]
    
    # Calculate approximate distance if cities are in database
    if source in city_coords and destination in city_coords:
        lat1, lon1 = city_coords[source]
        lat2, lon2 = city_coords[destination]
        
        # Simple distance calculation (not accurate but good enough for demo)
        distance = ((lat2 - lat1)**2 + (lon2 - lon1)**2)**0.5
        base_price = 2000 + (distance * 200)  # ~INR 200 per degree
        return round(base_price, -2)  # Round to nearest 100
    
    # Default fallback
    return 4000


def predict_price(airline, source, destination, departure_time, stops, seat_class):
    """
    Predict flight price based on multiple factors.
    This uses a realistic heuristic model.
    """
    
    # ⭐ FIX: If the source and destination are the same, return 0. 
    # Use .lower() for case-insensitive comparison.
    if source.lower() == destination.lower():
        return 0
    
    # Get base route price
    route_price = calculate_distance_factor(source, destination)
    
    # Airline pricing factors (based on typical market positioning)
    airline_factors = {
        # Premium airlines
        'Vistara': 1.35,
        'Air India': 1.15,
        
        # Mid-range airlines
        'IndiGo': 1.0,  # Base reference
        
        # Budget airlines
        'SpiceJet': 0.88,
        'Air Asia': 0.82,
        'GoAir': 0.85,
        'Go First': 0.85,
        
        # International in domestic
        'Qatar Airways': 1.5,
        'Emirates': 1.6,
        'Singapore Airlines': 1.55,
    }
    
    # Apply airline factor
    airline_factor = airline_factors.get(airline, 1.0)
    price = route_price * airline_factor
    
    # Departure time pricing (based on demand patterns)
    departure_factors = {
        'early morning': 0.85,   # 4 AM - 7 AM (least popular)
        'morning': 1.15,         # 7 AM - 12 PM (business travel peak)
        'afternoon': 1.08,       # 12 PM - 5 PM (moderate demand)
        'evening': 1.20,         # 5 PM - 9 PM (highest demand)
        'night': 0.92,           # 9 PM - 12 AM (lower demand)
        'late night': 0.78,      # 12 AM - 4 AM (lowest demand)
    }
    
    departure_factor = departure_factors.get(departure_time.lower(), 1.0)
    price *= departure_factor
    
    # Stops adjustment (convenience pricing)
    stops_factors = {
        'zero': 1.25,      # Non-stop premium
        'non-stop': 1.25,
        'one': 1.0,        # Standard
        '1': 1.0,
        'two': 0.82,       # Cheaper but inconvenient
        '2': 0.82,
        'two+': 0.75,      # Significant discount
        'multiple': 0.75,
    }
    
    stops_factor = stops_factors.get(stops.lower(), 1.0)
    price *= stops_factor
    
    # Class/Cabin adjustment
    class_factors = {
        'economy': 1.0,
        'eco': 1.0,
        'premium economy': 1.6,
        'premium': 1.6,
        'business': 2.8,
        'first': 4.2,
        'first class': 4.2,
    }
    
    class_factor = class_factors.get(seat_class.lower(), 1.0)
    price *= class_factor
    
    # Add dynamic pricing variation (simulates demand fluctuation)
    # Using hash for consistency - same inputs always give same output
    seed_value = hash(f"{airline}{source}{destination}{departure_time}")
    random.seed(seed_value)
    
    # ±12% variation for demand simulation
    demand_factor = random.uniform(0.88, 1.12)
    price *= demand_factor
    
    # Add seasonal/day-of-week factor (simulate higher weekend prices)
    random.seed(seed_value + 42)
    weekend_factor = random.choice([1.0, 1.0, 1.0, 1.0, 1.15, 1.18])  # Higher chance of weekend
    price *= weekend_factor
    
    # Minimum viable price floor
    min_price = route_price * 0.5
    price = max(price, min_price)
    
    # Round to realistic price (multiples of 50)
    price = round(price / 50) * 50
    
    return price


def main():
    """Main entry point for the script, handles JSON I/O."""
    
    # The Node.js script passes 6 mandatory feature arguments + 1 optional target_price argument.
    if len(sys.argv) < 7:
        print("ERROR: Missing mandatory feature arguments. Expected: 6, got {len(sys.argv) - 1}", file=sys.stderr)
        sys.exit(1)
        
    # --- 1. Parse and clean arguments ---
    try:
        # Use .strip() for robustness against unexpected whitespace from Node.js spawn()
        airline = sys.argv[1].strip()
        source = sys.argv[2].strip()
        destination = sys.argv[3].strip()
        departure_time = sys.argv[4].strip()
        stops = sys.argv[5].strip()
        seat_class = sys.argv[6].strip()
        
        # Optional 7th argument for target price comparison
        target_price_raw = sys.argv[7].strip() if len(sys.argv) > 7 else ""
        target_price = float(target_price_raw) if target_price_raw else None
        
    except IndexError as e:
        # This catches cases where arguments are provided but are null/missing
        print(f"ERROR: Failed to parse arguments. Check Node.js parameters. Details: {e}", file=sys.stderr)
        sys.exit(1)


    # --- 2. Perform Prediction ---
    try:
        predicted_price = predict_price(
            airline, 
            source, 
            destination, 
            departure_time, 
            stops, 
            seat_class
        )
        
        # --- 3. Prepare Structured JSON Output ---
        output = {
            "predicted_price": round(predicted_price, 2)
        }
        
        if target_price is not None:
            output["target_price"] = round(target_price, 2)
            
        # Log successful prediction to stderr (safe)
        print(f"INFO: Predicted price: {output['predicted_price']}", file=sys.stderr)
        
        # Print the JSON string to standard output (Node.js expects this)
        print(json.dumps(output))
        sys.stdout.flush() # CRITICAL: Ensure buffer is sent
        sys.exit(0)
        
    except Exception as e:
        # Log detailed error to stderr (safe)
        print("--- PREDICTION HEURISTIC FAILED ---", file=sys.stderr)
        print(f"ERROR: Prediction failed - {str(e)}", file=sys.stderr)
        import traceback
        traceback.print_exc(file=sys.stderr)
        sys.exit(1)


if __name__ == "__main__":
    main()