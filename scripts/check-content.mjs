// Fails when source text contains terms the spec forbids (see spec §3).
import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'

const ROOT = process.cwd()
const TARGETS = ['src', 'index.html']
const EXTENSIONS = ['.js', '.jsx', '.css', '.html']

const RULES = [
  [/crawl/i, 'say "public data collection"'],
  [/playwright|devtools|\bCDP\b|pychrome/i, 'say "public-data collection tooling"'],
  [/\bapi_[a-z]+|silver_ecom|crawl_[a-z]+|pipeline_meta|api_control/i, 'internal table or schema name'],
  [/\bbronze\b|\bsilver\b/i, 'use "raw" / "clean" warehouse'],
  [/run_pipeline|ingestion\.|orchestration\/|transform\.enrichment/i, 'internal module or command'],
  [/xlm-?r\b|xlm-roberta|visobert|masked lm/i, 'internal model detail'],
  [/ap-southeast|BA3-tech-team|shopee_ads/i, 'infrastructure identifier'],
  [/\b(R[1-5]|E[12]|L[12]|F[12]|A[1-3]|S1|T1|H[1-6])\b/, 'monitor check code'],
]

function walk(path) {
  const stat = statSync(path)
  if (stat.isFile()) return [path]
  return readdirSync(path).flatMap((name) => walk(join(path, name)))
}

const files = TARGETS.flatMap((t) => walk(join(ROOT, t))).filter((f) =>
  EXTENSIONS.some((ext) => f.endsWith(ext)),
)

const problems = []
for (const file of files) {
  const lines = readFileSync(file, 'utf8').split(/\r?\n/)
  lines.forEach((line, i) => {
    for (const [pattern, hint] of RULES) {
      if (pattern.test(line)) {
        problems.push(`${relative(ROOT, file)}:${i + 1}  ${hint}  →  ${line.trim().slice(0, 100)}`)
      }
    }
  })
}

if (problems.length) {
  console.error(`check-content: ${problems.length} problem(s)\n` + problems.join('\n'))
  process.exit(1)
}
console.log(`check-content: ok (${files.length} files)`)
