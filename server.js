const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for all origins
app.use(cors());

// Serve static files (frontend)
app.use(express.static("public"));

// Route to handle AI API requests
app.get("/api/ai", async (req, res) => {
  const userQuery = req.query.ask;
  if (!userQuery) {
    return res.status(400).json({ error: "Query parameter 'ask' is required." });
  }

  try {
    const response = await axios.get(
      `https://hiroshi-api.onrender.com/ai/cohere?ask=${encodeURIComponent(
        userQuery
      )}`
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching AI response:", error.message);
    res.status(500).json({ error: "Failed to fetch AI response." });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
