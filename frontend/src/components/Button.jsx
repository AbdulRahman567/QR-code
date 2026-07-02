const VARIANT_STYLES = {
  primary:
    'bg-primary text-white shadow-soft hover:bg-primary-hover active:scale-[0.98] disabled:bg-primary/50',
  secondary:
    'bg-white text-ink border border-slate-200 hover:bg-slate-50 active:scale-[0.98] disabled:text-slate-300',
};

/**
 * Reusable button used across the app for actions like
 * "Generate QR Code", "Download", and "Clear".
 */
export default function Button({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  disabled = false,
  isLoading = false,
  fullWidth = false,
  className = '',
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={[
        'inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3',
        'text-sm font-semibold transition-smooth disabled:cursor-not-allowed',
        fullWidth ? 'w-full' : '',
        VARIANT_STYLES[variant],
        className,
      ].join(' ')}
    >
      {isLoading && (
        <span
          className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white"
          aria-hidden="true"
        />
      )}
      {children}
    </button>
  );
}
