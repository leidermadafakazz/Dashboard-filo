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
            <h3>Pedido Activo</h3>
            <p className="id-principal-pedido">{pedidoActivo.pedidoExternoId}</p>
            <p>Cliente: {pedidoActivo.cliente}</p>
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
            <span>Comercio</span>
            <strong>{pedidoActivo.comercioId}</strong>
          </div>
          <div className="fila-meta">
            <span>Pago</span>
            <strong>
              {pedidoActivo.monto} - {pedidoActivo.metodoPago}
            </strong>
          </div>
          <div className="fila-meta">
            <span>Estado</span>
            <strong>{pedidoActivo.estadoSignalR ?? "pendiente"}</strong>
          </div>
          {pedidoActivo.notaDirecion ? (
            <div className="fila-meta">
              <span>Nota</span>
              <strong>{pedidoActivo.notaDirecion}</strong>
            </div>
          ) : null}
          {pedidoActivo.mensaje ? (
            <div className="fila-meta">
              <span>Mensaje</span>
              <strong>{pedidoActivo.mensaje}</strong>
            </div>
          ) : null}
          <div className="detalle-items-progreso">
            <span>Items</span>
            <ul className="items-pedido items-pedido-progreso">
              {pedidoActivo.items.map((item) => (
                <li key={`${pedidoActivo.pedidoExternoId}-${item.id}`}>
                  {item.nombre}
                  {item.detalles ? ` (${item.detalles})` : ""}
                </li>
              ))}
            </ul>
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
