import assert, { AssertionError } from "node:assert";
import fs from "node:fs";
import path from "node:path";
import { codeFrameColumns } from "@babel/code-frame";

const fileName = path.basename(__filename);

/**
 * Extract the code frame from the stack trace ignoring internal Node, node_modules, and our own file
 */
function getCodeFrameFromStack(err: AssertionError): string {
  const stackLines = err.stack?.split("\n") ?? [];

  const callerFrame = stackLines.find((line) => {
    // Ignore internal Node, node_modules, and our own file
    const isInternal =
      line.includes("node:") ||
      line.includes("internal/") ||
      line.includes("node_modules") ||
      line.includes(fileName);
    return !isInternal && /\.\w+:\d+:\d+/.test(line); // Match any file with an extension and line/column numbers
  });

  const match =
    callerFrame?.match(/\((.*):(\d+):(\d+)\)/) ||
    callerFrame?.match(/at (.*):(\d+):(\d+)/);

  if (match) {
    const [, filePath, line, column] = match;
    try {
      const absPath = path.resolve(filePath);
      const src = fs.readFileSync(absPath, "utf8");
      const highlightCode = process.stdout.isTTY && !process.env.CI; // Disable highlighting on CI
      const codeFrame = codeFrameColumns(
        src,
        { start: { line: Number(line), column: Number(column) } },
        { highlightCode, message: err.message },
      );
      return codeFrame;
    } catch (e) {
      return `Failed to generate code frame: ${(e as Error).message}`;
    }
  } else {
    return "Could not find source location in stack trace.";
  }
}

/**
 * Create a proxy around the assert module
 */
const enhancedAssert: typeof assert = new Proxy(assert, {
  get(target, prop: keyof typeof assert) {
    const original = target[prop];

    if (typeof original !== "function") return original;

    return (...args: unknown[]) => {
      try {
        return (original as (...args: unknown[]) => unknown)(...args);
      } catch (err) {
        if (err instanceof AssertionError) {
          const codeFrame = getCodeFrameFromStack(err);
          // do not patch the message or the codeFrame would be missing when console.error(err)
          err.stack += `\n\n${codeFrame}`;
        }
        throw err;
      }
    };
  },
});

export default enhancedAssert;
