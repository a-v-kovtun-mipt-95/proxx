import React from 'react';
import { act, render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import { unmountComponentAtNode } from 'react-dom';
import {screen} from '@testing-library/dom'

let container: any = null;
beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("renders application", () => {
  act(() => {
    render(<Provider store={store}>
      <App />
    </Provider>, container);
  });

  const cell_0 = screen.getByTestId('0');
  expect(cell_0).not.toBeNull();

  const cell_1 = screen.getByTestId('1');
  expect(cell_1).not.toBeNull();

  const cell_2 = screen.getByTestId('2');
  expect(cell_2).not.toBeNull();

  const cell_8 = screen.getByTestId('8');
  expect(cell_8).not.toBeNull();

  const cell_9 = screen.getByTestId('9');
  expect(cell_9).not.toBeNull();

  const cell_10 = screen.getByTestId('10');
  expect(cell_10).not.toBeNull();

  const cell_16 = screen.getByTestId('16');
  expect(cell_16).not.toBeNull();

  const cell_17 = screen.getByTestId('17');
  expect(cell_17).not.toBeNull();

  const cell_18 = screen.getByTestId('18');
  expect(cell_18).not.toBeNull();

  act(() => {
    cell_9.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    cell_0.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    cell_1.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    cell_2.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    cell_8.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    cell_10.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    cell_16.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    cell_17.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    cell_18.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });

  expect(cell_9.innerHTML).not.toBe("");
  expect(cell_0.innerHTML).not.toBe("");
  expect(cell_1.innerHTML).not.toBe("");
  expect(cell_2.innerHTML).not.toBe("");
  expect(cell_8.innerHTML).not.toBe("");
  expect(cell_10.innerHTML).not.toBe("");
  expect(cell_16.innerHTML).not.toBe("");
  expect(cell_17.innerHTML).not.toBe("");
  expect(cell_18.innerHTML).not.toBe("");
});