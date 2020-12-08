import { renderHook, act } from "@testing-library/react-hooks";
import MockAdapter from 'axios-mock-adapter';
import { useAuth, AuthProvider } from "../../hooks/auth";
import api from '../../services/api';

const apiMock = new MockAdapter(api);
const apiResponse = {
  user: {
    id: 'user-123',
    name: 'John Doe',
    email: 'johndoe@example.com',
  },
  token: 'token-user-123',
}

describe('Auth hook', () => {
  it('should be able to sign in', async () => {
    apiMock.onPost('sessions').reply(200, apiResponse);

    const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');
    const { result, waitForNextUpdate } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    })

    result.current.signIn({
      email: 'johndoe@example.com',
      password: '123456',
    });

    await waitForNextUpdate();

    expect(setItemSpy).toHaveBeenCalledWith(
      '@GoBarber:Token', apiResponse.token,
    );

    expect(setItemSpy).toHaveBeenCalledWith(
      '@GoBarber:User', JSON.stringify(apiResponse.user),
    );

    expect(result.current.user.email).toEqual('johndoe@example.com');
  });

  it('should be able to restore data from storage', () => {
    jest.spyOn(Storage.prototype, 'getItem').mockImplementation((key) => {
      switch(key) {
        case '@GoBarber:Token':
          return apiResponse.token;
        case '@GoBarber:User':
          return JSON.stringify(apiResponse.user);
        default:
          return '';
      }
    });

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    expect(result.current.user).toEqual(apiResponse.user);
  });

  it('should be able to sign out', () => {
    jest.spyOn(Storage.prototype, 'getItem').mockImplementation((key) => {
      switch(key) {
        case '@GoBarber:Token':
          return apiResponse.token;
        case '@GoBarber:User':
          return JSON.stringify(apiResponse.user);
        default:
          return '';
      }
    });

    const removeItemSpy = jest.spyOn(Storage.prototype, 'removeItem');
    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    act(() => {
      result.current.signOut();
    });

    expect(removeItemSpy).toHaveBeenCalledWith('@GoBarber:Token');
    expect(removeItemSpy).toHaveBeenCalledWith('@GoBarber:User');
    expect(result.current.user).toBeUndefined();
  });

  it('should be able to update user', () => {
    jest.spyOn(Storage.prototype, 'getItem').mockImplementation((key) => {
      switch(key) {
        case '@GoBarber:Token':
          return apiResponse.token;
        case '@GoBarber:User':
          return JSON.stringify(apiResponse.user);
        default:
          return '';
      }
    });

    const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');
    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    const { id, name, email } = apiResponse.user;

    const user = {
      id,
      name,
      email,
      avatar_url: 'user-123-avatar.jpg',
    }

    act(() => {
      result.current.updateUser(user)
    });

    expect(setItemSpy).toHaveBeenCalledWith('@GoBarber:User',
      JSON.stringify(user)
    );
    expect(result.current.user).toEqual(user);

  });
});
