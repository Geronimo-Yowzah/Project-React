import { fireEvent, render, screen } from '@testing-library/react';
import Bisection from "./RootEquation/Bisection";
import FalsePosition from "./RootEquation/FalsePosition";

test('renders Bisection Methods', () => {
  render(<Bisection />);
  const linkElement = screen.getByText(/Bisection Methods/i);
  expect(linkElement).toBeInTheDocument();
});


test('Input Function, XL ,XR is Default' , () =>{
  render(<Bisection />);

  const calButton = screen.getByText(/Calculate/);
  fireEvent.click(calButton);

  const defaultanswer = screen.getByText(/0.000000/);
  expect(defaultanswer).toBeInTheDocument();
});


test('Bisection Input Function, XL ,XR is Not empty', ()=>{
  render(<Bisection />);

  const inputFx = screen.getByTestId('equation');
  fireEvent.change(inputFx,{target: {value: '(x^4)-13'}});
  expect(inputFx.value).toBe('(x^4)-13');

  const inputXl = screen.getByTestId('XL');
  fireEvent.change(inputXl,{target: {value: '0'}});
  expect(inputXl.value).toBe('0');

  const inputXr = screen.getByTestId('XR');
  fireEvent.change(inputXr,{target: {value: '5'}});
  expect(inputXr.value).toBe('5');

  const calButton = screen.getByText(/Calculate/);
  fireEvent.click(calButton);

  const defaultanswer = screen.getByText(/Answer = 1.89/);
  expect(defaultanswer).toBeInTheDocument();
});

test('FalsePosition Input Function, XL ,XR is Not empty', ()=>{
  render(<FalsePosition />);

  const inputFx = screen.getByTestId('equation');
  fireEvent.change(inputFx,{target: {value: '(x^4)-13'}});
  expect(inputFx.value).toBe('(x^4)-13');

  const inputXl = screen.getByTestId('XL');
  fireEvent.change(inputXl,{target: {value: '0'}});
  expect(inputXl.value).toBe('0');

  const inputXr = screen.getByTestId('XR');
  fireEvent.change(inputXr,{target: {value: '5'}});
  expect(inputXr.value).toBe('5');

  const calButton = screen.getByText(/Calculate/);
  fireEvent.click(calButton);

  const defaultanswer = screen.getByText(/Answer = 1.89/);
  expect(defaultanswer).toBeInTheDocument();
});


