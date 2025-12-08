require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const robotRoutes = require("./routes/robot");

const app = express();

// CORS configuration with environment variable
const corsOptions = {
    origin: process.env.CORS_ORIGIN,
    credentials: true,
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use("/api", robotRoutes);

// Only start server if not in Vercel serverless environment
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));
}

// Export for Vercel serverless functions
module.exports = app;
