export const getToken = () => {
  return localStorage.getItem("token");
};

export const setToken = (token: string) => {
  localStorage.setItem("token", token);
};

export const getUserId = () => {
  return localStorage.getItem("userId");
};

export const setUserId = (userId: string) => {
  localStorage.setItem("userId", userId);
};

export const getCommerceId = () => {
  return localStorage.getItem("comercioId");
};

export const setCommerceId = (comercioId: string | null | undefined) => {
  if (comercioId && comercioId.trim().length > 0) {
    localStorage.setItem("comercioId", comercioId);
    return;
  }

  localStorage.removeItem("comercioId");
};

export const removeToken = () => {
  localStorage.removeItem("token");
};

export const clearSession = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
  localStorage.removeItem("comercioId");
};

export const isAuthenticated = (): boolean => {
  return !!getToken();
};

export const getUserData = () => {
  return getCommerceId();
};

export const hasCommerce = (): boolean => {
  return !!getCommerceId();
};
