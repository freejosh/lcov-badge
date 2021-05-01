import parse from 'parse-lcov';

import { getCoverageLevel } from './coverage';

jest.mock('parse-lcov');

describe('Coverage', () => {
    beforeEach(() => {
        (parse as jest.MockedFunction<typeof parse>).mockReturnValue([]);
    });

    test('it reads the file', () => {
        getCoverageLevel('foo.lcov');
        expect(parse).toHaveBeenCalledWith('foo.lcov');
    });

    describe('When there are no lines of code', () => {
        beforeEach(() => {
            (parse as jest.MockedFunction<typeof parse>).mockReturnValue([
                {
                    title: '',
                    file: '',
                    functions: { found: 0, hit: 0, details: [] },
                    branches: { found: 0, hit: 0, details: [] },
                    lines: { found: 0, hit: 0, details: [] },
                },
            ]);
        });

        test('it returns 100', () => {
            expect(getCoverageLevel('foo')).toEqual(100);
        });
    });

    describe('When there are lines of code and none are hit', () => {
        beforeEach(() => {
            (parse as jest.MockedFunction<typeof parse>).mockReturnValue([
                {
                    title: '',
                    file: '',
                    functions: { found: 1, hit: 0, details: [] },
                    branches: { found: 2, hit: 0, details: [] },
                    lines: { found: 3, hit: 0, details: [] },
                },
            ]);
        });

        test('it returns 0', () => {
            expect(getCoverageLevel('foo')).toEqual(0);
        });
    });

    describe('When there are lines of code and all are hit', () => {
        beforeEach(() => {
            (parse as jest.MockedFunction<typeof parse>).mockReturnValue([
                {
                    title: '',
                    file: '',
                    functions: { found: 1, hit: 1, details: [] },
                    branches: { found: 2, hit: 2, details: [] },
                    lines: { found: 3, hit: 3, details: [] },
                },
            ]);
        });

        test('it returns 0', () => {
            expect(getCoverageLevel('foo')).toEqual(100);
        });
    });

    describe('When there are lines of code and some are hit', () => {
        beforeEach(() => {
            (parse as jest.MockedFunction<typeof parse>).mockReturnValue([
                {
                    title: '',
                    file: '',
                    functions: { found: 100, hit: 66, details: [] },
                    branches: { found: 200, hit: 157, details: [] },
                    lines: { found: 1234, hit: 963, details: [] },
                },
            ]);
        });

        test('it calculates the coverage', () => {
            expect(getCoverageLevel('foo')).toEqual(74.18);
        });
    });
});
