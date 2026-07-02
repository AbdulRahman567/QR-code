export default function Header() {
  return (
    <header className="flex flex-col items-center gap-3 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary shadow-soft">
        <svg
          className="h-6 w-6 text-white"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <rect x="3" y="3" width="7" height="7" rx="1.5" />
          <rect x="14" y="3" width="7" height="7" rx="1.5" />
          <rect x="3" y="14" width="7" height="7" rx="1.5" />
          <path d="M14 14h3v3h-3zM20 14v3M17 20h4" />
        </svg>
      </div>
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">
          QR Code Generator
        </h1>
        <p className="mt-1 text-sm text-ink-muted">
          Turn any link into a clean, scannable QR code — instantly.
        </p>
      </div>
    </header>
  );
}
