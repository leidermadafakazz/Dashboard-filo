import type { ItemPedido } from "../pages/dashboard/orders-feature/types/order.types";

export type PedidoSignalrPayload = {
  id: number;
  codigo: string;
  cliente: string;
  monto: string;
  metodoPago: string;

  items: ItemPedido[];
};

export type PedidoSignalrHandlers = {
  onPedidoRecibido?: (payload: PedidoSignalrPayload) => void;
  onError?: (error: unknown) => void;
};

export const iniciarPedidosSignalR = (handlers?: PedidoSignalrHandlers): (() => void) => {
  console.log("[SignalR] Esperando conexion real con RabbitMQ para pedidos entrantes.");
  console.log("[SignalR] Modo simulacion activo. Emitiendo pedidos fake.");

  if (handlers?.onPedidoRecibido) {
    console.log("[SignalR] Handler onPedidoRecibido registrado.");
  }

  if (handlers?.onError) {
    console.log("[SignalR] Handler onError registrado.");
  }

  const pedidosSimulados: PedidoSignalrPayload[] = [
    {
      id: 1240,
      codigo: "#1240",
      cliente: "Carlos Mendez",
      monto: "$50.000",
      metodoPago: "Efectivo",

      items: [
        { id: 1, nombre: "1x Hamburguesa Clasica" },
        { id: 2, nombre: "1x Papas Medianas" },
      ],
    },
    {
      id: 1241,
      codigo: "#1241",
      cliente: "Daniela Ruiz",
      monto: "$35.000",
      metodoPago: "Tarjeta de Credito",

      items: [
        { id: 1, nombre: "2x Pizza Hawaiana" },
        { id: 2, nombre: "1x Limonada 1L" },
      ],
    },
  ];

  const temporizadores: number[] = pedidosSimulados.map((pedido, index) =>
    window.setTimeout(() => {
      try {
        console.log(`[SignalR][Simulado] Pedido recibido ${pedido.codigo}`);
        handlers?.onPedidoRecibido?.(pedido);
      } catch (error) {
        handlers?.onError?.(error);
      }
    }, 2500 + index * 3000),
  );

  return () => {
    temporizadores.forEach((timerId) => window.clearTimeout(timerId));
    console.log("[SignalR] Limpieza de suscripcion pendiente de implementacion real.");
  };
};
