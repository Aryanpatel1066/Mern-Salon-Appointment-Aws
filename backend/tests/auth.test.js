const request = require("supertest");
const mongoose = require("mongoose");

const app = require("../app");
const connectDB = require("../config/db");

beforeAll(async () => {
  await connectDB();
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Auth Routes", () => {


  test("GET / should return API running message", async () => {

    const response = await request(app).get("/");

    expect(response.statusCode).toBe(200);
    expect(response.text).toContain("Salon Booking API");

  });

  //register test case

  test("should register a new user", async () => {

    const uniqueEmail = `test${Date.now()}@gmail.com`;

    const response = await request(app)
      .post("/api/users/register")
      .send({
        name: "Test User",
        email: uniqueEmail,
        password: "123456",
        confirmPassword: "123456",
        phone: `${Math.floor(Math.random() * 9000000000) + 1000000000}`
      });

    expect(response.statusCode).toBe(201);

    expect(response.body).toHaveProperty("token");

    expect(response.body.message)
      .toBe("User registered successfully");

  });
  //register body checking

  test("should fail if name is missing", async () => {

    const response = await request(app)
      .post("/api/users/register")
      .send({
        email: `test${Date.now()}@gmail.com`,
        password: "123456",
        confirmPassword: "123456",
        phone: "9999999999"
      });

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe("Name is required");

  });

  test("should fail if passwords do not match", async () => {

    const response = await request(app)
      .post("/api/users/register")
      .send({
        name: "Test User",
        email: `test${Date.now()}@gmail.com`,
        password: "123456",
        confirmPassword: "654321",
        phone: "9999999999"
      });

    expect(response.statusCode).toBe(400);
    expect(response.body.message)
      .toBe("Passwords do not match");

  });

  test("should fail if password is less than 6 chars", async () => {

    const response = await request(app)
      .post("/api/users/register")
      .send({
        name: "Test User",
        email: `test${Date.now()}@gmail.com`,
        password: "123",
        confirmPassword: "123",
        phone: "9999999999"
      });

    expect(response.statusCode).toBe(400);

    expect(response.body.message)
      .toBe("Password must be at least 6 characters long");

  });

  test("should fail if phone number is invalid", async () => {

    const response = await request(app)
      .post("/api/users/register")
      .send({
        name: "Test User",
        email: `test${Date.now()}@gmail.com`,
        password: "123456",
        confirmPassword: "123456",
        phone: "123"
      });

    expect(response.statusCode).toBe(400);

    expect(response.body.message)
      .toBe("Invalid phone number");

  });

  //login test

  test("should login successfully", async () => {

    const email = `login${Date.now()}@gmail.com`;

    await request(app)
      .post("/api/users/register")
      .send({
        name: "Login User",
        email,
        password: "123456",
        confirmPassword: "123456",
        phone: `${Math.floor(Math.random() * 9000000000) + 1000000000}`
      });

    const response = await request(app)
      .post("/api/users/login")
      .send({
        email,
        password: "123456"
      });

    expect(response.statusCode).toBe(200);

    expect(response.body).toHaveProperty("token");

    expect(response.body.message)
      .toBe("Login Successful");

    expect(response.body.user.email)
      .toBe(email);

  });

  //login body check

  test("should fail with wrong password", async () => {

    const email = `wrongpass${Date.now()}@gmail.com`;

    await request(app)
      .post("/api/users/register")
      .send({
        name: "Wrong Password User",
        email,
        password: "123456",
        confirmPassword: "123456",
        phone: `${Math.floor(Math.random() * 9000000000) + 1000000000}`
      });

    const response = await request(app)
      .post("/api/users/login")
      .send({
        email,
        password: "wrong123"
      });

    expect(response.statusCode).toBe(400);

    expect(response.body.message)
      .toBe("wrong password");

  });

  test("should fail if email does not exist", async () => {

    const response = await request(app)
      .post("/api/users/login")
      .send({
        email: "idontexist@gmail.com",
        password: "123456"
      });

    expect(response.statusCode).toBe(400);

    expect(response.body.message)
      .toBe("email wrong");

  });

  test("should fail if email is missing", async () => {

    const response = await request(app)
      .post("/api/users/login")
      .send({
        password: "123456"
      });

    expect(response.statusCode).toBe(400);

    expect(response.body.message)
      .toBe("User email is required");

  });

  test("should fail if password is missing", async () => {

    const response = await request(app)
      .post("/api/users/login")
      .send({
        email: "test@gmail.com"
      });

    expect(response.statusCode).toBe(400);

    expect(response.body.message)
      .toBe("User password is required");

  });
//token test cases 
  test("should fail without token", async () => {

    const response = await request(app)
      .get("/api/users/profile/123");

    expect(response.statusCode).toBe(401);

    expect(response.body.message)
      .toBe("Access Denied. No Token Provided.");

  });

  test("should fail with invalid token", async () => {

    const response = await request(app)
      .get("/api/users/profile/123")
      .set("Authorization", "Bearer fake-token");

    expect(response.statusCode).toBe(401);

    expect(response.body.message)
      .toBe("Invalid Token");

  });

  test("should get profile with valid token", async () => {

    const email = `profile${Date.now()}@gmail.com`;

    // Register User

    await request(app)
      .post("/api/users/register")
      .send({
        name: "Profile User",
        email,
        password: "123456",
        confirmPassword: "123456",
        phone: `${Math.floor(Math.random() * 9000000000) + 1000000000}`
      });

    // Login User

    const loginResponse = await request(app)
      .post("/api/users/login")
      .send({
        email,
        password: "123456"
      });

    const token = loginResponse.body.token;

    const userId = loginResponse.body.user._id;

    // Call Protected Route

    const response = await request(app)
      .get(`/api/users/profile/${userId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);

    expect(response.body.email).toBe(email);

  });
});