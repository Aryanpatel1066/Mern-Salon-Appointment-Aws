const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:5173",  "http://13.201.162.181:3000"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.options("*", cors());

app.get("/", (req, res) => {
  res.send("🚀 Salon Booking API is Running...");
});

app.use("/api/users", require("./routes/auth.route"));
app.use("/api/services", require("./routes/service.route"));
app.use("/api/booking", require("./routes/booking.route"));
app.use("/api", require("./routes/slotLock.route"));
app.use("/api/closed-days", require("./routes/closeDays.route"));
app.use("/api/email", require("./routes/email.route"));
app.use("/api/notifications", require("./routes/notification.route"));
app.use("/api", require("./routes/timeSloat.route"));

module.exports = app;