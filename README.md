# Coinflow Purchase Demo

This is a simple React TypeScript project demonstrating the integration of Coinflow's Purchase component.

## Prerequisites

- Node.js (v14 or later)
- pnpm (recommended) or yarn
- A Coinflow merchant account and merchant ID

## Setup

1. Clone the repository
2. Install dependencies:
```bash
pnpm install
```

3. Update the `merchantId` in `src/App.tsx` with your actual Coinflow merchant ID.

## Running the Project

To start the development server:

```bash
pnpm start
```

The application will be available at `http://localhost:3000`.

## Important Notes

- The project is currently set to use the `sandbox` environment. For production use, change `env="sandbox"` to `env="prod"` in the `CoinflowPurchase` component.
- The current implementation uses a dummy Solana wallet. In a real application, you should integrate with a proper wallet provider like `@solana/wallet-adapter-react`.
- The amount is hardcoded to 1000 cents ($10.00). Modify the `amount` prop according to your needs.

## Component Props

The `CoinflowPurchase` component accepts the following props:

- `env`: 'prod' | 'sandbox' - The environment to use
- `wallet`: Solana wallet instance that implements the required interface
- `blockchain`: 'solana' - The blockchain to use
- `merchantId`: Your Coinflow merchant ID
- `connection`: Solana connection instance
- `amount`: Amount in cents 