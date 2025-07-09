# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this Astro project.

## Project Overview

This is Joshua Heiland's personal website being migrated from Next.js to Astro v5. The goal is to pull content from multiple GitHub repositories and display them on the website.

## Content Sources

- **Readings**: GitHub repository "iamjoshua/readings" 
- **Writings**: GitHub repository "iamjoshua/writings"
- **Additional repositories**: More content sources to be added in the future

## Design Principles

- Minimal, clean design aesthetic
- Focus on readability and content hierarchy
- Use proper semantic HTML and accessibility patterns
- Leverage Astro's performance benefits
- Let code speak for itself - avoid explanatory comments except for gotchas or critical information

## Decision Making Guidelines

**HIGH IMPORTANCE: Always follow these steps when making decisions:**

1. **Always verify with Astro v5 docs** - Check current documentation before implementing any feature or making recommendations
2. **Use Astro CLI tools where possible** - Leverage built-in commands for project management
3. **Use `npx astro add` when adding integrations** - Always use the official integration system rather than manual installation
4. **STOP MAKING ASSUMPTIONS** - If you don't know something, go to the docs. Don't guess or assume anything. Think through each step of the problem systematically.
5. **NEVER DO ANYTHING WITHOUT EXPLICIT CONFIRMATION** - Do not implement, create, or modify anything unless explicitly asked or confirmed by the user. Always wait for confirmation.
6. **NO INLINE STYLE TAGS OR CUSTOM CSS** - This project uses Tailwind CSS. Do not suggest `<style>` tags, custom CSS, or CSS-in-JS approaches. Work within the Tailwind framework.

## Development Commands

```bash
# Development
npm run dev

# Build
npm run build

# Preview production build
npm run preview

# Add integrations
npx astro add [integration-name]
```

## Question Hitlist

- Is there a way to cache the loaders during development to avoid refetching when restarting the dev server?