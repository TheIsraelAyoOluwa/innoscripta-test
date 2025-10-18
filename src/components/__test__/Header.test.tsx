import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Header } from "../Header";
import { describe, expect, it, vi } from "vitest";
import "@testing-library/jest-dom";

// Mock the Button component from shadcn/ui
vi.mock("@/components/ui/button", () => ({
  Button: ({ onClick, children }: { onClick?: () => void; children: React.ReactNode }) => (
    <button onClick={onClick}>{children}</button>
  ),
}));

describe("Header Component", () => {
  it("renders the logo", () => {
    render(<Header />);
    const logo = screen.getByAltText("Logo") as HTMLImageElement;
    expect(logo).toBeInTheDocument();
    expect(logo.src).toBe("https://www.innoscripta.com/innoscripta-logo-blue.svg");
  });

  it("does not render the Refresh button when onRefresh is not provided", () => {
    render(<Header />);
    const button = screen.queryByText(/refresh/i);
    expect(button).not.toBeInTheDocument();
  });

  it("renders the Refresh button when onRefresh is provided", () => {
    const mockRefresh = vi.fn();
    render(<Header onRefresh={mockRefresh} />);
    const button = screen.getByText(/refresh/i);
    expect(button).toBeInTheDocument();
  });

  it("calls onRefresh when the Refresh button is clicked", () => {
    const mockRefresh = vi.fn();
    render(<Header onRefresh={mockRefresh} />);
    const button = screen.getByText(/refresh/i);
    fireEvent.click(button);
    expect(mockRefresh).toHaveBeenCalledTimes(1);
  });
});
