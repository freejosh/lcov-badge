# lcov-badge2

A tool for generating SVG badges from LCOV reports, based on [lcov-badge](https://github.com/freejosh/lcov-badge)

[![Build](https://github.com/stevenhair/lcov-badge2/actions/workflows/test.yml/badge.svg)](https://github.com/stevenhair/lcov-badge2/actions/workflows/test.yml)
[![codecov](https://codecov.io/gh/stevenhair/lcov-badge2/branch/master/graph/badge.svg?token=nb0yy1Y6zc)](https://codecov.io/gh/stevenhair/lcov-badge2)

## Usage

lcov-badge2 can be used as either a command line utility or a library. The generated SVGs will look
like this:
<svg xmlns="http://www.w3.org/2000/svg" width="103" height="20"><linearGradient id="b" x2="0" y2="100%"><stop offset="0" stop-color="#bbb" stop-opacity=".1"/><stop offset="1" stop-opacity=".1"/></linearGradient><mask id="a"><rect width="103" height="20" rx="3" fill="#fff"/></mask><g mask="url(#a)"><path fill="#555" d="M0 0h62v20H0z"/><path fill="#4C1" d="M62 0h41v20H62z"/><path fill="url(#b)" d="M0 0h103v20H0z"/></g><g fill="#fff" text-anchor="middle" font-family="Verdana,DejaVu Sans,Geneva,sans-serif" font-size="11"><text x="31" y="15" fill="#010101" fill-opacity=".3">coverage</text><text x="31" y="14">coverage</text><text x="81.5" y="15" fill="#010101" fill-opacity=".3">100%</text><text x="81.5" y="14">100%</text></g></svg>

### Command line usage

To use this library, just pass the path to your lcov file:

```bash
lcov-badge coverage/lcov.info
```

This will generate a `badge.svg` file. If you want an output file with a different name, you can pass
the `-o` option:

```bash
lcov-badge -o coverage.svg coverage/lcov.info
```

You can view all arguments by passing the `-h` option.

### Library usage

Here's an example of programmatic usage:

```typescript
import generateBadge from 'lcov-badge2';

const badge = generateBadge('coverage/lcov.info', 'coverage')
fs.writeFileSync('badge.svg', badge);
```
