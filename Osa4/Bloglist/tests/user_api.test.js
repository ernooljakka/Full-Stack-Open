const { test, after, describe, beforeEach } = require("node:test");
const assert = require("node:assert");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const helper = require("./test_helper");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");
const mongoose = require("mongoose");

const api = supertest(app);

describe("when there is initially one user at db", () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash("sekret", 10);
    const user = new User({ username: "root", name: "rootish", passwordHash });

    await user.save();
  });

  test("creation succeeds with a fresh username", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "asdads",
      name: "Erno2",
      password: "salainen",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 2);

    const usernames = usersAtEnd.map((u) => u.username);
    assert(usernames.includes(newUser.username));
  });
});

test("creation fails if username already taken", async () => {
  const usersAtStart = await helper.usersInDb();

  const newUser = {
    username: "root",
    name: "Erno",
    password: "salainen",
  };

  const result = await api
    .post("/api/users")
    .send(newUser)
    .expect(400)
    .expect("Content-Type", /application\/json/);

  assert(result.body.error.includes("expected `username` to be unique"));

  const usersAtEnd = await helper.usersInDb();
  assert.strictEqual(usersAtEnd.length, usersAtStart.length);
});

test("creation fails if username shorter than 3 characters", async () => {
  const newUser = {
    username: "er",
    name: "ShortUsername",
    password: "salainen",
  };

  const result = await api
    .post("/api/users")
    .send(newUser)
    .expect(400)
    .expect("Content-Type", /application\/json/);

  assert(
    result.body.error.includes("is shorter than the minimum allowed length")
  );
});

test("creation fails if password shorter than 3 characters", async () => {
  const newUser = {
    username: "longenough",
    name: "BadPass",
    password: "12",
  };

  const result = await api
    .post("/api/users")
    .send(newUser)
    .expect(400)
    .expect("Content-Type", /application\/json/);

  assert(
    result.body.error.includes("password must be at least 3 characters long")
  );
});

after(async () => {
  await User.deleteMany({});
  await mongoose.connection.close();
});
