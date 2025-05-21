# assert-code-frame

[![CI](https://github.com/robertsLando/assert-code-frame/actions/workflows/ci.yml/badge.svg)](https://github.com/robertsLando/assert-code-frame/actions/workflows/ci.yml)
[![npm](https://img.shields.io/npm/v/assert-code-frame.svg)](https://www.npmjs.com/package/assert-code-frame)
[![npm](https://img.shields.io/npm/dt/assert-code-frame.svg)](https://www.npmjs.com/package/assert-code-frame)

Enhances Node.js's built-in `assert` module by printing a code frame along with the error message when an assertion fails. This makes it easier to identify the location of the failed assertion in your code.

## Installation

```bash
npm install assert-code-frame
```

## Usage

```typescript
import assert from 'assert-code-frame';

assert.strictEqual(1 + 1, 3, '1 + 1 should be 3');
```

Will output:

```txt
    1 | import assert from 'assert-code-frame';
    2 |
    3 | assert.strictEqual(1 + 1, 3, '1 + 1 should be 3');
      | ^
    4 |
```

When an assertion fails, the code frame will be printed to the console, highlighting the line of code where the assertion failed.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

MIT
