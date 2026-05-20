import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { exportToCSV } from "@/lib/export";

describe("CSV Export Utility", () => {
  beforeEach(() => {
    // Mock browser APIs
    global.URL.createObjectURL = vi.fn(() => "blob:test-url");
    global.URL.revokeObjectURL = vi.fn();

    // Mock click
    HTMLAnchorElement.prototype.click = vi.fn();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("creates and downloads a CSV file", () => {
    const appendSpy = vi.spyOn(document.body, "appendChild");
    const removeSpy = vi.spyOn(document.body, "removeChild");

    const rows = [
      {
        Name: "Yaroslav",
        Plan: "Enterprise",
        Revenue: 499,
      },
      {
        Name: "Company A",
        Plan: "Pro",
        Revenue: 99,
      },
    ];

    exportToCSV("customers", rows);

    // Проверяем создание blob URL
    expect(URL.createObjectURL).toHaveBeenCalled();

    // Проверяем, что ссылка добавлялась и удалялась
    expect(appendSpy).toHaveBeenCalled();
    expect(removeSpy).toHaveBeenCalled();

    // Проверяем, что клик по ссылке был вызван
    expect(
      HTMLAnchorElement.prototype.click
    ).toHaveBeenCalled();

    // Проверяем очистку ресурсов
    expect(URL.revokeObjectURL).toHaveBeenCalledWith(
      "blob:test-url"
    );
  });

  it("does nothing when rows are empty", () => {
    exportToCSV("empty", []);

    expect(URL.createObjectURL).not.toHaveBeenCalled();
  });
});