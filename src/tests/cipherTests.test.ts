import { describe, it, expect } from 'vitest';
import { caesarDecrypt, caesarEncrypt, caesarBruteForce } from '../engines/caesarCipher';
import { numberDecode, numberEncode } from '../engines/numberCipher';
import { atbashDecode, atbashEncode } from '../engines/atbashCipher';
import { PIGPEN_MAP, encodePigpen } from '../engines/pigpenCipher';
import { reverseDecode, reverseEncode } from '../engines/reverseCipher';

describe('Round 1: Caesar Cipher Engine', () => {
  it('correctly decodes Round 1 intercepted message with shift 3', () => {
    const ciphertext = 'VWDB VDIH RQOLQH';
    const decrypted = caesarDecrypt(ciphertext, 3);
    expect(decrypted).toBe('STAY SAFE ONLINE');
  });

  it('correctly encrypts plain text with shift 3', () => {
    const plaintext = 'STAY SAFE ONLINE';
    const encrypted = caesarEncrypt(plaintext, 3);
    expect(encrypted).toBe('VWDB VDIH RQOLQH');
  });
});

describe('Round 2: Mystery Caesar Shift Engine', () => {
  it('correctly recovers shift 5 for DTZW -> YOUR', () => {
    const bruteForce = caesarBruteForce('DTZW', 1, 10);
    const match = bruteForce.find(b => b.decrypted === 'YOUR');
    expect(match).toBeDefined();
    expect(match?.shift).toBe(5);
  });

  it('correctly decodes Round 2 intercepted message with shift 5', () => {
    const ciphertext = 'SJAJW XMFWJ DTZW UFXXBTWI';
    const decrypted = caesarDecrypt(ciphertext, 5);
    expect(decrypted).toBe('NEVER SHARE YOUR PASSWORD');
  });
});

describe('Round 3: A1Z26 Number Cipher Engine', () => {
  it('correctly decodes Round 3 number cipher to LOCK YOUR SCREEN', () => {
    const ciphertext = '12-15-3-11 / 25-15-21-18 / 19-3-18-5-5-14';
    const decrypted = numberDecode(ciphertext);
    expect(decrypted).toBe('LOCK YOUR SCREEN');
  });

  it('correctly encodes LOCK YOUR SCREEN to A1Z26 format', () => {
    const plaintext = 'LOCK YOUR SCREEN';
    const encoded = numberEncode(plaintext);
    expect(encoded).toBe('12-15-3-11 / 25-15-21-18 / 19-3-18-5-5-14');
  });
});

describe('Round 4: Atbash Cipher Engine', () => {
  it('correctly decodes Round 4 Atbash cipher to THINK BEFORE YOU CLICK', () => {
    const ciphertext = 'GSRMP YVULIV BLF XORXP';
    const decrypted = atbashDecode(ciphertext);
    expect(decrypted).toBe('THINK BEFORE YOU CLICK');
  });

  it('is reciprocal: encoding twice returns original text', () => {
    const text = 'THINK BEFORE YOU CLICK';
    expect(atbashDecode(atbashEncode(text))).toBe(text);
  });
});

describe('Round 5: Pigpen Cipher Engine', () => {
  it('contains geometric definitions for all 26 letters A-Z', () => {
    for (let i = 65; i <= 90; i++) {
      const letter = String.fromCharCode(i);
      const def = PIGPEN_MAP[letter];
      expect(def).toBeDefined();
      expect(def.letter).toBe(letter);
      expect(def.path).toBeDefined();
      expect(def.path.length).toBeGreaterThan(0);
    }
  });

  it('verifies dots for Grid 2 (J-R) and X-Grid 2 (W-Z)', () => {
    'JKLMNOPQR'.split('').forEach(ch => {
      expect(PIGPEN_MAP[ch].hasDot).toBe(true);
      expect(PIGPEN_MAP[ch].dotCoords).toBeDefined();
    });

    'ABCDEFGHI'.split('').forEach(ch => {
      expect(PIGPEN_MAP[ch].hasDot).toBe(false);
    });

    'WXYZ'.split('').forEach(ch => {
      expect(PIGPEN_MAP[ch].hasDot).toBe(true);
    });

    'STUV'.split('').forEach(ch => {
      expect(PIGPEN_MAP[ch].hasDot).toBe(false);
    });
  });

  it('encodes UPDATE YOUR DEVICES properly into Pigpen symbols', () => {
    const phrase = 'UPDATE YOUR DEVICES';
    const symbols = encodePigpen(phrase);
    expect(symbols.length).toBe(phrase.length);
    expect(symbols[0]).toMatchObject({ letter: 'U' });
    expect(symbols[1]).toMatchObject({ letter: 'P', hasDot: true });
    expect(symbols[2]).toMatchObject({ letter: 'D', hasDot: false });
    expect(symbols[3]).toMatchObject({ letter: 'A', hasDot: false });
    expect(symbols[4]).toMatchObject({ letter: 'T', hasDot: false });
    expect(symbols[5]).toMatchObject({ letter: 'E', hasDot: false });
    expect(symbols[6]).toBe('SPACE');
  });
});

describe('Bonus Round: Reverse Writing Cipher Engine', () => {
  it('correctly decodes sudden death reverse message to USE A STRONG PASSWORD', () => {
    const ciphertext = 'DROWSSAP GNORTS A ESU';
    const decrypted = reverseDecode(ciphertext);
    expect(decrypted).toBe('USE A STRONG PASSWORD');
  });

  it('correctly reverses plain text', () => {
    const plaintext = 'USE A STRONG PASSWORD';
    const reversed = reverseEncode(plaintext);
    expect(reversed).toBe('DROWSSAP GNORTS A ESU');
  });
});
