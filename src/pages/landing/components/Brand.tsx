export function Brand() {
  return (
    <div className="flex items-center gap-2.5">
      <div className="flex h-9 w-9 flex-none items-center justify-center overflow-hidden rounded-md bg-white">
        <img src={'/media/hd-logo.webp'} alt="Logo HDD Tecnología Store" className="size-7.5 object-contain" />
      </div>
      <div className="flex flex-col leading-[1.05]">
        <span className="font-mono text-sm font-bold tracking-[0.03em] text-white">HDD</span>
        <span className="font-mono text-[8.5px] font-medium tracking-[0.14em] text-muted">TECNOLOGÍA STORE</span>
      </div>
    </div>
  )
}
