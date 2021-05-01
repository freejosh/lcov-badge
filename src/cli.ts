import minimist, { ParsedArgs } from 'minimist';
import buildOptions from 'minimist-options';

export interface Arguments {
    input: string;
    label: string;
    output: string;
}

const defaultOutputPath = 'badge.svg';
const defaultLabel = 'coverage';

function exitWithError(message: string): never {
    console.error(message);
    process.exit(1);
}

function printHelp(): never {
    const message = `Usage: ${process.argv[1]} [-h] [-o OUTPUT] [-l LABEL] input

Positional Arguments:
  input                 Path to LCOV file to parse

Optional Arguments:
  -h, --help            Show this help message and exit
  -o OUTPUT, --output OUTPUT
                        Output file path (default: ${defaultOutputPath})
  -l LABEL, --label LABEL
                        Badge label (default: ${defaultLabel})
    `;
    console.log(message);
    process.exit(0);
}

function validateArguments(args: ParsedArgs): void {
    if (!args._.length) {
        exitWithError('Input must be provided');
    }

    if (args._.length !== 1) {
        exitWithError('Only one input can be provided');
    }
}

export function processArguments(): Arguments {
    const options = buildOptions({
        help: {
            type: 'boolean',
            alias: 'h',
            default: false,
        },
        label: {
            type: 'string',
            alias: 'l',
            default: defaultLabel,
        },
        output: {
            type: 'string',
            alias: 'o',
            default: defaultOutputPath,
        },
        // Special option for positional arguments (`_` in minimist)
        arguments: 'string',
    });

    const args = minimist(process.argv.slice(2), options);

    if (args.help) {
        printHelp();
    }

    validateArguments(args);

    return {
        input: args._[0],
        label: args.label,
        output: args.output,
    };
}
