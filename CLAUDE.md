# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is Joshua Heiland's personal website built with Next.js 15 and TypeScript. The site focuses on philosophy readings and content fetched from external GitHub repositories.

## Architecture

### Framework & Dependencies
- **Next.js 15.3.5** with App Router and Turbopack for development
- **TypeScript** with strict configuration
- **Tailwind CSS 4** for styling
- **React 19** for UI components

### Content Management
- **External Content Source**: Fetches reading data from GitHub repository "iamjoshua/readings"
- **Content Format**: Parses `readings.md` file with custom markdown format containing:
  - Title (# heading)
  - Author (## heading)
  - YAML metadata block with type, category, status, dates
  - Optional content/notes after metadata
- **Caching**: Uses Next.js cache with `tags: ['readings']` and `revalidate: 3600` for webhook invalidation

### File Structure
```
src/
  app/
    readings/page.tsx          # Readings list page
    debug/page.tsx             # Debug page for testing
    page.tsx                   # Homepage with navigation
    layout.tsx                 # Root layout
  components/
    ReadingCard.tsx            # Individual reading card component
  lib/
    readings.ts                # Data fetching and parsing logic
```

### Component Architecture
- **ReadingCard**: Reusable component that takes individual props (not objects)
  - Props: title, author, type, category, status, startedAt, completedAt, content
  - Includes status badges with color coding and metadata display
- **Pages**: Use async components to fetch data server-side

### Data Flow
1. `lib/readings.ts` fetches `readings.md` from GitHub API
2. `parseReadingsMarkdown()` parses custom markdown format
3. Pages display data using ReadingCard components

## Development Commands

```bash
# Development (with Turbopack)
npm run dev

# Build
npm run build

# Start production server  
npm start

# Lint
npm run lint
```

## Content Format Example

The readings.md file follows this format:
```markdown
# Book Title

## Author Name

```yaml
type: book
category: philosophy
status: reading
startedAt: Date
completedAt: Date
```

Optional notes content here.
```

## Caching Strategy

- GitHub API calls are cached with `tags: ['readings']`
- Cache can be invalidated via webhook calling `revalidateTag('readings')`
- Fallback revalidation every 3600 seconds (1 hour)

## Design Principles

- Minimal, clean design aesthetic
- Components should receive individual props, not entire objects
- Focus on readability and content hierarchy
- Use proper semantic HTML and accessibility patterns