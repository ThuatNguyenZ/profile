export const stackLayers = [
  { layer: 'INGEST', tools: ['Python', 'REST / Graph APIs', 'public-data collection tooling'] },
  { layer: 'STORE', tools: ['AWS S3', 'Parquet', 'PostgreSQL', 'Redis', 'Cassandra', 'MongoDB'] },
  { layer: 'TRANSFORM', tools: ['pandas', 'pyarrow', 'SQL', 'AWS Glue', 'Spark', 'Kafka'] },
  { layer: 'ORCHESTRATE', tools: ['custom orchestration', 'cron', 'Celery', 'GitHub Actions', 'Docker'] },
  { layer: 'OBSERVE', tools: ['Grafana', 'CloudWatch', 'email alerting'] },
  { layer: 'ML / NLP', tools: ['PyTorch', 'Transformers', 'Keras'] },
]
