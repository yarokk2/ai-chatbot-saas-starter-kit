import { describe, it, expect, vi, beforeEach } from "vitest";

// Мокаем sonner.
// Важно: всё создаётся ВНУТРИ vi.mock(), чтобы избежать hoisting issues.
vi.mock("sonner", () => {
  // Создаём вызываемую функцию
  const toast = vi.fn();

  // Добавляем методы к функции
  toast.success = vi.fn();
  toast.error = vi.fn();
  toast.info = vi.fn();
  toast.warning = vi.fn();

  return { toast };
});

import { toast } from "sonner";
import { notify } from "@/lib/notifications";

describe("Toast Notifications", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("calls toast.success()", () => {
    notify.success("Operation completed");

    expect(toast.success).toHaveBeenCalledWith(
      "Operation completed"
    );
  });

  it("calls toast.error()", () => {
    notify.error("Something went wrong");

    expect(toast.error).toHaveBeenCalledWith(
      "Something went wrong"
    );
  });

  it("calls toast() for info messages", () => {
    notify.info("Information message");

    // В твоём lib/notifications.ts info() вызывает toast(message)
    expect(toast).toHaveBeenCalledWith(
      "Information message"
    );
  });

  it("calls toast.warning()", () => {
    notify.warning("Warning message");

    expect(toast.warning).toHaveBeenCalledWith(
      "Warning message"
    );
  });
});