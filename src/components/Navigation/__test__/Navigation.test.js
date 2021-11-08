import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Navigation from "../Navigation";

const mockRouteChangeFn = jest.fn();

test("should display sign-in link", () => {
  render(<Navigation onRouteChange={mockRouteChangeFn} currentPage="signin" />);
  const navigationElement = screen.getByRole("navigation");
  expect(navigationElement).toContainHTML("a", { name: /sign in/i });
});

test("should display register link", () => {
  render(
    <Navigation onRouteChange={mockRouteChangeFn} currentPage="register" />
  );
  const navigationElement = screen.getByRole("navigation");
  expect(navigationElement).toContainHTML("a", { name: /register/i });
});

test("should display user-image on login", () => {
  render(<Navigation onRouteChange={mockRouteChangeFn} currentPage="home" />);
  const navigationElement = screen.getByRole("navigation");
  expect(navigationElement).toContainHTML("img");
});

test("should display sign-out link on login", () => {
  render(<Navigation onRouteChange={mockRouteChangeFn} currentPage="home" />);
  const navigationElement = screen.getByRole("navigation");
  expect(navigationElement).toContainHTML("a", { name: /sign out/i });
});
