const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Set up CORS to allow only requests from http://localhost:3001 (your React frontend)
const corsOptions = {
  origin: '*',  // Allow all origins
  methods: ['GET'],
  allowedHeaders: ['Content-Type'],
};

// Apply the CORS middleware with the specific options
app.use(cors(corsOptions));

app.get('/api/swiggy', async (req, res) => {
  const url = "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9352403&lng=77.624532&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING";

  try {
    console.log("Fetching data from Swiggy...");
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0',
        'Accept': 'application/json',
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch from Swiggy. Status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Fetched data from Swiggy:", data);
    res.json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Failed to fetch Swiggy data" });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});
