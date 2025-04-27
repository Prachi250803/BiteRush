const fetch = require("node-fetch");

module.exports = async (req, res) => {
  const { resId } = req.query; // Fetch the resId from query params

  if (!resId) {
    return res.status(400).json({ error: "Missing restaurant ID" });
  }

  try {
    const response = await fetch(
      `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=12.9352403&lng=77.624532&restaurantId=${resId}&catalog_qa=undefined&submitAction=ENTER`,
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
    console.error('Error fetching restaurant menu:', err);
    res.status(500).json({ error: 'Failed to fetch restaurant menu' });
  }
};
