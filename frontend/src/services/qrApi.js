import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
});

/**
 * Requests a QR code for the given URL from the backend.
 *
 * @param {string} url
 * @returns {Promise<string>} Base64 PNG data URL of the QR code
 * @throws {Error} with a user-friendly message on failure
 */
export async function generateQrCode(url) {
  try {
    const response = await apiClient.post('/qr/generate', { url });
    return response.data.data.qrCode;
  } catch (error) {
    const backendMessage = error?.response?.data?.message;

    if (backendMessage) {
      throw new Error(backendMessage);
    }

    if (error.code === 'ECONNABORTED') {
      throw new Error('The request timed out. Please try again.');
    }

    if (!error.response) {
      throw new Error(
        'Unable to reach the server. Please check your connection and try again.',
      );
    }

    throw new Error('Something went wrong while generating the QR code.');
  }
}
