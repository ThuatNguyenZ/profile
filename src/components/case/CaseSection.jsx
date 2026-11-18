import Reveal from '../ui/Reveal'
import SectionHeader from '../ui/SectionHeader'

export default function CaseSection({ index, label, title, intro, children }) {
  return (
    <section className="border-b border-line py-14 md:py-20">
      <div className="container-site">
        <SectionHeader index={index} label={label} title={title}>
          {intro}
        </SectionHeader>
        <Reveal>{children}</Reveal>
      </div>
    </section>
  )
}
