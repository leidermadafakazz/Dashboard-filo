import { useEffect, useMemo, useState } from "react";
import {
  marcarPedidoListo as marcarPedidoListoApi,
  marcarPedidoPreparando,
} from "../../../../api/Pedidos.api";
import {
  iniciarPedidosSignalR,
  type PedidoSignalrPayload,
} from "../../../../api/Pedidos.signalr";
import {
  construirPasosListo,
  construirPedidoActivoDesdePedido,
} from "../machines/orderMachine";
import type { PedidoActivo, PedidoEntrante } from "../types/order.types";

const REPARTIDOR_POR_DEFECTO = "Mark R.";
const CONSEJO_DASHBOARD =
  "Reducir 2 minutos de preparacion mejora la retencion de clientes en 15%.";

export const useOrders = () => {
  const [pedidosEntrantes, setPedidosEntrantes] = useState<PedidoEntrante[]>([]);
  const [pedidoActivo, setPedidoActivo] = useState<PedidoActivo | null>(null);

  useEffect(() => {
    const limpiar = iniciarPedidosSignalR({
      onPedidoRecibido: (payload: PedidoSignalrPayload) => {
        setPedidosEntrantes((pedidosPrevios) => {
          const existePedido = pedidosPrevios.some((pedido) => pedido.id === payload.id);

          if (existePedido) {
            return pedidosPrevios;
          }

          const nuevoPedido: PedidoEntrante = {
            ...payload,
            estado: "pendiente",
          };

          setPedidoActivo((pedidoActivoPrevio) =>
            pedidoActivoPrevio ?? construirPedidoActivoDesdePedido(nuevoPedido, REPARTIDOR_POR_DEFECTO),
          );

          return [nuevoPedido, ...pedidosPrevios];
        });
      },
      onError: (error) => {
        console.log("[SignalR][ERROR] Error en simulacion de pedidos:", error);
      },
    });

    return limpiar;
  }, []);

  const cantidadPendientes = useMemo(
    () => pedidosEntrantes.filter((pedido) => pedido.estado === "pendiente").length,
    [pedidosEntrantes],
  );

  const pedidosVisibles = useMemo(
    () => pedidosEntrantes.filter((pedido) => pedido.estado !== "cancelado"),
    [pedidosEntrantes],
  );

  const indicePasoActivo = useMemo(
    () => pedidoActivo?.pasos.findIndex((paso) => paso.estado === "activo") ?? 0,
    [pedidoActivo],
  );

  const seleccionarPedido = (pedido: PedidoEntrante) => {
    setPedidoActivo(construirPedidoActivoDesdePedido(pedido, REPARTIDOR_POR_DEFECTO));
    console.log(`[UI] Pedido ${pedido.codigo} seleccionado en progreso activo`);
  };

  const aceptarPedido = async (pedido: PedidoEntrante) => {
    await marcarPedidoPreparando(pedido.id);

    const pedidoActualizado: PedidoEntrante = {
      ...pedido,
      estado: "preparando",
    };

    setPedidosEntrantes((pedidosPrevios) =>
      pedidosPrevios.map((pedidoActual) =>
        pedidoActual.id === pedido.id ? pedidoActualizado : pedidoActual,
      ),
    );

    seleccionarPedido(pedidoActualizado);
    console.log(`[UI] Pedido ${pedido.codigo} paso a estado PREPARANDO`);
  };

  const cancelarPedido = (pedidoId: number, codigoPedido: string) => {
    setPedidosEntrantes((pedidosPrevios) => {
      const pedidosActualizados: PedidoEntrante[] = pedidosPrevios.map((pedido) =>
        pedido.id === pedidoId ? { ...pedido, estado: "cancelado" as const } : pedido,
      );

      if (pedidoActivo?.pedidoId === pedidoId) {
        const siguientePedido = pedidosActualizados.find(
          (pedido) => pedido.id !== pedidoId && pedido.estado !== "cancelado",
        );

        if (siguientePedido) {
          setPedidoActivo(construirPedidoActivoDesdePedido(siguientePedido, REPARTIDOR_POR_DEFECTO));
        } else {
          setPedidoActivo(null);
        }
      }

      return pedidosActualizados;
    });

    console.log(`[UI] Pedido ${codigoPedido} cancelado localmente (pendiente endpoint real)`);
  };

  const marcarPedidoListo = async () => {
    if (!pedidoActivo) {
      return;
    }

    await marcarPedidoListoApi(pedidoActivo.pedidoId);

    setPedidosEntrantes((pedidosPrevios) =>
      pedidosPrevios.map((pedido) =>
        pedido.id === pedidoActivo.pedidoId ? { ...pedido, estado: "listo" as const } : pedido,
      ),
    );

    setPedidoActivo((pedidoActivoPrevio) => {
      if (!pedidoActivoPrevio) {
        return null;
      }

      return {
        ...pedidoActivoPrevio,
        pasos: construirPasosListo(),
      };
    });

    console.log(`[UI] Pedido ${pedidoActivo.codigo} marcado como LISTO`);
  };

  return {
    consejo: CONSEJO_DASHBOARD,
    cantidadPendientes,
    indicePasoActivo,
    pedidoActivo,
    pedidosVisibles,
    aceptarPedido,
    cancelarPedido,
    marcarPedidoListo,
    seleccionarPedido,
  };
};
