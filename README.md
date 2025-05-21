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
AssertionError [ERR_ASSERTION]: 1 + 1 should be 3

2 !== 3

    at Proxy.<anonymous> (assert-code-frame/src/index.ts:65:17)
    at Object.<anonymous> (assert-code-frame/example.ts:3:8)
    at Module._compile (node:internal/modules/cjs/loader:1469:14)
    at Module._compile (assert-code-frame/node_modules/esbuild-register/dist/node.js:2258:26)
    at Module._extensions..js (node:internal/modules/cjs/loader:1548:10)
    at Object.newLoader [as .ts] (assert-code-frame/node_modules/esbuild-register/dist/node.js:2262:9)
    at Module.load (node:internal/modules/cjs/loader:1288:32)
    at Module._load (node:internal/modules/cjs/loader:1104:12)
    at Function.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:173:12)
    at node:internal/main/run_main_module:28:49

  1 | import assert from './src';
  2 |
> 3 | assert.strictEqual(1 + 1, 3, '1 + 1 should be 3');
    |        ^ 1 + 1 should be 3

2 !== 3

  4 | {
  generatedMessage: false,
  code: 'ERR_ASSERTION',
  actual: 2,
  expected: 3,
  operator: 'strictEqual'
}
```

When an assertion fails, the code frame will be printed to the console, highlighting the line of code where the assertion failed.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

MIT
