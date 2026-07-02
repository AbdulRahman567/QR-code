# QR Code Generator

A full-stack QR Code Generator. Enter any URL, generate a QR code locally
(no external QR APIs), preview it instantly, and download it as a PNG.

## Tech Stack

| Layer         | Technology                          |
| ------------- | ------------------------------------ |
| Frontend      | React.js (Vite), JavaScript only     |
| Styling       | Tailwind CSS                         |
| Backend       | NestJS (TypeScript)                  |
| HTTP Client   | Axios                                |
| Validation    | class-validator / class-transformer  |
| QR Generation | `qrcode` npm package (local, no API) |

No database. No authentication.

## Project Structure

```
qr-code-generator/
├── frontend/   React + Vite + Tailwind (JavaScript)
└── backend/    NestJS + TypeScript
```

## Prerequisites

- Node.js 18+ and npm

## Getting Started

### 1. Backend

```bash
cd backend
npm install
npm run dev
```

The API starts on **http://localhost:5000** (configurable via `backend/.env`).

### 2. Frontend

In a separate terminal:

```bash
cd frontend
npm install
npm run dev
```

The app starts on **http://localhost:5173** (configurable via `frontend/.env`).

Open http://localhost:5173 in your browser, enter a URL, and click
**Generate QR Code**.

## Environment Variables

**backend/.env**

```
PORT=5000
CORS_ORIGIN=http://localhost:5173
```

**frontend/.env**

```
VITE_API_BASE_URL=http://localhost:5000
```

## API Reference

### `POST /qr/generate`

**Request body**

```json
{ "url": "https://example.com" }
```

**Success response** — `200 OK`

```json
{
  "success": true,
  "message": "QR Code generated successfully.",
  "data": { "qrCode": "data:image/png;base64,...." }
}
```

**Error response** — `400 Bad Request`

```json
{ "success": false, "message": "Please provide a valid URL (including http:// or https://)." }
```

## How It Works

1. The user types a URL into the form. The frontend validates it immediately
   (`frontend/src/utils/validators.js`) so invalid input never reaches the server.
2. On submit, `frontend/src/services/qrApi.js` sends the URL to the backend via Axios.
3. `GenerateQrDto` (`class-validator`) re-validates the URL on the server — the
   frontend can never bypass this check.
4. `QrService` uses the `qrcode` package to render a PNG QR code **locally**
   and returns it as a Base64 data URL. No third-party QR API is called.
5. A global exception filter guarantees every response — success or failure —
   follows the same `{ success, message, data? }` shape.
6. The frontend displays the QR code and lets the user download it as a PNG
   or clear the form to start over.

## Build for Production

```bash
# Backend
cd backend
npm run build
npm run start:prod

# Frontend
cd frontend
npm run build
npm run preview
```

## License

MIT — see [LICENSE](./LICENSE).
