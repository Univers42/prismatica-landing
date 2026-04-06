/**
 * 🔒 Cryptographically Secure Random Number Generator
 * 
 * Replaces Math.random() to satisfy SonarQube S2245.
 * Uses Web Crypto API for hardware-based entropy.
 */

/**
 * Generates a random float between 0 (inclusive) and 1 (exclusive).
 * @returns {number} A cryptographically secure random float.
 */
export const safeRandom = (): number => {
  const array = new Uint32Array(1);
  window.crypto.getRandomValues(array);
  
  // Dividing by 2^32 (0xffffffff + 1) to get a value in [0, 1)
  return array[0] / (0xffffffff + 1);
};
