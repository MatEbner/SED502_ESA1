import './style.css'
import { fotos } from './daten'
import type { Foto } from './typen'

function erstelleCardHtml(foto: Foto): string {
  return `
    <article class="foto-karte">
      <figure class="foto-karte__bild">
        <img src="${foto.bildUrl}" alt="${foto.altText}" width="1200" height="800" />
        <figcaption class="motiv-tag">${foto.motiv}</figcaption>
      </figure>
      <section class="foto-karte__inhalt" aria-labelledby="foto-titel-${foto.id}">
        <h2 id="foto-titel-${foto.id}">${foto.titel}</h2>
        <p class="foto-beschreibung">${foto.beschreibung}</p>
        <p class="fotograf">Fotograf: ${foto.fotograf}</p>
        <p><a class="foto-quelle" href="${foto.quelleUrl}" target="_blank" rel="noopener noreferrer">Foto auf Pexels ansehen</a></p>
        <dl class="kamera-daten">
          <dt>Kamera</dt>
          <dd>${foto.kamera}</dd>
          <dt>Brennweite</dt>
          <dd>${foto.brennweite} mm</dd>
          <dt>Blende</dt>
          <dd>${foto.blende}</dd>
          <dt>ISO</dt>
          <dd>${foto.iso}</dd>
          <dt>Verschlusszeit</dt>
          <dd>${foto.verschlusszeit}</dd>
        </dl>
      </section>
    </article>
  `
}

function rendereGalerie(fotoliste: Foto[]): void {
  const fotoRaster = document.querySelector<HTMLElement>('#foto-raster')

  if (fotoRaster === null) {
    throw new Error('Das Element für die Fotogalerie wurde nicht gefunden.')
  }

  fotoRaster.innerHTML = fotoliste.map(erstelleCardHtml).join('')
}

rendereGalerie(fotos)
