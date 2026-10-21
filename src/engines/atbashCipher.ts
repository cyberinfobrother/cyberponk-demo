/**
 * Atbash Cipher Engine
 * Traditional Hebrew substitution cipher where A <-> Z, B <-> Y, C <-> X, etc.
 */

export function atbashTransform(text: string): string {
  return text
    .split('')
    .map(char => {
      const code = char.charCodeAt(0);
      if (code >= 65 && code <= 90) {
        // 'A' is 65, 'Z' is 90. 65 + 90 = 155. 155 - code reverses the alphabet.
        return String.fromCharCode(155 - code);
      }
      if (code >= 97 && code <= 122) {
        // 'a' is 97, 'z' is 122. 97 + 122 = 219. 219 - code.
        return String.fromCharCode(219 - code);
      }
      return char;
    })
    .join('');
}

export const atbashEncode = atbashTransform;
export const atbashDecode = atbashTransform;
