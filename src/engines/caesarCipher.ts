/**
 * Caesar Cipher Engine
 * Handles forward shifting (encryption) and backward shifting (decryption).
 */

export function caesarEncrypt(text: string, shift: number): string {
  const normalizedShift = ((shift % 26) + 26) % 26;
  return text
    .split('')
    .map(char => {
      const code = char.charCodeAt(0);
      // Uppercase A-Z (65-90)
      if (code >= 65 && code <= 90) {
        return String.fromCharCode(((code - 65 + normalizedShift) % 26) + 65);
      }
      // Lowercase a-z (97-122)
      if (code >= 97 && code <= 122) {
        return String.fromCharCode(((code - 97 + normalizedShift) % 26) + 97);
      }
      return char;
    })
    .join('');
}

export function caesarDecrypt(text: string, shift: number): string {
  // Shifting backward by shift is shifting forward by 26 - shift
  return caesarEncrypt(text, 26 - shift);
}

export interface BruteForceResult {
  shift: number;
  decrypted: string;
}

export function caesarBruteForce(text: string, minShift = 1, maxShift = 25): BruteForceResult[] {
  const results: BruteForceResult[] = [];
  for (let s = minShift; s <= maxShift; s++) {
    results.push({
      shift: s,
      decrypted: caesarDecrypt(text, s),
    });
  }
  return results;
}
