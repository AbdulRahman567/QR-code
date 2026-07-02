/**
 * Inline alert used for both field-level validation errors and
 * top-level API error messages.
 */
export default function ErrorMessage({ message }) {
  if (!message) return null;

  return (
    <div
      role="alert"
      className="flex items-start gap-2.5 rounded-xl border border-danger/20 bg-danger-light px-4 py-3 text-sm text-danger animate-fade-in"
    >
      <svg
        className="mt-0.5 h-4 w-4 flex-shrink-0"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          d="M18 10A8 8 0 11 2 10a8 8 0 0116 0zm-7-4a1 1 0 10-2 0v4a1 1 0 002 0V6zm-1 8a1.25 1.25 0 100-2.5 1.25 1.25 0 000 2.5z"
          clipRule="evenodd"
        />
      </svg>
      <p className="font-medium">{message}</p>
    </div>
  );
}
