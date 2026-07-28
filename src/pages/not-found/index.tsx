import { Link } from 'react-router-dom'

const NotFoundPage = () => {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-4 bg-ink px-5 text-center font-sans text-mist">
      <span className="font-mono text-sm font-bold tracking-[0.12em] text-brand">404</span>
      <h1 className="m-0 font-mono text-[clamp(28px,5vw,48px)] font-extrabold text-white">PÁGINA NO ENCONTRADA</h1>
      <p className="m-0 max-w-100 font-sans text-sm text-[#c7cdd5]">
        La página que buscas no existe o fue movida.
      </p>
      <Link
        to="/"
        className="mt-2 rounded-[3px] bg-accent px-6 py-3.5 font-mono text-sm font-bold text-white hover:bg-brand-dark"
      >
        VOLVER AL INICIO →
      </Link>
    </div>
  )
}

export default NotFoundPage
