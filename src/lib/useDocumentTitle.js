import { useEffect } from 'react'

const SUFFIX = 'Nguyen Thien Thuat · Data Engineer'

export default function useDocumentTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} — ${SUFFIX}` : SUFFIX
  }, [title])
}
