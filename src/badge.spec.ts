import badge, { colors } from 'badge-up';

import { createBadge } from './badge';

jest.mock('badge-up');

describe('Badge', () => {
    beforeEach(() => {
        (badge as jest.MockedFunction<typeof badge>).mockResolvedValue('this is a badge');
    });

    describe('Creating badge', () => {
        test('it returns the badge contents', async () => {
            const contents = await createBadge('coverage', 12.34);
            expect(contents).toEqual('this is a badge');
        });

        test.each([
            [colors.red, 0],
            [colors.red, 75],
            [colors.orange, 75.01],
            [colors.orange, 85],
            [colors.yellow, 85.01],
            [colors.yellow, 90],
            [colors.yellowgreen, 90.01],
            [colors.yellowgreen, 93],
            [colors.green, 93.01],
            [colors.green, 97],
            [colors.brightgreen, 97.01],
            [colors.brightgreen, 100],
        ])('the color is %s when the coverage is %s', async (color, coverage) => {
            await createBadge('abc123', coverage);
            expect(badge).toHaveBeenCalledWith('abc123', `${coverage}%`, color);
        });
    });
});
