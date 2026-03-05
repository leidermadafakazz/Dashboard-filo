import type { ExchangeResponse } from "../api/CodigoAcceso.api";

const TOKEN_KEY = "token";
const USER_ID_KEY = "userId";
const COMMERCE_ID_KEY = "comercioId";
const AUTH_USER_KEY = "authUser";

const isObject = (value: unknown): value is Record<string, unknown> => {
  return typeof value === "object" && value !== null;
};

const isExchangeResponse = (value: unknown): value is ExchangeResponse => {
  if (!isObject(value)) return false;

  return (
    typeof value.id === "number" &&
    typeof value.email === "string" &&
    typeof value.username === "string" &&
    typeof value.nombre === "string" &&
    typeof value.familyName === "string" &&
    (typeof value.comercioId === "string" || value.comercioId === null) &&
    typeof value.pictureUrl === "string" &&
    typeof value.token === "string"
  );
};

export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

export const setToken = (token: string) => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const getUserId = () => {
  return localStorage.getItem(USER_ID_KEY);
};

export const setUserId = (userId: string) => {
  localStorage.setItem(USER_ID_KEY, userId);
};

export const getCommerceId = () => {
  return localStorage.getItem(COMMERCE_ID_KEY);
};

export const getAuthUser = (): ExchangeResponse | null => {
  const raw = localStorage.getItem(AUTH_USER_KEY);

  if (!raw) return null;

  try {
    const parsed: unknown = JSON.parse(raw);
    return isExchangeResponse(parsed) ? parsed : null;
  } catch {
    return null;
  }
};

const saveAuthUser = (user: ExchangeResponse) => {
  localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
};

export const setCommerceId = (comercioId: string | null | undefined) => {
  if (comercioId) {
    localStorage.setItem(COMMERCE_ID_KEY, comercioId);
  } else {
    localStorage.removeItem(COMMERCE_ID_KEY);
  }

  const currentUser = getAuthUser();
  if (!currentUser) return;

  saveAuthUser({
    ...currentUser,
    comercioId: comercioId ?? null,
    comercio: comercioId ? currentUser.comercio ?? null : null,
  });
};

export const setSession = (session: ExchangeResponse) => {
  localStorage.setItem(TOKEN_KEY, session.token);
  localStorage.setItem(USER_ID_KEY, String(session.id));

  if (session.comercioId) {
    localStorage.setItem(COMMERCE_ID_KEY, session.comercioId);
  } else {
    localStorage.removeItem(COMMERCE_ID_KEY);
  }

  saveAuthUser(session);
};

export const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};

export const clearSession = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_ID_KEY);
  localStorage.removeItem(COMMERCE_ID_KEY);
  localStorage.removeItem(AUTH_USER_KEY);
};

export const isAuthenticated = (): boolean => {
  return !!getToken();
};

export const getUserData = () => {
  return getAuthUser();
};

export const hasCommerce = (): boolean => {
  return !!getCommerceId();
};
