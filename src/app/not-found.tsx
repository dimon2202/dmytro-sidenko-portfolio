import Link from "next/link";

// Fallback for URLs outside any locale; localized 404s are handled in app/[locale]/not-found.tsx.
export default function RootNotFound() {
  return (
    <html lang="en" data-theme="light">
      <body className="flex min-h-screen items-center justify-center p-6">
        <main className="max-w-md text-center">
          <h1 className="font-display text-3xl font-semibold">Page not found</h1>
          <p className="mt-3 text-muted">
            <Link href="/en" className="text-accent-text underline underline-offset-4">
              English
            </Link>
            {" · "}
            <Link href="/nl" className="text-accent-text underline underline-offset-4">
              Nederlands
            </Link>
          </p>
        </main>
      </body>
    </html>
  );
}
