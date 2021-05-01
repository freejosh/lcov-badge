# lcov-badge2

[![Build](https://github.com/stevenhair/lcov-badge2/actions/workflows/test.yml/badge.svg)](https://github.com/stevenhair/lcov-badge2/actions/workflows/test.yml)
[![codecov](https://codecov.io/gh/stevenhair/lcov-badge2/branch/master/graph/badge.svg?token=nb0yy1Y6zc)](https://codecov.io/gh/stevenhair/lcov-badge2)

```
usage: lcov-badge [-h] [-v] [-o OUTPUT] [-l LABEL] input

Positional arguments:
  input                 Path to Lcov file to parse

Optional arguments:
  -h, --help            Show this help message and exit.
  -v, --version         Show program's version number and exit.
  -o OUTPUT, --output OUTPUT
                        Output file path (.svg or .png) (default: ./badge.svg)
  -l LABEL, --label LABEL
                        Badge label (default: coverage)
```
