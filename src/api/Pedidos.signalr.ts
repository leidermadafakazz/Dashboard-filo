import { HubConnectionBuilder, LogLevel, type HubConnection } from "@microsoft/signalr";
import type { ItemPedido } from "../pages/dashboard/orders-feature/types/order.types";

export type PedidoSignalrPayload = {
  pedidoId: string;
  comercioId: string;
  usuarioId: number;
  notaDirecion?: string | null;
  estado: string;
  mensaje?: string | null;
  cliente: string;
  monto: number;
  metodoPago: string;
  items: ItemPedido[];
};

export type PedidoSignalrHandlers = {
  onPedidoRecibido?: (payload: PedidoSignalrPayload) => void;
  onError?: (error: unknown) => void;
};

const NOTIFICACIONES_HUB_URL = "https://localhost:5000/notificacionesHub";
const COMERCIO_ID =  "gordo-burguer"; //viene de token de inicio
const REINTENTO_INICIAL_MS = 5000;

const obtenerCampo = (objeto: Record<string, unknown>, claves: string[]): unknown => {
  for (const clave of claves) {
    if (clave in objeto) {
      return objeto[clave];
    }
  }

  return undefined;
};

const normalizarNumero = (valor: unknown): number | null => {
  if (typeof valor === "number" && Number.isFinite(valor)) {
    return valor;
  }

  if (typeof valor === "string" && valor.trim()) {
    const numero = Number(valor);
    return Number.isFinite(numero) ? numero : null;
  }

  return null;
};

const normalizarItem = (item: unknown, indice: number): ItemPedido | null => {
  if (!item || typeof item !== "object") {
    return null;
  }

  const itemRecord = item as Record<string, unknown>;
  const id = normalizarNumero(obtenerCampo(itemRecord, ["id", "Id"])) ?? indice + 1;
  const nombreRaw = obtenerCampo(itemRecord, ["nombre", "Nombre"]);
  const detallesRaw = obtenerCampo(itemRecord, ["detalles", "Detalles"]);
  const cantidadRaw = obtenerCampo(itemRecord, ["cantidad", "Cantidad"]);

  if (typeof nombreRaw !== "string" || !nombreRaw.trim()) {
    return null;
  }

  const cantidad = normalizarNumero(cantidadRaw);

  return {
    id,
    nombre: nombreRaw.trim(),
    cantidad: cantidad ?? undefined,
    detalles: typeof detallesRaw === "string" || detallesRaw === null ? detallesRaw : undefined,
  };
};

const normalizarPedidoPayload = (data: unknown): PedidoSignalrPayload | null => {
  if (!data || typeof data !== "object") {
    return null;
  }

  const payload = data as Record<string, unknown>;
  const pedidoIdRaw = obtenerCampo(payload, ["pedidoId", "PedidoId"]);
  const comercioIdRaw = obtenerCampo(payload, ["comercioId", "ComercioId"]);
  const usuarioIdRaw = obtenerCampo(payload, ["usuarioId", "UsuarioId"]);
  const clienteRaw = obtenerCampo(payload, ["cliente", "Cliente"]);
  const montoRaw = obtenerCampo(payload, ["monto", "Monto"]);
  const metodoPagoRaw = obtenerCampo(payload, ["metodoPago", "MetodoPago"]);
  const estadoRaw = obtenerCampo(payload, ["estado", "Estado"]);
  const notaDireccionRaw = obtenerCampo(payload, ["notaDirecion", "NotaDirecion", "notaDireccion", "NotaDireccion"]);
  const mensajeRaw = obtenerCampo(payload, ["mensaje", "Mensaje"]);
  const itemsRaw = obtenerCampo(payload, ["items", "Items"]);

  const usuarioId = normalizarNumero(usuarioIdRaw);
  const monto = normalizarNumero(montoRaw);

  if (
    typeof pedidoIdRaw !== "string" ||
    !pedidoIdRaw.trim() ||
    typeof comercioIdRaw !== "string" ||
    !comercioIdRaw.trim() ||
    usuarioId === null ||
    typeof clienteRaw !== "string" ||
    !clienteRaw.trim() ||
    monto === null ||
    typeof metodoPagoRaw !== "string" ||
    !metodoPagoRaw.trim() ||
    !Array.isArray(itemsRaw)
  ) {
    return null;
  }

  const items = itemsRaw
    .map((item, indice) => normalizarItem(item, indice))
    .filter((item): item is ItemPedido => item !== null);

  return {
    pedidoId: pedidoIdRaw.trim(),
    comercioId: comercioIdRaw.trim(),
    usuarioId,
    notaDirecion:
      typeof notaDireccionRaw === "string" || notaDireccionRaw === null ? notaDireccionRaw : undefined,
    estado: typeof estadoRaw === "string" && estadoRaw.trim() ? estadoRaw.trim() : "creado",
    mensaje: typeof mensajeRaw === "string" || mensajeRaw === null ? mensajeRaw : undefined,
    cliente: clienteRaw.trim(),
    monto,
    metodoPago: metodoPagoRaw.trim(),
    items,
  };
};

