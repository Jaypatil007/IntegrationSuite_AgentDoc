<div align="center">
<img width="800" alt="ADTYA_DASH Documentation" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# ADTYA_DASH Documentation

This is the central documentation hub for **ADTYA_DASH**, a specialized generative workflow interface for SAP CPI iFlow analysis and agent orchestration.

**[🌐 View the Documentation Site](https://jaypatil007.github.io/IntegrationSuite_AgentDoc)**

## Features

- **Markdown-Driven:** Powered by `.md` files residing in the `public/docs` directory.
- **Dynamic Navigation:** Automatically generates navigation menus based on markdown frontmatter (YAML).
- **Glassmorphism / Cyberpunk Aesthetic:** Custom React viewer designed to match modern technical tooling.
- **GitHub Flavored Notifications:** Out-of-the-box styling support for GitHub `> [!NOTE]` style alerts.
- **Automated Deployment:** CI/CD pipeline set up via GitHub Actions to deploy to GitHub Pages on every `main` branch push.

## Running Locally

**Prerequisites:** Node.js (v18+)

1. Clone the repository
```bash
git clone https://github.com/Jaypatil007/IntegrationSuite_AgentDoc.git
cd adtya_dash-documentation
```

2. Install dependencies:
```bash
npm install
```

3. Generate Navigation Config & Start Dev Server:
```bash
npm run dev
```

*Note: The `npm run dev` script will automatically run `scripts/generate-nav.js` to parse your docs before starting the Vite server on `http://localhost:3000/`.*

## Adding or Editing Documentation

1. Create or edit Markdown files inside the `public/docs` folder.
2. Ensure you include the YAML frontmatter at the top of each file:
```yaml
---
title: My Page Title
parent: Architecture
nav_order: 1
---
```
3. Commit and push your changes to the `main` branch. GitHub Actions will handle the deployment automatically.
