import Nav from './Nav'
import StatusStrip from './StatusStrip'
import Footer from './Footer'

export default function PageShell({ children }) {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-cy focus:px-3 focus:py-2 focus:font-mono focus:text-[12px] focus:text-canvas"
      >
        Skip to content
      </a>
      <Nav />
      <StatusStrip />
      <main id="main">{children}</main>
      <Footer />
    </>
  )
}
