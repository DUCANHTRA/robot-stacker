const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const robotRoutes = require("./routes/robot");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use("/api", robotRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));
