# Pokemon Originals Monorepo

This is the monorepo for the Pokemon Originals Airdrop managed with [Turborepo](https://turborepo.org/).

## Apps

- `dapp`: a [Next.js](https://nextjs.org) app with [Tailwind CSS](https://tailwindcss.com/)
- `ethereum`: a [Hardhat](https://hardhat.org/) project

# Getting Started

This is monorepo is design to be run entirely in [Github Codespaces](https://github.com/features/codespaces).

```bash
# Launch Hardhat node @ http://localhost:8545
# Launch Cloudflare Workers KV @ http://localhost:?
# Launch Next.js app @ http://localhost:3000 with hot reaload
pnpm dev
```

# Utilities

Various frameworks/libraries/utilities used throughout the monorepo.

- [Next.js](https://nextjs.org/) React framework
- [Tailwind CSS](https://tailwindcss.com/) for styles
- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting
- [Hardhat](https://hardhat.org/) for solidity development
