import PipelineSpine from '../layout/PipelineSpine'
import CaseToc from './CaseToc'

export default function CaseBody({ sections, children }) {
  return (
    <div className="container-site lg:grid lg:grid-cols-[190px_minmax(0,1fr)] lg:gap-14">
      <CaseToc sections={sections} />
      <div className="min-w-0">
        <PipelineSpine align="self">{children}</PipelineSpine>
      </div>
    </div>
  )
}
