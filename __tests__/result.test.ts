import { describe, expect, it } from '@jest/globals';
import { Results, Result } from '../src/result';

describe('Result', () => {
    it('should create an Ok result', () => {
      const result = Results.ok(42);
      expect(Results.isOk(result)).toBe(true);
      expect(result.value).toBe(42);
    });

    it('should create an Err result', () => {
      const error = new Error('Something went wrong');
      const result = Results.err(error);
      expect(Results.isErr(result)).toBe(true);
      expect(() =>  {
        throw result.error
      }).toThrow();
    });

    it('should unwrap an Ok result', () => {
      const result = Results.ok(42);
      expect(Results.unwrap(result)).toBe(42);
    });

    it('should throw when unwrapping an Err result', () => {
      const error = new Error('Something went wrong');
      const result = Results.err(error);
      expect(() => Results.unwrap(result)).toThrowError('Called unwrap on an Err value');
    });
});
