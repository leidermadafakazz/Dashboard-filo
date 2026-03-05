
import "./PayloadPreview.css" ;

const REGISTRO_BANNER_URL =
  import.meta.env.VITE_REGISTRO_BANNER_URL ??
  "https://lzcqnygnduehntdbijzw.supabase.co/storage/v1/object/public/filo/filobanerR.webp";

function PayloadPreview() {



  return (
    <aside className="registre-preview">
      <div className="registre-preview__media">
        <div className="registre-preview__eslogan"><p>¿Con filo?, haz pedidos...</p></div>
        <img
          className="registre-preview__image"
          src={REGISTRO_BANNER_URL}
          alt="Banner de registro"
          loading="lazy"
        />
        <div className="registre-preview__overlay">
          <p className="registre-preview__eyebrow">Delivery online</p>
          <h3 className="registre-preview__slogan">Cuando hay filo, pensamos en tu negocio</h3>
        </div>
      </div>

      
    </aside>
  );
}

export default PayloadPreview;
