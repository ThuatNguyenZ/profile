import { lazy, Suspense } from 'react'
import CaseBody from '../components/case/CaseBody'
import CaseHeader from '../components/case/CaseHeader'
import CaseNav from '../components/case/CaseNav'
import CaseSection from '../components/case/CaseSection'
import Panel from '../components/ui/Panel'
import Erd from '../components/viz/Erd'
import { lunchOrder } from '../content/lunchOrder'
import { platform } from '../content/platform'
import useDocumentTitle from '../lib/useDocumentTitle'

const HeroNetwork = lazy(() => import('../components/viz/HeroNetwork'))
const BACKDROP_MASK = '[mask-image:linear-gradient(to_right,transparent_0%,transparent_50%,rgba(0,0,0,0.35)_62%,black_80%)]'

const SECTIONS = [
  { id: 'problem', label: 'Problem' },
  { id: 'data-model', label: 'Data model' },
  { id: 'logic', label: 'Logic in DB' },
  { id: 'testing', label: 'Testing' },
  { id: 'releases', label: 'Releases' },
  { id: 'stack', label: 'Stack & cost' },
]

export default function CaseStudyLunchOrder() {
  useDocumentTitle(lunchOrder.name)
  return (
    <>
      <CaseHeader slug={lunchOrder.slug} kicker="CASE STUDY · 02 · SIDE BUILD" title={lunchOrder.name} role={lunchOrder.role} period={lunchOrder.period} chips={lunchOrder.chips} backdrop={<Suspense fallback={null}><HeroNetwork mask={BACKDROP_MASK} /></Suspense>}>
        <p className="mb-8 max-w-2xl text-[16px] text-mu md:text-[17px]">{lunchOrder.pitch}</p>
        <dl className="grid max-w-xl grid-cols-3 gap-px border border-line bg-line">
          {lunchOrder.facts.map((f) => (
            <div key={f.label} className="bg-s1 p-4">
              <dt className="font-display text-[26px] font-semibold">{f.value}</dt>
              <dd className="text-[12px] leading-snug text-mu">{f.label}</dd>
            </div>
          ))}
        </dl>
      </CaseHeader>

      <CaseBody sections={SECTIONS}>
        <CaseSection id="problem" index="01" label="PROBLEM" stage="INPUT" tone="cy" title="Lunch by group chat">
          <p className="max-w-2xl text-mu">{lunchOrder.problem}</p>
        </CaseSection>

        <CaseSection id="data-model" index="02" label="DATA MODEL" stage="MODEL" tone="cy" title="Six entities, simplified" intro="The real schema has more tables; this is the shape that matters.">
          <Erd entities={lunchOrder.entities} relations={lunchOrder.relations} />
        </CaseSection>

        <CaseSection id="logic" index="03" label="LOGIC IN THE DATABASE" stage="RULES" tone="vi" title="Thin client, strict Postgres">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-start">
            <ul className="space-y-3">
              {lunchOrder.logic.map((l) => (
                <li key={l} className="flex gap-3">
                  <span aria-hidden="true" className="font-mono text-cy">›</span>
                  <span className="text-mu">{l}</span>
                </li>
              ))}
            </ul>
            <Panel title="policies.sql // illustrative" bodyClassName="p-0" className="min-w-0">
              <pre className="overflow-x-auto bg-[#05060a] px-4 py-5 font-mono text-[12.5px] leading-[1.75] text-[#c9d1d9]">{lunchOrder.rlsSnippet}</pre>
            </Panel>
          </div>
        </CaseSection>

        <CaseSection id="testing" index="04" label="TESTING" stage="VERIFY" tone="vi" title="A real Postgres inside the test runner">
          <p className="max-w-2xl text-mu">{lunchOrder.testing}</p>
        </CaseSection>

        <CaseSection id="releases" index="05" label="RELEASES" stage="SHIP" tone="em" title="Seven versions, three jumps">
          <ol className="grid gap-px border border-line bg-line md:grid-cols-3">
            {lunchOrder.milestones.map((m) => (
              <li key={m.version} className="lift relative bg-s1 p-5 hover:z-10">
                <p className="font-mono text-[12px] text-cy">{m.version}</p>
                <p className="mt-1 font-display text-[18px] font-semibold">{m.title}</p>
                <p className="mt-2 text-[14px] text-mu">{m.text}</p>
              </li>
            ))}
          </ol>
        </CaseSection>

        <CaseSection id="stack" index="06" label="STACK & COST" stage="COST" tone="em" title="Free tier, all the way">
          <div className="border-b border-line">
            {lunchOrder.stack.map((row) => (
              <div key={row.key} className="grid gap-1 border-t border-line py-3 md:grid-cols-[180px_1fr]">
                <span className="label-code text-cy">{row.key}</span>
                <span>{row.value}</span>
              </div>
            ))}
          </div>
        </CaseSection>
      </CaseBody>

      <CaseNav prev={{ to: `/work/${platform.slug}`, label: platform.name }} next={{ to: '/', label: 'Home' }} />
    </>
  )
}
