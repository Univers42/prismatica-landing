/**
 * 🔒 Cryptographically Secure Random Number Generator
 * * Replaces Math.random() to satisfy SonarQube S2245.
 * Uses Web Crypto API via globalThis for universal compatibility.
 */
export const safeRandom = (): number => {
  // Uint32Array puede almacenar valores de 0 a 4,294,967,295
  const array = new Uint32Array(1);
  
  // ✅ Usamos globalThis para acceder a la Crypto API
  globalThis.crypto.getRandomValues(array);
  
  /**
   * Dividimos el valor obtenido por 2^32 (0xffffffff + 1)
   * para obtener un número decimal en el rango [0, 1),
   * imitando exactamente el comportamiento de Math.random().
   */
  return array[0] / (0xffffffff + 1);
};