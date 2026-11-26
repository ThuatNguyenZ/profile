import Reveal from '../ui/Reveal'
import SectionHeader from '../ui/SectionHeader'

export default function CaseSection({ id, index, label, title, intro, children }) {
  return (
    <section id={id} className="scroll-mt-28 border-b border-line py-14 last:border-b-0 md:py-20">
      <SectionHeader index={index} label={label} title={title}>
        {intro}
      </SectionHeader>
      <Reveal>{children}</Reveal>
    </section>
  )
}
