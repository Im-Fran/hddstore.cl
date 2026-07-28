export function DisplayFooter() {
  return (
    <footer className="flex flex-none items-center justify-center border-t border-white/8 bg-ink px-5 py-2">
      <span className="font-mono text-[11px] text-muted">
        Desarrollado con ☕ por{' '}
        <a
          href="https://fsolism.cl/?utm_src=hddstore&utm_campaign=display-footer"
          target="_blank"
          rel="noopener noreferrer"
          className="text-brand"
        >
          Francisco Solis Maturana
        </a>{' '}
        (fsolism.cl)
      </span>
    </footer>
  )
}
