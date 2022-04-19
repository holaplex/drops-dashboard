/**
 * @jest-environment jsdom
 */

import React from 'react';
// import { render, render as rtlRender } from '@testing-library/react';
import { render, fireEvent, screen, waitFor } from './test-utils';
import { BrowserRouter } from 'react-router-dom';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import reducer, { todoAdded } from '../Test/todosSlice';
import Dashboard from './Dashboard';
import Login from './Login';
import '@testing-library/jest-dom';
import { getByTestId } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

const server = setupServer(
  rest.get('/me', (req, res, ctx) => {
    return res(ctx.json({ email: 'email', username: 'username' }));
  }),
  rest.post('/oauth/token', (req, res, ctx) => {
    return res(
      ctx.json({
        status_code: 401,
        message: 'Invalid email or password.',
        result: [],
      })
    );
  })
);
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

it('shold render Login screen', () => {
  render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  );

  expect(screen.getByText('Sign in to your account')).toBeInTheDocument();
});
it('shold perform Login', async () => {
  // arrange
  const onSubmitMock = jest.fn();
  const email = 'test@test.com';
  const password = 'test_password';
  render(
    <BrowserRouter>
      <Login onSubmit={onSubmitMock} />
    </BrowserRouter>
  );
  expect(screen.getByText('Sign in to your account')).toBeInTheDocument();

  // act

  const email_input = screen.getByTestId('input-email');
  const password_input = screen.getByTestId('input-password');
  await act(async () => {
    fireEvent.change(email_input, {
      target: { value: email },
    });

    fireEvent.change(password_input, {
      target: { value: password },
    });

    fireEvent.click(screen.getByText('Submit'));
  });

  // await waitFor(() => {
  //   expect(screen.getByText('Invalid email or password.')).toBeInTheDocument();
  // });
});

// test('should return the initial state', () => {
//   expect(reducer(undefined, {})).toEqual([
//     {
//       text: 'Use Redux',
//       completed: false,
//       id: 0,
//     },
//   ]);
// });

// test('should handle a todo being added to an empty list', () => {
//   const previousState = [];
//   expect(reducer(previousState, todoAdded('Run the tests'))).toEqual([
//     {
//       text: 'Run the tests',
//       completed: false,
//       id: 0,
//     },
//   ]);
// });

// test('should handle a todo being added to an existing list', () => {
//   const previousState = [
//     {
//       text: 'Run the tests',
//       completed: true,
//       id: 0,
//     },
//   ];
//   expect(reducer(previousState, todoAdded('Use Redux'))).toEqual([
//     {
//       text: 'Run the tests',
//       completed: true,
//       id: 0,
//     },
//     {
//       text: 'Use Redux',
//       completed: false,
//       id: 1,
//     },
//   ]);
// });
