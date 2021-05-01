# lcov-badge2

A tool for generating SVG badges from LCOV reports, based on [lcov-badge](https://github.com/freejosh/lcov-badge)

[![Build](https://github.com/stevenhair/lcov-badge2/actions/workflows/test.yml/badge.svg)](https://github.com/stevenhair/lcov-badge2/actions/workflows/test.yml)
[![codecov](https://codecov.io/gh/stevenhair/lcov-badge2/branch/master/graph/badge.svg?token=nb0yy1Y6zc)](https://codecov.io/gh/stevenhair/lcov-badge2)

## Usage

lcov-badge2 can be used as either a command line utility or a library.

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
