import React from "react";
import { render, screen } from "@testing-library/react";
import UserPage from "../UserPage";

test("renders user page", () => {
    render(<UserPage />);
    const linkElement = screen.getByText(/learn react/i);
    expect(linkElement).toBeInTheDocument();
});
