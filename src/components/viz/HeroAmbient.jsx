// Calm hero backdrop: two soft light blobs drifting slowly over a faint dot grid that creeps left-to-right.
export default function HeroAmbient() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="ambient-grid absolute inset-0 opacity-60" />
      <div className="ambient-blob ambient-blob-a absolute -left-[10%] top-[8%] h-[46vmax] w-[46vmax] rounded-full bg-cy/[0.07] blur-[90px]" />
      <div className="ambient-blob ambient-blob-b absolute -right-[12%] bottom-[-18%] h-[52vmax] w-[52vmax] rounded-full bg-vi/[0.10] blur-[100px]" />
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-canvas to-transparent" />
    </div>
  )
}
