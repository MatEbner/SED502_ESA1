import './style.css'
import { fotos } from './daten'
import type { Foto, Motiv } from './typen'

type FilterMotiv = Motiv | 'alle'

const motive: Motiv[] = ['Landschaft', 'Portrait', 'Architektur', 'Natur', 'Stadt']
const filterMotive: FilterMotiv[] = ['alle', ...motive]

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
  const ergebnis = document.querySelector<HTMLElement>('#ergebnis')
  const statistikAnzahl = document.querySelector<HTMLElement>('#statistik-anzahl')

  if (fotoRaster === null) {
    throw new Error('Das Element für die Fotogalerie wurde nicht gefunden.')
  }
  if (ergebnis === null) {
    throw new Error('Das Element für die Ergebnisanzeige wurde nicht gefunden.')
  }
  if (statistikAnzahl === null) {
    throw new Error('Das Element für die Fotoanzahl wurde nicht gefunden.')
  }
  fotoRaster.innerHTML = fotoliste.map(erstelleCardHtml).join('')
  ergebnis.textContent = `${fotoliste.length} von ${fotos.length} Fotos`
  statistikAnzahl.textContent = `Anzahl: ${fotoliste.length}`
}

function filtereNachMotiv(fotoliste: Foto[], motiv: FilterMotiv): Foto[] {
  if (motiv === 'alle') {
    return fotoliste
  }

  return fotoliste.filter((foto) => foto.motiv === motiv)
}

const filterButtons = document.querySelector<HTMLElement>('#filter-buttons')

if (filterButtons === null) {
  throw new Error('Der Container für die Motiv-Filter wurde nicht gefunden.')
}

filterButtons.addEventListener('click', (ereignis: MouseEvent): void => {
  if (!(ereignis.target instanceof Element)) {
    return
  }

  const filterButton = ereignis.target.closest<HTMLButtonElement>('button[data-motiv]')

  if (filterButton === null || !filterButtons.contains(filterButton)) {
    return
  }

  const datenMotiv = filterButton.dataset.motiv

  if (datenMotiv === undefined) {
    throw new Error('Dem Filter-Button fehlt ein Motiv.')
  }

  const ausgewaehltesMotiv = filterMotive.find((motiv) => motiv === datenMotiv)

  if (ausgewaehltesMotiv === undefined) {
    throw new Error(`Unbekanntes Filter-Motiv: ${datenMotiv}`)
  }

  filterButtons.querySelectorAll<HTMLButtonElement>('button[data-motiv]').forEach((button) => {
    button.setAttribute('aria-pressed', String(button === filterButton))
  })

  rendereGalerie(filtereNachMotiv(fotos, ausgewaehltesMotiv))
})

rendereGalerie(fotos)
