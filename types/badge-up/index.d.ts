declare module 'badge-up' {
    export enum colors {
        brightgreen = '#4C1',
        green = '#97CA00',
        yellow = '#DFB317',
        yellowgreen = '#A4A61D',
        orange = '#FE7D37',
        red = '#E05D44',
        blue = '#007EC6',
        grey = '#555',
        gray = '#555',
        lightgrey = '#9F9F9F',
        lightgray = '#9F9F9F',
        purple = '#400090'
    }

    function badge(field1: string, field2: string, color: colors): Promise<string>;
    export default badge;
}
