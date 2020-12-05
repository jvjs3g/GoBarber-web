import React from 'react';

import Input from '../../components/Input';
import { render, fireEvent, wait } from '@testing-library/react';
import { colors } from '../../styles/variables';

jest.mock('@unform/core', () => {
  return {
    useField(name: string) {
      return {
        fieldName: name,
        defaultValue: '',
        error: '',
        registerField: jest.fn(),
      }
    }
  };
});

describe('Input component', () => {
  it('should be able to render input component', () => {
    const { getByPlaceholderText } = render(
      <Input name="email" placeholder="E-mail" />
    );

    const inputElement = getByPlaceholderText('E-mail');

    expect(inputElement).toBeTruthy();
  });

  it('should be able to highlight when focused', async () => {
    const { getByPlaceholderText, getByTestId } = render(
      <Input name="email" placeholder="E-mail" />
    );

    const inputElement = getByPlaceholderText('E-mail');
    const inputContainer = getByTestId('input-container');

    fireEvent.focus(inputElement);
    await wait(() => {
      expect(inputContainer).toHaveStyle(`border-color: ${colors.primary}`);
      expect(inputContainer).toHaveStyle(`color: ${colors.primary}`);
    });

    fireEvent.blur(inputElement);
    await wait(() => {
      expect(inputContainer).not.toHaveStyle(`border-color: ${colors.primary}`);
      expect(inputContainer).not.toHaveStyle(`color: ${colors.primary}`);
    });
  });

  it('should be able to highlight when input is filled', async () => {
    const { getByPlaceholderText, getByTestId } = render(
      <Input name="email" placeholder="E-mail" />
    );

    const inputElement = getByPlaceholderText('E-mail');
    const inputContainer = getByTestId('input-container');

    fireEvent.change(inputElement,
      { target: { value: 'johndoe@example.com.br' }}
    );
    fireEvent.blur(inputElement);

    await wait(() => {
      expect(inputContainer).toHaveStyle(`color: ${colors.primary}`);
    });
  });
});
