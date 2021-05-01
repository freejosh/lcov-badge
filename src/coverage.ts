import parse from 'parse-lcov';

export function getCoverageLevel(filename: string): number {
    const coverage = parse(filename);

    const summary = {
        lines: { found: 0, hit: 0 },
        branches: { found: 0, hit: 0 },
        functions: { found: 0, hit: 0 },
    };
    const keys = Object.keys(summary) as (keyof typeof summary)[];

    coverage.forEach((arg) => {
        keys.forEach((key) => {
            summary[key].found += arg[key].found;
            summary[key].hit += arg[key].hit;
        });
    });

    return Math.round(keys.reduce((avg, key) => {
        const found = summary[key].found;
        return avg + (found > 0 ? summary[key].hit / found * 100 : 100);
    }, 0) / keys.length * 100) / 100;
}
