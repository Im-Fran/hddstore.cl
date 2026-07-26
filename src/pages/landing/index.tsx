import ReactFullpageImport from '@fullpage/react-fullpage'
import { useEffect } from 'react'
import 'fullpage.js/dist/fullpage.min.css'
import { Contacto } from './components/Contacto'
import { Footer } from './components/Footer'
import { Galeria } from './components/Galeria'
import { ServiciosSection } from './components/Servicios'
import { SECTIONS } from './components/constants'
import { Nav } from './components/Nav'
import { Nosotros } from './components/Nosotros'
import { Ubicacion } from './components/Ubicacion'
import { useSectionTyping } from './components/useSectionTyping'

// El bundle CJS de @fullpage/react-fullpage exporta { default: Componente },
// y el interop de default-import de rolldown-vite envuelve ese objeto una
// vez más, dejando ReactFullpageImport = { default: Componente } en vez del
// componente. Se desenvuelve a mano para soportar ambos casos (envuelto o no).
const ReactFullpage =
  (ReactFullpageImport as unknown as { default?: typeof ReactFullpageImport }).default ??
  ReactFullpageImport

// autoScrolling (default true en fullpage.js) fija `overflow:hidden` en
// body y captura todo el scroll dentro de #fullpage: cualquier elemento
// fuera del ReactFullpage.Wrapper (como un Footer después del componente)
// queda inalcanzable, nunca se puede hacer scroll hasta él. Por eso Footer
// vive dentro de la última sección (Contacto), compartiendo su 100vh.
// fullpage.js no agrega `id` a sus secciones (usa `data-anchor`), así que el
// nav se sincroniza vía el callback `afterLoad` de la librería en vez de un
// IntersectionObserver sobre ids que nunca existen en el DOM.
const LandingPage = () => {
  const { activeId, typed, startTyping } = useSectionTyping(SECTIONS)

  useEffect(() => {
    startTyping(SECTIONS[0].id)
  }, [startTyping])

  return (
    <div className="bg-ink font-sans text-mist">
      <Nav activeId={activeId} typed={typed} onNavigate={startTyping} />
      <ReactFullpage
        licenseKey=""
        scrollingSpeed={700}
        anchors={['servicios', 'nosotros', 'galeria', 'ubicacion', 'contacto']}
        credits={{ enabled: false }}
        afterLoad={(_origin, destination) => startTyping(String(destination.anchor))}
        render={() => (
          <ReactFullpage.Wrapper>
            <div className="section">
              <ServiciosSection />
            </div>
            <div className="section">
              <Nosotros />
            </div>
            <div className="section">
              <Galeria />
            </div>
            <div className="section">
              <Ubicacion />
            </div>
            <div className="section flex h-full flex-col">
              <Contacto />
              <Footer />
            </div>
          </ReactFullpage.Wrapper>
        )}
      />
    </div>
  )
}

export default LandingPage