const construirTokenComercio = (comercioId: string): string => btoa(JSON.stringify({ ComercioId: comercioId }));

const unirseAGrupos = async (connection: HubConnection): Promise<void> => {
  
  await connection.invoke("UnirseComoComercio");
};

export const iniciarPedidosSignalR = (handlers?: PedidoSignalrHandlers): (() => void) => {
  let reintentoInicialId: number | null = null;
  let cerrando = false;

  const connection = new HubConnectionBuilder()
    .withUrl(NOTIFICACIONES_HUB_URL, {
      accessTokenFactory: () => construirTokenComercio(COMERCIO_ID),
    })
    .configureLogging(import.meta.env.DEV ? LogLevel.Information : LogLevel.Warning)
    .withAutomaticReconnect([0, 2000, 5000, 10000])
    .build();

  const manejarNuevoPedido = (data: unknown) => {
    try {
      const payload = normalizarPedidoPayload(data);

      if (!payload) {
        throw new Error("Payload de NuevoPedido invalido");
      }

      handlers?.onPedidoRecibido?.(payload);
    } catch (error) {
      handlers?.onError?.(error);
    }
  };

  connection.on("NuevoPedido", manejarNuevoPedido);

  connection.onreconnecting((error) => {
    console.log("[SignalR] Reconectando...", error);
  });

  connection.onreconnected(async () => {
    console.log("[SignalR] Reconectado.");

    try {
      await unirseAGrupos(connection);
      console.log("[SignalR] Reingreso a grupos completado.");
    } catch (error) {
      handlers?.onError?.(error);
    }
  });

  connection.onclose((error) => {
    if (cerrando) {
      return;
    }

    console.log("[SignalR] Conexion cerrada.", error);
    handlers?.onError?.(error);
  });

  const conectar = async () => {
    if (cerrando) {
      return;
    }

    try {
      await connection.start();
      console.log(`[SignalR] Conectado a ${NOTIFICACIONES_HUB_URL}`);
      await unirseAGrupos(connection);
      console.log("[SignalR] Unido a grupos de usuario y comercio.");
      if (reintentoInicialId) {
        window.clearTimeout(reintentoInicialId);
        reintentoInicialId = null;
      }
    } catch (error) {
      handlers?.onError?.(error);
      console.log("[SignalR] Error al conectar al hub.", error);
      reintentoInicialId = window.setTimeout(() => {
        void conectar();
      }, REINTENTO_INICIAL_MS);
    }
  };

  void conectar();

  return () => {
    cerrando = true;
    if (reintentoInicialId) {
      window.clearTimeout(reintentoInicialId);
      reintentoInicialId = null;
    }
    void connection.stop();
  };
};
