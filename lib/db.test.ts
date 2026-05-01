import { vi, describe, it, expect } from "vitest";

const mockPrismaInstance = {
  user: {},
  puzzle: {},
  expertSubmission: {},
  userAttempt: {},
};

vi.mock("@prisma/adapter-neon", () => ({
  PrismaNeonHttp: vi.fn(function () {
    return {};
  }),
}));

vi.mock("./generated/prisma/client", () => ({
  PrismaClient: vi.fn(function () {
    return mockPrismaInstance;
  }),
}));

describe("db", () => {
  it("exports a prisma client singleton", async () => {
    const { db } = await import("./db");
    expect(db).toBeDefined();
  });

  it("exposes all required models", async () => {
    const { db } = await import("./db");
    expect(db.user).toBeDefined();
    expect(db.puzzle).toBeDefined();
    expect(db.expertSubmission).toBeDefined();
    expect(db.userAttempt).toBeDefined();
  });
});
