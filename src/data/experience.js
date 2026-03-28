export const experiences = [
  {
    company: 'BA3 Studio',
    website: 'https://analytic.ba3.studio/',
    role: 'Data Engineer',
    period: 'Nov. 2024 – Present',
    location: 'Ho Chi Minh City, Vietnam',
    description: 'Data-driven service & software for digital commerce. Helps brands optimize every move through data-driven innovation on dashboards, AI-powered recommendations on factors that directly affect revenue such as promotion and keyword on Shopee, TikTokshop, Lazada and other platforms.',
    techStack: [
      'AWS (EC2, S3, RDS, Glue, Lambda)',
      'GitHub Actions',
      'PostgreSQL',
      'FastAPI',
      'Redis',
      'Celery',
      'Docker',
      'React',
    ],
    metrics: [
      {
        value: '50M+',
        label: 'Records processed daily',
        icon: 'Database',
      },
      {
        value: '3',
        label: 'E-commerce platforms automated',
        icon: 'ShoppingCart',
      },
      {
        value: '-90%',
        label: 'Reduction in manual extraction time',
        icon: 'Clock',
      },
      {
        value: 'Minutes',
        label: 'CI/CD deployment (from hours)',
        icon: 'Rocket',
      },
    ],
    architecture: {
      title: 'Data Architecture',
      services: [
        { name: 'EC2', description: 'Data Ingestion', icon: 'compute' },
        { name: 'S3', description: 'Raw Storage', icon: 'storage' },
        { name: 'Glue', description: 'ETL Processing', icon: 'etl' },
        { name: 'Lambda', description: 'Real-time Processing', icon: 'function' },
        { name: 'PostgreSQL', description: 'Structured Storage', icon: 'database' },
      ],
    },
  },
]

export const skillDomains = [
  {
    name: 'Languages & Frameworks',
    level: 'Expert',
    levelColor: '#10B981',
    skills: ['Python', 'SQL', 'JavaScript', 'FastAPI', 'React'],
  },
  {
    name: 'Data Processing & Storage',
    level: 'Senior',
    levelColor: '#3B82F6',
    skills: ['PostgreSQL', 'MongoDB', 'Redis', 'Apache Spark', 'Apache Kafka', 'Hadoop'],
  },
  {
    name: 'Cloud & DevOps',
    level: 'Senior',
    levelColor: '#3B82F6',
    skills: ['AWS (EC2, S3, RDS, Glue, Lambda)', 'Docker', 'Git', 'GitHub Actions', 'CI/CD Pipelines'],
  },
]
