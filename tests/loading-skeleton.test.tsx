import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import Skeleton from "@/components/ui/Skeleton";

describe("Skeleton Component", () => {
  it("renders successfully", () => {
    const { container } = render(<Skeleton />);

    expect(container.firstChild).toBeInTheDocument();
  });

  it("applies animate-pulse class", () => {
    const { container } = render(<Skeleton />);

    const element = container.firstChild as HTMLElement;

    expect(element.className).toContain("animate-pulse");
  });

  it("accepts custom className", () => {
    const { container } = render(
      <Skeleton className="h-10 w-32 rounded-xl" />
    );

    const element = container.firstChild as HTMLElement;

    expect(element.className).toContain("h-10");
    expect(element.className).toContain("w-32");
    expect(element.className).toContain("rounded-xl");
  });
});