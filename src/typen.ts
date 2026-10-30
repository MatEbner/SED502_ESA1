export type Motiv = 'Landschaft' | 'Portrait' | 'Architektur' | 'Natur' | 'Stadt'

export interface Foto {
  id: number
  titel: string
  motiv: Motiv
  beschreibung: string
  kamera: string
  brennweite: number
  blende: string
  iso: number
  verschlusszeit: string
  bildUrl: string
  quelleUrl: string
  altText: string
  fotograf: string
}
