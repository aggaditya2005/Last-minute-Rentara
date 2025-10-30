import express from 'express';
import Flight from '../models/Flight.js';

const router = express.Router();

/**
 * @route GET /api/flights
 * @desc Get all flight listings from MongoDB.
 */
router.get('/', async (req, res) => {
  try {
    const flights = await Flight.find().limit(50);
    if (flights.length === 0) {
      return res.status(404).json({ message: 'No flight data found in the database.' });
    }
    res.json(flights);
  } catch (error) {
    console.error('Error fetching all flights:', error);
    res.status(500).json({ message: 'Server error while retrieving flight data.' });
  }
});


/**
 * @route GET /api/flights/search
 * @desc Search flights by source and destination city (using snake_case).
 * @query source: Starting city
 * @query destination: Ending city
 */
router.get('/search', async (req, res) => {
  const { source, destination } = req.query;

  const query = {};

  if (source) {
    // Search on 'source_city' field
    query['source_city'] = { $regex: new RegExp(source, 'i') };
  }

  if (destination) {
    // Search on 'destination_city' field
    query['destination_city'] = { $regex: new RegExp(destination, 'i') };
  }

  if (Object.keys(query).length === 0) {
    return res.status(400).json({ message: 'Please provide at least a source or destination for search.' });
  }

  try {
    const flights = await Flight.find(query).limit(50);

    if (flights.length === 0) {
      return res.status(404).json({ message: `No flights found matching criteria: ${source} to ${destination}` });
    }

    res.json(flights);
  } catch (error) {
    console.error('Error searching flights:', error);
    res.status(500).json({ message: 'Server error during flight search.' });
  }
});

export default router;