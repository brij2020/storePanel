import { render, screen, waitFor, act, cleanup, fireEvent } from "@testing-library/react";
import Login from '../src/Screens/Login';
import React from 'react';
import  RenderWithRedux  from './test-utill'
import userEvent from '@testing-library/user-event';
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { loginAction } from '../src/store/Slices/login.slice'
// We use msw to intercept the network request during the test,
// and return the response 'John Smith' after 150ms
// when receiving a get request to the `/api/user` endpoint

jest.mock("axios");
afterEach(cleanup);
test('Testing Login page', async () => {
    RenderWithRedux(<Login />);
    const user = screen.getByTestId('user');
    const pass = screen.getByTestId('pass');
    const submitBtn = screen.getByTestId('submitbtn');
    expect(submitBtn).toBeInTheDocument();
    
    await waitFor(async () => {
       await  userEvent.type(pass,'admin321');
       await userEvent.type(user, 'brijphy@gmail.com');
       await userEvent.click(submitBtn)
    })
   

 
})