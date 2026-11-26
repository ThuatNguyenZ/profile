import Button from '../components/ui/Button'
import CaseBody from '../components/case/CaseBody'
import CaseHeader from '../components/case/CaseHeader'
import CaseSection from '../components/case/CaseSection'
import Timeline from '../components/about/Timeline'
import { about } from '../content/about'
import { profile } from '../content/profile'
import { platform } from '../content/platform'
import useDocumentTitle from '../lib/useDocumentTitle'

const SECTIONS = [
  { id: 'story', label: 'Story' },
  { id: 'timeline', label: 'Timeline' },
  { id: 'how-i-work', label: 'How I work' },
]

export default function About() {
  useDocumentTitle('About')
  return (
    <>
      <CaseHeader kicker={about.kicker} title={about.title} role={profile.role} period={profile.location} chips={[]} slug={about.slug} crumbs={[]}>
        <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_280px] md:items-center">
          <div>
            <p className="max-w-2xl text-[17px] text-mu md:text-[19px]">{about.lead}</p>
            <dl className="mt-8 grid gap-px border border-line bg-line sm:grid-cols-2">
              {about.facts.map((f) => (
                <div key={f.label} className="lift relative bg-s1 p-4 hover:z-10">
                  <dt className="label-code">{f.label}</dt>
                  <dd className="mt-1 text-[14px]">{f.value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <figure className="lift relative mx-auto w-full max-w-[280px] border border-line bg-s1 p-2">
            <img src={about.photo.src} alt={about.photo.alt} className="aspect-[4/5] w-full object-cover grayscale-[35%] transition-[filter] duration-500 hover:grayscale-0" />
            <figcaption className="mt-2 flex items-center justify-between font-mono text-[10px] text-dim">
              <span>{profile.name.toLowerCase()}</span>
              <span className="text-em">● online</span>
            </figcaption>
          </figure>
        </div>
      </CaseHeader>

      <CaseBody sections={SECTIONS}>
        <CaseSection id="story" index="01" label="STORY" title="How I got here">
          <div className="max-w-2xl space-y-5 text-[16px] leading-relaxed text-mu">
            {about.story.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>
        </CaseSection>

        <CaseSection id="timeline" index="02" label="TIMELINE" title="Milestones">
          <Timeline items={about.timeline} />
        </CaseSection>

        <CaseSection id="how-i-work" index="03" label="HOW I WORK" title="Four habits">
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
