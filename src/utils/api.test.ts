import { expect, test } from "vitest";
import { sum } from "./api.ts";
import type { ContactForm } from "./api.types.ts";
import { submitForm } from "./api.ts";

test("adds 1 + 2 to equal 3", () => {
  expect(sum(1, 2)).toBe(3);
});

test("submitForm returns correct types, success and message are defined", async () => {
  const inputData: ContactForm = {
    email: "test@test.com",
    name: "Test User",
    message: "Test Message",
  };
  const result = await submitForm(inputData);

  expect(typeof result.success).toBe("boolean");
  expect(typeof result.message).toBe("string");
  expect(result.success).toBeDefined();
  expect(result.message).toBeDefined();
});
