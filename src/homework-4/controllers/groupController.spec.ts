import { app } from "../server";
import supertest from "supertest";
import { mockLoginUser } from "../helpers.ts/testLoginHelper";

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

jest.mock("../models/createGroupModel.ts", () => {
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

describe("Group", () => {
  it("should return all groups", async () => {
    const response = await supertest(app)
      .get("/groups")
      .set("Authorization", `Bearer ${mockLoginUser()}`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual([
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
    ]);
  });

  it("should return group by id", async () => {
    const response = await supertest(app)
      .get("/groups/1")
      .set("Authorization", `Bearer ${mockLoginUser()}`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      id: 1,
      name: "test",
      permissions: ["READ"],
    });
  });

  it("should create group", async () => {
    const response = await supertest(app)
      .post("/groups")
      .set("Authorization", `Bearer ${mockLoginUser()}`)
      .send({
        id: 1,
        name: "test",
        permissions: ["READ"],
      });
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      id: 1,
      name: "test",
      permissions: ["READ"],
    });
  });

  it("should update group", async () => {
    const response = await supertest(app)
      .put("/groups/1")
      .set("Authorization", `Bearer ${mockLoginUser()}`)
      .send({
        id: 1,
        name: "test",
        permissions: ["READ"],
      });
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      id: 1,
      name: "test",
      permissions: ["READ"],
    });
  });

  it("should delete group", async () => {
    const response = await supertest(app)
      .delete("/groups/1")
      .set("Authorization", `Bearer ${mockLoginUser()}`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      id: 1,
      name: "test",
      permissions: ["READ"],
    });
  });

  it("should return 404 if group not found", async () => {
    const response = await supertest(app)
      .get("/groups/3")
      .set("Authorization", `Bearer ${mockLoginUser()}`);
    expect(response.status).toBe(404);
  });
});
