export const lunchOrder = {
  slug: 'lunch-order',
  name: 'Lunch-Order',
  role: 'Solo builder',
  period: '11/2026',
  pitch:
    'An internal app the whole office uses every day to order lunch and drinks. Built the way a data engineer would: the business rules live in Postgres, the client stays thin.',
  facts: [
    { value: 'daily', label: 'used by the whole office' },
    { value: '7', label: 'releases' },
    { value: '$0', label: 'per month on free tiers' },
  ],
  chips: ['Supabase', 'PostgreSQL · RLS', 'React 19 · TypeScript', 'PWA', 'VietQR / MoMo'],

  homeSnippet: `create policy "members read their own orders"
  on orders for select
  using (user_id = auth.uid());`,

  problem:
    'Orders were collected in a group chat, tallied by hand, and payments tracked in someone's head. Small mistakes cost money and goodwill every day.',

  entities: [
    { id: 'members', name: 'Members', fields: ['role', 'approval status', 'default note'] },
    { id: 'sessions', name: 'Daily sessions', fields: ['cutoff time', 'collector', 'available items'] },
    { id: 'shops', name: 'Shops', fields: ['name', 'contact', 'menu photos'] },
    { id: 'payments', name: 'Payments & rewards', fields: ['amount', 'status', 'balance'] },
    { id: 'orders', name: 'Orders + items', fields: ['quantity', 'note', 'delivered'] },
    { id: 'menu', name: 'Menu items', fields: ['price', 'icon', 'rating'] },
  ],
  relations: [
    ['shops', 'menu', 'has'],
    ['shops', 'sessions', 'opens'],
    ['sessions', 'orders', 'collects'],
    ['members', 'orders', 'places'],
    ['menu', 'orders', 'ordered as'],
    ['members', 'payments', 'settles'],
  ],

  logic: [
    'Row-level security decides who sees what — members see their own orders and today's board, never other people's payments.',
    'Triggers enforce the cutoff time and keep totals consistent.',
    'RPC functions wrap multi-step actions, like settling a week or granting a reward, in one transaction.',
  ],
  rlsSnippet: `-- illustrative
create policy "members read their own orders"
  on orders for select
  using (user_id = auth.uid());

create policy "no edits after cutoff"
  on orders for update
  using (user_id = auth.uid() and not session_closed(session_id));`,

  testing:
    'Database behavior — policies, triggers and RPCs — runs against PGlite, a real Postgres compiled to WebAssembly, inside the test runner. No Docker, no shared database, seconds per run.',

  milestones: [
    { version: 'v1–v2', title: 'Core ordering', text: 'Sessions, menus, cutoff times, a summary to send to the shop, delivery ticks.' },
    { version: 'v3–v5', title: 'Money', text: 'Per-session collectors, weekly and monthly payment views, rewards that offset debt, bulk rewards.' },
    { version: 'v6–v7', title: 'Delight', text: 'Dish ratings, leaderboards, personal stats, QR bank/MoMo payments with admin confirmation.' },
  ],

  stack: [
    { key: 'Frontend', value: 'React 19 · TypeScript · Vite · Tailwind · PWA' },
    { key: 'Backend', value: 'Supabase — Postgres, Auth, Storage, Realtime' },
    { key: 'Auth', value: 'Google OAuth with admin approval' },
    { key: 'Hosting', value: 'Cloudflare Pages' },
    { key: 'Cost', value: '$0 / month on free tiers' },
  ],
}
