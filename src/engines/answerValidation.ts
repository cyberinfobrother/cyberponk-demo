/**
 * Answer Normalization and Validation Engine
 */

export function normalizeAnswer(input: string): string {
  if (!input) return '';
  return input
    .trim()
    .toUpperCase()
    // Replace multiple spaces/tabs/newlines with a single space
    .replace(/\s+/g, ' ');
}

export interface ValidationResult {
  isValid: boolean;
  normalizedUserAnswer: string;
  normalizedExpectedAnswer: string;
  feedbackMessage: string;
}

export function validateAnswer(userAnswer: string, expectedAnswer: string): ValidationResult {
  const normUser = normalizeAnswer(userAnswer);
  const normExpected = normalizeAnswer(expectedAnswer);

  if (!normUser) {
    return {
      isValid: false,
      normalizedUserAnswer: normUser,
      normalizedExpectedAnswer: normExpected,
      feedbackMessage: 'Please enter your decrypted message before submitting.',
    };
  }

  if (normUser === normExpected) {
    return {
      isValid: true,
      normalizedUserAnswer: normUser,
      normalizedExpectedAnswer: normExpected,
      feedbackMessage: 'DECRYPTION SUCCESSFUL! Cyber safety directive decoded.',
    };
  }

  // Helpful diagnostic hints without revealing the full answer
  const userWords = normUser.split(' ');
  const expectedWords = normExpected.split(' ');

  if (userWords.length !== expectedWords.length) {
    return {
      isValid: false,
      normalizedUserAnswer: normUser,
      normalizedExpectedAnswer: normExpected,
      feedbackMessage: `Incorrect decipher. The expected message has ${expectedWords.length} words, but your entry has ${userWords.length}.`,
    };
  }

  // Count matching words
  let matchedWordsCount = 0;
  for (let i = 0; i < expectedWords.length; i++) {
    if (userWords[i] === expectedWords[i]) {
      matchedWordsCount++;
    }
  }

  if (matchedWordsCount > 0) {
    return {
      isValid: false,
      normalizedUserAnswer: normUser,
      normalizedExpectedAnswer: normExpected,
      feedbackMessage: `Partial match detected (${matchedWordsCount}/${expectedWords.length} words correct). Re-check your character shifts.`,
    };
  }

  return {
    isValid: false,
    normalizedUserAnswer: normUser,
    normalizedExpectedAnswer: normExpected,
    feedbackMessage: 'Decryption failed. Intercepted cipher mismatch. Review the cipher rule and try again.',
  };
}
