import {jwtDecode} from "jwt-decode";

/**
 * Checks if a JWT token is expired
 * @param {string} token - The JWT token
 * @returns {boolean} - true if expired, false otherwise
 */
export function isTokenExpired(token) {
  if (!token) return true;

  try {
    const decoded = jwtDecode(token);
    // exp is in seconds → convert to ms
    return decoded.exp * 1000 < Date.now();
  } catch (error) {
    return true; // Invalid token format
  }
}
