# ShopEase Full-Stack

ShopEase is organized as a production-ready TypeScript monorepo with a React client and an Express API. The existing UI is preserved; the codebase is separated into clear routing, state, presentation, service, and backend layers.

## Architecture

```text
e-commerce-website/
├── client/
│   ├── public/                 # Static assets
│   └── src/
│       ├── app/                # Application composition root
│       ├── components/         # Reusable UI components by domain
│       │   ├── layout/
│       │   ├── navigation/
│       │   └── products/
│       ├── config/             # Typed client environment config
│       ├── contexts/           # React context definitions
│       ├── data/               # Local/static application data
│       ├── hooks/              # Reusable application hooks
│       ├── layouts/            # Route-level page layouts
│       ├── pages/              # Route page components
│       ├── providers/          # Global state providers
│       ├── routes/             # Central route configuration
│       ├── services/api/       # Backend API client and services
│       ├── styles/             # Global CSS and Tailwind entrypoint
│       ├── types/              # Shared TypeScript contracts
│       └── utils/              # Pure helper functions
├── server/
│   └── src/
│       ├── config/             # Validated server environment config
│       ├── controllers/        # HTTP request/response handlers
│       ├── lib/                # External SDK clients
│       ├── middleware/         # Express error and 404 middleware
│       ├── routes/             # Modular Express routers
│       ├── services/           # Business and integration logic
│       ├── app.ts              # Testable Express application
│       └── index.ts            # Server bootstrap and shutdown
├── package.json                # Shared development commands
└── README.md
```

## Environment variables

Copy the example files and add the appropriate local values:

- `client/.env.example` → `client/.env`
- `server/.env.example` → `server/.env`

Real environment files are ignored by Git. Browser-safe values use the `VITE_` prefix. Secrets that must remain private belong only in `server/.env`.

## Commands

Install dependencies:

```bash
npm install
npm install --prefix client
npm install --prefix server
```

Run the client and API together:

```bash
npm run dev
```

Create production builds for both packages:

```bash
npm run build
```

The API defaults to `http://localhost:3000`, with health information available at `GET /api/health`.

## Conventions

- Pages only compose route-level UI.
- Reusable UI belongs in `components/` and is grouped by domain.
- Global state is exposed through providers and custom hooks.
- Browser-to-server requests go through `services/api/`.
- Express routes delegate to controllers, and controllers delegate to services.
- External integrations such as Supabase are initialized once in `lib/`.
