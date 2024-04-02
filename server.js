// server.js

import express from "express";
import bodyParser from "body-parser";
import redis from "redis";
import cors from "cors";

const app = express();
const client = redis.createClient({
  password: "xVrg8gJBE2v7aHFfpenfVsasRLUUxoRK",
  socket: {
    host: "redis-14279.c305.ap-south-1-1.ec2.cloud.redislabs.com",
    port: 14279,
  },
});

client.on("connect", () => {
  console.log("Connected to Redis server successfully!");
});

client.on("error", (error) => {
  console.error("Redis client encountered an error:", error);
});

(async () => {
  await client.connect();
})();

app.use(cors()); // Add this line to enable CORS
app.use(bodyParser.json());

// Login endpoint
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const storedPassword = await client.get(username); // Await the client.get() call
  if (storedPassword == password) {
    res.status(202).send("Login was successful.");
  } else {
    res.status(401).send("Incorrect username or password.");
  }
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server iss running on port ${PORT}`);
});
