import SectionAura from '../layout/SectionAura'
import Reveal from '../ui/Reveal'
import SectionHeader from '../ui/SectionHeader'

export default function CaseSection({ id, index, label, title, stage, sub, tone, intro, children }) {
  return (
    <section id={id} className="relative overflow-hidden scroll-mt-[-24px] border-b border-line py-14 last:border-b-0 md:py-20">
      <SectionAura layer="z-0" spine="column" tone={tone} side={Number(index) % 2 ? 'left' : 'right'} />
      <div className="relative z-[1]">
        <SectionHeader
          index={index}
          label={label}
          title={title}
          stage={stage}
          sub={sub}
          tone={tone}
          className={intro ? '[&>div:last-child]:lg:ml-[56px]' : undefined}
        >
          {intro}
        </SectionHeader>
        <Reveal className="lg:pl-[56px]">{children}</Reveal>
      </div>
    </section>
  )
}
