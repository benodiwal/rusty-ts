import { Options, Option } from '../src/option';
import { describe, expect, it } from '@jest/globals';

describe('Option', () => {

    it('should create an option', () => {
        const option: Option<number> = Options.some(42);
        expect(Options.isSome(option)).toBe(true);
        expect(option.value).toBe(42);
    });

    it('should create a None option', () => {
        const option: Option<number> = Options.none();
        expect(Options.isNone(option)).toBe(true);
    });
    
    it('should unwrap a Some option', () => {
        const option: Option<number> = Options.some(42);
        expect(Options.unwrap(option)).toBe(42);
    });
    
    it('should throw when unwrapping a None option', () => {
        const option: Option<number> = Options.none();
        expect(() => Options.unwrap(option)).toThrow('Called unwrap on a None value');
    });

});
