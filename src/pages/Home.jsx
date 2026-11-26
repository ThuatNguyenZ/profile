import { motion, useReducedMotion } from 'framer-motion'
import { Github, Linkedin } from 'lucide-react'
import Button from '../components/ui/Button'
import Chip from '../components/ui/Chip'
import CopyEmail from '../components/ui/CopyEmail'
import KpiStrip from '../components/ui/KpiStrip'
import Panel from '../components/ui/Panel'
import PipelinePulse from '../components/ui/PipelinePulse'
import Reveal from '../components/ui/Reveal'
import SectionHeader from '../components/ui/SectionHeader'
import HeroAmbient from '../components/viz/HeroAmbient'
import HeroDag from '../components/viz/HeroDag'
import { kpis, profile } from '../content/profile'
import { platform } from '../content/platform'
import { lunchOrder } from '../content/lunchOrder'
import { stackLayers } from '../content/stack'
import { education, papers } from '../content/research'
import useDocumentTitle from '../lib/useDocumentTitle'

function HeadlineWords({ text, className }) {
  const reduce = useReducedMotion()
  const words = text.split(' ')
  if (reduce) return <h1 className={className}>{text}</h1>
  return (
    <h1 className={className} aria-label={text}>
      {words.map((w, i) => (
        <motion.span
          key={`${w}-${i}`}
          aria-hidden="true"
          className="mr-[0.25em] inline-block"
          initial={{ opacity: 0, y: 24, filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.6, delay: 0.08 * i, ease: [0.2, 0.7, 0.2, 1] }}
        >
          {w}
        </motion.span>
      ))}
    </h1>
  )
}

function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-line">
      <HeroAmbient />
      <div className="container-site relative py-14 md:py-20">
        <HeadlineWords text={profile.headline} className="heading-display max-w-4xl text-[38px] sm:text-[48px] lg:text-[60px]" />
        <Reveal>
          <p className="mt-5 max-w-2xl text-[16px] text-mu md:text-[17px]">{profile.subhead}</p>
        </Reveal>
        <div className="mt-10">
          <HeroDag />
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button to={`/work/${platform.slug}`}>Explore the platform →</Button>
          <Button to="/about">About me →</Button>
          <Button href="#platform" variant="ghost">&gt; See the pipeline</Button>
        </div>
        <div className="mt-12">
          <KpiStrip items={kpis} />
        </div>
      </div>
    </section>
  )
}

