import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("sonner", () => {
  const toast: any = vi.fn();

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
    expect((toast as any).success).toHaveBeenCalledWith(
      "Operation completed"
    );
  });

  it("calls toast.error()", () => {
    notify.error("Something went wrong");
    expect((toast as any).error).toHaveBeenCalledWith(
      "Something went wrong"
    );
  });

  it("calls toast() for info messages", () => {
    notify.info("Information message");
    expect(toast).toHaveBeenCalledWith(
      "Information message"
    );
  });

  it("calls toast.warning()", () => {
    notify.warning("Warning message");
    expect((toast as any).warning).toHaveBeenCalledWith(
      "Warning message"
    );
  });
});