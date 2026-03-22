import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Reveal, { type RevealAnimation } from "@/components/general/Reveal";

// Framer Motion is run in jsdom — whileInView won't fire without a real
// IntersectionObserver but the component should still render.

describe("Reveal", () => {
  it("renders children", () => {
    render(
      <Reveal>
        <span>Content</span>
      </Reveal>
    );
    expect(screen.getByText("Content")).toBeInTheDocument();
  });

  it("renders as a div by default", () => {
    const { container } = render(<Reveal>child</Reveal>);
    expect(container.firstChild?.nodeName).toBe("DIV");
  });

  it("renders as a different tag via the as prop", () => {
    const { container } = render(<Reveal as="section">child</Reveal>);
    expect(container.firstChild?.nodeName).toBe("SECTION");
  });

  it("renders as li when as='li'", () => {
    const { container } = render(
      <ul>
        <Reveal as="li">item</Reveal>
      </ul>
    );
    expect(container.querySelector("li")).toBeInTheDocument();
  });

  it("applies className to the wrapper element", () => {
    const { container } = render(
      <Reveal className="my-class">child</Reveal>
    );
    expect(container.firstChild).toHaveClass("my-class");
  });

  const animations: RevealAnimation[] = [
    "fade-up", "fade-down", "fade-left", "fade-right",
    "zoom-in", "zoom-out", "flip-left", "flip-right", "flip-up", "flip-down",
  ];

  animations.forEach((anim) => {
    it(`renders without error with animation="${anim}"`, () => {
      expect(() =>
        render(<Reveal animation={anim}>content</Reveal>)
      ).not.toThrow();
    });
  });
});
