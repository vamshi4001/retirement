# Retirement Calculator with Tax-Advantaged Accounts

A comprehensive retirement planning tool that helps users calculate retirement needs, track multiple investment vehicles, and manage real estate portfolios. Built with Next.js, TypeScript, and Tailwind CSS.

![Retirement Calculator Screenshot](/api/placeholder/800/400)

## Features

### 🏦 Investment Portfolio Management

- Traditional 401(k) with employer matching
- Roth IRA contributions
- Taxable investment accounts
- Tax-advantaged accounts (HSA, 529)
- Custom investment allocation

### 🏠 Real Estate Portfolio

- Multiple property tracking
- Equity calculation
- Rental income projections
- Property value appreciation
- Expense tracking

### 📊 Investment Options

- High-Yield Savings (4.5% return)
- Government Bonds (3.5% return)
- S&P 500 ETFs (10% historical return)
- Real Estate (8% return)
- Commodities (12% return)
- Cryptocurrency (20% return, high risk)

### 📈 Retirement Projections

- Inflation-adjusted calculations
- Tax consideration
- Multiple income streams
- Safe withdrawal rate analysis
- Visual growth charts

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository

```bash
git clone https://github.com/your-username/retirement-calculator.git
```

2. Install dependencies

```bash
cd retirement-calculator
npm install
```

3. Run development server

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

### Basic Setup

1. Enter your current age and target retirement age
2. Input annual salary and desired monthly retirement income
3. Configure retirement accounts (401k, IRA)
4. Add properties if applicable
5. Select investment vehicles

### Advanced Features

- Toggle different investment types
- Add multiple properties
- Configure manual savings accounts
- View projected growth charts
- Analyze retirement income breakdown

## Built With

- [Next.js 14](https://nextjs.org/) - React Framework
- [TypeScript](https://www.typescriptlang.org/) - Type Safety
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [shadcn/ui](https://ui.shadcn.com/) - UI Components
- [Recharts](https://recharts.org/) - Data Visualization
- [Lucide Icons](https://lucide.dev/) - Icons

## Project Structure

```
src/
  ├── components/         # React components
  │   ├── ui/            # shadcn/ui components
  │   └── retirement/    # Retirement-specific components
  ├── types/             # TypeScript definitions
  ├── utils/             # Helper functions
  ├── hooks/             # Custom React hooks
  └── app/               # Next.js pages
```

## Configuration

Key configuration options in `.env`:

```env
NEXT_PUBLIC_MAX_401K_CONTRIBUTION=22500
NEXT_PUBLIC_MAX_ROTH_CONTRIBUTION=6500
NEXT_PUBLIC_CATCH_UP_AGE=50
NEXT_PUBLIC_CATCH_UP_401K=7500
NEXT_PUBLIC_CATCH_UP_ROTH=1000
```

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on submitting pull requests.

## Calculations

### Investment Growth

- Uses compound interest with monthly contributions
- Considers employer matching for 401(k)
- Applies inflation adjustment (3% annual)
- Includes property appreciation

### Retirement Needs

- Based on desired monthly income
- Adjusted for inflation
- Considers all income sources
- Uses 4% safe withdrawal rate

## Disclaimers

This calculator is for informational purposes only and should not be considered financial advice. The projections shown are based on historical data and assumptions that may not reflect future performance. Please consult with a qualified financial advisor before making investment decisions.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Acknowledgments

- Financial formulas and projections based on industry standards
- Investment return rates based on historical data
- UI/UX inspired by modern financial planning tools

## Roadmap

- [ ] Social Security benefits calculator
- [ ] Tax bracket optimization
- [ ] Monte Carlo simulations
- [ ] Multiple currency support
- [ ] Risk tolerance assessment
- [ ] PDF report generation

## Support

- Create an issue for bugs
- Consult documentation for usage questions
- Contact maintainers for security concerns

## Security

For vulnerability reports, please see [SECURITY.md](SECURITY.md).
