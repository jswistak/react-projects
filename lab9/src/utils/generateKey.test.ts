import {generateKey} from "./generateKey";

describe('generate key util function tests', () => {
    test('generateKey should return string', () => {
        const key = generateKey();

        expect(typeof key).toBe("string")
    });

    test('generateKey should return nonempty string', () => {
        const key = generateKey();

        expect(key).not.toBeNull();
        expect(key).not.toBe(undefined);
        expect(key?.length).toBeGreaterThan(0);
    });

    test('generateKey result should have 24 letters', () => {
        const key = generateKey();

        expect(key).toHaveLength(24);
    });

    test('generateKey result should randomize values', () => {
        const key1 = generateKey();
        const key2 = generateKey();

        expect(key1).not.toBe(key2);
    });

    test('generateKey result should contain 24 lowercase letters or numbers', () => {
        const keys = [...new Array(10)].map(generateKey);

        const regex = /[a-z0-9]{24}/

        keys.forEach(key => {
            expect(key).toMatch(regex);
        })
    });
})


