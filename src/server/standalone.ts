import dotenv from "dotenv";
dotenv.config();

import app from "./app";

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Video Template Studio Express Server running on http://localhost:${PORT}`);
  console.log(`📡 Health Check: http://localhost:${PORT}/api/health`);
  console.log(`📦 Products API: http://localhost:${PORT}/api/products`);
});
