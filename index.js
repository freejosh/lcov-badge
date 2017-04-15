#!/usr/bin/env node
const fs = require('fs');
const ArgumentParser = require('argparse').ArgumentParser;
const parse = require('lcov-parse');
const badge = require('badge-up');
const svg2png = require('svg2png');
const pkg = require('./package.json');

const defaultOutput = './badge.svg';
const defaultLabel = 'coverage';

const parser = new ArgumentParser({
	version: pkg.version,
	addHelp: true,
});
parser.addArgument(
	'input',
	{
		help: 'Path to Lcov file to parse',
	}
);
parser.addArgument(
	[ '-o', '--output' ],
	{
		help: `Output file path (.svg or .png) (default: ${defaultOutput})`,
		defaultValue: defaultOutput,
	}
);
parser.addArgument(
	[ '-l', '--label' ],
	{
		help: `Badge label (default: ${defaultLabel})`,
		defaultValue: defaultLabel,
	}
);
const args = parser.parseArgs();

const format = args.output.slice(-3);
if (format !== 'svg' && format !== 'png') {
	parser.printHelp();
	return;
}

parse(args.input, (parseErr, data) => {
	if (parseErr) {
		throw parseErr;
	}

	const summary = {
		lines: { found: 0, hit: 0 },
		branches: { found: 0, hit: 0 },
		functions: { found: 0, hit: 0 },
	};
	const keys = ['lines', 'branches', 'functions'];

	data.forEach((arg) => {
		keys.forEach((key) => {
			summary[key].found += arg[key].found;
			summary[key].hit += arg[key].hit;
		});
	});

	const average = keys.reduce((avg, key) => {
		const found = summary[key].found;
		return avg + (found > 0
			? Math.round(summary[key].hit / found * 10000) / 100
			: 100);
	}, 0) / keys.length;

	let color = 'red';
	if (average <= 85) {
		color = 'orange';
	} else if (average <= 90) {
		color = 'yellow';
	} else if (average <= 93) {
		color = 'yellowgreen';
	} else if (average <= 97) {
		color = 'green';
	} else {
		color = 'brightgreen';
	}

	badge(args.label, `${average}%`, badge.colors[color], (badgeErr, output) => {
		if (badgeErr) {
			throw badgeErr;
		}

		if (format === 'png') {
			output = svg2png.sync(output);
		}

		fs.writeFile(args.output, output, (writeErr) => {
			if (writeErr) {
				throw writeErr;
			}
		});
	});
});
