# Prenderlink Blog

> The open‑source Next.js powered blog that serves as the official site for Prenderlink.  It is designed to be **easy to maintain, extend, and deploy** – whether you choose Vercel, Cloudflare Pages, Netlify, or a custom hosting provider.

## Table of Contents
- [Project Overview](#project-overview)
- [Technologies](#technologies)
- [Folder Structure](#folder-structure)
- [Getting Started Locally](#getting-started-locally)
- [Adding New Blog Posts](#adding-new-blog-posts)
- [Customizing the Site](#customizing-the-site)
- [Contribution Guidelines](#contribution-guidelines)
- [License](#license)

## Project Overview
This repo contains a lightweight, statically‑generated Next.js site that reads Markdown files from `content/posts/` and turns them into blog pages.  The Markdown files are processed with **remark** and **remark‑html** so you can write plain Markdown with optional front‑matter for title, date, and slug.

### What the Repo Includes
- `pages/` – page components, including `index.tsx` for the home page and a dynamic `[slug].tsx` for individual posts.
- `lib/server/markdown.ts` – a helper that pulls Markdown files from the filesystem, parses them, and supplies the parsed content to the pages.
- `components/` – small UI pieces (Header, Footer, PostPreview, etc.).
- `content/posts/` – Markdown files that make up your blog.
- `public/` – static assets (images, favicons, robots.txt, etc.).
- `next.config.js` – optional Next.js configuration (currently minimal).

## Technologies
- **Next.js 13** – React framework, built‑in SSR / SSG.
- **React 18** – UI library.
- **TypeScript** – static typing for safety.
- **remark / remark‑html** – Markdown parser.
- **ESLint** + **Prettier** (optional) – code quality and formatting.

## Folder Structure
```
prenderlink/
├─ components/
├─ lib/
│  └─ server/
├─ content/
│  └─ posts/
├─ pages/
├─ public/
├─ next.config.js
├─ package.json
├─ tsconfig.json
└─ README.md
```

## Getting Started Locally
1. **Clone the repo**
   ```bash
   git clone https://github.com/<your-username>/prenderlink.git
   cd prenderlink
   ```
2. **Install dependencies**
   ```bash
   npm ci
   # or pnpm install
   ```
3. **Run the dev server**
   ```bash
   npm run dev
   # Open http://localhost:3000
   ```

## Adding New Blog Posts
1. Create a Markdown file under `content/posts/`:
   ```md
   ---
   title: "Your Post Title"
   date: "2024-08-24"
   slug: "your-post-title"
   ---
   
   # Heading
   
   Your content goes here.
   ```
2. Commit the file:
   ```bash
   git add content/posts/your-post-title.md
   git commit -m "Add new post: Your Post Title"
   ```
3. Push and deploy – your post will automatically appear on the site.

## Customizing the Site
- **Styling** – Edit `components/Layout.tsx` or add global CSS in `styles/globals.css`.
- **Navigation** – Update `components/Header.tsx` to add links.
- **SEO** – Add meta tags in `pages/_document.tsx` or use `next/head` in each page.

## Contribution Guidelines
1. **Fork** the repo and create a new branch for your feature/bug‑fix.
2. **Write tests** (if applicable) and ensure linting passes.
3. **Open a pull request**—include a brief description of the change and why it matters.
4. **Maintain the existing style** – follow the existing TypeScript, ESLint, and Prettier conventions.

Feel free to open issues for bugs, feature requests, or general discussion. All contributions are welcome!

## License
[MIT License](LICENSE)

---

> *The project is built with an eye towards flexibility: you can host it on Vercel, Cloudflare Pages, Netlify, or any Node.js‑compatible environment. No vendor lock‑in!*