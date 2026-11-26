export const platform = {
  slug: 'ba3-data-platform',
  name: 'BA3 Data Platform',
  company: 'BA3 Studio',
  role: 'Data Engineer — owner of the data platform',
  period: '03/2025 → now',
  pitch:
    'The data platform behind an e-commerce analytics product: commerce and advertising data collected, stored, modeled and monitored end to end.',
  chips: ['Python', 'AWS', 'PostgreSQL', 'Parquet', 'Grafana', 'CI/CD'],

  sourceGroups: [
    { id: 'marketplaces', label: 'MARKETPLACES' },
    { id: 'ads', label: 'AD PLATFORMS' },
  ],
  heroNodes: {
    sources: { label: 'SOURCES', role: 'Marketplace and advertising data, collected on schedule.' },
    lake: { label: 'DATA LAKE', role: 'Raw data kept as-is, so history can be replayed.' },
    warehouse: { label: 'WAREHOUSE', role: 'Cleaned, analysis-ready models.' },
    analytics: { label: 'ANALYTICS', role: 'Dashboards and recommendations brands act on.' },
    observe: { label: 'MONITORING', role: 'Automated checks watch every stage and raise alerts.' },
  },
  heroHint: 'Hover or focus a node to see what it does.',

  pulse: [
    { label: 'Collect', note: 'commerce & ads' },
    { label: 'Land', note: 'raw, replayable' },
    { label: 'Model', note: 'clean tables' },
    { label: 'Serve', note: 'analytics' },
  ],

  steps: [
    { label: 'COLLECT', title: 'Multi-source intake', detail: 'scheduled · resilient' },
    { label: 'LAND', title: 'Data lake', detail: 'raw · replayable' },
    { label: 'MODEL', title: 'Warehouse', detail: 'clean · analysis-ready', highlight: true },
    { label: 'ENRICH', title: 'Text signals', detail: 'unstructured → structured' },
    { label: 'OBSERVE', title: 'Monitoring', detail: 'automated checks · alerts' },
  ],

  problem: [
    'Commerce and advertising data arrived from many places, each with its own access rules and limits.',
    'Processing was spread across ad-hoc scripts that were hard to rerun or reason about.',
    'There was no single place to see whether data was complete and on time.',
  ],

  architecture: [
    { id: 'sources', step: '01', label: 'SOURCES', title: 'Commerce & ads', role: 'Marketplace and advertising data, collected on schedule.' },
    { id: 'lake', step: '02', label: 'DATA LAKE', title: 'Raw, replayable', role: 'Data lands untouched first, so any period can be reprocessed.' },
    { id: 'warehouse', step: '03', label: 'WAREHOUSE', title: 'Clean models', role: 'Consistent, analysis-ready tables across sources.' },
    { id: 'product', step: '04', label: 'PRODUCT', title: 'Analytics', role: 'Powers the dashboards and recommendations brands use.' },
  ],
  observability: {
    title: 'MONITORING — across every stage',
    role: 'Automated checks on every stage, with alerts when something drifts.',
  },

  principles: [
    { title: 'Simple, resumable orchestration', why: 'Jobs can stop and pick up where they left off, so a failure costs minutes, not days.', tradeoff: 'Fewer built-in features than a heavyweight scheduler.' },
    { title: 'Raw first, transform later', why: 'Keeping source data untouched makes every fix replayable.', tradeoff: 'More storage to manage.' },
    { title: 'Clear boundaries between layers', why: 'Each layer has one job and depends in one direction, which keeps changes local.', tradeoff: 'A little more structure up front.' },
    { title: 'Migrate in small, verified steps', why: 'Old and new paths ran side by side until results matched.', tradeoff: 'A period of running both.' },
  ],

  checkCategories: [
    { name: 'Runs', detail: 'Did scheduled work start and finish on time?' },
    { name: 'Freshness', detail: 'Is new data still arriving?' },
    { name: 'Completeness', detail: 'Did each load write what it should?' },
    { name: 'Sources', detail: 'Are upstream systems healthy and reachable?' },
    { name: 'Access', detail: 'Are credentials valid before they expire?' },
    { name: 'Infrastructure', detail: 'Is the platform itself healthy?' },
  ],
  observabilityStats: [
    { value: '24/7', label: 'automated checks' },
    { value: 'alerts', label: 'with mute & reminders' },
    { value: 'boards', label: 'for every stage' },
    { value: 'early', label: 'problems surface before anyone asks' },
  ],

  enrichment: {
    note: 'Customer text is messy — slang, abbreviations, missing accents. A dedicated layer turns it into signals analysts can count.',
    inputs: ['Unstructured customer text'],
    layer: 'Text enrichment',
    outputs: ['Clean text', 'Themes', 'Sentiment'],
  },

  lessons: [
    'Monitoring pays for itself quickly — problems now surface before anyone asks.',
    'Writing the runbook while building leads to simpler designs.',
    'Next: clearer data contracts between layers.',
  ],
}
