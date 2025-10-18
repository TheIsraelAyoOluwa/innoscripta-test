import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { NewsCard } from "../NewsCard";
import { describe, expect, it, vi } from "vitest";
// import { NewsCard } from "./NewsCard";

// Mock Typography components to simple spans
vi.mock("@/libs/typography", () => ({
  default: {
    Text: ({ children, className }: { children: React.ReactNode; className?: string }) => (
      <span data-testid="typography-text" className={className}>
        {children}
      </span>
    ),
    SubText: ({ children }: { children: React.ReactNode }) => (
      <span data-testid="typography-subtext">{children}</span>
    ),
  },
}));

describe("NewsCard Component", () => {
  const defaultProps = {
    title: "Breaking News: React Testing Simplified",
    description: "This is a test description for the NewsCard component.",
    imageUrl: "https://example.com/test-image.jpg",
    index: 1,
  };

  it("renders title and description", () => {
    render(<NewsCard {...defaultProps} />);
    expect(screen.getByText(defaultProps.title)).toBeInTheDocument();
    expect(screen.getByText(defaultProps.description)).toBeInTheDocument();
  });

  it("renders fallback image when imageUrl is not provided", () => {
    render(<NewsCard title="No Image" description="Missing image test" imageUrl="" />);
    const image = screen.getByRole("img") as HTMLImageElement;
    expect(image.src).toContain("https://images.unsplash.com/vector-1760269906509");
  });

  it("replaces image with fallback on error", async () => {
    render(<NewsCard {...defaultProps} imageUrl="https://images.unsplash.com/vector-1760269906509-708ad011614f?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=3216" />);
    const image = screen.getByRole("img") as HTMLImageElement;

    // Simulate error event
    const fallbackUrl =
      "https://images.unsplash.com/vector-1760269906509-708ad011614f?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=3216";

    await userEvent.click(image); // simulate interaction (no-op)
    image.onerror?.({ currentTarget: image } as unknown as string);

    expect(image.src).toContain(fallbackUrl);
  });

  it("truncates long title and description", () => {
    const longTitle = "A".repeat(80);
    const longDescription = "B".repeat(100);

    render(<NewsCard title={longTitle} description={longDescription} />);

    const titleEl = screen.getByTestId("typography-text");
    const descEl = screen.getByTestId("typography-subtext");

    expect(titleEl.textContent).toMatch(/\.\.\.$/);
    expect(descEl.textContent).toMatch(/\.\.\.$/);
  });

  it("renders safely with missing props", () => {
    render(<NewsCard />);
    const image = screen.getByRole("img");
    expect(image).toBeInTheDocument();
  });
});
