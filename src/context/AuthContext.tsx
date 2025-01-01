import useMessagePopup from '@/hooks/useMessagePopup';
import fetchHelper from '@/utils/fetchHelper';
import { useRouter } from 'next/router';
import { ComponentPropsWithoutRef, createContext, memo, useContext, useEffect, useMemo, useState } from 'react';
import { useCookies } from 'react-cookie';

export type AuthContextType = {
  token?: string;
  logout: () => Promise<void>;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType>({
  token: undefined,
  loading: false,
  logout: async () => {},
});

export const useAuthContext = () => useContext(AuthContext);
const commonOptions = { path: '/' };

export default memo(function AuthProvider({ children }: ComponentPropsWithoutRef<'main'>) {
  const [cookies, _, removeCookie] = useCookies();
  const [token, setToken] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const { onMessage } = useMessagePopup();
  const { pathname, replace } = useRouter();

  async function logout() {
    if (!token) return;
    setLoading(true);
    try {
      const res = await fetchHelper(
        { path: '/auth/logout' },
        {
          method: 'POST',
          headers: {
            Authorization: token,
          },
        }
      );
      if (res instanceof Error) throw res;
      setToken(undefined);
      removeCookie('token', commonOptions);
      removeCookie('role', commonOptions);
      setLoading(false);
      onMessage({
        title: 'Logged out',
        description: 'You have been successfully logged out',
        variant: 'success',
      });
      if (pathname.includes('app')) replace('/');
    } catch (error) {
      setLoading(false);
      return onMessage({ title: 'Failed to logout', description: (error as Error).message, variant: 'destructive' });
    }
  }

  const _token = cookies?.['token'];

  useEffect(() => {
    setToken(_token);
  }, [_token]);

  return <AuthContext.Provider value={{ token, logout, loading }}>{children}</AuthContext.Provider>;
});
