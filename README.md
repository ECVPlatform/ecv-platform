# ECV Platform

A private registry for meaningful experiences — built with Next.js 14, Supabase, and Resend.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript (strict)
- **Styling**: Tailwind CSS + custom CSS variables (ECV design system)
- **Database**: Supabase (PostgreSQL + Row Level Security)
- **Email**: Resend
- **Payments**: Stripe (Phase 2)
- **Deployment**: Vercel

---

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Set up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to **SQL Editor** and run the contents of `supabase-schema.sql`
3. Copy your project URL and API keys

### 3. Set up Resend

1. Create an account at [resend.com](https://resend.com)
2. Add and verify your domain (`ecvproject.com`)
3. Create an API key

### 4. Configure environment

```bash
cp .env.local.example .env.local
```

Fill in:
```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
RESEND_API_KEY=re_your_key
ECV_NOTIFY_EMAIL=hiro@ecvproject.com
NEXT_PUBLIC_APP_URL=https://ecvproject.com
```

### 5. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## App Structure

```
app/
  onboarding/       → S1–S4: Opening flow (moment selection → manifesto)
  home/             → S5: Personalized registry home
  chapter/[id]/     → S6: Chapter detail (OTF full, others preview)
    request/        → S7: Request form
    requested/      → S7b: Post-request confirmation
  gift/             → S8: Arigato Once More gift flow
  hosts/            → S9: Host directory
    apply/          → S10: Become a host application
  about/            → S11: About ECV + membership tiers
  memoir/           → S12: Write and save a Memoir
  registry/         → S13: Full registry browser
  api/
    request/        → POST: Save request + notify Hiro via email
    memoir/         → POST/GET: Save and retrieve memoirs
    gift/           → POST: Send gift + email recipient
    host/           → POST: Host application + notify Hiro

components/
  ui/               → All shared components (Button, Toast, BottomNav, ChapterRow...)

lib/
  data.ts           → 10 chapters + personalization map
  supabase.ts       → Supabase client

types/
  index.ts          → TypeScript types (Chapter, RequestPayload, MemoirPayload...)
```

---

## Routes Map

| URL | Screen |
|-----|--------|
| `/onboarding` | Opening → Moment → Turn → Manifesto |
| `/home` | Personalized registry home |
| `/chapter/ch001` | On The Fly detail |
| `/chapter/ch001/request` | Request form |
| `/chapter/ch001/requested` | Confirmation |
| `/gift` | Arigato Once More |
| `/hosts` | Host directory |
| `/hosts/apply` | Host application |
| `/about` | About ECV + membership |
| `/memoir` | Write a Memoir |
| `/registry` | Full registry |

---

## Deploy to Vercel

```bash
npx vercel --prod
```

Add all environment variables in Vercel Dashboard → Settings → Environment Variables.

---

## Phase 2 (next)

- [ ] Supabase Auth (Magic Link — email only, no passwords)
- [ ] User account + memoir archive
- [ ] Photo upload (Supabase Storage)
- [ ] Stripe Membership ($15 Member / $40 Signature)
- [ ] Host dashboard (view requests, manage availability)
- [ ] Admin view (all requests, all applications)
