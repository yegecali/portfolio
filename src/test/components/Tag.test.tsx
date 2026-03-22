import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Tag from "@/components/general/Tag";

describe("Tag", () => {
  it("renders the label", () => {
    render(<Tag label="React" />);
    expect(screen.getByText("React")).toBeInTheDocument();
  });

  it("renders without a label", () => {
    const { container } = render(<Tag />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("applies additional className", () => {
    const { container } = render(<Tag label="Test" className="extra-class" />);
    expect(container.firstChild).toHaveClass("extra-class");
  });

  it("passes HTML attributes to the div", () => {
    render(<Tag label="Test" data-testid="tag-component" />);
    expect(screen.getByTestId("tag-component")).toBeInTheDocument();
  });

  it("has displayName set", () => {
    expect(Tag.displayName).toBe("Tag");
  });
});
