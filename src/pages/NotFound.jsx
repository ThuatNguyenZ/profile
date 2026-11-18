import Button from '../components/ui/Button'
import Terminal from '../components/ui/Terminal'
import useDocumentTitle from '../lib/useDocumentTitle'

const lines = [
  { kind: 'cmd', text: 'resolve route' },
  { kind: 'out', text: '404  no partition for this path' },
  { kind: 'dim', text: 'hint: go back to the home page' },
]

export default function NotFound() {
  useDocumentTitle('Not found')
  return (
    <section className="container-site grid gap-10 py-20 md:grid-cols-2 md:items-center">
      <div>
        <p className="font-mono text-[11px] tracking-[0.08em] text-am">// 404</p>
        <h1 className="heading-display mt-2 text-[44px] md:text-[56px]">Nothing landed here.</h1>
        <div className="mt-8">
          <Button to="/">← Back home</Button>
        </div>
      </div>
      <Terminal title="router" lines={lines} />
    </section>
  )
}
