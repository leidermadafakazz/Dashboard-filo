import axios from "axios";
export const eliminarProducto = async (id: number): Promise<void> => {
  try {
    await axios.delete(`/productos/${id}`, {
      method: "DELETE",
    });
  } catch (error) {
    throw new Error("Error al eliminar el producto");
  }
};  