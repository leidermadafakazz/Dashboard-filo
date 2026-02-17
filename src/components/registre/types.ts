export type Payload = {
  nombre: string
  descripcion: string
  categorias: string[]
  infoComercio: {
    direccion: string
    ciudad: string
    telefono: string
  }
  imgBannerUrl: string
}

export type FormState = {
  nombre: string
  descripcion: string
  categorias: string
  direccion: string
  ciudad: string
  telefono: string
}

export const emptyPayload: Payload = {
  nombre: '',
  descripcion: '',
  categorias: [],
  infoComercio: {
    direccion: '',
    ciudad: '',
    telefono: '',
  },
  imgBannerUrl: '',
}
