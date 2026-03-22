import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import StatusBadge from "@/components/general/StatusBadge";

describe("StatusBadge", () => {
  it("renders the label text", () => {
    render(<StatusBadge label="Disponible para trabajar" />);
    expect(screen.getByText("Disponible para trabajar")).toBeInTheDocument();
  });

  it("applies default md dot size classes", () => {
    const { container } = render(<StatusBadge label="Test" />);
    const dots = container.querySelectorAll(".h-2\\.5.w-2\\.5");
    expect(dots.length).toBeGreaterThanOrEqual(2); // ping + solid dot
  });

  it("applies sm dot size classes when size='sm'", () => {
    const { container } = render(<StatusBadge label="Test" size="sm" />);
    const dots = container.querySelectorAll(".h-2.w-2");
    expect(dots.length).toBeGreaterThanOrEqual(2);
  });

  it("merges additional className", () => {
    const { container } = render(
      <StatusBadge label="Test" className="my-custom-class" />
    );
    expect(container.firstChild).toHaveClass("my-custom-class");
  });

  it("renders the ping animation span", () => {
    const { container } = render(<StatusBadge label="Test" />);
    const ping = container.querySelector(".animate-ping");
    expect(ping).toBeInTheDocument();
  });
});
