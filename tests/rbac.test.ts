import {
  hasPermission,
  getCurrentUserRole,
} from "@/lib/rbac";
import { describe, it, expect } from "vitest";

describe("RBAC Permissions", () => {
  it("returns admin as default role", () => {
    expect(getCurrentUserRole()).toBe("admin");
  });

  it("allows admin to access billing", () => {
    expect(
      hasPermission("admin", "billing")
    ).toBe(true);
  });

  it("allows member to access analytics", () => {
    expect(
      hasPermission("member", "analytics")
    ).toBe(true);
  });

  it("prevents viewer from accessing billing", () => {
    expect(
      hasPermission("viewer", "billing")
    ).toBe(false);
  });

  it("allows viewer to access dashboard", () => {
    expect(
      hasPermission("viewer", "dashboard")
    ).toBe(true);
  });

  it("allows admin to access conversations", () => {
    expect(
      hasPermission("admin", "conversations")
    ).toBe(true);
  });
});