# Contributing to Retirement Calculator

Thank you for your interest in contributing to the Retirement Calculator project! This guide will help you understand how to contribute effectively.

## Feature Requests

When requesting new features, please use the following template in the Issues section:

```markdown
### Feature Request

**Type of Feature**

- [ ] New Investment Vehicle
- [ ] UI Enhancement
- [ ] Calculation Improvement
- [ ] Data Visualization
- [ ] Other (please specify)

**Description**
Clear description of the feature you'd like to see added.

**Use Case**
Explain how this feature would benefit users.

**Regulatory Considerations**
Any financial regulations or compliance requirements to consider.

**Additional Context**
Any other relevant information, mockups, or examples.
```

## Pull Requests

### Before Creating a PR

1. Check existing issues and PRs to avoid duplicates
2. Ensure your feature aligns with project goals
3. Consider financial regulations and compliance
4. Test calculations thoroughly

### PR Template

```markdown
### Pull Request

**Related Issue**
Fixes #(issue number)

**Type of Change**

- [ ] New feature
- [ ] Bug fix
- [ ] Performance improvement
- [ ] Code cleanup
- [ ] Documentation update
- [ ] Other (please specify)

**Changes Made**

- Detailed list of changes
- Impact on existing calculations
- UI modifications

**Testing**

- [ ] Unit tests added/updated
- [ ] Calculation accuracy verified
- [ ] Edge cases considered
- [ ] Mobile responsiveness checked

**Screenshots**
If applicable, add screenshots of UI changes.

**Financial Compliance**

- [ ] Follows SEC/FINRA guidelines
- [ ] Includes appropriate disclaimers
- [ ] Accurate financial calculations
```

## Development Guidelines

### Code Style

- Use TypeScript for type safety
- Follow existing component structure
- Use shadcn/ui components
- Maintain responsive design
- Add appropriate tooltips for financial terms

### Financial Calculations

- Document assumptions clearly
- Include inflation adjustments
- Consider tax implications
- Use conservative growth estimates
- Add appropriate disclaimers

### Testing

Required tests for:

- Investment calculations
- Tax considerations
- Edge cases
- User input validation
- Mobile responsiveness

## Setting Up Development Environment

1. Clone the repository:

```bash
git clone https://github.com/your-username/retirement-calculator.git
```

2. Install dependencies:

```bash
npm install
```

3. Start development server:

```bash
npm run dev
```

## Adding New Investment Vehicles

When adding new investment types:

1. Update `InvestmentTypes` interface
2. Add appropriate risk categorization
3. Include historical return rates
4. Document data sources
5. Add relevant tooltips
6. Update calculation logic

## UI/UX Guidelines

- Keep interface clean and intuitive
- Add tooltips for financial terms
- Use consistent color scheme
- Ensure mobile responsiveness
- Follow accessibility guidelines

## Documentation

Update the following when making changes:

- Component documentation
- Calculation methodology
- Financial assumptions
- User guides
- API documentation

## Questions?

Feel free to:

- Open an issue for discussion
- Ask in pull request comments
- Contact maintainers

## Code of Conduct

Please note that this project follows a Code of Conduct. By participating, you agree to uphold this code.

## License

By contributing, you agree that your contributions will be licensed under the project's license.
