import Button from './Button';
import ErrorMessage from './ErrorMessage';
import Loader from './Loader';

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-10 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-light text-primary">
        <svg
          className="h-8 w-8"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          aria-hidden="true"
        >
          <rect x="3" y="3" width="7" height="7" rx="1.5" />
          <rect x="14" y="3" width="7" height="7" rx="1.5" />
          <rect x="3" y="14" width="7" height="7" rx="1.5" />
          <rect x="15" y="15" width="3" height="3" rx="0.5" />
          <path d="M19 15v5M15 19h5" />
        </svg>
      </div>
      <p className="text-sm text-ink-muted">
        Your QR code will appear here once generated.
      </p>
    </div>
  );
}

function downloadQrCode(qrCode) {
  const link = document.createElement('a');
  link.href = qrCode;
  link.download = 'qr-code.png';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * Renders the current state of the generation result: idle placeholder,
 * loading spinner, error alert, or the generated QR code with a
 * download action.
 */
export default function QRDisplay({ qrCode, isLoading, error }) {
  return (
    <div className="rounded-xl2 border border-slate-100 bg-slate-50/60 p-6">
      {isLoading && <Loader />}

      {!isLoading && error && <ErrorMessage message={error} />}

      {!isLoading && !error && !qrCode && <EmptyState />}

      {!isLoading && !error && qrCode && (
        <div className="flex flex-col items-center gap-5 animate-scale-in">
          <div className="flex items-center gap-2 self-stretch rounded-xl border border-success/20 bg-success-light px-4 py-2.5 text-sm font-medium text-success">
            <svg
              className="h-4 w-4 flex-shrink-0"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M16.7 5.3a1 1 0 010 1.4l-7.4 7.4a1 1 0 01-1.4 0L3.3 9.5a1 1 0 111.4-1.4l3.9 3.9 6.7-6.7a1 1 0 011.4 0z"
                clipRule="evenodd"
              />
            </svg>
            QR code generated successfully.
          </div>

          <div className="rounded-xl2 bg-white p-4 shadow-card">
            <img
              src={qrCode}
              alt="Generated QR code"
              className="h-56 w-56 sm:h-64 sm:w-64"
              width={256}
              height={256}
            />
          </div>

          <Button variant="primary" onClick={() => downloadQrCode(qrCode)} fullWidth>
            <svg
              className="h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M10 12.5a.75.75 0 01-.53-.22l-3.5-3.5a.75.75 0 111.06-1.06L9.25 9.94V3a.75.75 0 011.5 0v6.94l2.22-2.22a.75.75 0 111.06 1.06l-3.5 3.5a.75.75 0 01-.53.22z" />
              <path d="M4 13a.75.75 0 01.75.75v1.5c0 .414.336.75.75.75h9a.75.75 0 00.75-.75v-1.5a.75.75 0 011.5 0v1.5A2.25 2.25 0 0114.5 17.5h-9A2.25 2.25 0 013.25 15.25v-1.5A.75.75 0 014 13z" />
            </svg>
            Download PNG
          </Button>
        </div>
      )}
    </div>
  );
}
