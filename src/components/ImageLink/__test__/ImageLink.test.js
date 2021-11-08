import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import ImageLink from "../ImageLink";

const mockInputChangeFn = jest.fn();
const mockBtnClickFn = jest.fn();

test("change in input value when entered", () => {
  render(
    <ImageLink
      onInputChange={mockInputChangeFn}
      onButtonSubmit={mockBtnClickFn}
      inputValue="https://media.gettyimages.com/photos/confident-young-man-wearing-purple-tshirt-picture-id1092658864?s=612x612"
    />
  );
  const inputElement = screen.getByPlaceholderText(/enter an url/i);
  fireEvent.change(inputElement, {
    target: {
      value:
        "https://media.gettyimages.com/photos/confident-young-man-wearing-purple-tshirt-picture-id1092658864?s=612x612",
    },
  });
  expect(inputElement.value).toBe(
    "https://media.gettyimages.com/photos/confident-young-man-wearing-purple-tshirt-picture-id1092658864?s=612x612"
  );
});
