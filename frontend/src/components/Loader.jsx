/**
 * A polished loading indicator shown inside the QR preview area
 * while the backend generates the code.
 */
export default function Loader({ label = 'Generating your QR code…' }) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex flex-col items-center justify-center gap-4 py-10 animate-fade-in"
    >
      <div className="relative h-14 w-14">
        <span className="absolute inset-0 rounded-full border-4 border-primary-light" />
        <span className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary animate-spin" />
      </div>
      <p className="text-sm font-medium text-ink-muted">{label}</p>
    </div>
  );
}
