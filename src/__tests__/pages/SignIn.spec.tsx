import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';
import SignIn from '../../pages/SignIn';


const mockedHistoryPush = jest.fn();
const mokedSignIn = jest.fn();
const mokedaddToast = jest.fn();

jest.mock('../../hooks/Toast', () => {
  return {
    useToast: () => ({
      addToast: mokedaddToast,
    }),
  };
});

jest.mock('react-router-dom', () => {
  return {
    useHistory: () => ({
      push: mockedHistoryPush,
    }),
    Link: ({ children }: { children: React.ReactNode }) => children,
  };
});

jest.mock('../../hooks/auth', () => {
  return {
    useAuth: () => ({
      SignIn: mokedSignIn,
    }),
  };
});

describe('SignIn page', () => {

  beforeEach(() => {
    mockedHistoryPush.mockClear();
  });
  it('should be able to sign in', async  () => {
    const { getByPlaceholderText, getByText } = render(<SignIn />);

    const emailField = getByPlaceholderText('E-mail');
    const passwordField = getByPlaceholderText('Senha');
    const buttonElement = getByText('Entrar');

    fireEvent.change(emailField, { target: { valew: 'joao@hotmail.com' } });
    fireEvent.change(passwordField, { target: { valew: '123456' } });
    fireEvent.click(buttonElement);

    await wait(() => {
      expect(mockedHistoryPush).toHaveBeenCalledWith('/dashboard');
    });
  });

  it('should not  be able to sign in with invalid credentials', async  () => {
    const { getByPlaceholderText, getByText } = render(<SignIn />);

    const emailField = getByPlaceholderText('E-mail');
    const passwordField = getByPlaceholderText('Senha');
    const buttonElement = getByText('Entrar');

    fireEvent.change(emailField, { target: { valew: 'not-valid-email' } });
    fireEvent.change(passwordField, { target: { valew: '123456' } });
    fireEvent.click(buttonElement);

    await wait(() => {
      expect(mockedHistoryPush).not.toHaveBeenCalled();
    });
  });

  it('should display an error if login fails', async () => {
    mokedSignIn.mockImplementation(() => {
      throw new Error();
    });



    const { getByPlaceholderText, getByText } = render(<SignIn />);

    const emailField = getByPlaceholderText('E-mail');
    const passwordField = getByPlaceholderText('Senha');
    const buttonElement = getByText('Entrar');

    fireEvent.change(emailField, { target: { valew: 'joao3klb@htmail.com' } });
    fireEvent.change(passwordField, { target: { valew: '123456' } });
    fireEvent.click(buttonElement);

    await wait(() => {
      expect(mokedaddToast).toHaveBeenCalledWith(expect.objectContaining({
        type: 'error',
      }),
      );
    });
  });

});
