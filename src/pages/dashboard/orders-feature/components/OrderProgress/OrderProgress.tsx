import type { PedidoActivo } from "../../types/order.types";

type OrderProgressProps = {
  pedidoActivo: PedidoActivo | null;
  indicePasoActivo: number;
  consejo: string;
  onMarcarListo: () => void;
};

const OrderProgress = ({
  pedidoActivo,
  //indicePasoActivo,
  consejo,
  onMarcarListo,
}: OrderProgressProps) => {
  if (!pedidoActivo) {
    return (
      <>
        <article className="tarjeta-progreso">
          <div className="superior-progreso">
            <div>
              <h3>Sin pedido activo</h3>
              <p>Esperando pedidos entrantes desde SignalR...</p>
            </div>
            <div className="pildora-temporizador">T</div>
          </div>
        </article>

        <div className="tarjeta-consejo">
          <strong>Tip:</strong> {consejo}
        </div>
      </>
    );
  }

  return (
    <>
      <article className="tarjeta-progreso">
        <div className="superior-progreso">
          <div>
            <h3>Pedido {pedidoActivo.codigo}</h3>
            <p>Entrega esperada: {pedidoActivo.entregaEsperada}</p>
          </div>
          <div className="pildora-temporizador">T</div>
        </div>
        <div className="pasos-progreso">
          {pedidoActivo.pasos.map((paso) => {
              const Icono = paso.icono;
              return (
           <div className="paso" key={paso.id}>
             <div className={`circulo-paso paso-${paso.estado}`}>
               <Icono size={18} />
              </div>
             <span>{paso.etiqueta}</span>
           </div>
              );
          })}
        </div>
        <div className="meta-progreso">
          <div className="fila-meta">
            <span>Cliente</span>
            <strong>{pedidoActivo.cliente}</strong>
          </div>
          <div className="fila-meta">
            <span>Repartidor</span>
            <strong>{pedidoActivo.repartidor}</strong>
          </div>
          <button type="button" className="boton boton-listo" onClick={onMarcarListo}>
            Marcar como Listo para Recoger
          </button>
        </div>
      </article>

      <div className="tarjeta-consejo">
        <strong>Tip:</strong> {consejo}
      </div>
    </>
  );
};

export default OrderProgress;
