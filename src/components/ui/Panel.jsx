export default function Panel({ title, meta, className = '', bodyClassName = 'p-4', children }) {
  return (
    <div className={`panel ${className}`}>
      {(title || meta) && (
        <div className="flex items-center justify-between gap-3 border-b border-line px-3 py-2">
          {title && <span className="label-code">{title}</span>}
          {meta}
        </div>
      )}
      <div className={bodyClassName}>{children}</div>
    </div>
  )
}
