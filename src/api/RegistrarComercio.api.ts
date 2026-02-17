import { apiClient } from "./client";

export type ComercioRequest = {
  nombre: string;
  descripcion: string;
  categorias: string[];
  infoComercio: {
    direccion: string;
    ciudad: string;
    telefono: string;
  };
  imgBannerUrl: string;
};

export type ComercioResponse = {
  id: number;
};

export const registrarComercio = async (dto: ComercioRequest) => {
  const { data } = await apiClient.post<ComercioResponse>("/RegistrarComercio", dto);
  return data;
};
