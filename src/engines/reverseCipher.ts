/**
 * Reverse Writing Cipher Engine
 * Reverses the entire message string (characters and words backwards).
 */

export function reverseString(text: string): string {
  return text.split('').reverse().join('');
}

export const reverseEncode = reverseString;
export const reverseDecode = reverseString;
