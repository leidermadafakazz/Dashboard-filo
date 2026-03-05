import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type PropsWithChildren,
} from "react";
import type { ExchangeResponse } from "../api/CodigoAcceso.api";
import {
  clearSession as clearStoredSession,
  getAuthUser,
  getCommerceId,
  getToken,
  setCommerceId as setStoredCommerceId,
  setSession as setStoredSession,
} from "../Auth/auth";

type AuthContextValue = {
  user: ExchangeResponse | null;
  token: string | null;
  isAuthenticated: boolean;
  hasCommerce: boolean;
  setSession: (session: ExchangeResponse) => void;
  setCommerceId: (comercioId: string | null | undefined) => void;
  clearSession: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<ExchangeResponse | null>(() => getAuthUser());

  const setSession = useCallback((session: ExchangeResponse) => {
    setStoredSession(session);
    setUser(session);
  }, []);

  const setCommerceId = useCallback((comercioId: string | null | undefined) => {
    setStoredCommerceId(comercioId);
    setUser((current) => {
      if (!current) return current;

      return {
        ...current,
        comercioId: comercioId ?? null,
        comercio: comercioId ? current.comercio ?? null : null,
      };
    });
  }, []);

  const clearSession = useCallback(() => {
    clearStoredSession();
    setUser(null);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => {
      const token = user?.token ?? getToken();
      const commerceId = user?.comercioId ?? getCommerceId();

      return {
        user,
        token,
        isAuthenticated: Boolean(token),
        hasCommerce: Boolean(commerceId),
        setSession,
        setCommerceId,
        clearSession,
      };
    },
    [clearSession, setCommerceId, setSession, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
};
