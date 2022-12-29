import { TSESLint } from '@typescript-eslint/utils';

export const ruleTester = new TSESLint.RuleTester({
  parser: require.resolve('@typescript-eslint/parser'),
});
