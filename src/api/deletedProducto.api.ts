export const eliminarProducto = async (id: number): Promise<void> => {
  const response = await fetch(`TU_URL_API/productos/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Error al eliminar el producto");
  }
};