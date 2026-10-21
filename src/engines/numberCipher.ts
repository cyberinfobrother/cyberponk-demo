/**
 * A1Z26 Number Cipher Engine
 * A = 1, B = 2, ..., Z = 26
 * Letters separated by '-', words separated by ' / '
 */

export function numberEncode(text: string): string {
  const words = text.toUpperCase().trim().split(/\s+/);
  return words
    .map(word => {
      return word
        .split('')
        .map(char => {
          const code = char.charCodeAt(0);
          if (code >= 65 && code <= 90) {
            return (code - 64).toString();
          }
          return char;
        })
        .join('-');
    })
    .join(' / ');
}

export function numberDecode(cipher: string): string {
  // Split words by ' / ' or '/' or multi-spaces
  const wordTokens = cipher.trim().split(/\s*\/\s*/);
  return wordTokens
    .map(wordToken => {
      const letterTokens = wordToken.trim().split(/[- ]+/);
      return letterTokens
        .map(tok => {
          const num = parseInt(tok, 10);
          if (!isNaN(num) && num >= 1 && num <= 26) {
            return String.fromCharCode(64 + num);
          }
          return tok;
        })
        .join('');
    })
    .join(' ')
    .trim();
}
