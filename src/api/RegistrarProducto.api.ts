import { apiClient } from "./client";

export type RegistrarProductoRequest = {
  categoria: string;
  nombre: string;
  descripcion: string;
  precio: number;
  imagen: string;
};

export type RegistrarProductoResponse = {
  id: number;
};

export const registrarProducto = async (dto: RegistrarProductoRequest) => {
  const { data } = await apiClient.post<RegistrarProductoResponse>("/RegistrarProducto", dto);
  return data;
};
