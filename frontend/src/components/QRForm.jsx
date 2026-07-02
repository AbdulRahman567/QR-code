import Button from './Button';
import ErrorMessage from './ErrorMessage';

/**
 * Controlled form for entering a URL and triggering QR generation.
 * All state lives in the parent (Home) — this component is purely
 * presentational, which keeps it easy to test and reuse.
 */
export default function QRForm({
  url,
  onUrlChange,
  onSubmit,
  onClear,
  isLoading,
  fieldError,
  showClear,
}) {
  function handleSubmit(event) {
    event.preventDefault();
    onSubmit();
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <label htmlFor="url" className="text-sm font-medium text-ink">
          Website URL
        </label>
        <input
          id="url"
          name="url"
          type="text"
          inputMode="url"
          autoComplete="url"
          placeholder="https://example.com"
          value={url}
          onChange={(event) => onUrlChange(event.target.value)}
          disabled={isLoading}
          aria-invalid={Boolean(fieldError)}
          aria-describedby={fieldError ? 'url-error' : undefined}
          className={[
            'w-full rounded-xl border bg-white px-4 py-3 text-sm text-ink placeholder:text-slate-400',
            'transition-smooth focus:outline-none focus:ring-2 focus:ring-primary/30',
            fieldError
              ? 'border-danger focus:border-danger'
              : 'border-slate-200 focus:border-primary',
            isLoading ? 'cursor-not-allowed bg-slate-50 text-slate-400' : '',
          ].join(' ')}
        />
        {fieldError && (
          <div id="url-error">
            <ErrorMessage message={fieldError} />
          </div>
        )}
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Button type="submit" variant="primary" isLoading={isLoading} fullWidth>
          {isLoading ? 'Generating…' : 'Generate QR Code'}
        </Button>

        {showClear && (
          <Button
            type="button"
            variant="secondary"
            onClick={onClear}
            disabled={isLoading}
            fullWidth
          >
            Clear
          </Button>
        )}
      </div>
    </form>
  );
}
