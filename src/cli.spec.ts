import { Arguments, processArguments } from './cli';

describe('CLI', () => {
    beforeEach(() => {
        jest.spyOn(console, 'log').mockImplementation();
        jest.spyOn(console, 'error').mockImplementation();
        jest.spyOn(process, 'exit').mockImplementation();
    });

    afterEach(() => {
        (console.log as jest.Mock).mockReset();
    });

    describe('When the help argument is passed', () => {
        describe.each(['-h', '--help'])('When %s is passed', (arg) => {
            beforeEach(() => {
                process.argv = ['node', 'foo.ts', arg];
                processArguments();
            });

            test('it prints the help message', () => {
                expect(console.log).toHaveBeenCalledTimes(1);
            });

            test('it exits without an error', () => {
                expect(process.exit).toHaveBeenCalledWith(0);
            });
        });
    });

    describe('When no positional arguments are passed', () => {
        beforeEach(() => {
            process.argv = ['node', 'foo.ts', '-l', 'foo'];
            processArguments();
        });

        test('it prints an error message', () => {
            expect(console.error).toHaveBeenCalledWith('Input must be provided');
        });

        test('it exits with an error', () => {
            expect(process.exit).toHaveBeenCalledWith(1);
        });
    });

    describe('When multiple positional arguments are passed', () => {
        beforeEach(() => {
            process.argv = ['node', 'foo.ts', '-l', 'foo', 'bar', 'baz'];
            processArguments();
        });

        test('it prints an error message', () => {
            expect(console.error).toHaveBeenCalledWith('Only one input can be provided');
        });

        test('it exits with an error', () => {
            expect(process.exit).toHaveBeenCalledWith(1);
        });
    });

    describe('When only an input is provided', () => {
        let args: Arguments;

        beforeEach(() => {
            process.argv = ['node', 'foo.ts', 'foo'];
            args = processArguments();
        });

        test('it sets the input', () => {
            expect(args.input).toEqual('foo');
        });

        test('it uses the default label value', () => {
            expect(args.label).toEqual('coverage');
        });

        test('it uses the default output value', () => {
            expect(args.output).toEqual('badge.svg');
        });
    });

    describe('When providing a value for label', () => {
        let args: Arguments;

        beforeEach(() => {
            process.argv = ['node', 'foo.ts', '-l', 'my-coverage', 'foo'];
            args = processArguments();
        });

        test('it sets the value for label', () => {
            expect(args.label).toEqual('my-coverage');
        });
    });

    describe('When providing a value for output', () => {
        let args: Arguments;

        beforeEach(() => {
            process.argv = ['node', 'foo.ts', '-o', 'my-badge.svg', 'foo'];
            args = processArguments();
        });

        test('it sets the value for label', () => {
            expect(args.output).toEqual('my-badge.svg');
        });
    });
});
