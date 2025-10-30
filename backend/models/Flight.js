import mongoose from 'mongoose';

const flightSchema = new mongoose.Schema({
  // Renaming to snake_case for consistency with ML model and Python/Node environment
  'airline': {
    type: String,
    required: true,
  },
  'source_city': {
    type: String,
    required: true,
  },
  'destination_city': {
    type: String,
    required: true,
  },
  'departure_time': {
    type: String,
  },
  'stops': {
    type: String,
  },
  'class': {
    type: String,
    enum: ['Economy', 'Business'],
    required: true,
  },
  'duration_hours': { // Changed from 'Duration' assuming it's stored as a number
    type: Number,
  },
  'price': {
    type: Number,
    required: true,
  },
  'createdAt': {
    type: Date,
    default: Date.now,
  },
});

const Flight = mongoose.model('Flight', flightSchema);

export default Flight;