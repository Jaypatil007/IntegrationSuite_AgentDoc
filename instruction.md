# GitHub Pages Deployment Guide

Yes, this React/Vite application can absolutely be published to GitHub Pages as a static website!

Since you have already run `npm run build`, the `dist/` folder contains a purely static HTML/CSS/JS representation of your documentation.

Here are the step-by-step instructions to push this to GitHub and deploy it via GitHub Pages.

## Prerequisites

Make sure you have an empty repository created on GitHub (e.g., `IntegrationSuite_AgentDoc`).

## Step 1: Initialize Git and Push to GitHub

Open your terminal in the `C:\Users\patil\OneDrive\Desktop\Antigravity_github\adtya_dash-documentation` folder and run the following commands.

```bash
# 1. Initialize a new git repository
git init

# 2. Add all files to staging
git add .

# 3. Commit the changes
git commit -m "Initial commit: Added React documentation site"

# 4. Link your local repository to the GitHub repository you created
git remote add origin https://github.com/<YOUR_USERNAME>/IntegrationSuite_AgentDoc.git

# 5. Push the code to the main branch
git push -u origin main
```

*(Note: Replace `<YOUR_USERNAME>` with your actual GitHub details).*

## Step 2: Configure Vite for GitHub Pages (Important!)

If your repository name is something other than `username.github.io` (for example, repository name is `IntegrationSuite_AgentDoc`), GitHub Pages will serve your site at a subpath: `https://username.github.io/IntegrationSuite_AgentDoc/`.

To make sure Vite loads assets correctly from this subpath, you need to update `vite.config.ts`.

Open `vite.config.ts` and add a `base` property matching your repository name:

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  // ADD THIS LINE:
  base: '/IntegrationSuite_AgentDoc/', 
  plugins: [react(), tailwindcss()],
})
```
*If you change this, remember to run `npm run build` again, commit, and push!*

```bash
npm run build
git add .
git commit -m "Update vite base path"
git push
```

## Step 3: Deploy using GitHub Actions

The easiest and most robust way to deploy a Vite app to GitHub Pages is using GitHub Actions.

1. In your GitHub repository, go to **Settings** > **Pages**.
2. Under "Build and deployment", change the **Source** dropdown from "Deploy from a branch" to **"GitHub Actions"**.

Next, we need to add a workflow file to your project:

1. In your local project, create this folder structure: `.github/workflows/`
2. Create a file named `deploy.yml` inside that folder (`.github/workflows/deploy.yml`).
3. Paste the following configuration into `deploy.yml`:

```yaml
# .github/workflows/deploy.yml
name: Deploy static content to Pages

on:
  push:
    branches: ["main"]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: true

jobs:
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Set up Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: "npm"
      - name: Install dependencies
        run: npm ci
      - name: Build
        run: npm run build
      - name: Setup Pages
        uses: actions/configure-pages@v4
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: "./dist"
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

## Step 4: Final Push & Activation

Commit the new workflow file and push it up:

```bash
git add .github/workflows/deploy.yml
git commit -m "Add GitHub Actions deployment workflow"
git push
```

## Step 5: Verify Deployment

1. Go back to your GitHub Repository.
2. Click the **"Actions"** tab at the top. You should see a workflow running named "Deploy static content to Pages".
3. Once it turns green (finishes), go to your repository **Settings** > **Pages** to find the live URL of your documentation site!