function Platform() {
  return (
    <section id="platform" className="border-b border-line py-16 md:py-24">
      <div className="container-site">
        <SectionHeader index="01" label="FEATURED PLATFORM" title={platform.name}>
          {platform.pitch}
        </SectionHeader>
        <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
          <Reveal>
            <p className="label-code">
              {platform.company} · {platform.role} · {platform.period}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {platform.chips.map((c) => (
                <Chip key={c}>{c}</Chip>
              ))}
            </div>
            <div className="mt-8">
              <Button to={`/work/${platform.slug}`}>Read the case study →</Button>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <PipelinePulse stages={platform.pulse} />
          </Reveal>
        </div>
        <ol className="mt-12 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-5">
          {platform.steps.map((step, i) => (
            <li key={step.label} className={`lift relative bg-s1 hover:z-10 p-4 ${step.highlight ? 'shadow-[inset_0_2px_0_#00F0FF]' : ''}`}>
              <p className="label-code text-[9.5px]">
                {String(i + 1).padStart(2, '0')} · {step.label}
              </p>
              <p className={`mt-1 font-display text-[16px] font-semibold ${step.highlight ? 'text-cy' : ''}`}>{step.title}</p>
              <p className="mt-1 font-mono text-[11px] text-mu">{step.detail}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

function Builds() {
  return (
    <section id="builds" className="border-b border-line py-16 md:py-24">
      <div className="container-site grid gap-10 lg:grid-cols-2 lg:items-center">
        <Reveal>
          <SectionHeader index="02" label="SIDE BUILD" title={lunchOrder.name} className="mb-6">
            {lunchOrder.pitch}
          </SectionHeader>
          <dl className="grid grid-cols-3 gap-px border border-line bg-line">
            {lunchOrder.facts.map((f) => (
              <div key={f.label} className="lift relative bg-s1 p-3 hover:z-10">
                <dt className="font-display text-[22px] font-semibold">{f.value}</dt>
                <dd className="text-[12px] leading-snug text-mu">{f.label}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-5 flex flex-wrap gap-2">
            {lunchOrder.chips.map((c) => (
              <Chip key={c}>{c}</Chip>
            ))}
          </div>
          <div className="mt-8">
            <Button to={`/work/${lunchOrder.slug}`}>See how it works →</Button>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <Panel
            title="policies.sql // illustrative"
            meta={
              <Chip tone="em" dot>
                v7 · live
              </Chip>
            }
            bodyClassName="p-0"
          >
            <pre className="overflow-x-auto bg-[#05060a] px-4 py-5 font-mono text-[12.5px] leading-[1.75] text-[#c9d1d9]">
              {lunchOrder.homeSnippet}
            </pre>
          </Panel>
        </Reveal>
      </div>
    </section>
  )
}

function Stack() {
  return (
    <section id="stack" className="border-b border-line py-16 md:py-24">
      <div className="container-site">
        <SectionHeader index="03" label="STACK, BY PIPELINE LAYER" title="What I reach for" />
        <div className="border-b border-line">
          {stackLayers.map((row) => (
            <Reveal key={row.layer}>
              <div className="grid gap-2 border-t border-line py-4 md:grid-cols-[180px_1fr]">
                <span className="label-code text-cy">{row.layer}</span>
                <span>{row.tools.join(' · ')}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function Research() {
  return (
    <section id="research" className="border-b border-line py-16 md:py-24">
      <div className="container-site grid gap-12 md:grid-cols-2">
        <div>
          <SectionHeader index="04" label="RESEARCH" title="Published" />
          {papers.map((p) => (
            <article key={p.doi} className="lift mb-6 border-l-2 border-vi pl-4">
              <a href={p.doi} target="_blank" rel="noreferrer" className="font-display text-[17px] font-semibold transition-colors link-grow hover:text-cy">
                {p.title} ↗
              </a>
              <p className="text-[14px] text-mu">{p.subtitle}</p>
              <p className="mt-1 font-mono text-[11px] text-dim">
                {p.venue} · {p.year} · {p.rank}
              </p>
            </article>
          ))}
        </div>
        <div>
          <SectionHeader label="EDUCATION" title="Studied" />
          {education.map((e) => (
            <article key={e.degree} className="lift mb-6 border-l-2 border-cy pl-4">
              <p className="font-display text-[17px] font-semibold">{e.degree}</p>
              <p className="text-[14px] text-mu">{e.school}</p>
              <p className="mt-1 font-mono text-[11px] text-dim">
                {e.period}
                {e.note ? ` · ${e.note}` : ''}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function Contact() {
  return (
    <section id="contact" className="py-16 md:py-24">
      <div className="container-site">
        <SectionHeader index="05" label="CONTACT" title="Have a pipeline that needs an owner?">
          Based in {profile.location}. Email is the fastest way to reach me.
        </SectionHeader>
        <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center">
          <CopyEmail email={profile.email} />
          <div className="flex gap-2">
            <Button href={profile.github} variant="ghost" target="_blank" rel="noreferrer">
              <Github size={14} /> GitHub
            </Button>
            <Button href={profile.linkedin} variant="ghost" target="_blank" rel="noreferrer">
              <Linkedin size={14} /> LinkedIn
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  useDocumentTitle(null)
  return (
    <>
      <Hero />
      <Platform />
      <Builds />
      <Stack />
      <Research />
      <Contact />
    </>
  )
}
