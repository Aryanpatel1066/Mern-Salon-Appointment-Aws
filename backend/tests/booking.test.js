const request = require("supertest");
const mongoose = require("mongoose");

const app = require("../app");
const connectDB = require("../config/db");

const Service = require("../models/Service.model");
const SlotLock = require("../models/SlotLock.model");

jest.setTimeout(30000);

let token;
let userId;
let serviceId;
let bookingId;

beforeAll(async () => {
  await connectDB();

  const email = `demo${Date.now()}@gmail.com`;

  // Register user
  await request(app)
    .post("/api/users/register")
    .send({
      name: "Booking User",
      email,
      password: "12345644",
      confirmPassword: "12345644",
      phone: `${Math.floor(Math.random() * 9000000000) + 1000000000}`
    });

  // Login user
  const loginRes = await request(app)
    .post("/api/users/login")
    .send({
      email,
      password: "12345644"
    });

  token = loginRes.body.token;
  userId = loginRes.body.user._id;

  // Create service directly
  const service = await Service.create({
    name: "Hair Cut",
    description: "Basic Hair Cut",
    price: 200,
    duration: "30 min"
  });

  serviceId = service._id;
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Booking Routes", () => {

  test("should fail without token", async () => {

    const response = await request(app)
      .post("/api/booking")
      .send({});

    expect(response.statusCode).toBe(401);

  });

  test("should create booking", async () => {

    await SlotLock.create({
      user: userId,
      service: serviceId,
      date: "2026-07-01",
      timeSlot: "4:00 PM",
      expiresAt: new Date(Date.now() + 5 * 60 * 1000)
    });

    const response = await request(app)
      .post("/api/booking")
      .set("Authorization", `Bearer ${token}`)
      .send({
        service: serviceId,
        date: "2026-07-01",
        timeSlot: "4:00 PM"
      });

    expect(response.statusCode).toBe(201);

    expect(response.body.message)
      .toBe("Booking confirmed");

    bookingId = response.body.booking._id;

  });

  test("should get user bookings", async () => {

    const response = await request(app)
      .get(`/api/booking/user/${userId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);

    expect(response.body.data.length)
      .toBeGreaterThan(0);

  });

  test("should update booking", async () => {

    const response = await request(app)
      .patch(`/api/booking/${bookingId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        date: "2026-07-02",
        timeSlot: "05:00 PM"
      });

    expect(response.statusCode).toBe(200);

    expect(response.body.message)
      .toBe("Booking updated successfully");

  });

  test("should delete booking", async () => {

    const response = await request(app)
      .delete(`/api/booking/${bookingId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);

    expect(response.body.message)
      .toBe("Booking deleted successfully");

  });

});