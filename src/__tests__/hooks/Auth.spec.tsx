import { renderHook } from "@testing-library/react-hooks";
import { AuthProvider, useAuth } from "../../hooks/Auth";

describe('Auth hooks', () => {
  it('should be able to sign in', () => {
    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    result.current.signIn({
      email: 'joao3klb@hotmail.com',
      password: '123456',
    });

    expect(result.current.user.email).toEqual('joao3klb@hotmail.com');
  });
});
