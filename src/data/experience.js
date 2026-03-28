export const experiences = [
  {
    company: 'BA3 Studio',
    website: 'https://demo.ba3.studio',
    role: 'Data Engineer',
    period: 'Nov. 2024 – Present',
    location: 'Ho Chi Minh City, Vietnam',
    description: 'Data-driven service & software for digital commerce. Helps brands optimize every move through data-driven innovation on dashboards, AI-powered recommendations on factors that directly affect revenue such as promotion and keyword on Shopee, TikTokshop, Lazada and other platforms.',
    technologies: [
      'AWS (EC2, S3, RDS, Glue, Lambda)',
      'GitHub Actions',
      'PostgreSQL',
      'FastAPI',
      'Redis',
      'Celery',
      'Docker',
      'React',
    ],
    achievements: [
      {
        metric: 'Millions',
        label: 'Records processed daily via ETL pipelines',
        icon: 'Database',
      },
      {
        metric: '3',
        label: 'E-commerce platforms automated (Shopee, TikTok, Lazada)',
        icon: 'ShoppingCart',
      },
      {
        metric: '-90%',
        label: 'Reduction in manual extraction time',
        icon: 'Clock',
      },
      {
        metric: 'Minutes',
        label: 'Deployment time with CI/CD (from hours)',
        icon: 'Rocket',
      },
    ],
    pipeline: {
      title: 'Data Architecture',
      stages: [
        { name: 'EC2', description: 'Data Ingestion' },
        { name: 'S3', description: 'Raw Storage' },
        { name: 'Glue', description: 'ETL Processing' },
        { name: 'Lambda', description: 'Real-time Processing' },
        { name: 'PostgreSQL', description: 'Structured Storage' },
      ],
    },
  },
]
