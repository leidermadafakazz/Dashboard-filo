import { useState, type FormEvent } from "react";
import { registrarProducto, type RegistrarProductoRequest } from "../../api/RegistrarProducto.api";
import Drawer from "../../components/ui/Drawer";
import "./ProductsPage.css";

type Product = {
  id: number;
  categoria: string;
  nombre: string;
  descripcion: string;
  precio: number;
  imagen: string;
};

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    categoria: "",
    nombre: "",
    descripcion: "",
    precio: "",
    imagen: "",
  });

  const resetForm = () => {
    setFormData({
      categoria: "",
      nombre: "",
      descripcion: "",
      precio: "",
      imagen: "",
    });
  };

  const openDrawer = () => {
    resetForm();
    setSubmitError(null);
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitError(null);

    const payload: RegistrarProductoRequest = {
      categoria: formData.categoria.trim(),
      nombre: formData.nombre.trim(),
      descripcion: formData.descripcion.trim(),
      precio: Number(formData.precio),
      imagen: formData.imagen.trim(),
    };

    try {
      setIsSubmitting(true);
      const response = await registrarProducto(payload);
      const newProduct: Product = {
        id: response.id,
        ...payload,
      };

      setProducts((currentProducts) => [newProduct, ...currentProducts]);
      closeDrawer();
      resetForm();
    } catch {
      setSubmitError("No se pudo registrar el producto. Intenta nuevamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="products-page">
      <div className="products-page__header">
        <div>
          <h1 className="products-page__title">Productos</h1>
          <p className="products-page__subtitle">Gestiona el catalogo de tu tienda.</p>
        </div>
        <button className="products-page__new-button" onClick={openDrawer}>
          Registrar producto
        </button>
      </div>

      <div className="products-page__card-area">
        <div className="products-page__grid">
          {products.map((product) => (
            <article className="products-page__card" key={product.id}>
              <img className="products-page__image" src={product.imagen} alt={product.nombre} />
              <div className="products-page__card-body">
                <span className="products-page__category">{product.categoria}</span>
                <h3 className="products-page__name">{product.nombre}</h3>
                <p className="products-page__description">{product.descripcion}</p>
                <p className="products-page__price">S/ {product.precio}</p>
              </div>
            </article>
          ))}
        </div>
      </div>

      <Drawer isOpen={isDrawerOpen} onClose={closeDrawer} title="Registrar producto">
        <form className="products-form" onSubmit={handleSubmit}>
          <label className="products-form__field">
            <span>Categoria</span>
            <input
              type="text"
              required
              value={formData.categoria}
              onChange={(event) =>
                setFormData((prev) => ({
                  ...prev,
                  categoria: event.target.value,
                }))
              }
            />
          </label>

          <label className="products-form__field">
            <span>Nombre</span>
            <input
              type="text"
              required
              value={formData.nombre}
              onChange={(event) =>
                setFormData((prev) => ({
                  ...prev,
                  nombre: event.target.value,
                }))
              }
            />
          </label>

          <label className="products-form__field">
            <span>Descripcion</span>
            <textarea
              required
              rows={3}
              value={formData.descripcion}
              onChange={(event) =>
                setFormData((prev) => ({
                  ...prev,
                  descripcion: event.target.value,
                }))
              }
            />
          </label>

          <label className="products-form__field">
            <span>Precio</span>
            <input
              type="number"
              min={0}
              required
              value={formData.precio}
              onChange={(event) =>
                setFormData((prev) => ({
                  ...prev,
                  precio: event.target.value,
                }))
              }
            />
          </label>

          <label className="products-form__field">
            <span>URL Imagen</span>
            <input
              type="url"
              required
              value={formData.imagen}
              onChange={(event) =>
                setFormData((prev) => ({
                  ...prev,
                  imagen: event.target.value,
                }))
              }
            />
          </label>

          {submitError ? <p className="products-form__error">{submitError}</p> : null}

          <div className="products-form__actions">
            <button
              type="button"
              className="products-form__button products-form__button--ghost"
              onClick={closeDrawer}
              disabled={isSubmitting}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="products-form__button products-form__button--primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Guardando..." : "Guardar"}
            </button>
          </div>
        </form>
      </Drawer>
    </section>
  );
};

export default ProductsPage;
