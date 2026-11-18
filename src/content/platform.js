export const platform = {
  slug: 'ba3-data-platform',
  name: 'BA3 Data Platform',
  company: 'BA3 Studio',
  companyUrl: 'https://analytic.ba3.studio/',
  role: 'Data Engineer — owner of the pipeline',
  period: '03/2025 → now',
  pitch:
    'The data platform behind an e-commerce analytics product: six sources collected on schedule, landed in a lake, modeled in a warehouse, and watched around the clock.',
  chips: ['Python 3.11', 'AWS S3 · EC2 · SSM · SES', 'PostgreSQL', 'Parquet', 'Grafana', 'GitHub Actions'],

  sources: ['Shopee', 'Lazada', 'TikTok Shop', 'Amazon', 'Meta Ads', 'Google Ads'],

  heroNodes: {
    sources: { label: 'SOURCES', role: 'Official marketplace APIs, ad platforms and public data, collected on schedule.' },
    lake: { label: 'DATA LAKE', role: 'Immutable raw storage — any day can be replayed.' },
    raw: { label: 'WAREHOUSE · RAW', role: 'Source-shaped tables, loaded idempotently.' },
    clean: { label: 'WAREHOUSE · CLEAN', role: 'Cross-source, analysis-ready models.' },
    analytics: { label: 'ANALYTICS', role: 'Dashboards and recommendations brands act on.' },
    observe: { label: 'OBSERVE', role: '20+ checks run every 15 minutes and alert by email.' },
  },
  heroHint: 'Hover or focus a node to see what it does.',

  terminal: [
    { kind: 'dim', text: '# scripted demo — names redacted' },
    { kind: 'cmd', text: 'pipeline run --dry-run' },
    { kind: 'out', text: 'collect   ✓  6 sources planned' },
    { kind: 'out', text: 'land      ✓  lake partitions resolved' },
    { kind: 'out', text: 'load      ✓  warehouse targets resolved' },
    { kind: 'out', text: 'checks    ✓  monitors armed' },
    { kind: 'dim', text: 'exit 0 · nothing executed' },
  ],

  steps: [
    { label: 'COLLECT', title: 'APIs + public data', detail: '6 sources · retries · rate limits' },
    { label: 'LAND', title: 'Data lake', detail: 'immutable raw · columnar exports' },
    { label: 'MODEL', title: 'Raw → clean', detail: 'idempotent loads · cross-source', highlight: true },
    { label: 'ENRICH', title: 'Review text', detail: 'topics · sentiment' },
    { label: 'OBSERVE', title: '20+ checks', detail: '8 dashboards · email alerts' },
  ],

  problem: [
    'Six sources, six access patterns: official marketplace APIs, ad platforms with their own quotas and token lifecycles, and public web data.',
    'Logic lived in scattered scripts on several machines, each with its own configuration and failure modes.',
    'Nobody could say at a glance whether yesterday's data had arrived — customers noticed first.',
  ],

  architecture: [
    { id: 'sources', step: '01', label: 'SOURCES', title: '6 sources', role: 'Marketplace APIs, ad platforms and public data.' },
    { id: 'collection', step: '02', label: 'COLLECTION', title: 'Scheduled extractors', role: 'Retries, rate limiting and token handling per source.' },
    { id: 'lake', step: '03', label: 'DATA LAKE', title: 'Immutable raw', role: 'Raw storage partitioned by date — enables replay.' },
    { id: 'warehouse', step: '04', label: 'WAREHOUSE', title: 'Raw → clean', role: 'Idempotent loads, then cross-source models.' },
    { id: 'product', step: '05', label: 'PRODUCT', title: 'Analytics', role: 'Feeds the dashboards and recommendations brands use.' },
  ],
  observability: {
    title: 'OBSERVABILITY — every stage, every 15 minutes',
    role: 'Watches runs, freshness, loads, APIs, credentials and hosts; alerts by email.',
  },

  decisions: [
    {
      title: 'Lightweight in-house orchestration',
      why: 'A handful of scheduled jobs on one host did not justify a scheduler cluster. A small runner gives locks, timeouts, resumable stages and clear exit codes.',
      tradeoff: 'No web UI out of the box — covered by run summaries and dashboards.',
    },
    {
      title: 'Raw data stays immutable',
      why: 'Every extract lands untouched before any parsing, so a bug fix can be replayed over past days instead of re-fetched.',
      tradeoff: 'More storage — kept in check with columnar exports and date partitions.',
    },
    {
      title: 'Layer boundaries enforced in code',
      why: 'Shared libraries, collectors, transforms and monitoring may only depend in one direction; a test fails the build when an import crosses a boundary.',
      tradeoff: 'Occasional indirection to keep the dependency graph clean.',
    },
    {
      title: 'Phased migration, zero downtime',
      why: 'The platform replaced the old scripts in five cutover phases, each verified side by side before switching.',
      tradeoff: 'Weeks of running two systems in parallel.',
    },
  ],

  checkCategories: [
    { name: 'Run health', detail: 'Did every scheduled run start, finish, and finish on time?' },
    { name: 'Data freshness', detail: 'Is new data still arriving for every source?' },
    { name: 'Load integrity', detail: 'Did loads complete and write the rows they should?' },
    { name: 'API health', detail: 'Rate limits, latency and server errors per endpoint.' },
    { name: 'Credentials', detail: 'Tokens refreshed before they expire.' },
    { name: 'Infrastructure', detail: 'Disk, schedules, deployed version and network rules.' },
  ],
  observabilityStats: [
    { value: '20+', label: 'checks' },
    { value: '8', label: 'dashboards' },
    { value: '15 min', label: 'check interval' },
    { value: 'email', label: 'alerts with mute & reminders' },
  ],

  enrichment: {
    note: 'Vietnamese reviews are full of slang, abbreviations and missing diacritics. A dedicated layer turns them into something analysts can aggregate — versioned, so results stay reproducible.',
    inputs: ['Raw Vietnamese reviews', 'Star ratings'],
    layer: 'Normalization & enrichment',
    outputs: ['Normalized text', 'Topics', 'Sentiment'],
  },

  lessons: [
    'Monitoring paid for itself in the first week — alerts now arrive before customers do.',
    'Writing the runbook while building forced simpler interfaces.',
    'Next: data contracts at the warehouse boundary and self-serve backfills.',
  ],
}
