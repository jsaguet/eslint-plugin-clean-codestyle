import { TSESLint } from '@typescript-eslint/experimental-utils';

export const ruleTester = new TSESLint.RuleTester({
  parser: require.resolve('@typescript-eslint/parser'),
});
