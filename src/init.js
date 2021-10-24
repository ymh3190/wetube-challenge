import "regenerator-runtime";
import "dotenv/config";
import "./db";
import "./models/User";
import "./models/Video";
import "./models/Comment";
import app from "./server";

const PORT = process.env.PORT || 4000;

app.listen(PORT, () =>
  console.log(`[SERVER LISTENING] http://localhost:${PORT}`)
);
