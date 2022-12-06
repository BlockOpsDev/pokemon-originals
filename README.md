# Pokemon Originals Monorepo

This is the monorepo for the Pokemon Originals Airdrop managed with [Turborepo](https://turborepo.org/).

## Apps

- `dapp`: a [Next.js](https://nextjs.org) app with [Tailwind CSS](https://tailwindcss.com/)
- `ethereum`: a [Hardhat](https://hardhat.org/) project

# Getting Started

This is monorepo is design to be run entirely in [Github Codespaces](https://github.com/features/codespaces).

## Install Dependencies

```bash
# Not required if using Github Codespaces
Install pnpm
```

## Run Locally

```bash
# Launch Hardhat node @ http://localhost:8545 & compiles contracts
# Launch Next.js app @ http://localhost:3000 with hot reaload
pnpm dev
```

# Utilities

Various frameworks/libraries/utilities used throughout the monorepo.

**Frontend**

- [React](https://reactjs.org/) for frontend libary
- [Next.js](https://nextjs.org/) for frontend framework
- [Wagmi](https://wagmi.sh/) for ethereum integration
- [Tailwind CSS](https://tailwindcss.com/) for styling

**Ethereum**

- [Hardhat](https://hardhat.org/) for solidity development
- [merkle-distributor](https://github.com/Uniswap/merkle-distributor) for airdrop distribution

**Repository**

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [Turborepo](https://turborepo.org/) for monorepo management
- [Prettier](https://prettier.io) for code formatting
- [ESLint](https://eslint.org/) for linting
