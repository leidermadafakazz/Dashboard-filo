import { apiClient } from "./client";

export type ExchangeRequest = {
  codigo: string;
};

export type Comercio = {
  comercioId: string;
  nombre: string;
  descripcion: string;
  abierto: boolean;
  calificacion: number;
  categorias: string[];
  imgBannerUrl: string;
  direccion: string;
  ciudad: string;
  telefono: string;
};

export type ExchangeResponse = {
  id: number;
  email: string;
  username: string;
  nombre: string;
  familyName: string;
  comercioId: string | null;
  comercio?: Comercio | null;
  pictureUrl: string;
  token: string;
};

export const exchangeBridgeCode = async (payload: ExchangeRequest) => {
  const { data } = await apiClient.post<ExchangeResponse>("/Auths/canjear-codigo-acceso", payload);
  return data;
};
