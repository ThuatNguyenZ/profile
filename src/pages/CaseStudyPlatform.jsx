import { Link } from 'react-router-dom'
import CaseBody from '../components/case/CaseBody'
import CaseHeader from '../components/case/CaseHeader'
import CaseNav from '../components/case/CaseNav'
import CaseSection from '../components/case/CaseSection'
import KpiStrip from '../components/ui/KpiStrip'
import Panel from '../components/ui/Panel'
import ArchitectureDiagram from '../components/viz/ArchitectureDiagram'
import BlackBoxFlow from '../components/viz/BlackBoxFlow'
import StatusBoard from '../components/viz/StatusBoard'
import { kpis } from '../content/profile'
import { platform } from '../content/platform'
import { lunchOrder } from '../content/lunchOrder'
import useDocumentTitle from '../lib/useDocumentTitle'

const SECTIONS = [
  { id: 'problem', label: 'Problem' },
  { id: 'architecture', label: 'Architecture' },
  { id: 'principles', label: 'Principles' },
  { id: 'monitoring', label: 'Monitoring' },
  { id: 'enrichment', label: 'Text enrichment' },
  { id: 'lessons', label: 'Lessons' },
]

export default function CaseStudyPlatform() {
  useDocumentTitle(platform.name)
  return (
    <>
      <CaseHeader slug={platform.slug} kicker="CASE STUDY · 01" title={platform.name} role={platform.role} period={platform.period} chips={platform.chips}>
        <p className="mb-8 max-w-2xl text-[16px] text-mu md:text-[17px]">{platform.pitch}</p>
        <KpiStrip items={kpis} />
      </CaseHeader>

      <CaseBody sections={SECTIONS}>
        <CaseSection id="problem" index="01" label="PROBLEM" title="Many sources, no single view">
          <ul className="grid gap-px border border-line bg-line md:grid-cols-3">
            {platform.problem.map((p, i) => (
              <li key={i} className="lift relative bg-s1 p-5 hover:z-10">
                <p className="label-code text-am">pain · {String(i + 1).padStart(2, '0')}</p>
                <p className="mt-2 text-[14px] text-mu">{p}</p>
              </li>
            ))}
          </ul>
        </CaseSection>

        <CaseSection id="architecture" index="02" label="ARCHITECTURE" title="From source to product" intro="A high-level view. Internals are intentionally left out.">
          <ArchitectureDiagram />
        </CaseSection>

        <CaseSection id="principles" index="03" label="PRINCIPLES" title="How it's built">
          <div className="grid gap-4 md:grid-cols-2">
            {platform.principles.map((d, i) => (
              <Panel key={d.title} title={`principle · ${String(i + 1).padStart(2, '0')}`} className="lift transition-colors hover:border-t-cy">
                <h3 className="font-display text-[19px] font-semibold">{d.title}</h3>
                <dl className="mt-3 space-y-3 text-[14px]">
                  <div>
                    <dt className="label-code text-cy">why</dt>
                    <dd className="mt-1 text-mu">{d.why}</dd>
                  </div>
                  <div>
                    <dt className="label-code text-am">trade-off</dt>
                    <dd className="mt-1 text-mu">{d.tradeoff}</dd>
                  </div>
                </dl>
              </Panel>
            ))}
          </div>
        </CaseSection>

        <CaseSection id="monitoring" index="04" label="OBSERVABILITY" title="Alerts before customers notice">
          <StatusBoard categories={platform.checkCategories} stats={platform.observabilityStats} />
        </CaseSection>

        <CaseSection id="enrichment" index="05" label="TEXT ENRICHMENT" title="From messy text to signals" intro={platform.enrichment.note}>
          <BlackBoxFlow inputs={platform.enrichment.inputs} layer={platform.enrichment.layer} outputs={platform.enrichment.outputs} />
          <p className="mt-6 font-mono text-[12px] text-mu">
            Related:{' '}
            <Link to="/#research" className="text-cy hover:underline">
              my published research on Vietnamese review mining →
            </Link>
          </p>
        </CaseSection>

        <CaseSection id="lessons" index="06" label="LESSONS" title="What I'd keep, what's next">
          <ul className="space-y-3">
            {platform.lessons.map((l) => (
              <li key={l} className="flex gap-3 text-[15px]">
                <span aria-hidden="true" className="font-mono text-cy">›</span>
                <span className="text-mu">{l}</span>
              </li>
            ))}
          </ul>
        </CaseSection>
      </CaseBody>

      <CaseNav prev={{ to: '/', label: 'Home' }} next={{ to: `/work/${lunchOrder.slug}`, label: lunchOrder.name }} />
    </>
  )
}
