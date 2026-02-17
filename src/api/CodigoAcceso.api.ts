import { apiClient } from "./client";

export type ExchangeRequest = {
  accessCode: string;
  audience: string;
};

export type ExchangeResponse = {
  id: number;
  email: string;
  username: string;
  nombre: string;
  familyName: string;
  comercioId: string | null;
  pictureUrl: string;
  token: string;
};

export const exchangeBridgeCode = async (payload: ExchangeRequest) => {
  const { data } = await apiClient.post<ExchangeResponse>("/auth/bridge/exchange", payload);
  return data;
};
