import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, beforeEach } from "vitest";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import { store } from "../redux/store";
import { Home } from "../pages/HomePage";

// Mock IntersectionObserver for infinite scroll
beforeEach(() => {
  //   Mock IntersectionObserver
  globalThis.IntersectionObserver = class {
    callback: IntersectionObserverCallback;

    constructor(callback: IntersectionObserverCallback) {
      this.callback = callback;
    }

    observe() {
      this.callback(
        [
          { isIntersecting: true, target: document.createElement("div") },
        ] as any,
        this as any
      );
    }

    unobserve() {}
    disconnect() {}
    takeRecords() {
      return [];
    }
  } as any;
});

const setup = () =>
  render(
    <Provider store={store}>
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    </Provider>
  );

describe("HomePage", () => {
  it("renders the header and search box", () => {
    setup();
    expect(screen.getByText("CLO-SET")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Find the items you're looking for")
    ).toBeInTheDocument();
  });

  it("types into the search input", async () => {
    setup();
    const input = screen.getByPlaceholderText(
      "Find the items you're looking for"
    );
    fireEvent.change(input, { target: { value: "shirt" } });
    await waitFor(() => expect(input).toHaveValue("shirt"));
  });

  it("toggles Paid filter checkbox", async () => {
    setup();
    const paidCheckbox = await screen.findByLabelText("Paid");
    fireEvent.click(paidCheckbox);
    expect(paidCheckbox).toBeChecked();
  });

  it("shows slider only when Paid filter is selected", async () => {
    setup();
    const slider = screen.queryByRole("slider");
    expect(slider).not.toBeInTheDocument();

    const paidCheckbox = await screen.findByLabelText("Paid");
    fireEvent.click(paidCheckbox);

    await waitFor(() => {
      expect(screen.getAllByRole("slider").length).toBe(2);
    });
  });
});
