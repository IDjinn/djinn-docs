# Djinn Documentation Site

The official documentation site for [Djinn](../README.md) — a C-like compiled language
focused on developer experience, built on LLVM IR.

Built with [Next.js](https://nextjs.org) and [Fumadocs](https://fumadocs.dev).

## Development

Install dependencies and run the dev server:

```bash
npm install
npm run dev
```

Open <http://localhost:3000> to view the site.

## Project Layout

| Path                      | Description                                            |
| ------------------------- | ------------------------------------------------------ |
| `app/(home)`              | Landing page and top-level routes.                     |
| `app/docs`                | Documentation layout and MDX pages.                    |
| `app/api/search/route.ts` | Route handler powering docs search.                    |
| `content/docs`            | MDX content for the language reference and guides.     |
| `lib/source.ts`           | Fumadocs content source adapter.                       |
| `lib/layout.shared.tsx`   | Shared layout configuration.                           |
| `source.config.ts`        | Fumadocs MDX configuration (frontmatter schema, etc.). |

## Authoring Content

Docs live under `content/docs` as MDX. Use the `djinn` code block language for syntax highlighting:

````mdx
```djinn
void main() {
    printf("hello world!");
}
```
````

When writing headings or prose that contains generics (e.g. `array<T>`), escape the angle brackets
as JSX entities (`array&lt;T&gt;`) to avoid MDX parse errors.

## Build

```bash
npm run build
npm run start
```

## Learn More

- [Fumadocs](https://fumadocs.dev) — docs framework
- [Next.js](https://nextjs.org/docs) — underlying framework
- [Djinn language](../README.md) — what these docs are about
