// Fixed blueprint backdrop behind every page: dot grid, 120-px major grid, fine grain, edge vignette.
export default function PageBackdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10">
      <div className="backdrop-grid absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_55%,transparent_100%)]" />
      <div className="backdrop-grain absolute inset-0" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_60%,rgb(var(--c-canvas)/0.6)_100%)]" />
    </div>
  )
}
