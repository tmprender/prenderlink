# Prenderlink Blog

A Hugo-powered static blog using the Archie theme (tracked as a git submodule).

Base URL: https://www.prenderlink.net/ (custom domain configured via `static/CNAME`).

## Quick Start

- Install Hugo (extended) — the workflow uses `HUGO_VERSION=0.128.0`.
- Clone repository with submodules:

```bash
git clone --recurse-submodules <repo-url>
```

- Or after cloning:

```bash
git submodule update --init --recursive
```

- Run the dev server:

```bash
hugo server -D
```

Visit http://localhost:1313

## Theme
- Theme: Archie (in `themes/archie`) tracked as a git submodule. To update the theme:

```bash
# fetch upstream and update submodule (if you track a branch)
git submodule update --remote --merge themes/archie
```

## Deployment
- Deployment: GitHub Pages via GitHub Actions. Workflow: `.github/workflows/hugo.yml`.
- The workflow builds with Hugo and deploys using the official Pages actions (`actions/configure-pages`, `actions/upload-pages-artifact`, `actions/deploy-pages`) and uses `peaceiris/actions-hugo@v2` for Hugo setup.
- Dependabot is enabled for GitHub Actions in `.github/dependabot.yml` to keep actions up to date.

## Contributing
- Add posts to `content/blog/` as Markdown files.
- Open a PR; the workflow builds on `push` to `main` and deploys from `main`.

## Notes
- `static/CNAME` contains the custom domain `www.prenderlink.net` used by Pages.
- If you change CI or theme settings, test locally with `hugo` before pushing.

