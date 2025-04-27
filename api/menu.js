const fetch = require("node-fetch");

module.exports = async (req, res) => {
  try {
    const response = await fetch(
      'https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9352403&lng=77.624532&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING',
      {
        headers: {
          'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/89.0.4389.82 Safari/537.36',
        },
      }
    );
    const data = await response.json();
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json(data);
  } catch (err) {
    console.error('Error fetching homepage data:', err);
    res.status(500).json({ error: 'Failed to fetch homepage data' });
  }
};
