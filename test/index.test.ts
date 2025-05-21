import assert from "../src";
// import assert from "node:assert";
import { test } from "node:test";
import { AssertionError } from "node:assert";

process.env.CI = "true"; // Simulate CI environment for testing

test.only("assert.strictEqual with failure", (t) => {
  const message = "1 + 1 should be 3";
  try {
    assert.strictEqual(1 + 1, 3, message);
  } catch (error) {
    assert.ok(error instanceof AssertionError, "should throw AssertionError");
    assert.ok(error.message.startsWith(message), "message should match");
    assert.ok(
      error.stack?.includes("assert.strictEqual(1 + 1, 3, message);"),
      "code frame should be present",
    );
    return;
  }
  throw new Error("should have thrown");
});

test("assert.deepStrictEqual with failure", (t) => {
  const message = "Objects should match";
  try {
    assert.deepStrictEqual({ a: 1 }, { a: 2 }, message);
  } catch (error) {
    assert.ok(error instanceof AssertionError, "should throw AssertionError");
    assert.ok(error.message.startsWith(message), "message should match");
    assert.ok(
        error.stack?.includes(
        "assert.deepStrictEqual({ a: 1 }, { a: 2 }, message);",
      ),
      "code frame should be present",
    );
    return;
  }
  throw new Error("should have thrown");
});

test("assert.ok with failure", (t) => {
  const message = "This should be true";
  try {
    assert.ok(false, message);
  } catch (error) {
    assert.ok(error instanceof AssertionError, "should throw AssertionError");
    assert.ok(error.message.startsWith(message), "message should match");
    assert.ok(
        error.stack?.includes("assert.ok(false, message);"),
      "code frame should be present",
    );
    return;
  }
  throw new Error("should have thrown");
});
