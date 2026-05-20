import { describe, it, expect } from "vitest";
import { exportToPDF } from "@/lib/export-pdf";

describe("PDF Export Utility", () => {
  it("exports PDF without throwing an error", async () => {
    const rows = [
      {
        Event: "User Login",
        User: "Yaroslav",
        Status: "Success",
      },
      {
        Event: "Subscription Updated",
        User: "Admin",
        Status: "Completed",
      },
    ];

    await expect(
      exportToPDF("audit-report", rows)
    ).resolves.not.toThrow();
  });

  it("handles empty rows without throwing an error", async () => {
    await expect(
      exportToPDF("empty-report", [])
    ).resolves.not.toThrow();
  });
});