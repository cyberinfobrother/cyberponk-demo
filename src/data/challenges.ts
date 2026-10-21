import { Challenge } from '../types/game';

export const CHALLENGES: Challenge[] = [
  {
    id: 1,
    roundNumber: 1,
    title: 'ROUND 01 // WARM-UP',
    subtitle: 'The Caesar cipher',
    cipherName: 'Caesar Cipher',
    difficulty: 'Easy',
    timeLimitSeconds: 180, // 3 minutes
    baseScore: 10,
    interceptedMessage: 'VWDB VDIH RQOLQH',
    displayLines: ['VWDB VDIH', 'RQOLQH'],
    cipherInstructions:
      'Every letter is shifted 3 places forward in the alphabet (A becomes D, B becomes E, and so on). To decrypt it, shift each letter 3 places backward. Preserve spaces between words.',
    hint: 'Shift each letter back 3 places to decode.',
    correctAnswer: 'STAY SAFE ONLINE',
    cybersecurityTip: 'Stay safe online.',
    explanation:
      'Practice safe browsing, be cautious with unexpected messages and links, and protect your personal information at all times.',
  },
  {
    id: 2,
    roundNumber: 2,
    title: 'ROUND 02 // LEVEL UP',
    subtitle: 'The mystery shift',
    cipherName: 'Mystery Caesar Shift',
    difficulty: 'Hard',
    timeLimitSeconds: 300, // 5 minutes
    baseScore: 10,
    interceptedMessage: 'SJAJW XMFWJ DTZW UFXXBTWI',
    displayLines: ['SJAJW XMFWJ', 'DTZW', 'UFXXBTWI'],
    cipherInstructions:
      'Still a Caesar cipher — but this time the shift number is a secret between 1 and 10. Analyze character frequencies or isolate the short 4-letter word to discover the key.',
    hint: 'The shift is between 1 and 10. Crack the short word first!',
    correctAnswer: 'NEVER SHARE YOUR PASSWORD',
    cybersecurityTip: 'Never share your password.',
    explanation:
      'Keep passwords private. Use unique, strong passwords for your accounts and never disclose them in response to suspicious requests or calls.',
  },
  {
    id: 3,
    roundNumber: 3,
    title: 'ROUND 03 // BY THE NUMBERS',
    subtitle: 'The number cipher',
    cipherName: 'A1Z26 Number Cipher',
    difficulty: 'Easy',
    timeLimitSeconds: 180, // 3 minutes
    baseScore: 10,
    interceptedMessage: '12-15-3-11 / 25-15-21-18 / 19-3-18-5-5-14',
    displayLines: ['12-15-3-11 /', '25-15-21-18 /', '19-3-18-5-5-14'],
    cipherInstructions:
      "Each number represents a letter's position in the English alphabet (A = 1, B = 2, C = 3 ... Z = 26). The slash ( / ) separates words.",
    hint: "Each number is a letter's position. A = 1. The slash ( / ) splits words.",
    correctAnswer: 'LOCK YOUR SCREEN',
    cybersecurityTip: 'Lock your screen.',
    explanation:
      'Lock your computer, laptop, or mobile device whenever you step away or leave it unattended to prevent unauthorized physical tampering.',
  },
  {
    id: 4,
    roundNumber: 4,
    title: 'ROUND 04 // MIRROR WORLD',
    subtitle: 'The Atbash cipher',
    cipherName: 'Atbash Cipher',
    difficulty: 'Hard',
    timeLimitSeconds: 300, // 5 minutes
    baseScore: 10,
    interceptedMessage: 'GSRMP YVULIV BLF XORXP',
    displayLines: ['GSRMP YVULIV', 'BLF XORXP'],
    cipherInstructions:
      'The alphabet is flipped like a mirror: A swaps with Z, B with Y, C with X, and so on. One of the oldest recorded ciphers in cryptographic history.',
    hint: 'Think of the alphabet as a mirror: A becomes Z.',
    correctAnswer: 'THINK BEFORE YOU CLICK',
    cybersecurityTip: 'Think before you click.',
    explanation:
      'Inspect unexpected links, verify the sender address, and avoid opening suspicious attachments or entering credentials on untrusted websites.',
  },
  {
    id: 5,
    roundNumber: 5,
    title: 'ROUND 05 // FINAL ROUND',
    subtitle: 'The pigpen cipher',
    cipherName: 'Pigpen Cipher',
    difficulty: 'Hard',
    timeLimitSeconds: 300, // 5 minutes
    baseScore: 10,
    interceptedMessage: 'UPDATE YOUR DEVICES', // displayed via vector Pigpen symbols
    displayLines: ['UPDATE', 'YOUR', 'DEVICES'],
    cipherInstructions:
      'Each symbol is the geometric shape of the "pen" enclosing a letter within the grid or X. A dot indicates the second grid or second X.',
    hint: 'Each symbol is the shape of the “pen” around a letter. A dot means the second grid or X.',
    correctAnswer: 'UPDATE YOUR DEVICES',
    cybersecurityTip: 'Update your devices.',
    explanation:
      'Install security updates for operating systems, applications, web browsers, and device firmware promptly to patch critical zero-day vulnerabilities.',
  },
  {
    id: 6,
    roundNumber: 6,
    title: 'BONUS // TIE-BREAKER',
    subtitle: 'Reverse writing',
    cipherName: 'Reverse Writing Cipher',
    difficulty: 'Sudden Death',
    timeLimitSeconds: 60, // 1 minute
    baseScore: 5,
    interceptedMessage: 'DROWSSAP GNORTS A ESU',
    displayLines: ['DROWSSAP GNORTS', 'A ESU'],
    cipherInstructions:
      'Read the entire intercepted transmission backward from right to left, restoring the natural order of characters and words.',
    hint: 'Read it like a mirror – the whole message runs backwards.',
    correctAnswer: 'USE A STRONG PASSWORD',
    cybersecurityTip: 'Use a strong password.',
    explanation:
      'Use long, complex, and unique passwords or passphrases for every individual account. A trusted password manager helps generate and store them securely.',
    isBonus: true,
  },
];
