import { lazy, Suspense } from 'react'
import Button from '../components/ui/Button'
import CaseBody from '../components/case/CaseBody'
import CaseHeader from '../components/case/CaseHeader'
import CaseSection from '../components/case/CaseSection'
import AboutPhoto from '../components/about/AboutPhoto'
import EngineerTable from '../components/about/EngineerTable'
import Timeline from '../components/about/Timeline'
import { about } from '../content/about'
import { profile } from '../content/profile'
import { platform } from '../content/platform'
import useDocumentTitle from '../lib/useDocumentTitle'

const HeroNetwork = lazy(() => import('../components/viz/HeroNetwork'))

const SECTIONS = [
  { id: 'story', label: 'Story' },
  { id: 'timeline', label: 'Timeline' },
  { id: 'how-i-work', label: 'How I work' },
]

export default function About() {
  useDocumentTitle('About')
  return (
    <>
      <CaseHeader
        kicker={about.kicker}
        title={about.title}
        role={profile.role}
        period={profile.location}
        chips={[]}
        slug={about.slug}
        crumbs={[]}
        backdrop={<Suspense fallback={null}><HeroNetwork mask="[mask-image:linear-gradient(to_right,transparent_0%,transparent_50%,rgb(var(--c-canvas)/0.35)_62%,rgb(var(--c-canvas))_80%)]" /></Suspense>}
      >
        <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_260px] md:items-start">
          <div>
            <p className="max-w-2xl text-[17px] text-mu md:text-[19px]">{about.lead}</p>
            <div className="mt-8"><EngineerTable data={about.engineer} /></div>
          </div>
          <AboutPhoto className="max-w-[280px]" />
        </div>
      </CaseHeader>

      <CaseBody sections={SECTIONS}>
        <CaseSection id="story" index="01" label="STORY" stage="SOURCE" tone="cy" title="How I got here">
          <div className="max-w-2xl space-y-5 text-[16px] leading-relaxed text-mu">
            {about.story.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>
        </CaseSection>

        <CaseSection id="timeline" index="02" label="TIMELINE" stage="HISTORY" tone="vi" title="Milestones">
          <Timeline items={about.timeline} />
        </CaseSection>

        <CaseSection id="how-i-work" index="03" label="HOW I WORK" stage="RULES" tone="em" title="Four habits">
          <div className="grid gap-4 md:grid-cols-2">
            {about.principles.map((p, i) => (
              <div key={p.title} className="lift panel p-5">
                <p className="label-code text-cy">habit · {String(i + 1).padStart(2, '0')}</p>
                <h3 className="mt-2 font-display text-[19px] font-semibold">{p.title}</h3>
                <p className="mt-2 text-[14px] text-mu">{p.text}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap gap-3">
            <Button to={`/work/${platform.slug}`}>See the platform →</Button>
            <Button to="/#contact" variant="ghost">
              Get in touch →
            </Button>
          </div>
        </CaseSection>
      </CaseBody>
    </>
  )
}
