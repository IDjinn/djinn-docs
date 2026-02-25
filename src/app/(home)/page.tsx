import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center text-center flex-1 gap-6 px-4">
      <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
        Djinn Lang
      </h1>
      <p className="text-lg text-fd-muted-foreground max-w-md">
        A fast, memory-safe language with C-like syntax, LLVM backend, and
        seamless C/C++ interop.
      </p>
      <div className="flex gap-3">
        <Link
          href="/docs"
          className="rounded-md bg-fd-primary px-4 py-2 text-sm font-medium text-fd-primary-foreground transition-colors hover:bg-fd-primary/90"
        >
          Get Started
        </Link>
        <a
          href="https://github.com/c-dev-djinn"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-md border border-fd-border px-4 py-2 text-sm font-medium transition-colors hover:bg-fd-accent"
        >
          GitHub
        </a>
      </div>
    </div>
  );
}
