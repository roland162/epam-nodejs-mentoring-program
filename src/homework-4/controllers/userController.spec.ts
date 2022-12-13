import supertest from "supertest";
import { app } from "../server";
import jwt from "jsonwebtoken";

jest.mock("sequelize", () => {
  const SequelizeMock = require("sequelize-mock");
  return {
    Sequelize: SequelizeMock,
    Op: SequelizeMock.Op,
    DataTypes: SequelizeMock.DataTypes,
  };
});


jest.mock("../config/database.ts", () => {
  return {
    sequelize: {
      sync: () => new Promise((resolve) => resolve(resolve)),
      define: jest.fn(),
    },
  };
});

jest.mock("../models/createUserModel.ts", () => {
  return jest.fn().mockImplementation(() => {
    return {
      findAll: jest.fn().mockResolvedValue([
        {
          id: 1,
          login: "test",
          password: "test",
          age: 20,
          isDeleted: false,
        },
        {
          id: 2,
          login: "test2",
          password: "test2",
          age: 20,
          isDeleted: false,
        },
      ]),
      findByPk: jest.fn().mockResolvedValue({
        id: 1,
        login: "test",
        password: "test",
        age: 20,
        isDeleted: false,
      }),
      create: jest.fn().mockResolvedValue({
        id: 1,
        login: "test",
        password: "test",
        age: 20,
        isDeleted: false,
      }),
      update: jest.fn().mockResolvedValue({
        id: 1,
        login: "test",
        password: "test",
        age: 20,
        isDeleted: false,
      }),
      belongsToMany: jest.fn(),
      hasMany: jest.fn(),
    };
  });
});

jest.mock("../models/createGroupModel.ts", () => {
  return jest.fn().mockImplementation(() => {
    return {
      findAll: jest.fn().mockResolvedValue([
        {
          id: 1,
          name: "test",
          permissions: ["READ"],
        },
        {
          id: 2,
          name: "test2",
          permissions: ["READ"],
        },
      ]),
      findByPk: jest.fn().mockResolvedValue({
        id: 1,
        name: "test",
        permissions: ["READ"],
      }),
      create: jest.fn().mockResolvedValue({
        id: 1,
        name: "test",
        permissions: ["READ"],
      }),
      update: jest.fn().mockResolvedValue({
        id: 1,
        name: "test",
        permissions: ["READ"],
      }),
      belongsToMany: jest.fn(),
      hasMany: jest.fn(),
    };
  });
});

const mockLoginUser = () => {
  const token = jwt.sign({ login: "test" }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  return token;
};

describe("User", () => {
  describe("User is Authorized", () => {
    it("should get all users", async () => {
      const users = await supertest(app)
        .get("/users")
        .set("Authorization", `Bearer ${mockLoginUser()}`);
      expect(users.status).toBe(200);
      expect(users.body).toHaveLength(2);
    });

    it("should get user", async () => {
      const mockUser = {
        login: "test",
        password: "test",
        age: 20,
      };
      const response = await supertest(app).post("/users").send(mockUser);
      const user = await supertest(app)
        .get(`/users/${response.body.id}`)
        .set("Authorization", `Bearer ${mockLoginUser()}`);
      expect(user.status).toBe(200);
      expect(user.body).toHaveProperty("login", "test");
    });
  });

  describe("User is Unauthorized", () => {
    it("should not get all users", async () => {
      const users = await supertest(app).get("/users");
      expect(users.status).toBe(401);
    });

    it("should not get user", async () => {
      const mockUser = {
        login: "test",
        password: "test",
        age: 20,
      };
      const response = await supertest(app).post("/users").send(mockUser);
      const user = await supertest(app).get(`/users/${response.body.id}`);
      expect(user.status).toBe(401);
    });

    it("should not update user", async () => {
      const mockUser = {
        login: "test",
        password: "test",
        age: 20,
      };
      const response = await supertest(app).post("/users").send(mockUser);
      const user = await supertest(app)
        .put(`/users/${response.body.id}`)
        .send(mockUser);
      expect(user.status).toBe(401);
    });

    it("should not delete user", async () => {
      const mockUser = {
        login: "test",
        password: "test",
        age: 20,
      };
      const response = await supertest(app).post("/users").send(mockUser);
      const user = await supertest(app).delete(`/users/${response.body.id}`);
      expect(user.status).toBe(401);
    });

    it("should not get auto-suggest users", async () => {
      const users = await supertest(app).get("/users/auto-suggest");
      expect(users.status).toBe(401);
    });
  });
});
