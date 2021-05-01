import badge, { colors } from 'badge-up';

function getColor(coverage: number): colors {
    if (coverage > 97) {
        return colors.brightgreen;
    } else if (coverage > 93) {
        return colors.green;
    } else if (coverage > 90) {
        return colors.yellowgreen;
    } else if (coverage > 85) {
        return colors.yellow;
    } else if (coverage > 75) {
        return colors.orange;
    } else {
        return colors.red;
    }
}

export async function createBadge(label: string, coverage: number): Promise<string> {
    const color = getColor(coverage);
    return badge(label, `${coverage}%`, color);
}
