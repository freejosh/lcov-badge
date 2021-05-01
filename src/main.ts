import { createBadge } from './badge';
import { getCoverageLevel } from './coverage';

export async function generateBadge(input: string, label = 'coverage'): Promise<string> {
    const coverage = getCoverageLevel(input);
    return createBadge(label, coverage);
}
