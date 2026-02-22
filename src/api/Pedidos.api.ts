export type PedidoEstadoResponse = {
  ok: boolean;
};

const PEDIDOS_MS_BASE_URL = "https://localhost:7164";

const construirEndpointPreparando = (pedidoId: number): string =>
  `${PEDIDOS_MS_BASE_URL}/${pedidoId}/PreparandoPedido`;

const construirEndpointListo = (pedidoId: number): string =>
  `${PEDIDOS_MS_BASE_URL}/${pedidoId}/PedidoListo`;

export const marcarPedidoPreparando = async (pedidoId: number) => {
  const endpoint = construirEndpointPreparando(pedidoId);
  console.log(`[MS] POST ${endpoint}`);
  console.log("[MS] Payload sugerido:", { pedidoId, accion: "preparando" });

  try {
 // const { data } = await apiClient.post<PedidoEstadoResponse>(endpoint);
 // return data;
   return { ok: true }; // Simulación de respuesta exitosa
  } catch (error) {
    console.log("[MS][WARN] Llamada real pendiente o no disponible. Se mantiene flujo local.", error);
    return { ok: false };
  }
};

export const marcarPedidoListo = async (pedidoId: number) => {
  const endpoint = construirEndpointListo(pedidoId);
  console.log(`[MS] POST ${endpoint}`);
  console.log("[MS] Payload sugerido:", { pedidoId, accion: "listo" });

  if (construirEndpointListo(pedidoId) === construirEndpointPreparando(pedidoId)) {
    console.log(
      "[MS][WARN] Endpoint de 'pedido listo' coincide con 'preparando'. Confirma si debe ser otro path.",
    );
  }

  try {
   // const { data } = await apiClient.post<PedidoEstadoResponse>(endpoint);
    //return data;
    return { ok: true }; // Simulación de respuesta exitosa
  } catch (error) {
    console.log("[MS][WARN] Llamada real pendiente o no disponible. Se mantiene flujo local.", error);
    return { ok: false };
  }
};
