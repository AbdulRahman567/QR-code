import { useState } from 'react';
import Header from '../components/Header';
import QRDisplay from '../components/QRDisplay';
import QRForm from '../components/QRForm';
import { generateQrCode } from '../services/qrApi';
import { getUrlValidationError } from '../utils/validators';

export default function Home() {
  const [url, setUrl] = useState('');
  const [qrCode, setQrCode] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [fieldError, setFieldError] = useState('');
  const [apiError, setApiError] = useState('');

  function handleUrlChange(value) {
    setUrl(value);
    if (fieldError) setFieldError('');
    if (apiError) setApiError('');
  }

  async function handleSubmit() {
    const validationError = getUrlValidationError(url);
    if (validationError) {
      setFieldError(validationError);
      setQrCode(null);
      return;
    }

    setFieldError('');
    setApiError('');
    setIsLoading(true);
    setQrCode(null);

    try {
      const generatedQrCode = await generateQrCode(url.trim());
      setQrCode(generatedQrCode);
    } catch (error) {
      setApiError(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  function handleClear() {
    setUrl('');
    setQrCode(null);
    setFieldError('');
    setApiError('');
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-12">
      <div className="w-full max-w-md animate-fade-in">
        <div className="mb-8">
          <Header />
        </div>

        <section className="rounded-xl2 border border-slate-100 bg-white p-6 shadow-card sm:p-8">
          <QRForm
            url={url}
            onUrlChange={handleUrlChange}
            onSubmit={handleSubmit}
            onClear={handleClear}
            isLoading={isLoading}
            fieldError={fieldError}
            showClear={Boolean(url || qrCode)}
          />

          <div className="mt-6">
            <QRDisplay qrCode={qrCode} isLoading={isLoading} error={apiError} />
          </div>
        </section>

        <p className="mt-6 text-center text-xs text-ink-muted">
          QR codes are generated locally on the server — no data is stored.
        </p>
      </div>
    </main>
  );
}
