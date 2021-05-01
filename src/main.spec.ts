import { createBadge } from './badge';
import { getCoverageLevel } from './coverage';
import { generateBadge } from './main';

jest.mock('./badge');
jest.mock('./coverage');

describe('Main', () => {
    let badgeContents: string;

    beforeEach(async () => {
        (getCoverageLevel as jest.MockedFunction<typeof getCoverageLevel>).mockReturnValue(99.5);
        (createBadge as jest.MockedFunction<typeof createBadge>).mockResolvedValue('totally an svg');

        badgeContents = await generateBadge('foo.lcov', 'something');
    });

    test('the main function generates the badge from the input', () => {
        expect(getCoverageLevel).toHaveBeenCalledWith('foo.lcov');
        expect(createBadge).toHaveBeenCalledWith('something', 99.5);
    });

    test('it returns the SVG as a string', () => {
        expect(badgeContents).toEqual('totally an svg');
    });
});
