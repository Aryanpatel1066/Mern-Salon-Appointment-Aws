const dotenv = require("dotenv");
const connectDB = require("./config/db");
const initAdmin = require("./utils/initAdmin");
const app = require("./app");

dotenv.config();

const PORT = process.env.PORT || 1066;

app.listen(PORT, async () => {
  console.log(`🚀 Server running on port ${PORT}`);

  try {
    await connectDB();
    console.log("✅ MongoDB connected");

    initAdmin();
  } catch (err) {
    console.error("❌ MongoDB connection failed", err);
  }
});