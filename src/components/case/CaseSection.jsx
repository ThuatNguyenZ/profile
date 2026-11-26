import SectionAura from '../layout/SectionAura'
import Reveal from '../ui/Reveal'
import SectionHeader from '../ui/SectionHeader'

export default function CaseSection({ id, index, label, title, stage, sub, tone, intro, children }) {
  return (
    <section id={id} className="relative isolate overflow-hidden scroll-mt-[-24px] border-b border-line py-14 last:border-b-0 md:py-20">
      <SectionAura tone={tone} side={Number(index) % 2 ? 'left' : 'right'} />
      <SectionHeader index={index} label={label} title={title} stage={stage} sub={sub} tone={tone}>
        {intro}
      </SectionHeader>
      <Reveal>{children}</Reveal>
    </section>
  )
}
